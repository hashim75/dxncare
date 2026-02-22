import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, FileText, ArrowRight } from 'lucide-react';
import { getArticlesByCategory } from '../../lib/health-api';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const articles = getArticlesByCategory(params.category);

  // Beautify Category Name (e.g., "diabetes-sugar" -> "Diabetes & Sugar")
  const categoryTitle = params.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  if (articles.length === 0) return notFound();

  return (
    <main className="bg-[#F8FAFC] min-h-screen pt-24 pb-20 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Back Link */}
        <Link href="/health" className="inline-flex items-center gap-2 text-slate-400 hover:text-teal-600 mb-10 font-bold text-sm transition-colors">
          <ArrowLeft size={16} /> Back to Categories
        </Link>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-4">
            {categoryTitle}
          </h1>
          <p className="text-slate-500 text-lg">
            {articles.length} Research Reports Available
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              key={article.slug} 
              href={`/health/${params.category}/${article.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                <Image 
                  src={article.meta.main_image || "/images/placeholder.jpg"} 
                  alt={article.meta.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 leading-tight group-hover:text-teal-700 transition-colors">
                  {article.meta.name}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-3 mb-6 leading-relaxed">
                  {article.meta.short_description}
                </p>
                <div className="mt-auto flex items-center text-xs font-bold text-teal-600 uppercase tracking-wider group-hover:underline">
                  Read Report <ArrowRight size={12} className="ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}