"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, XCircle } from "lucide-react";
import { HEALTH_CATEGORIES } from "../lib/health-navigation"; 

export default function HealthDirectoryClient() {
  const [query, setQuery] = useState("");

  // Search Logic: Filter categories AND their items based on the search text
  const filteredCategories = HEALTH_CATEGORIES.map((section) => {
    // 1. Check if the Section Title matches
    const sectionMatches = section.title.toLowerCase().includes(query.toLowerCase());
    
    // 2. Check if any individual Items match
    const matchingItems = section.items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    // If Section matches, keep all items. If not, only keep matching items.
    const itemsToShow = sectionMatches ? section.items : matchingItems;

    // Return the section only if it has matching items (or title match)
    return {
      ...section,
      items: itemsToShow,
      isVisible: itemsToShow.length > 0
    };
  }).filter(section => section.isVisible);

  return (
    <>
      {/* ================= HERO SEARCH ================= */}
      <section className="relative bg-slate-900 text-white pt-32 pb-24 overflow-hidden rounded-b-[3rem] mb-12">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
             Your Health Intelligence Hub
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Bridge the gap between modern medical science and natural functional therapy.
          </p>

          {/* WORKING SEARCH BAR */}
          <div className="relative max-w-xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative flex items-center bg-white rounded-xl overflow-hidden p-2 shadow-xl">
              <Search className="text-slate-400 ml-3 shrink-0" size={24} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search conditions (e.g., Diabetes, Gut)..." 
                className="w-full px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none text-lg"
              />
              {query && (
                <button onClick={() => setQuery("")} className="mr-2 text-slate-400 hover:text-rose-500">
                    <XCircle size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTERED RESULTS ================= */}
      <section className="container mx-auto px-6 pb-20">
        {filteredCategories.length === 0 ? (
           // Empty State
           <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
               <p className="text-slate-400 text-lg">No topics found for "{query}".</p>
               <button onClick={() => setQuery("")} className="mt-4 text-teal-600 font-bold hover:underline">Clear Search</button>
           </div>
        ) : (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {filteredCategories.map((section, idx) => (
                <div key={idx} className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${section.bg} ${section.color}`}>
                    <section.icon size={24} />
                    </div>
                    <div>
                    <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                    <p className="text-sm text-slate-500">{section.description}</p>
                    </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-2 h-fit">
                    {section.items.map((item, itemIdx) => (
                    <Link 
                        key={itemIdx}
                        href={`/health/${item.slug}`} // Assuming this structure
                        className="group flex items-center justify-between p-4 hover:bg-white hover:shadow-sm rounded-2xl transition-all duration-200"
                    >
                        <div className="flex items-center gap-3">
                        {item.featured && (
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                        )}
                        <span className={`font-medium ${item.featured ? 'text-slate-900 font-bold' : 'text-slate-600'} group-hover:text-teal-700`}>
                            {item.name}
                        </span>
                        </div>
                        <ArrowRight size={16} className="text-slate-300 group-hover:text-teal-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </Link>
                    ))}
                </div>
                </div>
            ))}
           </div>
        )}
      </section>
    </>
  );
}