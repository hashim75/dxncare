"use client";

import { useState, useMemo, useEffect } from 'react';
import { Search, Pill, Activity, ShoppingCart, AlertCircle, Plus, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from "../../store/cartStore"; // Adjust path if necessary

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function MedicineExplorer({ initialMedicines }: { initialMedicines: any[] }) {
  // --- ZUSTAND STORE ---
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const cartTotal = useCartStore((state) => state.total); 
  const cartCount = useCartStore((state) => state.count);

  // --- LOCAL STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLetter, setActiveLetter] = useState("A");
  const [medicines, setMedicines] = useState(initialMedicines);
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Prevent hydration mismatch for cart count/items
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const filteredMedicines = useMemo(() => {
    if (!Array.isArray(medicines)) return [];
    return medicines.filter(m => 
      m.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, medicines]);

  const handleLetterClick = async (letter: string) => {
    setLoading(true);
    setActiveLetter(letter);
    try {
      const response = await fetch(`/api/medicine?letter=${letter.toLowerCase()}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  const isInCart = (id: string) => {
    return hasMounted && cartItems.some((item) => item.id === id);
  };

  const handleAddToCart = (med: any) => {
    // Clean price: removes "Rs.", commas, and spaces to get a raw number
    const cleanPrice = Number(String(med.price).replace(/[^0-9.]/g, '')) || 0;
    
    addItem({
      id: med.id || med.name, // Fallback to name if ID is missing in JSON
      name: med.name,
      price: cleanPrice,
      // SETTING SPECIAL FLAG FOR CART UI
      image: "allopathic-icon", 
      slug: med.id || med.name.toLowerCase().replace(/ /g, '-'),
      // @ts-ignore - Adding custom category flag for the checkout icon logic
      category: "Allopathic" 
    });
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl relative">
      
      {/* 1. HEADER & SEARCH */}
      <div className="text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-teal-100 mb-6 inline-block">
            Verified Price List
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-slate-900 mb-6 leading-tight">
            Find Your <span className="italic text-teal-600 font-serif">Medicine</span>
          </h1>
        </motion.div>

        <div className="max-w-2xl mx-auto relative group mt-10">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder="Search brand name (e.g. Panadol, Z-Tek)..."
            className="w-full bg-white border-2 border-slate-100 rounded-3xl py-5 pl-14 pr-6 text-lg outline-none shadow-xl shadow-slate-200/50 focus:border-teal-500 transition-all placeholder:text-slate-300 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 2. ALPHABET SCROLLER */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 px-4">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-bold transition-all border-2 ${
              activeLetter === letter
                ? "bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-600/30 scale-110"
                : "bg-white border-slate-100 text-slate-400 hover:border-teal-200 hover:text-teal-600"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* 3. PRICE FLUCTUATION BANNER */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 flex items-center gap-3 bg-amber-50 border border-amber-100 p-4 rounded-2xl text-amber-800"
      >
        <AlertCircle size={20} className="shrink-0" />
        <p className="text-xs md:text-sm font-medium leading-relaxed">
          <strong>Notice:</strong> Allopathic medicine prices are subject to Government of Pakistan regulations and may fluctuate in real-time. Final pricing is confirmed at checkout.
        </p>
      </motion.div>

      {/* 4. MEDICINE GRID */}
      <div className="relative min-h-[400px] pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Activity className="animate-spin mb-4 text-teal-500" size={40} />
            <p className="font-bold tracking-widest uppercase text-xs">Querying Database...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMedicines.map((med, idx) => (
                <Link href={`/medicine/${(med.id || med.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <MedicineCard 
                  key={med.name + idx} 
                  med={med} 
                  index={idx} 
                  alreadyAdded={isInCart(med.id || med.name)}
                  onAdd={() => handleAddToCart(med)}
                />
                </Link>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 5. FLOATING CHECKOUT BAR */}
      <AnimatePresence>
        {hasMounted && cartCount() > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 w-auto md:w-full md:max-w-2xl z-50"
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
                  <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">Subtotal</p>
                  <p className="text-base md:text-lg font-bold leading-none">Rs. {cartTotal().toLocaleString()}</p>
                </div>
              </div>

              <Link href="/checkout">
                <button className="bg-white text-slate-900 px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-teal-50 transition-colors shadow-lg active:scale-95 flex items-center gap-2">
                  Checkout Now <ChevronRight size={16} />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MedicineCard({ med, index, alreadyAdded, onAdd }: { med: any, index: number, alreadyAdded: boolean, onAdd: () => void }) {
  const displayPrice = String(med.price || "N/A");
  const formattedPrice = displayPrice.includes('Rs') ? displayPrice : `Rs. ${displayPrice}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, delay: (index % 12) * 0.02 }}
      className={`group bg-white border rounded-[2rem] p-6 transition-all duration-300 relative overflow-hidden h-full flex flex-col ${
        alreadyAdded 
        ? "border-teal-500 ring-1 ring-teal-500 shadow-teal-500/10" 
        : "border-slate-100 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-900/5"
      }`}
    >
      {/* Decorative Icon Background */}
      <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
        <Pill size={120} />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
            <span className="bg-teal-50 text-teal-600 p-2 rounded-xl">
                <Pill size={16} />
            </span>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                {med.category || "Allopathic"}
            </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-teal-700 transition-colors line-clamp-2 min-h-[3.5rem]">
          {med.name}
        </h3>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</p>
            <p className="text-teal-600 font-black text-xl font-jakarta">
              {formattedPrice}
            </p>
          </div>
          
          <button 
            onClick={onAdd}
            className={`flex items-center justify-center gap-2 h-10 md:h-12 px-4 md:px-6 rounded-xl font-bold text-xs md:text-sm active:scale-95 transition-all shadow-lg ${
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
}