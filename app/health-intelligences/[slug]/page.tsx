import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSortedData } from "../../lib/markdown";
import { 
  ArrowLeft, Calendar, Sparkles, ArrowRight, 
  BrainCircuit, Clock, Microscope, Activity, Stethoscope 
} from "lucide-react";
import BlogProgress from "../../components/blog/BlogProgress";
import ShareButtons from "../../components/blog/ShareButtons"; // Import ShareButtons
import { Metadata } from "next";

// --- SEO METADATA ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const articles = getSortedData("health-intelligences");
  const article = articles.find((d: any) => d.id === params.slug) as any;
  if (!article) return { title: "Report Not Found" };

  return {
    title: `${article.title || article.name} | DXN Health Intelligence`,
    description: article.meta_description || article.short_description,
    openGraph: {
      type: "article",
      title: article.title || article.name,
      description: article.meta_description,
      images: [article.main_image || "/images/placeholder.jpg"],
    }
  };
}

// --- DIAGRAM ENGINE ---
const injectDiagramPlaceholders = (htmlContent: string) => {
  let enhancedHtml = htmlContent;
  const insertions = [
    { trigger: "The architecture of modern fatigue", tag: `<div class="my-8 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-sm text-slate-500 italic flex flex-col items-center gap-2"><span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase">Visual Aid</span></div>` },
    { trigger: "ATP / inorganic phosphate ratio", tag: `<div class="my-8 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-sm text-slate-500 italic flex flex-col items-center gap-2"><span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase">Visual Aid</span></div>` },
    { trigger: "Cordycepin — an adenosine analog", tag: `<div class="my-8 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-sm text-slate-500 italic flex flex-col items-center gap-2"><span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase">Visual Aid</span></div>` },
    { trigger: "Part VII — 4-Week Energy & Libido Protocol", tag: `<div class="my-8 p-4 bg-teal-50 border border-teal-200 rounded-xl text-center text-sm text-teal-700 italic flex flex-col items-center gap-2"><span class="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs font-bold uppercase">Protocol Visual</span></div>` }
  ];
  insertions.forEach(({ trigger, tag }) => {
    if (enhancedHtml.includes(trigger)) enhancedHtml = enhancedHtml.replace(trigger, `${trigger}${tag}`);
  });
  return enhancedHtml;
};

// --- SMART PRODUCT EXTRACTOR ---
const getSmartProducts = (post: any, allProducts: any[]) => {
  const manualLinksRaw = post.recommended_dxn_products || post.products || "";
  if (manualLinksRaw) {
    const slugs = manualLinksRaw.split(/[;,]+/).map((s: string) => s.trim().toLowerCase());
    return slugs.map((s: string) => allProducts.find(p => p.id === s || p.slug === s)).filter(Boolean);
  }
  const fullText = ((post.title || "") + " " + (post.body_content || "")).toLowerCase();
  const matches = allProducts.filter(p => {
    const pName = (p.name || "").toLowerCase();
    if (pName.includes("cordyceps") && fullText.includes("cordyceps")) return true;
    if (pName.includes("lingzhi") && fullText.includes("lingzhi")) return true;
    if (pName.includes("coffee") && fullText.includes("coffee")) return true;
    return false;
  });
  return Array.from(new Set(matches)).slice(0, 4);
};

export async function generateStaticParams() {
  const articles = getSortedData("health-intelligences");
  return articles.map((doc: any) => ({ slug: doc.id }));
}

