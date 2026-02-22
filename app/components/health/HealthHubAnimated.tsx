"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  HeartPulse, Brain, ArrowRight, ShieldCheck, 
  Activity, Microscope, BookOpen, Search, Sparkles, Leaf 
} from 'lucide-react';

// --- Types ---
type Category = {
  slug: string;
  title: string;
  description: string;
  articleCount: number;
};

type Article = {
  slug: string;
  categorySlug: string;
  meta: {
    title?: string;
    name?: string;
    short_description?: string;
    hero_section_paragraph?: string;
    main_image?: string;
    tags?: string[];
    [key: string]: any;
  };
};

// --- Helper: Dynamic Styles based on Folder Name ---
const getCategoryStyle = (slug: string) => {
  if (slug.includes('diabetes') || slug.includes('sugar') || slug.includes('metabolic')) {
    return { icon: <HeartPulse size={32} />, color: 'rose' };
  }
  if (slug.includes('energy') || slug.includes('fatigue') || slug.includes('mental')) {
    return { icon: <Brain size={32} />, color: 'amber' };
  }
  if (slug.includes('gut') || slug.includes('digest') || slug.includes('detox')) {
    return { icon: <Leaf size={32} />, color: 'emerald' };
  }
  return { icon: <Activity size={32} />, color: 'teal' }; // Default
};

