import Link from "next/link";
import Image from "next/image";
import { getSortedData } from "../lib/markdown";
import { ArrowRight, Stethoscope, Award, MessageCircle } from "lucide-react";

export default function DoctorsPage() {
  const doctors = getSortedData("doctors") as any[];

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-teal-600 font-bold tracking-widest uppercase text-xs">Our Medical Team</span>
            <h1 className="text-4xl md:text-5xl font-bold font-jakarta text-teal-950 mb-4 mt-2">Meet Our Specialists</h1>
            <p className="text-slate-600">Experienced professionals dedicated to your holistic well-being.</p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doc) => (
                <div key={doc.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center">
                    
                    {/* Image */}
                    <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-teal-50 shadow-inner">
                        <Image 
                            src={doc.profile_image || doc.image || "/images/placeholder-doctor.jpg"} 
                            alt={doc.name} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    {/* Info */}
                    <h2 className="text-xl font-bold text-teal-950 mb-1">{doc.name}</h2>
                    <div className="flex items-center gap-1.5 text-teal-600 font-medium text-sm mb-4 bg-teal-50 px-3 py-1 rounded-full">
                        <Stethoscope size={14} />
                        {doc.specialization || "General Practitioner"}
                    </div>

                    <p className="text-slate-500 text-sm line-clamp-3 mb-6">
                        {doc.short_description || "Specialist dedicated to providing the best care for patients using holistic and modern approaches."}
                    </p>

                    {/* Actions */}
                    <div className="mt-auto w-full flex gap-3">
                        <Link 
                            href={`/doctors/${doc.slug || doc.id}`} 
                            className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                        >
                            View Profile
                        </Link>
                        {doc.whatsapp_link && (
                            <a 
                                href={doc.whatsapp_link} 
                                target="_blank" 
                                className="flex-1 py-3 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <MessageCircle size={16} /> Book
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>

      </div>
    </main>
  );
}