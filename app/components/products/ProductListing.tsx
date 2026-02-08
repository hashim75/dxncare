"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, Sparkles, Leaf, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define the shape of your product data
interface Product {
  id: string;
  name?: string;
  title?: string;
  category?: string;
  main_image?: string;
  image?: string;
  short_description?: string;
}

export default function ProductListing({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");

  // FILTER LOGIC
  const filteredProducts = products.filter((product) => {
    const searchTerm = query.toLowerCase();
    const title = (product.name || product.title || "").toLowerCase();
    const category = (product.category || "").toLowerCase();
    return title.includes(searchTerm) || category.includes(searchTerm);
  });

  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-12 md:pt-32 md:pb-24 overflow-x-hidden">
      
      {/* 1. HERO SECTION (With Active Search) */}
      <section className="container mx-auto px-4 mb-16 md:mb-24 relative">
        <div className="bg-teal-950 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 relative overflow-hidden text-center shadow-2xl shadow-teal-900/30 group">
          
          {/* Animated Orbs */}
          <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-teal-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 animate-bounce-slow"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 py-1.5 px-3 md:py-2 md:px-4 rounded-full bg-white/5 border border-white/10 text-teal-200 text-[10px] md:text-xs font-bold tracking-widest uppercase backdrop-blur-md">
              <Sparkles size={12} className="text-yellow-400" /> Official DXN Distributor
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold font-jakarta text-white tracking-tight leading-tight">
              Unlock Your Body's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-400">Natural Potential</span>
            </h1>
            
            <p className="text-teal-100/70 text-base md:text-xl leading-relaxed max-w-2xl mx-auto px-4">
              Discover the power of Ganoderma. Premium organic supplements crafted for longevity, immunity, and holistic wellness.
            </p>
            
            {/* ACTIVE SEARCH BAR */}
            <div className="relative max-w-lg mx-auto group-hover:-translate-y-1 transition-transform duration-500 w-full px-2">
              <div className="absolute inset-0 bg-teal-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-200 pointer-events-none" size={20} />
                  <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search supplements..." 
                    className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-teal-200/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all shadow-xl text-base md:text-lg"
                  />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS (Scrollable on Mobile) */}
      <section className="container mx-auto px-4 mb-12 md:mb-20">
         <div className="flex flex-nowrap md:flex-wrap overflow-x-auto pb-4 md:pb-0 gap-3 md:gap-4 justify-start md:justify-center no-scrollbar px-2">
            {[
                { label: "Immunity", icon: ShieldCheck },
                { label: "Energy", icon: Zap },
                { label: "Detox", icon: Leaf },
                { label: "Wellness", icon: Sparkles },
            ].map((cat, i) => (
                <button 
                  key={i} 
                  onClick={() => setQuery(cat.label)} 
                  className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white rounded-full border border-slate-100 shadow-sm text-slate-600 font-bold hover:shadow-md hover:scale-105 transition-all cursor-pointer whitespace-nowrap text-sm md:text-base shrink-0"
                >
                    <cat.icon size={16} className="text-teal-600" />
                    <span>{cat.label}</span>
                </button>
            ))}
            {query && (
              <button onClick={() => setQuery("")} className="text-red-500 font-bold text-xs md:text-sm underline whitespace-nowrap px-4">
                Clear Filter
              </button>
            )}
         </div>
      </section>

      {/* 3. PRODUCT GRID */}
      <section className="container mx-auto px-4">
        <AnimatePresence mode="popLayout">
        {filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className="text-xl md:text-2xl font-bold text-slate-400 px-4">No products found matching "{query}".</h3>
            <button onClick={() => setQuery("")} className="text-teal-600 font-bold mt-4 hover:underline">View All Products</button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => {
              const title = product.name || product.title || "Untitled Product";
              const imageUrl = product.main_image || product.image || "";
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id} 
                  className="h-full"
                >
                <Link href={`/products/${product.id}`} className="group block relative h-full">
                  <article className="h-full bg-white rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200 border border-transparent hover:border-slate-100 relative z-10 flex flex-col">
                    
                    {/* IMAGE CONTAINER */}
                    <div className="aspect-square relative mb-6 bg-slate-50 rounded-[1.5rem] overflow-hidden group-hover:bg-teal-50/50 transition-colors duration-500 shrink-0">
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-2 py-1 bg-white/80 backdrop-blur text-[10px] font-extrabold uppercase tracking-widest text-teal-900 rounded-full shadow-sm">
                            {product.category || "DXN"}
                        </span>
                      </div>

                      {imageUrl ? (
                        <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3">
                            <Image 
                            src={imageUrl} 
                            alt={title} 
                            fill 
                            className="object-contain p-6 md:p-8 mix-blend-multiply drop-shadow-lg"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20">
                           <Leaf size={48} />
                        </div>
                      )}
                    </div>

                    {/* TEXT CONTENT */}
                    <div className="space-y-3 relative flex-grow flex flex-col">
                      <h2 className="text-xl md:text-2xl font-bold font-jakarta text-slate-900 group-hover:text-teal-800 transition-colors leading-tight line-clamp-2">
                        {title}
                      </h2>
                      
                      {product.short_description && (
                         <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">
                           {product.short_description}
                         </p>
                      )}

                      <div className="pt-4 mt-auto flex items-center justify-between border-t border-slate-50">
                        <span className="text-[10px] md:text-xs font-bold text-teal-600 uppercase tracking-widest border-b border-teal-600/20 pb-0.5 group-hover:border-teal-600 transition-all">
                            View Benefits
                        </span>
                        
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-teal-950 group-hover:text-white group-hover:border-teal-950 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-110">
                            <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
                </motion.div>
              );
            })}
          </div>
        )}
        </AnimatePresence>
      </section>
    </main>
  );
}