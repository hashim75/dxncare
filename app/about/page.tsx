"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Heart, ShieldCheck, Globe, Users } from "lucide-react";

const stats = [
  { label: "Happy Families", value: "10k+", icon: Users },
  { label: "Certified Doctors", value: "50+", icon: ShieldCheck },
  { label: "Organic Products", value: "100%", icon: Globe },
  { label: "Years of Trust", value: "15+", icon: Heart },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-teal-950 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-teal-200 text-xs font-bold tracking-wider uppercase mb-6"
          >
            Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-jakarta text-white mb-6"
          >
            Bridging Nature & <span className="text-red-500">Medical Science</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-teal-100/80 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            DXN Care was founded on a simple belief: True wellness comes from combining the ancient healing power of Ganoderma with modern clinical expertise.
          </motion.p>
        </div>
      </section>

      {/* 2. MISSION SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Image Grid */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4 mt-8">
                 <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
                    <Image src="https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=800&auto=format&fit=crop" alt="Wellness" fill className="object-cover" />
                 </div>
                 <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg bg-teal-50 flex items-center justify-center p-6 text-center">
                    <div>
                        <p className="text-4xl font-bold text-teal-950 font-jakarta">100%</p>
                        <p className="text-sm text-slate-500 uppercase tracking-wide font-bold">Organic</p>
                    </div>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg bg-red-50 flex items-center justify-center p-6 text-center">
                    <div>
                        <p className="text-4xl font-bold text-red-600 font-jakarta">ISO</p>
                        <p className="text-sm text-slate-500 uppercase tracking-wide font-bold">Certified</p>
                    </div>
                 </div>
                 <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
                    <Image src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop" alt="Doctor" fill className="object-cover" />
                 </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-teal-950 font-jakarta mb-6">
                More than just a <br /> Supplement Store.
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  At DXN Care, we realized that people were buying health products without guidance. They had the "what" but not the "how."
                </p>
                <p>
                  That's why we created a platform where **Medical Doctors** and **Wellness Experts** guide your journey. We don't just sell you a bottle; we prescribe a lifestyle.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                    "Direct Doctor Access", 
                    "Personalized Dosage Plans", 
                    "Halal & Organic Certified", 
                    "Global Delivery Network"
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="text-red-600 shrink-0" size={20} />
                        <span className="font-medium text-teal-900">{item}</span>
                    </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. STATS SECTION */}
      <section className="py-20 bg-teal-50">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-3xl shadow-sm text-center border border-teal-100"
                    >
                        <div className="w-12 h-12 mx-auto bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
                            <stat.icon size={24} />
                        </div>
                        <p className="text-3xl font-bold text-teal-950 font-jakarta">{stat.value}</p>
                        <p className="text-sm text-slate-500 font-medium uppercase tracking-wide mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

    </main>
  );
}