export default function HealthIntelligenceDetail({ params }: { params: { slug: string } }) {
  // 1. Fetch Data
  const articles = getSortedData("health-intelligences");
  const article = articles.find((d: any) => d.id === params.slug) as any;

  if (!article) notFound();

  const products = getSortedData("products") as any[];
  const doctors = getSortedData("doctors") as any[];

  // 2. Process Data
  const recommendedProducts = getSmartProducts(article, products);
  const enrichedContent = injectDiagramPlaceholders(article.body_content || article.content || "");

  // 3. Find Doctor (Author)
  const authorSlug = article.author; 
  const doctor = doctors.find((d: any) => d.id === authorSlug || d.slug === authorSlug);

  // --- GOOGLE ARTICLE SCHEMA ---
  const isoDate = article.created_on ? new Date(article.created_on).toISOString() : new Date().toISOString();
  const updateDate = article.updated_on ? new Date(article.updated_on).toISOString() : isoDate;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.name || article.title,
    "image": article.main_image || "",
    "author": doctor ? {
      "@type": "Person",
      "name": doctor.name,
      "url": `https://dxncare.com/doctors/${doctor.slug}`,
      "jobTitle": doctor.specialization
    } : {
      "@type": "Person",
      "name": article.author || "DXN Research Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DXN Care",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dxncare.com/logo.png"
      }
    },
    "datePublished": isoDate,
    "dateModified": updateDate,
    "description": article.meta_description || article.short_description
  };

  return (
    <>
    <BlogProgress />
    {/* Inject Schema */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

    <main className="bg-slate-50/50 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <header className="relative bg-[#0f172a] text-white pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 L100 0 L100 100 Z" fill="#3b82f6" />
                <circle cx="20" cy="20" r="15" fill="#14b8a6" />
             </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-slate-400 mb-8">
                <Link href="/health-intelligences" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                    <ArrowLeft size={14} /> Intelligence Hub
                </Link>
                <span className="text-slate-700">/</span>
                <span className="text-blue-500">Report #{article.item_id ? article.item_id.slice(-4) : "001"}</span>
            </div>

            <div className="max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold font-jakarta leading-[1.1] mb-6 tracking-tight">
                    {article.name || article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm font-medium">
                    <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                        <Calendar size={16} className="text-blue-400"/> {article.created_on ? new Date(article.created_on).toLocaleDateString() : "Recent"}
                    </span>
                    <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                        <Clock size={16} className="text-teal-400"/> {article.reading_time || "10 Min Read"}
                    </span>
                    <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                        <Microscope size={16} className="text-purple-400"/> Science Verified
                    </span>
                </div>
            </div>
        </div>
      </header>

      <div className="container mx-auto px-4 -mt-10 relative z-20 pb-20">
        <div className="grid lg:grid-cols-12 gap-12">

            {/* --- LEFT CONTENT COLUMN --- */}
            <div className="lg:col-span-8">
                
                {article.takeaway && (
                    <div className="bg-white rounded-3xl p-8 mb-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-teal-500"></div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <BrainCircuit size={24} />
                            </div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm">Executive Summary</h3>
                        </div>
                        <div 
                            className="prose prose-slate prose-sm max-w-none text-slate-600 font-medium leading-relaxed [&>ul>li]:mb-2 [&>ul>li]:pl-2"
                            dangerouslySetInnerHTML={{ __html: article.takeaway }}
                        />
                    </div>
                )}

                <article className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-slate-100">
                    <div 
                        className="prose prose-lg prose-slate max-w-none prose-headings:font-jakarta prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600"
                        dangerouslySetInnerHTML={{ __html: enrichedContent }} 
                    />
                    
                    <div className="mt-16 pt-8 border-t border-slate-100 flex items-center gap-4 opacity-70">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-serif font-bold text-xl overflow-hidden relative">
                             {doctor ? (
                                <Image src={doctor.profile_image} alt={doctor.name} fill className="object-cover" />
                             ) : (
                                <span>{article.author ? article.author[0].toUpperCase() : "D"}</span>
                             )}
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Report Author</p>
                            <p className="font-bold text-slate-900">
                                {doctor ? doctor.name : (article.author ? article.author.replace(/-/g, ' ') : "DXN Research Team")}
                            </p>
                        </div>
                    </div>
                </article>

            </div>

            {/* --- RIGHT SIDEBAR --- */}
            <aside className="lg:col-span-4 space-y-8">
                
                {/* Doctor Profile Card */}
                {doctor ? (
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-blue-200 transition-all">
                         <div className="w-20 h-20 bg-blue-50 rounded-full mb-4 relative overflow-hidden border-2 border-blue-100 group-hover:border-blue-500 transition-colors">
                            <Image src={doctor.profile_image} alt={doctor.name} fill className="object-cover" />
                         </div>
                         <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Medical Review</div>
                         <div className="font-bold text-slate-900 text-lg mb-1">{doctor.name}</div>
                         <div className="text-xs text-slate-500 mb-4 px-4">{doctor.specialization}</div>
                         
                         <Link href={`/doctors/${doctor.slug}`} className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                            <Stethoscope size={14}/> View Full Profile
                         </Link>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                         <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                            <Activity size={24} />
                         </div>
                         <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Medical Review</div>
                            <div className="font-bold text-slate-900">{article.author ? article.author.replace(/-/g, ' ') : "DXN Team"}</div>
                         </div>
                    </div>
                )}

                {/* Products */}
                {recommendedProducts.length > 0 && (
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-32 shadow-2xl shadow-slate-900/20">
                        <div className="flex items-center gap-2 mb-8 text-blue-300">
                            <Sparkles size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest">Protocol Essentials</span>
                        </div>

                        <div className="space-y-6">
                            {recommendedProducts.map((p: any) => (
                                <Link key={p.id} href={`/products/${p.id}`} className="group block bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 transition-all hover:scale-[1.02]">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 relative">
                                            <Image src={p.main_image || p.image || "/images/placeholder.jpg"} alt={p.name} fill className="object-contain p-2"/>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm leading-tight mb-2 group-hover:text-blue-300 transition-colors">
                                                {p.name || p.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                <span>View Specs</span> <ArrowRight size={10} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <p className="text-xs text-slate-400 mb-4">Need help designing your protocol?</p>
                            <Link href="/doctors" className="inline-block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors">
                                Consult a Specialist
                            </Link>
                        </div>
                    </div>
                )}

                {/* Share Buttons Component */}
                <ShareButtons title={article.name || article.title} />

            </aside>

        </div>
      </div>
    </main>
    </>
  );
}