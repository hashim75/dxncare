import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSortedData } from "../../lib/markdown";
import { ArrowLeft, CheckCircle2, Award } from "lucide-react";
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
    "telephone": "+923001234567", // Update with actual clinic number if available
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Wellness Plaza",
      "addressLocality": "Islamabad",
      "addressRegion": "ICT",
      "postalCode": "44000",
      "addressCountry": "PK"
    },
    // Map the doctor's services directly to the schema
    "availableService": doc.services?.map((service: string) => ({
      "@type": "MedicalTherapy",
      "name": service
    })) || []
  };

  return (
    <main className="bg-slate-50 min-h-screen pt-32 pb-20">
      
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4">
        
        <Link href="/doctors" className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-8 font-bold transition-colors">
            <ArrowLeft size={20} /> Back to Team
        </Link>

        {/* --- SECTION 1: DOCTOR PROFILE & BIO --- */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
            
            {/* Left: Profile Card */}
            <div className="lg:col-span-4">
                <div className="bg-teal-950 p-8 rounded-[2.5rem] text-white flex flex-col items-center text-center relative overflow-hidden shadow-xl sticky top-32">
                    <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
                    
                    <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-8 border-white/10 shadow-2xl">
                        <Image 
                            src={doc.profile_image || doc.image || "/images/placeholder-doctor.jpg"} 
                            alt={doc.name} 
                            fill 
                            className="object-cover"
                        />
                    </div>

                    <h1 className="text-3xl font-bold font-jakarta mb-2">{doc.name}</h1>
                 
                    
                    {doc.registration_number && (
                        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-sm font-medium mb-6 backdrop-blur">
                            <Award size={16} className="text-yellow-400"/>
                            PMDC: {doc.registration_number}
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Bio & Content */}
            <div className="lg:col-span-8">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm h-full">
                    <h2 className="text-2xl font-bold text-teal-950 mb-6 flex items-center gap-3">
                        <span className="w-8 h-1 bg-teal-500 rounded-full block"></span>
                        About Doctor
                    </h2>
                    
                    <div className="prose prose-lg prose-slate max-w-none mb-12">
                        <p className="text-xl text-slate-600 leading-relaxed font-medium mb-6">
                            {doc.short_description}
                        </p>
                        <hr className="border-slate-100 my-8"/>
                        <div dangerouslySetInnerHTML={{ __html: doc.content || "" }} />
                    </div>

                    {/* Areas of Expertise (Static Tags) */}
                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 mb-8">
                        <h3 className="font-bold text-teal-950 mb-4 flex items-center gap-2">
                            <CheckCircle2 size={20} className="text-teal-500"/> Areas of Expertise
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {(doc.specialization || "").split(/[,&]+/).map((spec: string, i: number) => (
                                <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-bold shadow-sm">
                                    {spec.trim()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ✅ Services Slider Component */}
                    {doc.services && doc.services.length > 0 && (
                       <ServicesSlider services={doc.services} />
                    )}

                </div>
            </div>

        </div>

        {/* --- SECTION 2: BOOKING WIDGET (FULL WIDTH) --- */}
        <div className="flex justify-center">
            <BookingWidget doctorId={doc.id} doctorName={doc.name} />
        </div>

      </div>
    </main>
  );
}