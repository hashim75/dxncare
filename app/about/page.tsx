"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Heart, ShieldCheck, Globe, Users, Leaf, Microscope } from "lucide-react";

const stats = [
  { label: "Happy Families", value: "10k+", icon: Users },
  { label: "Certified Doctors", value: "50+", icon: ShieldCheck },
  { label: "Organic Products", value: "100%", icon: Leaf }, // Changed icon to Leaf for organic
  { label: "Years of Trust", value: "15+", icon: Heart },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 bg-teal-950 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
            <Image 
                src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2000&auto=format&fit=crop" 
                alt="Medical Science Background" 
                fill 
                className="object-cover"
                priority
            />
        </div>
        
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-800/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-900/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-teal-200 text-xs font-bold tracking-wider uppercase mb-8 backdrop-blur-md"
          >
            <Globe size={12} /> Global Wellness Authority
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-jakarta text-white mb-8 leading-tight"
          >
            Bridging <span className="text-emerald-400">Nature</span> & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white">Medical Science</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-teal-100/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            DXN Care was founded on a simple belief: True wellness comes from combining the ancient healing power of Ganoderma with modern clinical expertise.
          </motion.p>
        </div>
      </section>

      {/* 2. MISSION SECTION */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Image Grid */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4 mt-12">
                 {/* Image 1: Nature/Organic */}
                 <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-2xl group">
                    <Image 
                        src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop" 
                        alt="Organic Ganoderma Mushrooms" 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                    <span className="absolute bottom-4 left-4 text-white font-bold text-sm flex items-center gap-2">
                        <Leaf size={16} className="text-emerald-400"/> 100% Organic
                    </span>
                 </div>

                 {/* Stat Box */}
                 <div className="relative h-40 rounded-[2rem] overflow-hidden shadow-lg bg-teal-50 flex items-center justify-center p-6 text-center border border-teal-100">
                    <div>
                        <p className="text-4xl font-bold text-teal-950 font-jakarta">10M+</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mt-1">Lives Impacted</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 {/* Stat Box */}
                 <div className="relative h-40 rounded-[2rem] overflow-hidden shadow-lg bg-red-50 flex items-center justify-center p-6 text-center border border-red-100">
                    <div>
                        <p className="text-4xl font-bold text-red-600 font-jakarta">ISO</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mt-1">Quality Certified</p>
                    </div>
                 </div>

                 {/* Image 2: Doctor/Science */}
                 <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-2xl group">
                    <Image 
                        src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop" 
                        alt="Doctor Consultation" 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                     <span className="absolute bottom-4 left-4 text-white font-bold text-sm flex items-center gap-2">
                        <Microscope size={16} className="text-blue-400"/> Clinical Research
                    </span>
                 </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="pl-0 lg:pl-10"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-teal-950 font-jakarta mb-8 leading-tight">
                More than just a <br /> 
                <span className="text-teal-600">Supplement Store.</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  At DXN Care, we realized that people were buying health products without guidance. They had the <span className="font-bold text-teal-800">"what"</span> but not the <span className="font-bold text-teal-800">"how."</span>
                </p>
                <p>
                  That's why we created a platform where **Medical Doctors** and **Wellness Experts** guide your journey. We don't just sell you a bottle; we prescribe a lifestyle.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mt-10">
                {[
                    "Direct Doctor Access", 
                    "Personalized Dosage Plans", 
                    "Halal & Organic Certified", 
                    "Global Delivery Network"
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                             <CheckCircle2 size={14} />
                        </div>
                        <span className="font-bold text-teal-950 text-sm">{item}</span>
                    </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800/50 skew-x-12 translate-x-1/3"></div>
          
          <div className="container mx-auto px-4 relative z-10">
             <div className="flex flex-col lg:flex-row items-center gap-12">
                 
                 {/* Left: Doctor Image (Fixed Height) */}
                 <div className="lg:w-1/2 w-full flex justify-center">
                    <div className="relative w-full max-w-md h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 bg-slate-800">
                        {/* ✅ UPDATED WORKING IMAGE URL */}
                        <Image 
                            src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop" 
                            alt="Dr. Rabia Iqbal" 
                            fill 
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 500px"
                        />
                    </div>
                 </div>

                 {/* Right: Content */}
                 <div className="lg:w-1/2 space-y-8">
                     <div className="w-16 h-16 bg-teal-900/50 rounded-2xl flex items-center justify-center border border-teal-800">
                        <Microscope size={32} className="text-teal-400" />
                     </div>
                     
                     <h2 className="text-3xl md:text-5xl font-bold font-jakarta leading-tight">
                        Science-Backed.<br/>
                        <span className="text-teal-400">Nature-Derived.</span>
                     </h2>
                     
                     <div className="relative">
                        <span className="absolute -top-4 -left-4 text-6xl text-slate-700 opacity-50">"</span>
                        <p className="text-slate-300 text-lg leading-relaxed relative z-10 pl-4">
                            We believe that the future of medicine is integrative. By validating ancient herbal wisdom with modern clinical trials, we offer solutions that are safe, effective, and holistic.
                        </p>
                     </div>

                
                 </div>

             </div>
          </div>
      </section>

      {/* 4. STATS SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-[2rem] bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 text-center group border border-slate-100 hover:border-teal-100"
                    >
                        <div className="w-16 h-16 mx-auto bg-white group-hover:bg-teal-600 text-teal-600 group-hover:text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-colors">
                            <stat.icon size={28} />
                        </div>
                        <p className="text-4xl font-bold text-slate-900 font-jakarta mb-2">{stat.value}</p>
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

    </main>
  );
}