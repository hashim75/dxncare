import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSortedData } from "../../lib/markdown";
import { ArrowLeft, CheckCircle2, Clock, Calendar, HelpCircle, ArrowRight, Sparkles, Stethoscope, Share2 } from "lucide-react";
import BlogProgress from "../../components/blog/BlogProgress";
import ShareButtons from "../../components/blog/ShareButtons"; 
export const revalidate = 3600;
// --- HELPER: Parse Dynamic Fields ---
const parseDynamicFields = (data: any, prefix: string) => {
  const items = [];
  let i = 1;
  while (true) {
    const titleKey = `${prefix}___${i}_title` as keyof typeof data; 
    const detailKey = `${prefix}___${i}_detail` as keyof typeof data; 
    const qKey = `${prefix}_question___${i}` as keyof typeof data;
    const aKey = `${prefix}_answer___${i}` as keyof typeof data;

    if (data[titleKey]) {
       items.push({ title: data[titleKey], detail: data[detailKey] });
    } else if (data[qKey]) {
       items.push({ q: data[qKey], a: data[aKey] });
    } else {
       break; 
    }
    i++;
  }
  return items;
};

// --- HELPER: INTELLIGENT PRODUCT EXTRACTOR ---
const getSmartProducts = (post: any, allProducts: any[]) => {
    // 1. Manual Links
    const manualLinksRaw = post.blogs_products || post.products || post.related_products || "";
    if (manualLinksRaw) {
        const targetSlugs = manualLinksRaw.split(/[;,]+/).map((s: string) => s.trim().toLowerCase()).filter(Boolean);
        const manualMatches = targetSlugs.map((slug: string) => {
            return allProducts.find(p => (p.id || "").toLowerCase() === slug || (p.slug || "").toLowerCase() === slug);
        }).filter(Boolean);
        if (manualMatches.length > 0) return manualMatches;
    }

    // 2. Content Search
    const fullContent = (post.main_content || post.content || "").toLowerCase();
    const sectionHeader = "(optional) supplement / product section";
    let textToSearch = fullContent.includes(sectionHeader) 
        ? fullContent.split(sectionHeader)[1] 
        : fullContent + " " + (post.title || "") + " " + (post.quick_snapshot || "");

    // 3. Match Logic
    const autoMatches = allProducts.filter(product => {
        const pName = (product.name || product.title || "").toLowerCase();
        const pId = (product.id || "").toLowerCase();
        if (pName.length < 4 && !textToSearch.includes(pId)) return false;
        return textToSearch.includes(pName) || textToSearch.includes(pId);
    });

    return Array.from(new Set(autoMatches)).slice(0, 4);
};

