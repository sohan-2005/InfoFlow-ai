InfoFlow AI

InfoFlow AI is a full‑stack, Retrieval‑Augmented Generation (RAG) chatbot that answers questions based on your internal company documents. It uses a local LLM (Ollama) and local embeddings to ensure **complete data privacy** – no information ever leaves your machine. The system is built with a modern React frontend and an Express.js backend, orchestrated with LangChain.

🔗 **Repository:** [github.com/your-username/InfoFlow-ai](https://github.com/sohan-2005/InfoFlow-ai)  
🌐 **Live Demo:** [Coming soon]

---

## ✨ Features

- **💬 Conversational AI** – Ask natural language questions and receive precise, grounded answers.
- **📄 Document Grounding** – Answers are sourced from your own documents (PDF, TXT, MD) and displayed with citations.
- **🔒 100% Private & Offline** – Uses local HuggingFace embeddings and a local Ollama LLM – no API keys, no data leaks.
- **🌗 Dark Mode** – Toggle between light and dark themes seamlessly.
- **📱 Fully Responsive** – Works beautifully on mobile, tablet, and desktop.
- **👥 Team Page** – Showcase the people behind the project.
- **💾 Persistent Chat** – Conversation history is saved in `localStorage` and survives page reloads.
- **🧠 RAG Pipeline** – Built with LangChain: document loading, chunking, embedding, retrieval, and generation.

---

## 🛠️ Tech Stack

| Frontend          | Backend           | AI / RAG                      |
|-------------------|-------------------|-------------------------------|
| React (Vite)      | Node.js + Express | LangChain.js                  |
| Tailwind CSS      | CORS, dotenv      | HuggingFace Embeddings (local)|
| React Router      | pdf-parse         | Ollama (llama3.2:3b)          |
| Framer Motion     |                   | MemoryVectorStore              |
| Lucide Icons      |                   |                                |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Ollama](https://ollama.com/) – to run the local LLM
- Git (for cloning)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/InfoFlow-ai.git
cd InfoFlow-ai
```

### 2. Set up the backend
```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` folder (optional, not required for local setup):
  ```
  PORT=5000
  ```
- Place your documents (`.pdf`, `.txt`, `.md`) inside the `backend/documents/` folder.  
  *A sample `company-policy.txt` is already included.*

- Start the backend server:
  ```bash
  npm run dev
  ```
  You should see:  
  `✅ RAG ready` and `🚀 Backend on port 5000`

### 3. Set up the frontend
Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`.

### 4. Start Ollama (if not already running)
Make sure Ollama is running in the background with the `llama3.2:3b` model pulled:
```bash
ollama pull llama3.2:3b
ollama serve
```

### 5. Use the app
- Open your browser to `http://localhost:5173`
- Navigate to the **Chat** page and ask questions about the documents you placed in `backend/documents/`.

---

## 🗂️ Project Structure

```
InfoFlow-ai/
├── backend/
│   ├── documents/          # Your knowledge base (PDF, TXT, MD)
│   ├── rag/
│   │   └── vectorStore.js  # RAG pipeline (embeddings, retrieval, chain)
│   ├── server.js            # Express API
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Navbar, reusable UI
│   │   ├── pages/           # Home, Team, ChatPage
│   │   ├── context/         # ThemeContext, ChatContext
│   │   ├── lib/             # utils.js (cn helper)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css        # Tailwind imports
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── README.md
```

## 🧪 How It Works (RAG Pipeline)

1. **Document Loading** – PDFs and text files are read using `pdf-parse` and `fs`.
2. **Chunking** – Documents are split into 1000‑character chunks with 200‑character overlap using `RecursiveCharacterTextSplitter`.
3. **Embedding** – Each chunk is converted into a vector using the local `Xenova/all-MiniLM-L6-v2` model (HuggingFace).
4. **Storage** – Vectors are stored in an in‑memory `MemoryVectorStore`.
5. **Retrieval** – When a user asks a question, the query is embedded and the top‑3 most similar chunks are retrieved.
6. **Generation** – The retrieved chunks are passed as context to the local LLM (`llama3.2:3b` via Ollama), which generates a natural‑language answer.
7. **Sources** – The original document names and excerpts are returned alongside the answer for transparency.

---

## 🚧 Future Improvements

- [ ] User authentication (multi‑tenant support)
- [ ] Drag‑and‑drop file upload in the UI
- [ ] Persistent vector database (e.g., Supabase pgvector) instead of in‑memory
- [ ] Support for more document types (Word, Excel, etc.)
- [ ] Conversation memory across multiple turns
- [ ] Deployment to a free cloud service (Vercel + Render)

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [LangChain](https://www.langchain.com/) for the incredible RAG framework
- [Ollama](https://ollama.com/) for making local LLMs easy
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Google Gemini](https://deepmind.google/technologies/gemini/) (explored during development)
