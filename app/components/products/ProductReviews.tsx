"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Star, User, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import Image from "next/image";

// --- CONFIGURATION ---
const EMAILJS_SERVICE_ID = "service_bhpyljt"; // Use your actual ID
const EMAILJS_TEMPLATE_ID = "template_vkr09eu"; // Use your actual ID
const EMAILJS_PUBLIC_KEY = "ykMzk7yOAMHR1Ip8o"; // Use your actual Key

interface Review {
  id?: string;
  user?: string; // Handle both 'user' and 'author' keys
  author?: string;
  rating: number;
  text?: string; // Handle both 'text' and 'content' keys
  content?: string;
  date?: string;
  verified?: boolean;
  title?: string;
  photos?: string[];
  reply?: { author: string; content: string };
}

// Update props to accept 'any' so it handles Arrays or Strings
export default function ProductReviews({ productName, reviewsData }: { productName: string, reviewsData: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({ name: "", comment: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // 1. ROBUST PARSING LOGIC
  let reviews: Review[] = [];
  try {
    if (Array.isArray(reviewsData)) {
      // It's already an array (YAML List) - Best Case
      reviews = reviewsData;
    } else if (typeof reviewsData === 'string') {
      // It's a JSON string - Try to clean and parse
      // Remove newlines which break JSON.parse
      const cleanJson = reviewsData.replace(/\n/g, " "); 
      reviews = JSON.parse(cleanJson);
    }
  } catch (e) {
    console.error("Error parsing reviews:", e);
    reviews = [];
  }

  // 2. Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        product_name: productName,
        user_name: formData.name,
        rating: rating,
        message: formData.comment,
        to_email: "info@dxncare.com"
      }, EMAILJS_PUBLIC_KEY);

      setStatus("success");
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
        setFormData({ name: "", comment: "" });
      }, 3000);

    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="mt-24 border-t border-slate-100 pt-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h3 className="text-3xl font-bold font-jakarta text-slate-900 mb-2 flex items-center gap-3">
            Customer Reviews 
            <span className="bg-slate-100 text-slate-600 text-sm py-1 px-3 rounded-full">{reviews.length}</span>
          </h3>
          <p className="text-slate-500">Real feedback from verified buyers.</p>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="px-8 py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition shadow-lg shadow-teal-600/20 flex items-center gap-2"
        >
          <MessageSquare size={18} /> Write a Review
        </button>
      </div>

      {/* Review Form */}
      {isOpen && (
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 mb-16 animate-in slide-in-from-top-4">
            {status === "success" ? (
                <div className="text-center py-8 text-green-600 font-bold">Review Submitted!</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* Simplified for brevity - keep your existing form fields here */}
                    <div className="flex gap-2 mb-4">
                        {[1,2,3,4,5].map(star => (
                            <Star key={star} size={32} onClick={() => setRating(star)}
                                  className={`cursor-pointer ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                        ))}
                    </div>
                    <input required className="w-full p-4 mb-4 rounded-xl border border-slate-200" placeholder="Your Name" 
                           value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <textarea required className="w-full p-4 mb-4 rounded-xl border border-slate-200 h-32" placeholder="Your Review"
                           value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} />
                    <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl">{status === "sending" ? "Sending..." : "Submit"}</button>
                </form>
            )}
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.length > 0 ? reviews.map((r: Review, i: number) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-xl">
                            {(r.author || r.user || "U").charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">{r.author || r.user}</div>
                            {r.verified && <span className="text-xs text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={10}/> Verified Buyer</span>}
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, starI) => (
                            <Star key={starI} size={16} className={starI < r.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                        ))}
                    </div>
                </div>
                
                {r.title && <h4 className="font-bold text-slate-900 mb-2">{r.title}</h4>}
                <p className="text-slate-600 leading-relaxed mb-4">{r.content || r.text}</p>
                
                {r.reply && (
                    <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-slate-900 text-sm">
                        <span className="font-bold text-slate-900 block mb-1">Response from {r.reply.author}:</span>
                        <span className="text-slate-600">{r.reply.content}</span>
                    </div>
                )}
            </div>
        )) : (
            <div className="text-center py-12 text-slate-400 italic">No reviews found.</div>
        )}
      </div>
    </div>
  );
}