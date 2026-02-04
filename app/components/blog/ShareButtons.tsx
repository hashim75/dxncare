"use client";

import { Facebook, Twitter, Linkedin, MessageCircle, Share2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
      color: "group-hover:text-green-600",
      bgColor: "hover:bg-green-50 hover:border-green-200",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "group-hover:text-blue-600",
      bgColor: "hover:bg-blue-50 hover:border-blue-200",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "group-hover:text-sky-500",
      bgColor: "hover:bg-sky-50 hover:border-sky-200",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "group-hover:text-blue-700",
      bgColor: "hover:bg-blue-50 hover:border-blue-200",
    },
  ];

  const handleShare = (link: string) => {
    if (!url) return;
    window.open(link, "_blank", "width=600,height=400");
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100">
          <Share2 size={16} />
        </div>
        <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">Share This Article</span>
      </div>
      
      <div className="flex flex-col gap-3">
        {shareLinks.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handleShare(platform.url)}
            className={`group flex items-center gap-3 w-full p-3 rounded-xl bg-slate-50 border border-slate-100 transition-all duration-300 ${platform.bgColor}`}
            title={`Share on ${platform.name}`}
          >
            <platform.icon 
              size={18} 
              className={`text-slate-400 transition-colors ${platform.color}`} 
            />
            <span className={`text-xs font-bold text-slate-500 transition-colors ${platform.color}`}>
              {platform.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}