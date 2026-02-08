import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, HEALTH_CATEGORIES } from "../../lib/health-navigation"; 
import { getSortedData } from "../../lib/markdown"; 
import { ArrowRight, BookOpen } from "lucide-react";

// 1. Generate Static Paths
export async function generateStaticParams() {
  const allCategories: { category: string }[] = []; 
  
  HEALTH_CATEGORIES.forEach(section => {
    section.items.forEach(item => {
      allCategories.push({ category: item.slug });
    });
  });
  
  return allCategories;
}

export default async function CategoryHubPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;

  // A. Get Category Info
  const categoryInfo = getCategoryBySlug(categorySlug);
  if (!categoryInfo) return notFound();

  // B. ✅ FIX: Fetch from the specific category folder (e.g., "health/diabetes")
  // We use try/catch because if the folder doesn't exist yet, it might throw an error
  let categoryBlogs: any[] = [];
  try {
    // This looks in content/health/diabetes instead of content/blogs
    categoryBlogs = getSortedData(`health/${categorySlug}`);
  } catch (error) {
    // If folder doesn't exist, just show empty list (no crash)
    console.log(`No articles found for ${categorySlug} yet.`);
    categoryBlogs = [];
  }

  return (
    <main className="bg-slate-50 min-h-screen font-sans text-slate-900">
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-slate-900 text-white pt-32 pb-20 rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
           <span className="text-teal-400 font-bold tracking-widest uppercase text-sm mb-4 block">
             Health Intelligence Hub
           </span>
           <h1 className="text-4xl md:text-6xl font-bold mb-6 capitalize">
             {categoryInfo.name}
           </h1>
           <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
             Expert-reviewed guides, latest research, and natural protocols for managing {categoryInfo.name.toLowerCase()}.
           </p>
        </div>
      </section>

      {/* ================= ARTICLE GRID ================= */}
      <section className="container mx-auto px-6 py-20">
        
        {categoryBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryBlogs.map((blog: any) => (
              <Link 
                key={blog.id} 
                // ✅ FIX: Link points to the correct health URL
                href={`/health/${categorySlug}/${blog.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                   {blog.image || blog.main_image ? (
                     <Image 
                       src={blog.image || blog.main_image} 
                       alt={blog.title || blog.name} 
                       fill 
                       className="object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-300">
                       <BookOpen size={48} />
                     </div>
                   )}
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-600">
                      {blog.date ? new Date(blog.date).toLocaleDateString() : "Just Updated"}
                   </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                   <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors line-clamp-2">
                     {blog.title || blog.name}
                   </h3>
                   <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1">
                     {blog.short_description || blog.excerpt || "Read the full guide on natural management and medical insights."}
                   </p>
                   
                   <div className="flex items-center text-teal-600 font-bold text-sm mt-auto">
                     Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
               <BookOpen size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Coming Soon</h3>
             <p className="text-slate-500 max-w-md mx-auto">
               Our medical team is currently reviewing articles for this category. Check back shortly.
             </p>
             <Link href="/health" className="inline-block mt-6 text-teal-600 font-bold hover:underline">
               Browse other categories
             </Link>
          </div>
        )}
      </section>
    </main>
  );
}