"use client";

import { useState } from "react";
import Image from "next/image";
// Using your exact file path from the screenshots
import GainForteImg from "../../public/images/gainforte-4.png"; 
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, Utensils, Zap, ShieldCheck, Star, ChevronDown, 
  ShoppingCart, Activity, Check, ArrowRight, PlayCircle
} from "lucide-react";
import { useCartStore } from "../store/cartStore";

const PRODUCT = {
  id: "gainforte-1",
  name: "GAINFORTE",
  price: 1499,
  slug: "gainforte"
};

const faqs = [
  { q: "How do I use GainForte?", a: "Take 2 tablespoons of GainForte syrup twice a day, preferably after breakfast and dinner." },
  { q: "How long until I see weight gain?", a: "Most users notice an increased appetite within the first week, and visible healthy mass gain after 3 to 4 weeks of consistent use." },
  { q: "Are the weight gain results permanent?", a: "Yes! Unlike steroid-based gainers that cause water retention, GainForte improves your gut absorption and natural appetite for sustainable mass." },
  { q: "Are there any side effects?", a: "No. It is formulated with 100% natural herbal ingredients and is completely free from harmful chemicals." }
];

export default function GainForteUI() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ 
        id: PRODUCT.id, 
        name: PRODUCT.name, 
        price: PRODUCT.price, 
        image: "/images/gainforte-1.png", 
        slug: PRODUCT.slug 
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfcfa] text-slate-900 font-sans overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 left-[-10%] w-[50%] h-[500px] bg-[#1e9b85]/5 blur-[120px] rounded-full -z-10"></div>
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="flex flex-col items-start space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#eaf5f3] text-[#1e9b85] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-[#1e9b85]/20">
            <span className="w-1.5 h-1.5 bg-[#1e9b85] rounded-full animate-pulse"></span> DXN CARE • 300ml Syrup
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] text-slate-900 tracking-tight uppercase">
            {PRODUCT.name}
          </h1>
          <p className="text-xl text-[#1e9b85] font-bold">Advanced Mass & Appetite Stimulator</p>

          <div className="flex items-center gap-2 text-amber-500">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
            <span className="text-slate-500 text-sm ml-2 font-medium">(214 Reviews)</span>
          </div>

          <p className="text-4xl font-extrabold text-slate-900">
            Rs. {PRODUCT.price}
          </p>

          {/* Quantity & Cart Row */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
            <div className="flex items-center border-2 border-[#eaf5f3] bg-white rounded-full h-14 overflow-hidden shadow-sm">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 text-xl hover:bg-[#f4f9f8] text-[#1e9b85] h-full transition-colors font-bold">-</button>
              <span className="w-12 text-center font-extrabold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-5 text-xl hover:bg-[#f4f9f8] text-[#1e9b85] h-full transition-colors font-bold">+</button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="bg-[#df2c25] hover:bg-[#c6231d] text-white px-10 h-14 rounded-full font-extrabold tracking-widest uppercase transition-all shadow-lg shadow-red-500/20 flex items-center justify-center flex-1 gap-2"
            >
              Add To Cart <ArrowRight size={20}/>
            </button>
          </div>

          {/* Trust Icons */}
          <div className="grid grid-cols-3 gap-6 pt-6 w-full max-w-md">
            {[
                { icon: <Leaf size={22}/>, label: "100% Herbal" },
                { icon: <Utensils size={22}/>, label: "Eat More" },
                { icon: <ShieldCheck size={22}/>, label: "Clinical" }
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#eaf5f3] text-[#1e9b85] flex items-center justify-center">
                        {item.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">{item.label}</span>
                </div>
            ))}
          </div>
        </motion.div>

        {/* Right Image */}
        <div className="relative h-[600px] w-full flex justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="relative w-full max-w-md aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white"
          >
            <Image src={GainForteImg} alt="GainForte Syrup" fill className="object-cover" priority />
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100"
            >
              <Activity size={24} className="text-[#df2c25] mb-1" />
              <div className="text-[10px] font-bold uppercase text-slate-400">Metabolic</div>
              <div className="text-sm font-black text-slate-900">Boost</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- INFUSED WITH SECTION --- */}
      <section className="py-24 bg-white px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex text-[#1e9b85] text-xs font-bold uppercase tracking-widest mb-2">Ingredients</div>
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-slate-900">Nature's <span className="text-[#1e9b85]">Growth Force</span></h2>
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            <div className="flex flex-col space-y-12 text-center md:text-right">
              <div className="group">
                <h4 className="font-extrabold text-xl uppercase tracking-wider mb-2 text-[#1e9b85]">Ashwagandha</h4>
                <p className="text-sm text-slate-500 max-w-[240px]">Reduces metabolic stress and naturally supports healthy weight gain.</p>
              </div>
              <div>
                <h4 className="font-extrabold text-xl uppercase tracking-wider mb-2 text-[#1e9b85]">Safed Musli</h4>
                <p className="text-sm text-slate-500 max-w-[240px]">Known traditionally for building physical strength and lean muscle tissue.</p>
              </div>
            </div>

            {/* Center Bottle */}
            <div className="relative w-64 h-80 shrink-0">
              <div className="absolute inset-0 bg-[#eaf5f3] blur-[60px] rounded-full opacity-50"></div>
              <Image src={GainForteImg} alt="GainForte Ingredients" fill className="object-cover rounded-3xl relative z-10 border-4 border-white shadow-xl" />
            </div>

            <div className="flex flex-col space-y-12 text-center md:text-left">
              <div>
                <h4 className="font-extrabold text-xl uppercase tracking-wider mb-2 text-[#1e9b85]">Shatavari</h4>
                <p className="text-sm text-slate-500 max-w-[240px]">Improves nutrient absorption and gently stimulates hunger cues.</p>
              </div>
              <div>
                <h4 className="font-extrabold text-xl uppercase tracking-wider mb-2 text-[#1e9b85]">Synergy Formula</h4>
                <p className="text-sm text-slate-500 max-w-[240px]">Fast-absorbing syrup ensures maximum nutrient delivery in minutes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW TO USE SECTION --- */}
      <section className="py-24 bg-[#0a251e] px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 uppercase">The Daily <span className="text-[#1e9b85]">Protocol</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "2 Tablespoons", desc: "Measure exactly 2 tablespoons of the premium GainForte syrup." },
              { step: 2, title: "Direct or Milk", desc: "Consume directly, or mix it well with a glass of warm milk." },
              { step: 3, title: "Twice Daily", desc: "Take consistently after breakfast and dinner for maximum results." }
            ].map((item) => (
              <div key={item.step} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] flex flex-col items-center text-center group hover:bg-white hover:text-[#0a251e] transition-all duration-500">
                <div className="w-14 h-14 bg-[#1e9b85] text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-6 shadow-lg shadow-[#1e9b85]/20 group-hover:bg-[#0a251e]">
                  {item.step}
                </div>
                <h3 className="font-extrabold text-xl uppercase tracking-wider mb-4">{item.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BENEFITS SECTION --- */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 uppercase text-slate-900">Why choose <span className="text-[#1e9b85]">GainForte</span></h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Utensils size={36}/>, title: "Appetite Boost" },
              { icon: <Activity size={36}/>, title: "Muscle Mass" },
              { icon: <Zap size={36}/>, title: "More Energy" },
              { icon: <ShieldCheck size={36}/>, title: "100% Clinical" }
            ].map((benefit, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-6">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] bg-[#f4f9f8] flex items-center justify-center text-[#1e9b85] shadow-sm border border-slate-50 hover:scale-105 hover:bg-[#eaf5f3] transition-all duration-500">
                  {benefit.icon}
                </div>
                <h4 className="font-extrabold uppercase tracking-widest text-xs text-slate-900">{benefit.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQS & REVIEWS (SPLIT LAYOUT) --- */}
      <section className="py-24 bg-[#fbfcfa] px-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          
          {/* FAQs */}
          <div>
            <div className="inline-flex text-[#1e9b85] text-xs font-bold uppercase tracking-widest mb-2">Help Center</div>
            <h2 className="text-4xl font-extrabold uppercase tracking-tight mb-10 text-slate-900">Common Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full p-6 flex items-center justify-between text-left group"
                  >
                    <span className="font-bold text-sm tracking-widest uppercase group-hover:text-[#1e9b85] transition-colors">{faq.q}</span>
                    <ChevronDown size={18} className={`text-[#1e9b85] transition-transform duration-300 ${openFAQ === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFAQ === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 text-slate-500 text-sm leading-relaxed"
                      >
                        <div className="pt-2 border-t border-slate-50">
                            {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings & Reviews Snapshot */}
          <div>
            <div className="inline-flex text-[#df2c25] text-xs font-bold uppercase tracking-widest mb-2">Social Proof</div>
            <h2 className="text-4xl font-extrabold uppercase tracking-tight mb-10 text-slate-900">User Stories</h2>
            
            <div className="flex items-center gap-8 mb-10 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="text-center">
                <div className="text-5xl font-black text-slate-900 tracking-tighter">4.8</div>
                <div className="flex items-center gap-1 text-amber-500 my-2 justify-center">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">214 Reviews</div>
              </div>
              
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3 text-[10px]">
                    <div className="w-8 flex items-center gap-1 font-bold text-slate-500">{star} <Star size={10} fill="currentColor" className="text-amber-500"/></div>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#1e9b85]" style={{ width: star === 5 ? '88%' : star === 4 ? '10%' : '2%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { n: "Bilal K.", r: 5, t: "Amazing results. Gained 4kg in a month and my energy levels are higher than ever." },
                { n: "Sarah M.", r: 5, t: "Finally found a syrup that works without feeling heavy. My appetite is back!" },
                { n: "Hamza T.", r: 4, t: "Great taste and very effective. It took 10 days for me to start feeling the hunger." }
              ].map((rev, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm group hover:border-[#1e9b85] transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-extrabold text-sm tracking-wider uppercase text-slate-900">{rev.n}</h4>
                      <div className="flex text-amber-500 mt-1">
                        {[...Array(rev.r)].map((_, idx) => <Star key={idx} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#eaf5f3] flex items-center justify-center text-[#1e9b85]">
                        <Check size={16} strokeWidth={3} />
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm italic font-medium leading-relaxed">"{rev.t}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="py-24 bg-[#0a251e] text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#1e9b85]/10 blur-[120px] rounded-full"></div>
        <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">TRANSFORM <br/>YOUR BODY TODAY</h2>
            <button 
                onClick={handleAddToCart}
                className="bg-[#df2c25] hover:bg-[#c6231d] text-white px-12 py-5 rounded-full text-lg font-black tracking-widest uppercase transition-all shadow-2xl shadow-red-500/40 flex items-center gap-3 mx-auto"
            >
                Order Now <ArrowRight size={24}/>
            </button>
            <p className="text-[#84a9a0] text-xs mt-10 uppercase font-bold tracking-[0.2em]">© 2026 DXN CARE • Pakistan's Health Partner</p>
        </div>
      </footer>

    </main>
  );
}