import Link from "next/link";
import Image from "next/image";
import { getSortedData } from "../lib/markdown";
import { ArrowRight, Stethoscope, MessageCircle, ShieldCheck } from "lucide-react";

// Server Component (Async)
export default async function DoctorsPage() {
  const doctors = getSortedData("doctors") as any[];

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-teal-100/50 text-teal-700 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-3">
                Our Medical Team
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-jakarta text-teal-950 mb-3 md:mb-4">
                Meet Our Specialists
            </h1>
            <p className="text-slate-500 text-sm md:text-lg max-w-lg mx-auto leading-relaxed">
                Experienced professionals dedicated to combining modern science with holistic well-being.
            </p>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {doctors.map((doc) => (
                <div 
                    key={doc.id} 
                    className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center h-full"
                >
                    
                    {/* Doctor Image */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 mb-5 md:mb-6 rounded-full overflow-hidden border-4 border-teal-50 shadow-inner group-hover:border-teal-100 transition-colors">
                        <Image 
                            src={doc.profile_image || doc.image || "/images/placeholder-doctor.jpg"} 
                            alt={doc.name} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    {/* Info */}
                    <h2 className="text-xl md:text-2xl font-bold text-teal-950 mb-1 font-jakarta">
                        {doc.name}
                    </h2>
                    
                    <div className="flex items-center gap-1.5 text-teal-600 font-bold text-xs md:text-sm mb-4 bg-teal-50 px-3 py-1.5 rounded-full uppercase tracking-wide">
                        <Stethoscope size={14} />
                        {doc.specialization || "General Practitioner"}
                    </div>

                    <p className="text-slate-500 text-sm md:text-base line-clamp-3 mb-6 leading-relaxed">
                        {doc.short_description || "Specialist dedicated to providing the best care for patients using holistic and modern approaches."}
                    </p>

                    {/* Actions (Pushed to bottom) */}
                    <div className="mt-auto w-full grid grid-cols-2 gap-3">
                        <Link 
                            href={`/doctors/${doc.slug || doc.id}`} 
                            className="py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs md:text-sm hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center justify-center gap-2 border border-slate-100"
                        >
                            View Profile <ArrowRight size={14} className="opacity-50" />
                        </Link>
                        
                        {doc.whatsapp_link ? (
                            <a 
                                href={doc.whatsapp_link} 
                                target="_blank" 
                                className="py-3 rounded-xl bg-teal-950 text-white font-bold text-xs md:text-sm hover:bg-teal-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-900/20"
                            >
                                <MessageCircle size={14} /> Consult
                            </a>
                        ) : (
                             <button disabled className="py-3 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs md:text-sm cursor-not-allowed flex items-center justify-center gap-2">
                                <ShieldCheck size={14} /> Booked
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>

      </div>
    </main>
  );
}