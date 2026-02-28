import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Upload } from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";
import { useChat } from "../context/ChatContext";

// Get API URL from environment variable, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ChatPage() {
  const { theme } = useTheme();
  const { messages, addMessage, clearMessages } = useChat();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    addMessage({ role: "user", content: userMessage, sources: [] });
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();

      addMessage({
        role: "assistant",
        content: data.answer || "Sorry, I couldn't find an answer.",
        sources: data.sources || []
      });
    } catch (error) {
      addMessage({
        role: "assistant",
        content: "⚠️ Error connecting to backend. Make sure the server is running.",
        sources: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ Uploaded successfully. Indexed ${data.chunks} chunks.`);
      } else {
        alert(`❌ Upload failed: ${data.error}`);
      }
    } catch (error) {
      alert('❌ Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-gray-900/50 dark:to-gray-800/50" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl dark:bg-gray-900/70 shadow-2xl">
          <div className="border-b border-gray-200/50 dark:border-gray-700/50 p-3 sm:p-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h1 className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm sm:text-base">
              InfoFlow AI
            </h1>
            
            <input
              type="file"
              id="fileUpload"
              accept=".pdf,.txt,.md"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <button
              onClick={() => document.getElementById('fileUpload').click()}
              disabled={uploading}
              className="ml-auto text-xs px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 disabled:opacity-50"
              title="Upload a document (PDF, TXT, MD)"
            >
              {uploading ? '...' : <Upload className="h-4 w-4" />}
            </button>

            <button
              onClick={() => {
                if (window.confirm("Clear all messages?")) {
                  clearMessages();
                }
              }}
              className="text-xs px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
            >
              Clear
            </button>
          </div>

          <div className="h-[400px] sm:h-[500px] overflow-y-auto p-3 sm:p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className="space-y-2">
                <div className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 text-sm sm:text-base",
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
                {msg.role === "assistant" && msg.sources?.length > 0 && (
                  <div className="flex flex-wrap gap-2 pl-2">
                    {msg.sources.map((source, idx) => (
                      <div
                        key={idx}
                        className="text-xs bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-2 border border-gray-200/50 dark:border-gray-700/50 max-w-[200px] sm:max-w-xs"
                      >
                        <div className="font-medium truncate text-gray-900 dark:text-gray-100">
                          {source.title}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 line-clamp-2">
                          {source.excerpt}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-3 sm:p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask anything..."
                disabled={isLoading}
                className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 px-3 sm:px-4 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="rounded-lg bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-2 text-white disabled:opacity-50 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}