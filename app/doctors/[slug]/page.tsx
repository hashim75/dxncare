import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSortedData } from "../../lib/markdown";
import { ArrowLeft, CheckCircle2, Award, MapPin } from "lucide-react";
import BookingWidget from "../../components/doctors/BookingWidget"; 
import ServicesSlider from "../../components/doctors/ServicesSlider"; 
import { Metadata } from "next";

// --- 1. SEO METADATA ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const doctors = getSortedData("doctors");
  const doc = doctors.find((d: any) => d.id === params.slug) as any;
  if (!doc) return { title: "Doctor Not Found" };

  return {
    title: `${doc.name} - ${doc.specialization} | DXN Care`,
    description: doc.short_description || `Consult with ${doc.name}, a specialist in ${doc.specialization} at DXN Care.`,
    openGraph: {
      title: `${doc.name} - ${doc.specialization}`,
      description: doc.short_description,
      images: [doc.profile_image || "/images/placeholder-doctor.jpg"],
      type: "profile",
    }
  };
}

export async function generateStaticParams() {
  const doctors = getSortedData("doctors");
  return doctors.map((doc: any) => ({ slug: doc.id }));
}

export default function DoctorDetailPage({ params }: { params: { slug: string } }) {
  const doctors = getSortedData("doctors");
  const doc = doctors.find((d: any) => d.id === params.slug) as any;

  if (!doc) notFound();

  // --- 2. DETAILED PHYSICIAN SCHEMA ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": doc.name,
    "image": doc.profile_image || doc.image,
    "description": doc.short_description,
    "medicalSpecialty": {
      "@type": "MedicalSpecialty",
      "name": doc.specialization
    },
    "url": `https://dxncare.com/doctors/${doc.id}`,
    "telephone": "+923001234567",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Wellness Plaza",
      "addressLocality": "Islamabad",
      "addressRegion": "ICT",
      "postalCode": "44000",
      "addressCountry": "PK"
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-16 md:pt-32 md:pb-24">
      
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4">
        
        {/* Back Button */}
        <Link href="/doctors" className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-6 md:mb-8 font-bold transition-colors text-sm md:text-base">
            <ArrowLeft size={18} /> Back to Team
        </Link>

        {/* --- SECTION 1: DOCTOR PROFILE & BIO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 md:mb-24">
            
            {/* Left: Profile Card (Sticky on Desktop, Top on Mobile) */}
            <div className="lg:col-span-4">
                <div className="bg-teal-950 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-white flex flex-col items-center text-center relative overflow-hidden shadow-2xl lg:sticky lg:top-32">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500 to-transparent"></div>
                    
                    {/* Image */}
                    <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6 rounded-full overflow-hidden border-4 md:border-8 border-white/10 shadow-2xl z-10">
                        <Image 
                            src={doc.profile_image || doc.image || "/images/placeholder-doctor.jpg"} 
                            alt={doc.name} 
                            fill 
                            className="object-cover"
                            priority
                        />
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold font-jakarta mb-2 z-10">{doc.name}</h1>
                    <p className="text-teal-200 font-medium mb-6 z-10">{doc.specialization}</p>
                 
                    {/* Badges */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6 z-10">
                        {doc.registration_number && (
                            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium backdrop-blur border border-white/5">
                                <Award size={14} className="text-yellow-400"/>
                                PMDC: {doc.registration_number}
                            </div>
                        )}
                        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium backdrop-blur border border-white/5">
                            <MapPin size={14} className="text-red-400"/>
                            Islamabad
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Bio & Content */}
            <div className="lg:col-span-8">
                <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-slate-100 shadow-sm h-full">
                    
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <span className="w-1 h-8 md:h-10 bg-teal-500 rounded-full block"></span>
                        <h2 className="text-2xl md:text-3xl font-bold text-teal-950">About Doctor</h2>
                    </div>
                    
                    {/* Prose Content */}
                    <div className="prose prose-base md:prose-lg prose-slate max-w-none mb-10 md:mb-12">
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-6">
                            {doc.short_description}
                        </p>
                        <hr className="border-slate-100 my-6 md:my-8"/>
                        <div dangerouslySetInnerHTML={{ __html: doc.content || "" }} />
                    </div>

                    {/* Areas of Expertise */}
                    <div className="bg-slate-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 mb-8 md:mb-12">
                        <h3 className="font-bold text-teal-950 mb-4 flex items-center gap-2 text-lg">
                            <CheckCircle2 size={20} className="text-teal-500"/> Areas of Expertise
                        </h3>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {(doc.specialization || "").split(/[,&]+/).map((spec: string, i: number) => (
                                <span key={i} className="px-3 py-2 md:px-4 md:py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-xs md:text-sm font-bold shadow-sm">
                                    {spec.trim()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Services Slider */}
                    {doc.services && doc.services.length > 0 && (
                       <ServicesSlider services={doc.services} />
                    )}

                </div>
            </div>

        </div>

        {/* --- SECTION 2: BOOKING WIDGET --- */}
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
                <span className="text-red-600 font-bold tracking-widest uppercase text-xs md:text-sm">Appointment</span>
                <h2 className="text-3xl md:text-4xl font-bold text-teal-950 mt-2 font-jakarta">Book Your Slot</h2>
            </div>
            
            <div className="flex justify-center">
                <BookingWidget doctorId={doc.id} doctorName={doc.name} />
            </div>
        </div>

      </div>
    </main>
  );
}