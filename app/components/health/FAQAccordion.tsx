"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ faqs }: { faqs: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-slate-200 rounded-2xl bg-white overflow-hidden">
          <button 
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
          >
            {faq.question}
            <ChevronDown size={20} className={`text-slate-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
          </button>
          <div 
            className={`px-5 text-slate-600 text-sm leading-relaxed transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}