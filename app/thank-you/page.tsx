"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight, Package } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-24 pb-12">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-8 md:p-12 rounded-[2.5rem] text-center max-w-xl w-full shadow-2xl border border-slate-100 relative overflow-hidden"
      >
        {/* Background decorative element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-teal-50 -z-10 rounded-b-[100px] opacity-50"></div>

        {/* Success Icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="w-20 h-20 md:w-24 md:h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
        >
          <CheckCircle2 size={48} className="text-teal-600" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold font-jakarta text-teal-950 mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
          Thank you for choosing <strong>DXN Care</strong>! Your advance payment has been received and your order is successfully placed.
        </p>

        {/* What happens next box */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-3">
                <ShoppingBag className="text-teal-600" size={20} />
                <h3 className="font-bold font-jakarta text-teal-950 text-lg">What happens next?</h3>
            </div>
            <ul className="text-sm text-slate-600 space-y-4">
                <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                    <span>Your advance payment receipt will be verified by our team.</span>
                </li>
                <li className="flex items-start gap-3">
                    <Package className="text-teal-500 shrink-0 mt-0.5" size={16} />
                    <span>Your package will be dispatched within 24 hours.</span>
                </li>
                <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                    <span>You will receive tracking details via WhatsApp shortly.</span>
                </li>
            </ul>
        </div>

        {/* Action Button */}
        <Link 
          href="/products" 
          className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-all active:scale-95 w-full sm:w-auto font-jakarta uppercase tracking-widest text-sm shadow-lg shadow-red-500/30"
        >
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </motion.div>
    </main>
  );
}