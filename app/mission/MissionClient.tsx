"use client";

import Image from "next/image";
import Link from "next/link";
import { Target, Heart, ShieldCheck, Globe, Quote, ArrowRight, Zap, Activity } from "lucide-react";

export default function MissionClient() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* --- 1. CINEMATIC HERO --- */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-teal-600/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-teal-300 text-xs font-black uppercase tracking-[0.2em] mb-10">
            <Activity size={14} className="animate-pulse" /> Our Vision 2026
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9]">
            The Digital <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-yellow-200">
              Pulse of Health.
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
            We are bridging the gap between world-class specialists and the patients who need them through digital intelligence and radical transparency.
          </p>
        </div>
      </section>

      {/* --- 2. BENTO MISSION GRID --- */}
      <section className="py-32 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MissionCard 
            icon={<Heart className="text-red-500" />}
            title="Patient-First"
            highlight="Intelligence"
            desc="We leverage digital tools to ensure patients find the right specialist for their specific needs."
          />
          <MissionCard 
            icon={<ShieldCheck className="text-teal-500" />}
            title="Verified"
            highlight="Trust"
            desc="Every provider undergoes a strict PMDC verification. We ensure that digital health is synonym with safe health."
          />
          <MissionCard 
            icon={<Globe className="text-blue-500" />}
            title="Universal"
            highlight="Access"
            desc="From local clinics in Pakistan to international consultation suites, we bridge the gap between expertise and care."
          />
        </div>
      </section>

      {/* --- 3. THE FOUNDER'S VISION (MODERNIZED) --- */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            
            <div className="lg:w-1/2 relative">
                <div className="relative z-10 w-full aspect-[4/5] max-w-md mx-auto rounded-[3.5rem] overflow-hidden border-[12px] border-white/5 shadow-2xl">
                    <Image 
                      src="https://cdn.prod.website-files.com/6833690dd0efea69de65146d/698d7fe989b9d6f4d80dce3c_Hashim.avif" 
                      alt="Muhammad Hashim" 
                      fill 
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>
                <div className="absolute -bottom-10 -right-6 md:right-0 bg-white p-8 rounded-[2.5rem] shadow-2xl z-20 max-w-[240px] animate-in slide-in-from-right-10 duration-1000">
                    <p className="text-teal-600 font-black text-4xl mb-1 italic">10+</p>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-tight">
                        Providers in our 2026 Ecosystem
                    </p>
                </div>
            </div>

            <div className="lg:w-1/2 text-white">
                <Quote size={80} className="text-teal-500/20 mb-8" />
                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight tracking-tight">
                  "We aren't just building a website; we are building a <span className="text-teal-400 underline decoration-yellow-400 decoration-4 underline-offset-8">living ecosystem</span>."
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-12 font-medium">
                   As a developer, I saw how fragmented healthcare was. DXN Care was born to use software as a bridge—connecting the world's most talented doctors with the patients who deserve them.
                </p>
                <div className="flex items-center gap-6">
                    <div className="w-16 h-px bg-teal-500"></div>
                    <div>
                        <p className="font-black text-2xl tracking-tighter italic">Muhammad Hashim</p>
                        <p className="text-teal-500 text-xs font-bold uppercase tracking-[0.3em]">Founder & Lead Architect</p>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 4. BOLD CTA --- */}
      <section className="py-32 container mx-auto px-4">
        <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_0_50px_rgba(20,184,166,0.3)]">
            <Zap className="absolute -top-10 -left-10 text-white/10" size={300} />
            <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter">Ready to lead <br/> the change?</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    <Link href="/join-as-a-doctor" className="group px-12 py-6 bg-yellow-400 text-yellow-950 font-black rounded-full hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
                        Join as a Specialist <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
      </section>

    </main>
  );
}

function MissionCard({ icon, title, highlight, desc }: any) {
  return (
    <div className="group p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 transition-all duration-700 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-4">
      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-sm group-hover:shadow-teal-500/10 group-hover:scale-110 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-teal-950 mb-4 leading-none tracking-tighter">
        {title} <br/>
        <span className="text-teal-500">{highlight}</span>
      </h3>
      <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}