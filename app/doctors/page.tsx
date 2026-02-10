import Link from "next/link";
import Image from "next/image";
import { getSortedData } from "../lib/markdown"; // Check if path needs to be "../lib/markdown" or "../../" depending on folder depth
import { ArrowRight, Stethoscope, MessageCircle, ShieldCheck, Video } from "lucide-react";

// ✅ 1. DEFINE YOUR EXACT CUSTOM ORDER (Matches filenames in your screenshot)
const CUSTOM_ORDER = [
  "dr-muhammad-iqbal",  // 1. Dr. Muhammad Iqbal
  "dr-muhammad-qasim",  // 2. Dr. Qasim Iqbal (Filename appears to be this)
  "dr-rabia-iqbal",     // 3. Dr. Rabia Iqbal
  "dr-zikria-aqeel",    // 4. Dr. Zikria Aqeel
  "dr-ali-amjad",       // 5. Dr. Ali Amjad
  "dr-maham-fatima"     // 6. Dr. Maham Fatima
];

export default async function DoctorsPage() {
  // 1. Fetch all data
  const rawDoctors = getSortedData("doctors") as any[];

  // 2. CUSTOM SORT LOGIC
  // This forces the doctors to appear in the order defined in CUSTOM_ORDER.
  // If a doctor isn't in the list, they appear at the end.
  const doctors = rawDoctors.sort((a, b) => {
    const indexA = CUSTOM_ORDER.indexOf(a.id); // 'id' usually matches the filename
    const indexB = CUSTOM_ORDER.indexOf(b.id);

    // If both are in the list, sort by their position in the list
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    
    // If only A is in the list, put A first
    if (indexA !== -1) return -1;
    
    // If only B is in the list, put B first
    if (indexB !== -1) return 1;
    
    // If neither is in the list, keep original order
    return 0;
  });

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {doctors.map((doc) => (
                <div 
                    key={doc.id} 
                    className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center h-full"
                >
                    
                    {/* Status Badge */}
                    <div className="w-full flex justify-end mb-2">
                         <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${doc.isOnline !== false ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-500'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${doc.isOnline !== false ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                            {doc.isOnline !== false ? 'Online' : 'Offline'}
                        </span>
                    </div>

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
                        {doc.specialization || doc.role || "General Practitioner"}
                    </div>

                    <p className="text-slate-500 text-sm md:text-base line-clamp-2 mb-6 leading-relaxed h-10">
                        {doc.short_description || "Specialist dedicated to providing the best care for patients using holistic and modern approaches."}
                    </p>

                    {/* Actions */}
                    <div className="mt-auto w-full grid grid-cols-2 gap-3">
                        <Link 
                            href={`/doctors/${doc.slug || doc.id}`} 
                            className="py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs md:text-sm hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center justify-center gap-2 border border-slate-100"
                        >
                            View Profile <ArrowRight size={14} className="opacity-50" />
                        </Link>
                        
                        <Link
                            href={`/doctors/${doc.slug || doc.id}#book`}
                            className="py-3 rounded-xl bg-teal-950 text-white font-bold text-xs md:text-sm hover:bg-teal-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-900/20"
                        >
                            <Video size={14} /> Consult
                        </Link>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </main>
  );
}