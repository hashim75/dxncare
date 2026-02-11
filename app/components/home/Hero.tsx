"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-teal-50/50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/50 border border-teal-200 w-fit text-teal-800 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Verify Your Health Today
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Vitality backed by <br />
              <span className="text-teal-700">Medical Science</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              We combine the ancient healing power of Ganoderma with modern medical expertise. Consult certified doctors and shop organic wellness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex h-14 items-center justify-center rounded-full bg-red-600 px-8 text-base font-semibold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 hover:scale-105"
              >
                Shop Wellness
              </Link>
              <Link
                href="/doctors"
                className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 group"
              >
                Find a Doctor
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex gap-6 pt-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span>Organic Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span>Doctor Approved</span>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="aspect-[4/5] md:aspect-square relative rounded-3xl overflow-hidden shadow-2xl shadow-teal-900/10 bg-slate-200">
               {/* Replace with your image */}
               <Image 
                 src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop" 
                 alt="Doctor holding DXN product"
                 fill
                 className="object-cover"
                 priority
               />
               
               {/* Floating Badge */}
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 1 }}
                 className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50"
               >
                 <div className="flex items-center gap-4">
                   <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                     Dr
                   </div>
                   <div>
                     <p className="font-bold text-slate-900">Dr. Muhammad Iqbal</p>
                     <p className="text-xs text-slate-500">Chief Medical Consultant</p>
                   </div>
                 </div>
               </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;