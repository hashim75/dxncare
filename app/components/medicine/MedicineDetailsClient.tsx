"use client";

import { ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useState, useEffect } from 'react';

export default function MedicineDetailsClient({ medicine }: { medicine: any }) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  const alreadyAdded = hasMounted && items.some(i => i.id === (medicine.id || medicine.name));

  const handleAdd = () => {
    const cleanPrice = Number(String(medicine.price).replace(/[^0-9.]/g, '')) || 0;
    addItem({
      id: medicine.id || medicine.name,
      name: medicine.name,
      price: cleanPrice,
      image: "allopathic-icon",
      slug: (medicine.id || medicine.name).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      // @ts-ignore
      category: "Allopathic"
    });
  };

  return (
    <button 
      onClick={handleAdd}
      className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${
        alreadyAdded 
        ? "bg-teal-50 text-teal-700 border-2 border-teal-600" 
        : "bg-slate-900 text-white hover:bg-teal-600"
      }`}
    >
      {alreadyAdded ? (
        <><Check size={20} /> Already in Cart</>
      ) : (
        <><ShoppingCart size={20} /> Add to Cart</>
      )}
    </button>
  );
}