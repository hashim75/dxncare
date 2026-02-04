"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Video, Phone, Stethoscope, CalendarCheck, ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Define the shape of your Doctor data from the DB
interface Doctor {
  id: string;
  name: string;
  slug: string;
  specialization: string; // Matches your Markdown field
  profile_image: string;  // Matches your Markdown field
  available?: boolean;    // Optional, defaults to true if missing
}

interface DoctorSectionProps {
  doctors: Doctor[]; // Receives real data from parent
}

const DoctorSection = ({ doctors }: DoctorSectionProps) => {
  
  // Fallback if no doctors are passed (prevents crashes)
  if (!doctors || doctors.length === 0) {
    return null;
  }

  return (
    <section id="doctors" className="py-24 bg-gradient-to-b from-teal-50/50 to-white relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Stethoscope size={14} /> Medical Experts
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-teal-950 font-jakarta tracking-tight mb-4">
            Consult Top Specialists
          </h2>
          <p className="text-lg text-slate-500">
            Get professional medical advice, nutrition plans, and surgical consultations from the comfort of your home.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true} // Infinite Loop
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="pb-14 !px-2"
        >
          {doctors.map((doctor) => {
            // Default availability to true if not specified in DB
            const isAvailable = doctor.available !== false; 

            return (
              <SwiperSlide key={doctor.id} className="h-auto">
                <div className="group bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-teal-900/10 hover:border-teal-200 transition-all duration-500 h-full flex flex-col relative overflow-hidden">
                  
                  {/* Available Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                      isAvailable 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                      {isAvailable ? 'Online' : 'Busy'}
                    </span>
                  </div>

                  {/* Image Section */}
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-gradient-to-br from-teal-400 to-blue-500 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-white">
                      <Image 
                        src={doctor.profile_image || "/images/placeholder.jpg"} 
                        alt={doctor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="text-center flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-teal-600 font-medium text-sm mb-4 line-clamp-1">
                      {doctor.specialization}
                    </p>
                    
                    <div className="w-full h-px bg-slate-100 mb-6"></div>

                    <div className="mt-auto grid grid-cols-2 gap-3">
                      {/* Link to Dynamic Doctor Detail Page */}
                      <Link href={`/doctors/${doctor.slug}`} className="col-span-2">
                          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-950 text-white text-sm font-bold hover:bg-teal-700 transition-all active:scale-95 shadow-lg shadow-teal-900/20">
                          <CalendarCheck size={16} /> Book Appointment
                          </button>
                      </Link>
                      
                      {/* Video/Audio placeholders or actual links if available */}
                     
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="text-center mt-8">
            <Link href="/doctors" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors group">
                View All Doctors <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
        </div>

      </div>
    </section>
  );
};

export default DoctorSection;