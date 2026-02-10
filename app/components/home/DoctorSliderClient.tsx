"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Stethoscope, Calendar } from "lucide-react";

// Define interface matching your Markdown frontmatter
interface Doctor {
  id: string;
  name: string;
  role?: string;           // Fallback if 'role' is missing
  specialization?: string; // Markdown usually has 'specialization'
  image?: string;
  profile_image?: string;  // Markdown usually has 'profile_image'
  isOnline?: boolean;      // Optional
}

export default function DoctorSliderClient({ doctors }: { doctors: Doctor[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalItems = doctors.length;
  const maxIndex = totalItems - itemsToShow;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  if (!doctors || doctors.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-teal-50/50 to-white overflow-hidden relative">
      
       {/* Decorative Background Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* === HEADER === */}
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest mb-4">
                <Stethoscope size={14} /> 
                <span>Expert Care</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-jakarta text-teal-950 mb-4">
                Consult Top <span className="text-teal-600">Specialists</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
                Get professional medical advice, nutrition plans, and consultations from the comfort of your home.
            </p>
        </div>

        {/* === SLIDER WRAPPER === */}
        <div className="relative group">
            
            {/* Desktop Arrows */}
            <button onClick={prevSlide} className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg rounded-full items-center justify-center text-teal-900 hover:bg-teal-600 hover:text-white transition-all border border-slate-100">
                <ArrowLeft size={20} />
            </button>
            <button onClick={nextSlide} className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg rounded-full items-center justify-center text-teal-900 hover:bg-teal-600 hover:text-white transition-all border border-slate-100">
                <ArrowRight size={20} />
            </button>

            {/* SLIDER TRACK */}
            <div className="overflow-hidden px-4 md:px-0 py-10 -my-10">
                <motion.div 
                    className="flex"
                    animate={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4 box-border">
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-300 border border-slate-100 text-center group h-full flex flex-col items-center relative">
                                
                                {/* Status Badge */}
                                <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${doctor.isOnline !== false ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${doctor.isOnline !== false ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                    {doctor.isOnline !== false ? 'Online' : 'Offline'}
                                </div>

                                {/* Image Circle */}
                                <div className="relative w-32 h-32 mb-6">
                                    <div className="absolute inset-0 rounded-full border-2 border-teal-100 p-1 group-hover:border-teal-300 transition-colors">
                                        <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100">
                                            <Image 
                                                // Support both naming conventions
                                                src={doctor.image || doctor.profile_image || "/images/placeholder.jpg"} 
                                                alt={doctor.name} 
                                                fill 
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Info */}
                                <h3 className="text-xl font-bold text-teal-950 mb-2 font-jakarta">{doctor.name}</h3>
                                <p className="text-sm text-teal-600/80 font-medium mb-6 line-clamp-2 h-10">
                                    {doctor.role || doctor.specialization}
                                </p>

                                <div className="w-full h-px bg-slate-100 mb-6"></div>

                                {/* Button */}
                                <Link 
                                    href={`/doctors/${doctor.id}`} 
                                    className="mt-auto w-full bg-teal-950 text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors shadow-lg shadow-teal-900/20"
                                >
                                    <Calendar size={16} /> 
                                    <span>Book Appointment</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>

        {/* Mobile Dots */}
        <div className="flex md:hidden justify-center gap-2 mt-8">
             {Array.from({ length: totalItems - itemsToShow + 1 }).map((_, i) => (
                <button 
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-8 bg-teal-600" : "w-2 bg-slate-300"}`}
                />
             ))}
        </div>

      </div>
    </section>
  );
}