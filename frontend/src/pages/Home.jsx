import { Link } from "react-router-dom";
import { ArrowRight, Brain, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-gray-900/50 dark:to-gray-800/50" />
      
      {/* Hero Section */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
          InfoFlow AI
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
          Your intelligent internal knowledge hub. Ask questions, get instant answers from your company's documents, powered by generative AI.
        </p>
        <Link
          to="/chat"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
        >
          Try Chat Now <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Link>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-20 px-4">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 p-4 sm:p-6 rounded-2xl border border-white/20">
            <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">RAG-Powered</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Retrieval Augmented Generation ensures answers are grounded in your actual documents.</p>
          </div>
          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 p-4 sm:p-6 rounded-2xl border border-white/20">
            <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Instant Answers</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Get precise answers in seconds, with source citations for verification.</p>
          </div>
          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 p-4 sm:p-6 rounded-2xl border border-white/20 sm:col-span-2 lg:col-span-1">
            <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Your data never leaves your infrastructure. Local embeddings ensure privacy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}