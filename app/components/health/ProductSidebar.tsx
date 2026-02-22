"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { getProductsBySlugs } from '../../lib/products';

export default function ProductSidebar({ productIds }: { productIds: string }) {
  const products = getProductsBySlugs(productIds);

  if (products.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-serif text-xl text-slate-900 font-medium">Recommended Protocol</h3>
        <p className="text-xs text-slate-500 mt-1">Authentic DXN Products</p>
      </div>

      <div className="divide-y divide-slate-100">
        {products.map((product, idx) => (
          <Link 
            key={idx} 
            href={product.link}
            className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors group relative"
          >
            <div className="w-14 h-14 bg-white border border-slate-200 rounded-xl p-1 shrink-0">
               <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-teal-700 transition-colors">
                {product.name}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">{product.price}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                <ChevronRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      <div className="p-4 bg-slate-50">
        <Link 
            href="/order" 
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-600/20 transition-all duration-300"
        >
            <ShoppingBag size={16} /> Order Full Protocol
        </Link>
      </div>
    </div>
  );
}