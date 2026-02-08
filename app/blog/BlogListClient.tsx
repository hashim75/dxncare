"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, User, ArrowRight, Tag } from "lucide-react";

export default function BlogListClient({ blogs }: { blogs: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Robust Search Logic
  const filteredBlogs = blogs.filter(blog => {
    const query = searchTerm.toLowerCase();
    const title = (blog.title || blog.name || "").toLowerCase();
    const excerpt = (blog.excerpt || blog.short_description || "").toLowerCase();
    
    return title.includes(query) || excerpt.includes(query);
  });

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12 md:pt-32 md:pb-20">
      
      {/* HEADER SECTION */}
      <div className="container mx-auto px-4 md:px-6 mb-10 md:mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-4 md:space-y-6">
          
          {/* Responsive Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-jakarta text-teal-950 tracking-tight"
          >
            The <span className="text-teal-600">Health</span> Journal
          </motion.h1>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-500 px-4">
            Deep dives into Ganoderma, Spirulina, and the science of holistic living.
          </p>

          {/* SEARCH BAR (Responsive Width) */}
          <div className="flex justify-center mt-6 md:mt-8 px-2">
            <div className="relative w-full max-w-md md:max-w-lg">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="w-full pl-12 pr-6 py-3 md:py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm text-base md:text-lg transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>
        </div>
      </div>

      {/* BLOG GRID SYSTEM */}
      <div className="container mx-auto px-4 md:px-6">
        {/* Grid Logic:
            - Default (Mobile): 1 Column (grid-cols-1)
            - Tablet (md): 2 Columns (grid-cols-2)
            - Desktop (lg): 3 Columns (grid-cols-3)
        */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
                {filteredBlogs.map((blog, i) => (
                    <motion.div
                        layout
                        key={blog.slug || blog.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="h-full"
                    >
                        {/* CARD LINK */}
                        <Link 
                            href={`/blog/${blog.slug || blog.id}`} 
                            className="group bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-500 flex flex-col h-full"
                        >
                            {/* IMAGE CONTAINER (Adaptive Height) */}
                            <div className="relative h-52 sm:h-64 overflow-hidden bg-slate-100">
                                <Image 
                                    src={blog.main_image || blog.image || "/images/placeholder.jpg"} 
                                    alt={blog.title || "Blog Post"} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {(blog.category || blog.blog_category) && (
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur text-teal-900 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                                            <Tag size={10} /> {blog.category || blog.blog_category}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* CONTENT CONTAINER (Adaptive Padding) */}
                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                
                                {/* Meta Data */}
                                <div className="flex items-center gap-3 md:gap-4 text-xs font-medium text-slate-400 mb-3 md:mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date ? new Date(blog.date).getFullYear() : "2026"}</span>
                                    <span className="flex items-center gap-1"><User size={12} /> {blog.author || "DXN Team"}</span>
                                </div>
                                
                                {/* Title */}
                                <h2 className="text-xl md:text-2xl font-bold text-teal-950 mb-2 md:mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                                    {blog.title || blog.name}
                                </h2>
                                
                                {/* Excerpt */}
                                <p className="text-sm md:text-base text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                                    {blog.excerpt || blog.short_description}
                                </p>
                                
                                {/* Footer / Read More Button */}
                                <div className="mt-auto pt-4 md:pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-teal-600 transition-colors">Read Article</span>
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </AnimatePresence>
            
            {/* Empty State */}
            {filteredBlogs.length === 0 && (
                <div className="col-span-full text-center py-20 text-slate-400">
                    <p className="text-lg">No articles found matching <span className="font-bold text-teal-600">"{searchTerm}"</span></p>
                    <button 
                        onClick={() => setSearchTerm("")} 
                        className="mt-4 text-sm font-bold text-slate-500 hover:text-teal-600 underline"
                    >
                        Clear Search
                    </button>
                </div>
            )}
        </motion.div>
      </div>
    </main>
  );
}