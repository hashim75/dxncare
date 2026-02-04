"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Stethoscope, Sparkles, ShoppingBag, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ---
interface SearchResult {
  id: string;
  name?: string;
  title?: string;
  type: "product" | "blog" | "doctor" | "intelligence";
  main_image?: string;
  profile_image?: string;
  short_description?: string;
  specialization?: string;
  slug: string;
}

interface Message {
  role: "user" | "bot";
  content?: string;
  results?: SearchResult[];
}

export default function HealthBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I'm your DXN Health Assistant. Ask me about products, health concerns, or find a doctor!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userQuery = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/bot-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery }),
      });
      const data = await res.json();

      setIsTyping(false);

      if (data.results.length > 0) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "Here is what I found for you:", results: data.results }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "I couldn't find an exact match. Try searching for specific symptoms (e.g., 'acne', 'energy') or product names." }
        ]);
      }
    } catch (e) {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "bot", content: "Sorry, I'm having trouble connecting right now." }]);
    }
  };

  return (
    <>
      {/* --- TOGGLE BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-teal-600 text-white p-4 rounded-full shadow-2xl hover:bg-teal-700 transition-all hover:scale-110 active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* --- CHAT WINDOW --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-teal-900 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-teal-300">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold font-jakarta">DXN Assistant</h3>
                <p className="text-teal-200/70 text-xs">Always here to help</p>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-teal-600 text-white rounded-tr-none"
                        : "bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {msg.content && <p className="mb-2">{msg.content}</p>}

                    {/* RENDER RESULTS CARDS */}
                    {msg.results && (
                      <div className="space-y-2 mt-2">
                        {msg.results.map((item) => (
                          <Link
                            key={item.id}
                            href={`/${item.type === "product" ? "products" : item.type === "doctor" ? "doctors" : "blog"}/${item.slug}`}
                            className="flex items-start gap-3 p-2 bg-slate-50 hover:bg-teal-50 rounded-xl border border-slate-200 transition-colors group"
                          >
                            {/* Icon/Image */}
                            <div className="w-12 h-12 rounded-lg bg-white overflow-hidden relative shrink-0 border border-slate-100">
                              {(item.main_image || item.profile_image) ? (
                                <Image
                                  src={item.main_image || item.profile_image || "/placeholder.jpg"}
                                  alt={item.name || item.title || ""}
                                  fill
                                  className="object-contain"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                  {item.type === "doctor" ? <Stethoscope size={20} /> : <BookOpen size={20} />}
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                                  item.type === "product" ? "bg-red-100 text-red-700" :
                                  item.type === "doctor" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                                }`}>
                                  {item.type}
                                </span>
                              </div>
                              <h4 className="font-bold text-slate-900 text-xs truncate group-hover:text-teal-700">
                                {item.name || item.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 line-clamp-1">
                                {item.short_description || item.specialization || "Click to view details"}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about acne, energy..."
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-xl transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}