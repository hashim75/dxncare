"use client";

import { useState } from "react";
import Image from "next/image";
// NOTE: Make sure this path points to your actual digestwell image
import DigestWellImg from "../../public/images/digestwell.png"; 
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, Flame, Wind, ShieldCheck, Star, ChevronDown, 
  Activity, Check, ArrowRight 
} from "lucide-react";
import { useCartStore } from "../store/cartStore";

// --- DATA ---
const PRODUCT = {
  id: "digestwell-1",
  name: "DIGESTWELL",
  price: 899,
  slug: "digestwell"
};

const faqs = [
  { q: "How do I use DigestWell?", a: "Take 1 teaspoon of DigestWell powder with half a glass of water after your main meals." },
  { q: "Is it safe for diabetic patients?", a: "Absolutely! DigestWell is 100% Sugar-Free and Gluten-Free." },
  { q: "Will it help me lose weight?", a: "By improving gut health and boosting metabolism, it indirectly aids weight management." },
  { q: "Are there any side effects?", a: "No. It is made from 100% natural herbs and is entirely chemical-free." }
];

export default function DigestWellUI() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ 
        id: PRODUCT.id, 
        name: PRODUCT.name, 
        price: PRODUCT.price, 
        image: "/images/digestwell.png", 
        slug: PRODUCT.slug 
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfcfa] text-slate-900 font-sans overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="absolute top-0 left-[-10%] w-[50%] h-[500px] bg-[#1e9b85]/5 blur-[120px] rounded-full -z-10"></div>
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="flex flex-col items-start space-y-4 md:space-y-5"
        >
          <div className="inline-flex items-center gap-2 bg-[#eaf5f3] text-[#1e9b85] px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border border-[#1e9b85]/20">
            <span className="w-1.5 h-1.5 bg-[#1e9b85] rounded-full animate-pulse"></span> DXN CARE • 60g Powder
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.05] text-slate-900 tracking-tight uppercase break-words">
            {PRODUCT.name}
          </h1>
          <p className="text-sm md:text-xl text-[#1e9b85] font-bold">Advanced Herbal Digestive Support</p>

          <div className="flex items-center gap-2 text-amber-500">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="md:w-[18px] md:h-[18px]" fill="currentColor" />)}
            <span className="text-slate-500 text-xs md:text-sm ml-2 font-medium">(156 Reviews)</span>
          </div>

          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">Rs. {PRODUCT.price}</p>

          {/* FIX: MOBILE RESPONSIVE CART ROW (Side-by-Side) */}
          <div className="flex flex-row items-center gap-3 md:gap-4 w-full pt-3">
            <div className="flex items-center justify-between border-2 border-[#eaf5f3] bg-white rounded-full h-14 px-4 w-[130px] shrink-0 shadow-sm">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-2xl text-[#1e9b85] font-bold pb-1">-</button>
              <span className="font-extrabold text-lg w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-2xl text-[#1e9b85] font-bold pb-1">+</button>
            </div>
            <button 
              onClick={handleAddToCart} 
              className="bg-[#df2c25] hover:bg-[#c6231d] text-white h-14 rounded-full font-extrabold text-sm md:text-base tracking-widest uppercase transition-all shadow-lg shadow-red-500/20 flex items-center justify-center flex-1 gap-2 px-2"
            >
              Add To Cart <ArrowRight size={18}/>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-6 pt-5 w-full max-w-md">
            {[ { icon: <Leaf/>, label: "100% Herbal" }, { icon: <Wind/>, label: "Gas Control" }, { icon: <ShieldCheck/>, label: "Clinical" } ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#eaf5f3] text-[#1e9b85] flex items-center justify-center">
                        {item.icon}
                    </div>
                    <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider text-slate-500">{item.label}</span>
                </div>
            ))}
          </div>
        </motion.div>

        {/* MOBILE RESPONSIVE HERO IMAGE */}
        <div className="relative h-[350px] md:h-[600px] w-full flex justify-center items-center mt-8 md:mt-0">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="relative w-full max-w-[260px] md:max-w-sm aspect-[3/4] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-white flex justify-center items-center"
          >
            <Image src={DigestWellImg} alt="DigestWell Powder" fill className="object-contain p-4 md:p-6" priority />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-4 md:top-6 right-4 md:right-6 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl border border-slate-100">
              <Flame size={20} className="md:w-6 md:h-6 text-[#df2c25] mb-1" />
              <div className="text-[8px] md:text-[10px] font-bold uppercase text-slate-400">Instant</div>
              <div className="text-xs md:text-sm font-black text-slate-900">Relief</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- INFUSED WITH SECTION --- */}
      <section className="py-16 md:py-24 bg-white px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex text-[#1e9b85] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2">Ingredients</div>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-slate-900">Natural <span className="text-[#1e9b85]">Healing</span></h2>
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24">
            <div className="flex flex-col space-y-8 md:space-y-12 text-center md:text-right w-full">
              <div>
                <h4 className="font-extrabold text-lg md:text-xl uppercase tracking-wider mb-2 text-[#1e9b85]">Fennel Seeds</h4>
                <p className="text-xs md:text-sm text-slate-500 max-w-[240px] mx-auto md:ml-auto md:mr-0">Cools the stomach lining and stops instant acidity.</p>
              </div>
            </div>

            <div className="relative w-48 h-64 md:w-64 md:h-80 shrink-0">
              <div className="absolute inset-0 bg-[#eaf5f3] blur-[40px] md:blur-[60px] rounded-full opacity-50"></div>
              <Image src={DigestWellImg} alt="DigestWell" fill className="object-contain rounded-3xl relative z-10 drop-shadow-xl" />
            </div>

            <div className="flex flex-col space-y-8 md:space-y-12 text-center md:text-left w-full">
              <div>
                <h4 className="font-extrabold text-lg md:text-xl uppercase tracking-wider mb-2 text-[#1e9b85]">Ginger Root</h4>
                <p className="text-xs md:text-sm text-slate-500 max-w-[240px] mx-auto md:ml-0 md:mr-auto">Boosts slow metabolism and improves essential absorption.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW TO USE SECTION --- */}
      <section className="py-16 md:py-24 bg-[#0a251e] px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12 md:mb-16 uppercase">The Daily <span className="text-[#1e9b85]">Protocol</span></h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { step: 1, title: "1 Teaspoon", desc: "Scoop one teaspoon of the fine DigestWell powder." },
              { step: 2, title: "Mix in Water", desc: "Mix it well into half a glass of room temperature water." },
              { step: 3, title: "After Meals", desc: "Consume immediately after your lunch and dinner." }
            ].map((item) => (
              <div key={item.step} className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center text-center group hover:bg-white hover:text-[#0a251e] transition-all duration-500">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1e9b85] text-white rounded-2xl flex items-center justify-center font-black text-xl md:text-2xl mb-4 md:mb-6 shadow-lg shadow-[#1e9b85]/20 group-hover:bg-[#0a251e]">
                  {item.step}
                </div>
                <h3 className="font-extrabold text-lg md:text-xl uppercase tracking-wider mb-2 md:mb-4">{item.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-600 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BENEFITS SECTION --- */}
      <section className="py-16 md:py-24 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12 md:mb-16 uppercase text-slate-900">Why choose <span className="text-[#1e9b85]">DigestWell</span></h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[ { icon: <Flame/>, title: "Acidity Relief" }, { icon: <Wind/>, title: "Gas Control" }, { icon: <Activity/>, title: "Metabolism" }, { icon: <Check/>, title: "Flatter Stomach" } ].map((benefit, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4 md:space-y-6">
                <div className="w-24 h-24 md:w-48 md:h-48 rounded-[1.5rem] md:rounded-[2.5rem] bg-[#f4f9f8] flex items-center justify-center text-[#1e9b85] shadow-sm border border-slate-50 hover:scale-105 hover:bg-[#eaf5f3] transition-all duration-500">
                  <div className="scale-75 md:scale-150">{benefit.icon}</div>
                </div>
                <h4 className="font-extrabold uppercase tracking-widest text-[10px] md:text-xs text-slate-900">{benefit.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQS & REVIEWS --- */}
      <section className="py-16 md:py-24 bg-[#fbfcfa] px-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16">
          <div>
            <div className="inline-flex text-[#1e9b85] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2">Help Center</div>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-8 md:mb-10 text-slate-900">Common Questions</h2>
            <div className="space-y-3 md:space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-[1.5rem] md:rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                  <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="w-full p-5 md:p-6 flex items-center justify-between text-left group">
                    <span className="font-bold text-xs md:text-sm tracking-widest uppercase group-hover:text-[#1e9b85] transition-colors pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-[#1e9b85] shrink-0 transition-transform duration-300 ${openFAQ === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFAQ === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 md:px-6 pb-5 md:pb-6 text-slate-500 text-xs md:text-sm leading-relaxed">
                        <div className="pt-2 border-t border-slate-50">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="inline-flex text-[#df2c25] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2">Social Proof</div>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-8 md:mb-10 text-slate-900">Patient Reviews</h2>
            <div className="space-y-3 md:space-y-4">
              {[ { n: "Ali R.", r: 5, t: "Excellent product. Cleared my severe acidity in just two days." }, { n: "Fatima S.", r: 5, t: "Very fine powder, easy to take. My bloating is completely gone." } ].map((rev, i) => (
                <div key={i} className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-3xl border border-slate-100 shadow-sm group hover:border-[#1e9b85] transition-colors">
                  <div className="flex justify-between items-start mb-3 md:mb-4">
                    <div>
                      <h4 className="font-extrabold text-xs md:text-sm tracking-wider uppercase text-slate-900">{rev.n}</h4>
                      <div className="flex text-amber-500 mt-1">{[...Array(rev.r)].map((_, idx) => <Star key={idx} size={10} className="md:w-3 md:h-3" fill="currentColor" />)}</div>
                    </div>
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#eaf5f3] flex items-center justify-center text-[#1e9b85]"><Check size={14} className="md:w-4 md:h-4" strokeWidth={3} /></div>
                  </div>
                  <p className="text-slate-500 text-xs md:text-sm italic font-medium leading-relaxed">"{rev.t}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="py-20 md:py-24 bg-[#0a251e] text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#1e9b85]/10 blur-[80px] md:blur-[120px] rounded-full"></div>
        <div className="relative z-10">
            <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-6 md:mb-8 tracking-tight">TRANSFORM <br/>YOUR GUT TODAY</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mt-6">
                <button onClick={handleAddToCart} className="bg-[#df2c25] hover:bg-[#c6231d] text-white px-8 md:px-12 py-4 md:py-5 rounded-full text-sm md:text-lg font-black tracking-widest uppercase transition-all shadow-2xl shadow-red-500/40 flex items-center justify-center gap-2 md:gap-3 w-full sm:w-auto">
                    Order Now <ArrowRight size={20} className="md:w-6 md:h-6"/>
                </button>
            </div>
        </div>
      </footer>
    </main>
  );
}