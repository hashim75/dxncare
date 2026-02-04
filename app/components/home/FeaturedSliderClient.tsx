"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Leaf, Sparkles } from "lucide-react";

interface Product {
  id: string;
  name?: string;
  title?: string;
  category?: string;
  main_image?: string;
  image?: string;
}

export default function FeaturedSliderClient({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen on mount to adjust layout logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsToShow = isMobile ? 1 : 3;
  const totalItems = products.length;
  const maxIndex = totalItems - itemsToShow;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        
        {/* === HEADER === */}
        <div className="flex items-end justify-between mb-12">
            <div className="max-w-xl">
                <div className="flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-xs mb-4">
                    <Sparkles size={14} /> 
                    <span>Best Sellers</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-jakarta text-teal-950">
                    Nature's <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-400">Masterpieces</span>
                </h2>
            </div>
            
            {/* === ARROWS === */}
            <div className="hidden md:flex gap-3">
                <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-teal-950 hover:text-white transition-all active:scale-95">
                    <ArrowLeft size={20} />
                </button>
                <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-teal-950 hover:text-white transition-all active:scale-95">
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>

        {/* === SLIDER TRACK === */}
        <div className="overflow-hidden">
            <motion.div 
                className="flex"
                // Logic: Move by percentage of ONE item width.
                // Desktop: 33.33% per slide. Mobile: 100% per slide.
                animate={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {products.map((product) => (
                    <div 
                        key={product.id} 
                        // IMPORTANT: Flex-shrink-0 prevents squishing. 
                        // Desktop: 33.333% width. Mobile: 100% width.
                        // px-3 creates the "gap" inside the item box.
                        className="flex-shrink-0 w-full md:w-1/3 px-3 box-border"
                    >
                        <Link href={`/products/${product.id}`} className="block h-full group">
                            <div className="bg-slate-50 rounded-[2rem] p-6 h-[420px] flex flex-col relative overflow-hidden border border-slate-100 transition-all hover:shadow-xl hover:border-teal-100 group-hover:-translate-y-2">
                                
                                {/* Decor Blob */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-300/30 transition-colors"></div>
                                
                                {/* Category Badge */}
                                <span className="relative z-10 px-3 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-teal-800 w-max mb-4">
                                    {product.category || "Organic"}
                                </span>

                                {/* Product Image */}
                                <div className="relative flex-1 w-full flex items-center justify-center my-4">
                                    {product.main_image || product.image ? (
                                        <div className="relative w-40 h-40 md:w-48 md:h-48 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6">
                                            <Image 
                                              src={product.main_image || product.image || ""} 
                                              alt={product.title || "Product"} 
                                              fill 
                                              className="object-contain drop-shadow-xl" 
                                            />
                                        </div>
                                    ) : (
                                        <Leaf className="text-teal-100 w-32 h-32" />
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="relative z-10 mt-auto">
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-1 mb-1">
                                        {product.name || product.title}
                                    </h3>
                                    <div className="flex items-center justify-between mt-4 border-t border-slate-200/50 pt-4">
                                        <span className="text-slate-500 font-medium text-xs">View Details</span>
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-teal-950 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </motion.div>
        </div>

        {/* === MOBILE DOTS === */}
        <div className="flex md:hidden justify-center gap-2 mt-8">
             {Array.from({ length: totalItems }).slice(0, 5).map((_, i) => (
                <button 
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-8 bg-teal-600" : "w-2 bg-slate-300"}`}
                />
             ))}
        </div>

      </div>
    </section>
  );
}