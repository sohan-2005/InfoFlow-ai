const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { getVectorStore, createChain } = require("./rag/vectorStore");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

let vectorStore, chain;

// Initialize on startup
(async () => {
  try {
    vectorStore = await getVectorStore();
    chain = createChain(vectorStore.asRetriever(3));
    console.log("✅ RAG ready");
  } catch (error) {
    console.error("❌ Failed to initialize RAG:", error.message);
  }
})();

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