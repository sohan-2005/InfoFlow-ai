import { Link } from "react-router-dom";
import { Sparkles, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-xl">
              InfoFlow AI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Home
            </Link>
            <Link to="/chat" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Chat
            </Link>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/chat"
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Chat
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}