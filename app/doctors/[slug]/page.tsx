import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSortedData } from "../../lib/markdown";
// Added BadgeCheck for the verified look
import { ArrowLeft, CheckCircle2, Award, MapPin, Facebook, Linkedin, MessageCircle, Unlock, Sparkles, Star, BadgeCheck } from "lucide-react";
import BookingWidget from "../../components/doctors/BookingWidget"; 
import ServicesSlider from "../../components/doctors/ServicesSlider"; 
import { Metadata } from "next";

import ProtectedBookingArea from "../../components/doctors/ProtectedBookingArea"; 
export const revalidate = 3600;

// --- 1. SEO METADATA ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const doctors = getSortedData("doctors");
  const doc = doctors.find((d: any) => d.id === params.slug) as any;
  if (!doc) return { title: "Doctor Not Found" };

  return {
    title: `${doc.name} - ${doc.specialization} | DXN Care`,
    description: doc.short_description || `Consult with ${doc.name}, a specialist in ${doc.specialization} at DXN Care.`,
  };
}

export async function generateStaticParams() {
  const doctors = getSortedData("doctors");
  return doctors.map((doc: any) => ({ slug: doc.id }));
}

export default async function DoctorDetailPage({ params }: { params: { slug: string } }) { 
  const doctors = getSortedData("doctors");
  const doc = doctors.find((d: any) => d.id === params.slug) as any;

  if (!doc) notFound();

  // ✅ Check if the doctor is on the Paid plan
  const isPremium = doc.plan_tier === "paid";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": doc.name,
    "image": doc.profile_image || doc.image,
    "description": doc.short_description,
    "medicalSpecialty": {
      "@type": "MedicalSpecialty",
      "name": doc.specialization
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-16 md:pt-32 md:pb-24">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Back Button */}
        <Link href="/doctors" className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-6 md:mb-8 font-bold transition-colors text-sm md:text-base">
            <ArrowLeft size={18} /> Back to Team
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 md:mb-24">
            
            {/* --- LEFT: PROFILE CARD --- */}
            <div className="lg:col-span-4 relative">
                <div className="bg-teal-950 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-white flex flex-col items-center text-center relative overflow-hidden shadow-2xl lg:sticky lg:top-32">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500 to-transparent"></div>
                    
                    {/* Avatar Container */}
                    <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6 rounded-full overflow-hidden border-4 md:border-8 border-white/10 shadow-2xl z-10">
                        <Image src={doc.profile_image || doc.image || "/images/placeholder-doctor.jpg"} alt={doc.name} fill className="object-cover" priority />
                        {isPremium && (
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-yellow-500 to-yellow-400 py-1 text-[10px] md:text-xs font-bold tracking-widest uppercase text-yellow-950">
                                Premium
                            </div>
                        )}
                    </div>

                    {/* ✅ Name with Verified Badge for Premium Doctors */}
                    <div className="flex items-center justify-center gap-2 mb-2 z-10">
                        <h1 className="text-2xl md:text-3xl font-bold font-jakarta">{doc.name}</h1>
                        {isPremium && (
                            <div className="group relative">
                                <BadgeCheck size={26} className="text-blue-400 fill-white" />
                                {/* Simple Tooltip */}
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Verified Specialist
                                </span>
                            </div>
                        )}
                    </div>

                    <p className="text-teal-200 font-medium mb-6 z-10">{doc.specialization}</p>
                 
                    <div className="flex flex-wrap justify-center gap-2 mb-6 z-10">
                        {doc.registration_number && (
                            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium backdrop-blur border border-white/5">
                                <Award size={14} className="text-yellow-400"/> PMDC: {doc.registration_number}
                            </div>
                        )}
                        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium backdrop-blur border border-white/5">
                            <MapPin size={14} className="text-red-400"/> Islamabad
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RIGHT: CONTENT & PAYWALLS --- */}
            <div className="lg:col-span-8 flex flex-col gap-8 md:gap-12">
                
                {/* 1. About Section */}
                <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <span className="w-1 h-8 md:h-10 bg-teal-500 rounded-full block"></span>
                        <h2 className="text-2xl md:text-3xl font-bold text-teal-950">About Doctor</h2>
                    </div>
                    
                    <div className="prose prose-base md:prose-lg prose-slate max-w-none mb-10 md:mb-12">
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-6">
                            {doc.short_description}
                        </p>
                        <hr className="border-slate-100 my-6 md:my-8"/>
                        <div dangerouslySetInnerHTML={{ __html: doc.content || "" }} />
                    </div>

                    <div className="bg-slate-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100">
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
                </div>

                {/* --- 2. PREMIUM CONTENT --- */}
                {isPremium ? (
                    <div className="flex flex-col gap-8 md:gap-12 animate-in fade-in">
                        {doc.services && doc.services.length > 0 && (
                            <div className="w-full">
                                <ServicesSlider services={doc.services} />
                            </div>
                        )}

                        {(doc.whatsapp_link || doc.facebook_link || doc.linkdln_link) && (
                            <div className="bg-teal-50 rounded-[2rem] p-6 md:p-10 text-center border border-teal-100 shadow-inner flex flex-col items-center">
                                <h3 className="font-bold text-teal-900 mb-6 flex items-center justify-center gap-2 text-lg md:text-xl">
                                    <Unlock size={22} className="text-teal-600"/> Direct Contact Unlocked
                                </h3>
                                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full">
                                    {doc.whatsapp_link && (
                                        <a href={doc.whatsapp_link} target="_blank" className="flex-1 min-w-[160px] bg-[#25D366] text-white px-6 py-4 rounded-xl hover:bg-[#1ebe57] transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20">
                                            <MessageCircle size={20} /> WhatsApp
                                        </a>
                                    )}
                                    {doc.facebook_link && (
                                        <a href={doc.facebook_link} target="_blank" className="flex-1 min-w-[160px] bg-[#1877F2] text-white px-6 py-4 rounded-xl hover:bg-[#166fe5] transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#1877F2]/20">
                                            <Facebook size={20} /> Facebook
                                        </a>
                                    )}
                                    {doc.linkdln_link && (
                                        <a href={doc.linkdln_link} target="_blank" className="flex-1 min-w-[160px] bg-[#0A66C2] text-white px-6 py-4 rounded-xl hover:bg-[#0958a8] transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#0A66C2]/20">
                                            <Linkedin size={20} /> LinkedIn
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* FREE DOCTOR UPSELL */
                    <div className="bg-gradient-to-br from-teal-900 to-teal-950 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col items-center text-center border border-teal-800">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                            <Sparkles size={32} className="text-yellow-400" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold font-jakarta mb-4">Are you {doc.name}?</h3>
                        <p className="text-teal-100/80 mb-8 max-w-lg leading-relaxed text-sm md:text-base">
                            Upgrade to <strong>DXN Premium Provider</strong> for the verified badge and to multiply your bookings.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <Link href="/join-as-a-doctor" className="px-8 py-4 bg-yellow-400 text-yellow-950 font-bold rounded-xl hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20">
                                <Star size={18} /> Claim & Upgrade Profile
                            </Link>
                        </div>
                    </div>
                )}

                {/* --- 3. BOOKING AREA --- */}
                <ProtectedBookingArea doctorId={doc.slug || doc.id} fee={doc.consultation_fee || 1500}>
                    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-slate-100 shadow-sm w-full">
                        <div className="text-center mb-8 md:mb-12">
                            <span className="text-red-600 font-bold tracking-widest uppercase text-xs md:text-sm">Appointment</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-teal-950 mt-2 font-jakarta">Book Your Slot</h2>
                            <p className="text-slate-500 mt-3 text-sm md:text-base">Lock in your consultation time with {doc.name}.</p>
                        </div>
                        <div className="flex justify-center w-full">
                            <BookingWidget doctorId={doc.id} doctorName={doc.name} />
                        </div>
                    </div>
                </ProtectedBookingArea>

            </div>
        </div>
      </div>
    </main>
  );
}