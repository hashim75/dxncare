import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Quote, Sparkles, Star, User } from "lucide-react";
import { getSortedData } from "../lib/markdown";

export const revalidate = 3600;

// --- 1. ENHANCED SEO METADATA ---
export const metadata: Metadata = {
  title: "10+ Real Health Transformations | DXN Care Success Stories",
  description: "Join hundreds of patients in Pakistan who have reclaimed their health. Read 10 detailed success stories covering weight loss, skin care, and chronic pain management.",
  alternates: {
    canonical: "https://dxncare.com/success-stories",
  },
  openGraph: {
    title: "Real Health Success Stories | DXN Care Pakistan",
    description: "Real people, real results. See how our holistic medical approach is transforming lives.",
    url: "https://dxncare.com/success-stories",
    siteName: "DXN Care",
    images: [
      {
        url: "https://dxncare.com/images/og-success-stories.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};

export default async function SuccessStoriesPage() {
  const stories = await getSortedData("success-stories");

  // --- 2. DYNAMIC SCHEMA GENERATION ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "DXN Care Success Stories",
    "description": "A collection of health transformation stories from patients treated at DXN Care.",
    "url": "https://dxncare.com/success-stories",
    "lastReviewed": new Date().toISOString().split('T')[0],
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": stories.map((story: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": story.patient_name
          },
          "reviewBody": story.quote,
          "itemReviewed": {
            "@type": "Physician",
            "name": story.doctor_name,
            "image": "https://dxncare.com/images/logo.png"
          }
        }
      }))
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Injecting the JSON-LD for Google Search Console */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Animated Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest mb-6 animate-bounce">
            <Star size={14} fill="currentColor" /> Trust & Results
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-teal-950 font-jakarta mb-6 leading-tight">
            Journeys that <span className="text-teal-600">Inspire.</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            From chronic struggles to vibrant living—explore how our personalized medical expertise changed lives across Pakistan.
          </p>
        </div>

        {/* Stories Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {stories.map((story: any, index: number) => (
            <div 
              key={story.id} 
              className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full"
            >
              {/* Feature Icon Section (Replaced Image) */}
              <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-teal-500 to-teal-900 flex items-center justify-center transition-colors duration-500">
                {/* Abstract animated background icon */}
                <User 
                  size={120} 
                  className="text-white/10 group-hover:scale-110 group-hover:text-white/20 transition-all duration-700 absolute" 
                  strokeWidth={1}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 text-white z-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-teal-200 mb-1 flex items-center gap-1.5">
                      <Sparkles size={12} /> Recovered from
                    </p>
                    <p className="text-xl font-bold leading-tight">{story.condition_before}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <Quote className="text-teal-100 mb-4 self-start" size={40} fill="currentColor" />
                
                <p className="text-slate-700 font-medium italic mb-6 leading-relaxed relative z-10">
                  "{story.quote}"
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-teal-950">{story.patient_name}</h3>
                        <p className="text-xs text-slate-500">Treated by {story.doctor_name}</p>
                    </div>
                    <Link 
                        href={`/doctors/${story.doctor_slug}`}
                        className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors"
                        aria-label={`View doctor profile of ${story.doctor_name}`}
                    >
                        <ArrowRight size={18} />
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Bottom CTA */}
        <div className="mt-24 bg-teal-950 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-teal-800 rounded-full blur-3xl -mr-48 -mt-48 opacity-50"></div>
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Start Your Story Today</h2>
             <p className="text-teal-100 text-lg mb-10 max-w-xl mx-auto relative z-10">Don't just live with symptoms. Find the expert guidance you need to thrive.</p>
             <Link href="/doctors" className="bg-white text-teal-950 px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform inline-flex items-center gap-2">
                Consult a Specialist <ChevronRight size={20} />
             </Link>
        </div>

      </div>
    </main>
  );
}