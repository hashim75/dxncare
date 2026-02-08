"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Search, Plus, Zap, Star, Check } from "lucide-react";
import { useCartStore } from "../store/cartStore"; // Adjust path to your store file

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string | number;
  main_image?: string;
  short_description?: string;
  [key: string]: any;
}

export default function OrderInterface({ products }: { products: Product[] }) {
  // --- ZUSTAND HOOKS ---
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const cartTotal = useCartStore((state) => state.total); // Ensure this is a function or value based on your store implementation
  const cartCount = useCartStore((state) => state.count); // Ensure this is a function or value based on your store implementation

  // --- LOCAL STATE ---
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // --- EFFECTS ---
  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- HANDLERS ---
  const handleAddToCart = (product: Product) => {
    // Ensure price is a clean number
    const price = Number(String(product.price).replace(/[^0-9]/g, '')) || 0;
    
    addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: product.main_image || "/placeholder.jpg",
      slug: product.slug,
    });
  };

  const isInCart = (id: string) => {
    return hasMounted && cartItems.some((item) => item.id === id);
  };

  // --- FILTER ---
  const filteredProducts = products.filter((p) => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-slate-50 pb-32">
      
      {/* --- STICKY SEARCH --- */}
      <div className={`sticky top-16 md:top-20 z-40 transition-all duration-300 px-4 ${isScrolled ? 'py-2' : 'py-4 md:py-6'}`}>
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl shadow-slate-200/20 p-2 md:p-3 flex justify-center max-w-2xl mx-auto">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium text-sm md:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 md:mt-8">
            <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
                const cleanPrice = Number(String(product.price).replace(/[^0-9]/g, '')) || 0;
                const alreadyAdded = isInCart(product.id);
                
                return (
                <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`group bg-white rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col h-full ${
                    alreadyAdded ? "border-teal-500 ring-1 ring-teal-500 shadow-teal-500/10" : "border-slate-100 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-900/5"
                    }`}
                >
                    {/* Image */}
                    <div className="relative aspect-[4/3] p-6 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                    {index % 3 === 0 && (
                        <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Zap className="w-3 h-3 fill-white" /> POPULAR
                        </span>
                    )}
                    <Link href={`/products/${product.slug}`} className="relative w-full h-full block">
                        <Image
                        src={product.main_image || "/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </Link>
                    </div>

                    {/* Details */}
                    <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2 gap-2">
                        <Link href={`/products/${product.slug}`} className="flex-1">
                        <h3 className="font-bold text-base md:text-lg text-slate-900 leading-tight group-hover:text-teal-700 transition-colors line-clamp-2">
                            {product.name}
                        </h3>
                        </Link>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100 shrink-0">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-yellow-700">4.8</span>
                        </div>
                    </div>
                    
                    {product.short_description && (
                        <p className="text-slate-500 text-xs md:text-sm line-clamp-2 mb-4">
                            {product.short_description}
                        </p>
                    )}
                    
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                        <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Price</p>
                        <p className="text-lg md:text-xl font-extrabold text-slate-900">
                            Rs. {cleanPrice.toLocaleString()}
                        </p>
                        </div>
                        
                        <button
                        onClick={() => handleAddToCart(product)}
                        className={`h-10 md:h-12 px-4 md:px-6 rounded-xl font-bold text-xs md:text-sm active:scale-95 transition-all shadow-lg flex items-center gap-2 ${
                            alreadyAdded 
                            ? "bg-teal-50 text-teal-700 border-2 border-teal-500 shadow-none" 
                            : "bg-slate-900 text-white hover:bg-teal-600 shadow-slate-900/10"
                        }`}
                        >
                        {alreadyAdded ? (
                            <>
                            <Check className="w-4 h-4" /> Added
                            </>
                        ) : (
                            <>
                            <Plus className="w-4 h-4" /> Add
                            </>
                        )}
                        </button>
                    </div>
                    </div>
                </motion.div>
                );
            })}
            </AnimatePresence>
        </div>
      </div>

      {/* --- FLOATING CHECKOUT BAR --- */}
      <AnimatePresence>
        {hasMounted && cartCount() > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 md:bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 w-auto md:w-full md:max-w-2xl z-50"
          >
            <div className="bg-slate-900 text-white p-3 pr-4 rounded-2xl shadow-2xl shadow-teal-900/50 flex items-center justify-between border border-slate-700/50 backdrop-blur-md">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-teal-500 h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center relative shrink-0">
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-slate-900">
                    {cartCount()}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">Total</p>
                  <p className="text-base md:text-lg font-bold leading-none">Rs. {cartTotal().toLocaleString()}</p>
                </div>
              </div>

              <Link href="/checkout">
                <button className="bg-white text-slate-900 px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-teal-50 transition-colors shadow-lg active:scale-95 flex items-center gap-2">
                  Checkout <span className="text-lg hidden md:inline">→</span>
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}