export async function generateStaticParams() {
  const posts = getSortedData("blogs");
  return posts.map((post: any) => ({ slug: post.id }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = getSortedData("blogs");
  const post = posts.find((p: any) => p.id === params.slug) as any;

  if (!post) notFound();

  // Fetch Data
  const allProducts = getSortedData("products") as any[];
  const allDoctors = getSortedData("doctors") as any[];

  // Process Data
  const benefits = parseDynamicFields(post, "benefit");
  const faqs = parseDynamicFields(post, "faq");
  const suggestedProducts = getSmartProducts(post, allProducts);

  // Find Reviewing Doctor
  const reviewerSlug = post.medical_reviewd_by || post.author;
  const doctor = allDoctors.find((d: any) => d.id === reviewerSlug || d.slug === reviewerSlug);

  // --- SCHEMA GENERATION ---
  const isoDate = post.created_on ? new Date(post.created_on).toISOString() : new Date().toISOString();
  const updateDate = post.updated_on ? new Date(post.updated_on).toISOString() : isoDate;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": post.name || post.title,
        "image": post.main_image || post.image,
        "datePublished": isoDate,
        "dateModified": updateDate,
        "author": doctor ? {
          "@type": "Person",
          "name": doctor.name,
          "url": `https://dxncare.com/doctors/${doctor.slug}`
        } : {
          "@type": "Organization",
          "name": "DXN Care Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "DXN Care",
          "logo": {
            "@type": "ImageObject",
            "url": "https://dxncare.com/logo.png"
          }
        },
        "description": post.meta_description || post.short_description
      },
      ...(faqs.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": faqs.map((f: any) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }] : [])
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogProgress /> 
      
      <main className="bg-white min-h-screen">
        
        {/* --- HERO SECTION (Responsive Height & Text) --- */}
        <header className="relative h-[50vh] min-h-[400px] lg:h-[60vh] flex items-end pb-12 lg:pb-20 overflow-hidden">
            <div className="absolute inset-0">
                <Image 
                    src={post.main_image || post.image || "/images/placeholder.jpg"} 
                    alt={post.name || post.title} 
                    fill 
                    className="object-cover" 
                    priority 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/60 to-transparent" />
            </div>
            
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
                <Link href="/blog" className="inline-flex items-center gap-2 text-teal-300 hover:text-white mb-4 lg:mb-6 font-bold transition-colors text-sm lg:text-base">
                    <ArrowLeft size={16} /> Back to Journal
                </Link>
                <div className="flex flex-wrap gap-3 lg:gap-4 items-center mb-4 lg:mb-6 text-xs lg:text-sm font-medium text-teal-200/80">
                    <span className="bg-teal-600/30 backdrop-blur px-3 py-1 rounded-full text-white border border-teal-500/50">
                        {post.blog_category || post.category || "Health"}
                    </span>
                    <span className="flex items-center gap-1"><Calendar size={12}/> {post.created_on ? new Date(post.created_on).toLocaleDateString() : post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {post.reading_time || "5 min read"}</span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-jakarta leading-tight max-w-4xl">
                    {post.name || post.title}
                </h1>
            </div>
        </header>

        {/* --- MAIN GRID SYSTEM --- */}
        <div className="container mx-auto px-4 md:px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* --- LEFT SIDEBAR (Doctor & Share) - Desktop Only --- */}
            {/* Hidden on mobile, shown on lg screens */}
            <aside className="hidden lg:block lg:col-span-2 sticky top-32 h-fit space-y-8">
                {/* Doctor Profile Widget */}
                {doctor ? (
                    <div className="bg-white p-6 rounded-2xl w-full border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center group hover:border-teal-500/30 transition-all duration-300">
                        <div className="relative w-16 h-16 lg:w-20 lg:h-20 mb-4 rounded-full overflow-hidden border-2 border-teal-100 group-hover:border-teal-500 transition-colors">
                            <Image
                                src={doctor.profile_image || "/images/doctor-placeholder.jpg"}
                                alt={doctor.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-teal-600 tracking-widest mb-1 bg-teal-50 px-2 py-1 rounded-full">
                            Reviewed
                        </span>
                        <div className="font-bold text-slate-900 text-sm mb-1 text-center">
                            {doctor.name}
                        </div>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-2 text-center">
                            {doctor.specialization}
                        </p>
                        <Link 
                            href={`/doctors/${doctor.slug}`}
                            className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                            <Stethoscope size={12} /> Consult
                        </Link>
                    </div>
                ) : (
                    <div className="bg-slate-50 p-4 rounded-2xl w-full border border-slate-100 text-center">
                         <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Author</span>
                         <div className="font-bold text-teal-900 mt-1">DXN Team</div>
                    </div>
                )}

                <ShareButtons title={post.name || post.title} />
            </aside>

            {/* --- MAIN CONTENT (Spans full width on mobile, 7 cols on desktop) --- */}
            <article className="col-span-1 lg:col-span-7 space-y-8 lg:space-y-12">
                
                {/* Mobile Author Info (Visible only on small screens) */}
                <div className="lg:hidden flex items-center gap-4 bg-slate-50 p-4 rounded-xl mb-6">
                    {doctor ? (
                        <>
                           <div className="relative w-12 h-12 rounded-full overflow-hidden border border-teal-200">
                               <Image src={doctor.profile_image || "/images/doctor-placeholder.jpg"} fill className="object-cover" alt={doctor.name} />
                           </div>
                           <div>
                               <p className="text-xs font-bold text-teal-600 uppercase">Medically Reviewed By</p>
                               <p className="font-bold text-slate-900">{doctor.name}</p>
                           </div>
                        </>
                    ) : (
                        <div className="text-sm font-bold text-slate-500">Written by DXN Care Team</div>
                    )}
                </div>

                {/* Quick Snapshot */}
                {post.quick_snapshot && (
                    <div className="bg-emerald-50/50 rounded-3xl p-6 lg:p-8 border border-emerald-100">
                        <h3 className="flex items-center gap-2 text-emerald-800 font-bold mb-4 uppercase tracking-widest text-sm">
                            <CheckCircle2 size={18} /> Quick Snapshot
                        </h3>
                        <div 
                            className="prose prose-emerald prose-sm max-w-none [&>ul]:list-none [&>ul]:pl-0 [&>ul>li]:bg-white [&>ul>li]:p-4 [&>ul>li]:rounded-xl [&>ul>li]:mb-3 [&>ul>li]:shadow-sm [&>ul>li]:border [&>ul>li]:border-emerald-100/50"
                            dangerouslySetInnerHTML={{ __html: post.quick_snapshot }} 
                        />
                    </div>
                )}

                {/* Main Article Text */}
                <div 
                    className="prose prose-lg prose-slate max-w-none 
                    prose-headings:font-jakarta prose-headings:font-bold prose-headings:text-teal-950 
                    prose-h2:text-2xl lg:prose-h2:text-3xl
                    prose-a:text-teal-600 prose-img:rounded-3xl prose-img:w-full"
                    dangerouslySetInnerHTML={{ __html: post.main_content || post.content }} 
                />

                {/* Key Benefits Grid */}
                {benefits.length > 0 && (
                    <section className="mt-12">
                        <h3 className="text-2xl lg:text-3xl font-bold text-teal-950 mb-6 lg:mb-8 font-jakarta">Key Benefits</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            {benefits.map((b: any, i: number) => (
                                <div key={i} className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-4 font-bold text-sm lg:text-base">
                                        {i + 1}
                                    </div>
                                    <h4 className="font-bold text-teal-900 text-base lg:text-lg mb-2">{b.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">{b.detail}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                
                {/* FAQ Section */}
                {faqs.length > 0 && (
                    <section className="mt-12 pt-12 border-t border-slate-100">
                         <h3 className="text-2xl lg:text-3xl font-bold text-teal-950 mb-6 lg:mb-8 font-jakarta flex items-center gap-2">
                            <HelpCircle className="text-teal-500" /> Frequently Asked Questions
                         </h3>
                         <div className="space-y-4">
                            {faqs.map((faq: any, i: number) => (
                                <details key={i} className="group bg-slate-50 rounded-2xl open:bg-white open:shadow-lg open:border-teal-100 transition-all duration-300 border border-transparent">
                                    <summary className="flex cursor-pointer items-center justify-between p-4 lg:p-6 font-bold text-teal-950 select-none text-sm lg:text-base">
                                        {faq.q}
                                        <span className="transition-transform group-open:rotate-180">▼</span>
                                    </summary>
                                    <div className="px-4 lg:px-6 pb-6 text-slate-600 leading-relaxed text-sm lg:text-base">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                         </div>
                    </section>
                )}
            </article>

            {/* --- RIGHT SIDEBAR (RECOMMENDED PRODUCTS) --- */}
            {/* Desktop: Sticky Sidebar / Mobile: Bottom Grid */}
            <aside className="col-span-1 lg:col-span-3 space-y-8 mt-8 lg:mt-0">
                {suggestedProducts.length > 0 ? (
                    <div className="relative lg:sticky lg:top-32">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="text-teal-500" size={16} />
                            <h3 className="font-bold text-teal-950 uppercase tracking-widest text-xs">Recommended For You</h3>
                        </div>
                        
                        {/* Mobile: Horizontal Scroll / Desktop: Vertical Stack */}
                        <div className="flex lg:flex-col gap-4 overflow-x-auto pb-4 lg:pb-0 snap-x">
                            {suggestedProducts.map((p: any) => (
                                <Link key={p.id} href={`/products/${p.id}`} className="snap-center min-w-[250px] lg:min-w-0 group block bg-white rounded-2xl p-4 border border-slate-100 hover:border-teal-500 hover:shadow-lg transition-all">
                                    <div className="aspect-square relative rounded-xl overflow-hidden mb-3 bg-slate-100">
                                        <Image 
                                            src={p.main_image || p.image || "/images/placeholder.jpg"} 
                                            alt={p.name || p.title} 
                                            fill 
                                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
                                        />
                                    </div>
                                    <h4 className="font-bold text-sm text-teal-950 group-hover:text-teal-600 transition-colors line-clamp-2">
                                        {p.name || p.title}
                                    </h4>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full uppercase">
                                            {p.category || "Organic"}
                                        </span>
                                        <ArrowRight size={14} className="text-teal-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all"/>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                   <div className="p-6 bg-slate-50 rounded-2xl text-center border border-slate-100">
                        <p className="text-sm text-slate-400 mb-4">Explore our organic range</p>
                        <Link href="/products" className="inline-block px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-full hover:bg-teal-700 transition-colors">
                            View All Products
                        </Link>
                   </div>
                )}
            </aside>

        </div>
      </main>
    </>
  );
}