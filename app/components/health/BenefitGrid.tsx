"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Benefit {
  title: string;
  detail: string;
}

export default function BenefitGrid({ benefits }: { benefits: Benefit[] }) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {benefits.map((benefit, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-teal-500/30 transition-colors duration-300 group cursor-default"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-teal-700 font-serif font-bold text-lg group-hover:bg-teal-600 group-hover:text-white transition-colors">
                {index + 1}
            </div>
            <ArrowUpRight className="text-slate-300 group-hover:text-teal-500 transition-colors" size={20} />
          </div>
          
          <h4 className="font-bold text-slate-900 text-xl mb-3 font-serif">
            {benefit.title}
          </h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            {benefit.detail}
          </p>
        </motion.div>
      ))}
    </div>
  );
}