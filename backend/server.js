const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { Document } = require("@langchain/core/documents");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { getVectorStore, createChain } = require("./rag/vectorStore");
const fs = require("fs/promises"); // For reading documents folder

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

let vectorStore, chain;
const uploadedFileNames = new Set(); // Track uploaded filenames

// On startup, load existing files from documents folder into the Set
(async () => {
  try {
    const docsPath = path.join(process.cwd(), "documents");
    const files = await fs.readdir(docsPath).catch(() => []);
    files.forEach(file => uploadedFileNames.add(file));
    console.log(`📁 Loaded ${files.length} existing files into upload tracker.`);
  } catch (e) {
    console.log("No documents folder found – upload tracker empty.");
  }
})();

(async () => {
  try {
    vectorStore = await getVectorStore();
    chain = createChain(vectorStore.asRetriever(3));
    console.log("✅ RAG ready");
  } catch (error) {
    console.error("❌ Failed to initialize RAG:", error.message);
  }
})();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileName = req.file.originalname;

    if (uploadedFileNames.has(fileName)) {
      return res.status(409).json({ error: "A file with this name already exists in the knowledge base." });
    }

    const file = req.file;
    const ext = path.extname(fileName).toLowerCase();

    let rawDocs = [];
    if (ext === ".pdf") {
      const pdfData = await pdfParse(file.buffer);
      rawDocs.push(new Document({
        pageContent: pdfData.text,
        metadata: { source: fileName },
      }));
    } else if (ext === ".txt" || ext === ".md") {
      const content = file.buffer.toString("utf-8");
      rawDocs.push(new Document({
        pageContent: content,
        metadata: { source: fileName },
      }));
    } else {
      return res.status(400).json({ error: "Unsupported file type. Only PDF, TXT, MD allowed." });
    }

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const chunks = await splitter.splitDocuments(rawDocs);

    const store = await getVectorStore();
    await store.addDocuments(chunks);

    uploadedFileNames.add(fileName);

    res.json({
      message: "File uploaded and indexed successfully",
      chunks: chunks.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to process file" });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!chain) {
      return res.status(503).json({ error: "RAG system still initializing or no documents." });
    }

    const response = await chain.call({ query: message });

    const sources = response.sourceDocuments.map((doc) => ({
      title: doc.metadata.source ? path.basename(doc.metadata.source) : "Document",
      excerpt: doc.pageContent.substring(0, 200) + "...",
      url: doc.metadata.source || "#",
    }));

    res.json({ answer: response.text, sources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend on port ${PORT}`));