// --- Animations ---
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HealthHubAnimated({ 
  categories, 
  trendingArticles 
}: { 
  categories: Category[], 
  trendingArticles: Article[] 
}) {
  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-700 shadow-sm mb-8 cursor-default">
              <ShieldCheck size={14} className="text-teal-500" /> Medically Reviewed Library
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-slate-900 mb-8 leading-[1.1]">
              Evidence-Based <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 italic pr-2">
                Health Intelligence
              </span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12">
              Decode your symptoms and discover functional medicine protocols. 
              We bridge the gap between clinical research and natural healing.
            </p>
            
            {/* Search Bar Placeholder (Functional logic requires client-side filtering) */}
            <div className="max-w-lg mx-auto bg-white p-2 rounded-full border border-slate-200 shadow-xl flex items-center gap-4 hover:border-teal-300 transition-all focus-within:ring-2 focus-within:ring-teal-100">
                <div className="pl-5 text-slate-400"><Search size={22} /></div>
                <input 
                  type="text" 
                  placeholder="Search (e.g. 'Diabetes', 'Fatigue')..." 
                  className="w-full bg-transparent outline-none text-slate-700 h-12 text-base" 
                />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. DYNAMIC CATEGORY GRID */}
      <section className="container mx-auto px-4 max-w-6xl mb-32">
        {categories.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {categories.map((cat) => {
              const { icon, color } = getCategoryStyle(cat.slug);
              
              // Dynamic Class Maps for Colors
              const colorClasses: any = {
                rose: { shadow: 'hover:shadow-rose-100/50 hover:border-rose-100', bg: 'bg-rose-50', text: 'text-rose-500', groupText: 'group-hover:text-rose-600' },
                amber: { shadow: 'hover:shadow-amber-100/50 hover:border-amber-100', bg: 'bg-amber-50', text: 'text-amber-500', groupText: 'group-hover:text-amber-600' },
                emerald: { shadow: 'hover:shadow-emerald-100/50 hover:border-emerald-100', bg: 'bg-emerald-50', text: 'text-emerald-500', groupText: 'group-hover:text-emerald-600' },
                teal: { shadow: 'hover:shadow-teal-100/50 hover:border-teal-100', bg: 'bg-teal-50', text: 'text-teal-500', groupText: 'group-hover:text-teal-600' },
              };
              
              const style = colorClasses[color];

              return (
                <Link key={cat.slug} href={`/health/${cat.slug}`} className="group relative block h-full">
                  <motion.div 
                      variants={item}
                      className={`bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 h-full relative overflow-hidden ${style.shadow}`}
                  >
                      <div className={`absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl -mr-20 -mt-20 transition-colors duration-500 opacity-60 ${style.bg}`} />
                      
                      <div className="relative z-10 flex flex-col h-full">
                          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm ${style.bg} ${style.text}`}>
                              {icon}
                          </div>
                          
                          <h2 className={`text-3xl font-serif font-bold text-slate-900 mb-4 transition-colors ${style.groupText}`}>
                              {cat.title}
                          </h2>
                          <p className="text-slate-500 text-lg leading-relaxed mb-10 flex-1">
                              {cat.description}
                          </p>
                          
                          <div className={`flex items-center gap-3 text-sm font-bold uppercase tracking-wider group-hover:gap-5 transition-all ${style.text}`}>
                              View {cat.articleCount} Protocols <ArrowRight size={16} />
                          </div>
                      </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <p>No health categories found. Check your content folder.</p>
          </div>
        )}
      </section>

      {/* 3. TRENDING RESEARCH (REAL DATA) */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <span className="text-teal-600 font-bold tracking-widest text-xs uppercase mb-2 block">Latest Findings</span>
                    <h2 className="text-4xl font-serif font-medium text-slate-900">Trending Research</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trendingArticles.length > 0 ? (
                  trendingArticles.map((article, idx) => {
                    const title = article.meta.name || article.meta.title || "Untitled Protocol";
                    const desc = article.meta.short_description || "Read full research protocol...";
                    const image = article.meta.main_image;
                    const tag = article.meta.tags ? article.meta.tags[0] : "Protocol";

                    return (
                      <Link key={idx} href={`/health/${article.categorySlug}/${article.slug}`} className="group block h-full">
                          <div className="relative h-72 w-full rounded-3xl overflow-hidden mb-6 bg-slate-100 shadow-md">
                              {image ? (
                                <Image 
                                  src={image} 
                                  alt={title} 
                                  fill 
                                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                />
                              ) : (
                                <div className="absolute inset-0 bg-slate-200 animate-pulse group-hover:animate-none flex items-center justify-center text-slate-400">
                                  <Activity size={40} />
                                </div>
                              )}
                              
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                              <div className="absolute bottom-6 left-6 right-6">
                                  <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide mb-3 inline-block">
                                    {tag}
                                  </span>
                                  <h3 className="text-xl font-bold text-white leading-snug group-hover:underline decoration-2 underline-offset-4 line-clamp-2">
                                    {title}
                                  </h3>
                              </div>
                          </div>
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-slate-400 italic col-span-3 text-center py-10">
                    No research articles published yet.
                  </p>
                )}
            </div>
        </div>
      </section>

      {/* 4. WHY FUNCTIONAL MEDICINE */}
      <section className="container mx-auto px-4 max-w-6xl py-24">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center text-white">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
                <Sparkles className="text-teal-400 w-12 h-12 mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-serif mb-6">Why Treat the Root Cause?</h2>
                <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10">
                    Conventional medicine often manages symptoms. Functional medicine rebuilds the system. 
                    Our protocols use potent nutraceuticals like Ganoderma and Spirulina to restore 
                    cellular intelligence.
                </p>
                <Link href="/about" className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg shadow-teal-500/30">
                    Learn Our Philosophy
                </Link>
            </div>
        </div>
      </section>

      {/* 5. FOOTER SIGNALS */}
      <section className="container mx-auto px-4 max-w-6xl mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200 pt-12">
            <TrustItem icon={<ShieldCheck />} title="Medically Reviewed" desc="By Dr. Rabia Iqbal" />
            <TrustItem icon={<Microscope />} title="Evidence Based" desc="Cited Clinical Studies" />
            <TrustItem icon={<BookOpen />} title="Deep Research" desc="100+ Hours per Report" />
            <TrustItem icon={<Leaf />} title="Natural Focus" desc="Root Cause Resolution" />
        </div>
      </section>

    </div>
  );
}

function TrustItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="text-slate-400 mb-3 hover:text-teal-600 transition-colors bg-slate-50 p-3 rounded-xl">
                {icon}
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
            <p className="text-xs text-slate-500 mt-1">{desc}</p>
        </div>
    );
}