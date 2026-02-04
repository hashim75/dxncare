import Link from "next/link";
import Image from "next/image";
import { getSortedData } from "../lib/markdown";
import { ArrowRight, BookOpen, Clock, Zap } from "lucide-react";

export default function HealthIntelligencesPage() {
  const articles = getSortedData("health-intelligences") as any[];

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      
      {/* Header */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-4">
            Research & Insights
        </span>
        <h1 className="text-4xl md:text-5xl font-bold font-jakarta text-slate-900 mb-6">
            Health <span className="text-blue-600">Intelligences</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Evidence-based reports and deep dives into the science of holistic wellness.
        </p>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, i) => (
                <Link 
                    key={article.id} 
                    href={`/health-intelligences/${article.slug || article.id}`}
                    className="group bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 flex flex-col md:flex-row gap-6 items-start"
                >
                    {/* Image */}
                    <div className="w-full md:w-1/3 aspect-[4/3] relative rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                        <Image 
                            src={article.main_image || article.image || "/images/placeholder.jpg"} 
                            alt={article.title || "Article"} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-700">
                            Report
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-2">
                        <div className="flex items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">
                            <span className="flex items-center gap-1"><Clock size={12} /> {article.date || "2026"}</span>
                            {article.category && <span className="text-blue-500">• {article.category}</span>}
                        </div>
                        
                        <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                            {article.title || article.name}
                        </h2>
                        
                        <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                            {article.short_description || article.excerpt || "Read the full intelligence report on this topic..."}
                        </p>

                        <div className="flex items-center text-blue-600 text-sm font-bold gap-2 group-hover:gap-3 transition-all">
                            Read Intelligence <ArrowRight size={16} />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </main>
  );
}