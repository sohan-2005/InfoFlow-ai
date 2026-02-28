const { HuggingFaceTransformersEmbeddings } = require("@langchain/community/embeddings/hf_transformers");
const { ChatOllama } = require("@langchain/ollama");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { RetrievalQAChain } = require("langchain/chains");
const { Document } = require("@langchain/core/documents");
const fs = require("fs/promises");
const path = require("path");
const pdfParse = require("pdf-parse");

let vectorStore = null;

async function loadPDF(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  const pdfData = await pdfParse(dataBuffer);
  return new Document({
    pageContent: pdfData.text,
    metadata: { source: path.basename(filePath) },
  });
}

async function loadText(filePath) {
  const content = await fs.readFile(filePath, "utf-8");
  return new Document({
    pageContent: content,
    metadata: { source: path.basename(filePath) },
  });
}

async function loadDocuments() {
  const docsPath = path.join(process.cwd(), "documents");
  let files;
  try {
    files = await fs.readdir(docsPath);
  } catch (e) {
    console.error("❌ Documents folder not found. Create 'backend/documents/' and add PDF/TXT files.");
    return [];
  }

  const allDocs = [];
  for (const file of files) {
    const filePath = path.join(docsPath, file);
    const ext = path.extname(file).toLowerCase();
    try {
      if (ext === ".pdf") {
        const doc = await loadPDF(filePath);
        allDocs.push(doc);
        console.log(`📄 Loaded PDF: ${file}`);
      } else if (ext === ".txt" || ext === ".md") {
        const doc = await loadText(filePath);
        allDocs.push(doc);
        console.log(`📄 Loaded text: ${file}`);
      }
    } catch (e) {
      console.error(`Error loading ${file}:`, e.message);
    }
  }

  if (allDocs.length === 0) {
    console.warn("⚠️ No documents loaded. Place files in 'backend/documents/'.");
    return [];
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  return await splitter.splitDocuments(allDocs);
}

async function getVectorStore() {
  if (!vectorStore) {
    console.log("🔄 Loading documents and creating vector store with LOCAL embeddings (HuggingFace)...");
    const docs = await loadDocuments();
    if (docs.length === 0) {
      throw new Error("No documents available. Cannot create vector store.");
    }
    
    const embeddings = new HuggingFaceTransformersEmbeddings({
      model: "Xenova/all-MiniLM-L6-v2",
    });
    
    vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
    console.log(`✅ Loaded ${docs.length} chunks`);
  }
  return vectorStore;
}

function createChain(retriever) {
  const model = new ChatOllama({
    model: "llama3.2:1b",
    baseUrl: process.env.OLLAMA_BASE_URL,
    temperature: 0.1,
    num_predict:256,
  });

  return RetrievalQAChain.fromLLM(model, retriever, {
    returnSourceDocuments: true,
  });
}

module.exports = { getVectorStore, createChain };