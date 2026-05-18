"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, ArrowRight, ShieldCheck, Zap, Activity, Star, CheckCircle, Package } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const BUNDLE_PRODUCT = {
  id: "bundle-mass-1",
  name: "MASS & MUSCLE STACK",
  price: 2499,
  originalPrice: 2798,
  slug: "mass-muscle-bundle"
};

export default function BundleUI() {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: BUNDLE_PRODUCT.id, name: BUNDLE_PRODUCT.name, price: BUNDLE_PRODUCT.price, image: "/images/gainforte-1.png", slug: BUNDLE_PRODUCT.slug });
    }
  };

  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

  return (
    <main className="w-full bg-[#fbfcfa] text-slate-900 font-sans overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[85vh]">
        <div className="absolute top-0 right-[-10%] w-[50%] h-[500px] bg-[#df2c25]/5 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-[-10%] w-[40%] h-[400px] bg-[#1e9b85]/10 blur-[120px] rounded-full -z-10"></div>
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6 md:space-y-8 z-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#df2c25]/10 text-[#df2c25] px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border border-[#df2c25]/20">
            <Package size={14} /> Ultimate Transformation Kit
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-[4.5rem] font-extrabold leading-[1.1] text-slate-900 tracking-tight">
            The Complete <br />
            <span className="text-[#1e9b85]">Mass & Muscle</span> Stack.
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
            Gain healthy weight and turn it directly into lean muscle. Combine the appetite-boosting power of <b>GainForte</b> with the explosive strength of <b>Force-X</b>.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <div className="flex items-end gap-3 md:gap-4">
              <span className="text-3xl md:text-4xl font-extrabold text-[#0a251e]">Rs. {BUNDLE_PRODUCT.price}</span>
              <span className="text-lg md:text-xl font-bold text-slate-400 line-through mb-1">Rs. {BUNDLE_PRODUCT.originalPrice}</span>
              <span className="bg-[#df2c25] text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-2">Save Rs. 299</span>
            </div>
            <p className="text-xs md:text-sm text-[#1e9b85] font-bold flex items-center gap-1"><CheckCircle size={14}/> Free Delivery Included</p>
          </motion.div>

          {/* MOBILE RESPONSIVE CART ROW */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 w-full">
            <div className="flex items-center justify-between sm:justify-center border-2 border-[#eaf5f3] bg-white rounded-full h-14 overflow-hidden shadow-sm px-2 w-full sm:w-auto min-w-[120px]">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 md:px-5 text-2xl text-[#1e9b85] h-full font-bold">-</button>
              <span className="w-8 text-center font-extrabold text-lg text-slate-900">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 md:px-5 text-2xl text-[#1e9b85] h-full font-bold">+</button>
            </div>
            <button onClick={handleAddToCart} className="bg-[#df2c25] hover:bg-[#c6231d] text-white px-6 md:px-8 h-14 rounded-full font-extrabold text-sm md:text-lg transition-all shadow-[0_0_40px_-10px_rgba(223,44,37,0.6)] flex items-center justify-center gap-2 w-full sm:flex-1">
              Add Bundle To Cart <ArrowRight size={20}/>
            </button>
          </motion.div>
        </motion.div>

        {/* MOBILE RESPONSIVE DUAL IMAGE DISPLAY */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[350px] md:h-[550px] w-full flex items-center justify-center group mt-8 md:mt-0"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[350px] h-[250px] md:h-[350px] bg-white rounded-full blur-[60px] md:blur-[80px] -z-10"></div>
          
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="relative w-40 sm:w-48 md:w-64 h-56 sm:h-64 md:h-80 z-10 -mr-6 md:-mr-12 shadow-2xl rounded-2xl md:rounded-3xl border-[3px] md:border-4 border-white overflow-hidden bg-white rotate-[-5deg]">
            <Image src="/images/gainforte-1.png" alt="GainForte" fill className="object-cover" priority />
          </motion.div>
          
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1e9b85] text-white rounded-full flex items-center justify-center z-30 shadow-xl border-[3px] md:border-4 border-[#fbfcfa]">
            <Plus size={20} className="md:w-6 md:h-6" strokeWidth={3} />
          </div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="relative w-36 sm:w-40 md:w-56 h-48 sm:h-56 md:h-72 z-20 -ml-6 md:-ml-12 shadow-2xl rounded-2xl md:rounded-3xl border-[3px] md:border-4 border-white overflow-hidden bg-white rotate-[5deg] mt-12 md:mt-20">
            <Image src="/images/force-X-1.png" alt="Force-X" fill className="object-cover" priority />
          </motion.div>
        </motion.div>
      </section>

      {/* --- HOW THEY WORK TOGETHER --- */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900">Why Stack Them?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-medium">GainForte provides the fuel. Force-X builds the engine. Together, they create the ultimate anabolic environment naturally.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-[#f4f9f8] p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-[#eaf5f3]">
              <div className="inline-flex bg-white text-[#1e9b85] px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">Step 1: The Fuel</div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">GainForte (Syrup)</h3>
              <p className="text-slate-600 mb-6 text-sm md:text-base font-medium leading-relaxed">It is impossible to build muscle without a caloric surplus. GainForte naturally opens up your appetite and optimizes your gut so your body can absorb massive amounts of nutrients.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-xs md:text-sm font-bold text-slate-800"><CheckCircle size={18} className="text-[#1e9b85]"/> Increases daily caloric intake</li>
              </ul>
            </div>

            <div className="bg-[#fff5f5] p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-[#ffebeb]">
              <div className="inline-flex bg-white text-[#df2c25] px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">Step 2: The Engine</div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">Force-X (Capsules)</h3>
              <p className="text-slate-600 mb-6 text-sm md:text-base font-medium leading-relaxed">Once GainForte brings the extra calories in, Force-X ensures those calories are used to build dense muscle fibers instead of being stored as unwanted belly fat.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-xs md:text-sm font-bold text-slate-800"><CheckCircle size={18} className="text-[#df2c25]"/> Directs calories to muscle synthesis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- DAILY ROUTINE --- */}
      <section className="py-16 md:py-24 px-4 bg-[#0a251e] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 md:mb-16 tracking-tight">Your Daily Protocol</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-white/10 -z-0"></div>
            {[
              { time: "Morning", title: "Breakfast", action: "2 Tbsp GainForte", icon: <Activity/> },
              { time: "Pre-Workout", title: "30 Mins Before", action: "1 Force-X Capsule", icon: <Zap/> },
              { time: "Evening", title: "Post-Dinner", action: "2 Tbsp GainForte", icon: <ShieldCheck/> }
            ].map((step, i) => (
               <div key={i} className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-xl">
                 <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1e9b85] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-white shadow-lg shadow-[#1e9b85]/40">{step.icon}</div>
                 <h4 className="text-[#84a9a0] text-[10px] md:text-sm font-bold uppercase tracking-widest mb-1">{step.time}</h4>
                 <h3 className="text-lg md:text-xl font-extrabold mb-4">{step.title}</h3>
                 <div className="inline-block bg-white text-[#0a251e] px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-xs md:text-sm">{step.action}</div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="py-16 md:py-24 px-4 max-w-4xl mx-auto">
        <div className="bg-[#f4f9f8] border-2 border-[#1e9b85]/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6">Commit to the <br className="hidden md:block"/>Transformation.</h2>
          <button onClick={handleAddToCart} className="bg-[#df2c25] hover:bg-[#c6231d] text-white px-6 md:px-10 py-4 md:py-5 rounded-full font-extrabold text-sm md:text-xl transition-all shadow-[0_0_50px_-10px_rgba(223,44,37,1)] flex items-center gap-2 md:gap-3 w-full sm:w-auto justify-center mt-6">
            Add Bundle To Cart <ArrowRight size={20} className="md:w-6 md:h-6"/>
          </button>
        </div>
      </section>
    </main>
  );
}