import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostData, getSortedData } from "../../../lib/markdown"; 
import { 
  ArrowLeft, Calendar, Clock, 
  CheckCircle, ShieldCheck, User, ChevronRight, 
  ArrowRight
} from "lucide-react";

// --- Type Definitions ---
interface Doctor {
  id: string;
  name: string;
  slug: string;
  specialization: string;
  profile_image?: string;
}

interface Product {
  id: string;
  name: string;
  slug?: string;
  main_image: string;
}

// --- Helper: Product Extractor ---
const getSmartProducts = (post: any, allProducts: any[]) => {
    const rawInput = post.blogs_products || post.products;
    if (rawInput) {
        let targetSlugs: string[] = [];
        if (Array.isArray(rawInput)) targetSlugs = rawInput;
        else if (typeof rawInput === 'string') targetSlugs = rawInput.split(/[;,]+/).map((s) => s.trim());

        return targetSlugs.map((slug) => {
            const s = slug.toLowerCase().trim();
            return allProducts.find(p => (p.id || "").toLowerCase() === s || (p.slug || "").toLowerCase() === s);
        }).filter(Boolean);
    }
    return [];
};

export default async function HealthArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;

  let post: any;
  try {
    // ✅ CORRECT ORDER: Directory First ("health/diabetes"), then ID ("early-signs")
    post = await getPostData(`health/${category}`, slug);
  } catch (error) {
    console.error("❌ Error fetching post:", error);
    return notFound();
  }

  // Fetch Auxiliary Data
  const allProducts = getSortedData("products");
  const suggestedProducts = getSmartProducts(post, allProducts) as Product[];
  const allDoctors = getSortedData("doctors");
  const doctor = allDoctors.find((d: any) => d.id === post.author || d.slug === post.author) as Doctor | undefined;

  return (
    <main className="bg-white min-h-screen font-sans text-slate-900">
      
      {/* ================= HEADER ================= */}
      <header className="bg-slate-50 border-b border-slate-100 pt-32 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
           
           {/* Breadcrumbs */}
           <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
              <Link href="/" className="hover:text-teal-600">Home</Link>
              <ChevronRight size={12} />
              <Link href="/health" className="hover:text-teal-600">Health</Link>
              <ChevronRight size={12} />
              <Link href={`/health/${category}`} className="text-teal-600 hover:underline">
                {category.replace("-", " ")}
              </Link>
           </nav>

           {/* Title & Meta */}
           <div className="max-w-4xl">
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                {doctor ? (
                  <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100">
                       <Image src={doctor.profile_image || "/images/doctor.jpg"} fill className="object-cover" alt="Doctor" />
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 font-medium uppercase">Medically Reviewed By</span>
                      <span className="block font-bold text-slate-900">{doctor.name}</span>
                    </div>
                  </div>
                ) : (
                   <span className="flex items-center gap-2">
                     <User size={16} /> Written by DXN Care Team
                   </span>
                )}
                
                <span className="flex items-center gap-2">
                   <Calendar size={16} className="text-teal-500" /> 
                   Updated {post.date ? new Date(post.date).toLocaleDateString() : "Recently"}
                </span>
              </div>
           </div>
        </div>
      </header>


      {/* ================= CONTENT LAYOUT ================= */}
      <div className="container mx-auto px-6 py-12 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* --- LEFT COLUMN: ARTICLE (8 cols) --- */}
         <article className="lg:col-span-8">
            
            {/* Featured Image */}
            <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-10 shadow-sm">
                <Image 
                   src={post.image || "/images/placeholder.jpg"} 
                   alt={post.title} 
                   fill 
                   className="object-cover"
                   priority 
                />
            </div>

            {/* "Key Takeaways" Box (Healthline Style) */}
            <div className="bg-teal-50/50 border-l-4 border-teal-500 p-8 rounded-r-2xl mb-12">
                <h3 className="text-lg font-bold text-teal-900 mb-3 flex items-center gap-2">
                   <ShieldCheck size={24} className="text-teal-600"/> Key Takeaways
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                   {post.short_description}
                </p>
            </div>

            {/* The Article Content */}
            <div 
               className="prose prose-lg prose-slate max-w-none 
               prose-headings:font-bold prose-headings:text-slate-900 prose-headings:font-sans
               prose-p:text-slate-600 prose-p:leading-8
               prose-a:text-teal-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
               prose-li:text-slate-600
               prose-img:rounded-2xl prose-img:shadow-md"
               dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
            />
            
            {/* Disclaimer Footer */}
            <div className="mt-16 pt-8 border-t border-slate-100 text-sm text-slate-400 italic">
               Disclaimer: This content is for educational purposes only and does not constitute medical advice. 
               Always consult with a qualified healthcare provider.
            </div>
         </article>


         {/* --- RIGHT COLUMN: SIDEBAR (4 cols) --- */}
         <aside className="lg:col-span-4 space-y-8">
            
            {/* 1. Medically Reviewed Card */}
            {doctor && (
               <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl p-6 relative overflow-hidden sticky top-24">
                  <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-100 relative shrink-0">
                          <Image src={doctor.profile_image || "/images/doctor.jpg"} fill className="object-cover" alt={doctor.name} />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-teal-600 uppercase tracking-widest">Medical Reviewer</p>
                         <h4 className="font-bold text-slate-900 text-lg leading-tight">{doctor.name}</h4>
                      </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-6 border-l-2 border-slate-200 pl-3">
                     {doctor.specialization}
                  </p>
                  <Link 
                    href={`/doctors/${doctor.slug || doctor.id}`} 
                    className="flex items-center justify-center w-full py-3 bg-slate-900 hover:bg-teal-600 text-white font-bold rounded-xl transition-all"
                  >
                     View Profile
                  </Link>
               </div>
            )}

            {/* 2. Recommended Products (The "Ads" Replacement) */}
            {suggestedProducts.length > 0 && (
               <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                   <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                      Supported Therapy
                   </h3>
                   
                   <div className="space-y-4">
                      {suggestedProducts.map((p) => (
                         <Link key={p.id} href={`/products/${p.id}`} className="flex gap-4 p-3 bg-white border border-slate-200 rounded-xl hover:border-teal-500 hover:shadow-md transition-all group">
                             <div className="w-14 h-14 bg-slate-100 rounded-lg relative overflow-hidden shrink-0">
                                 <Image src={p.main_image} fill className="object-contain p-1" alt={p.name} />
                             </div>
                             <div className="flex-1">
                                <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 leading-tight mb-1">{p.name}</h4>
                                <span className="text-xs text-teal-600 font-bold flex items-center gap-1">
                                   Learn More <ArrowRight size={12} />
                                </span>
                             </div>
                         </Link>
                      ))}
                   </div>
               </div>
            )}
         </aside>

      </div>
    </main>
  );
}