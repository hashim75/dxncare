"use client";

import { useState } from "react";
import Image from "next/image";
import DigestWell from "../../public/images/digestwell.png";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, Flame, Wind, ShieldCheck, Star, ChevronDown, 
  ShoppingCart, Activity, CheckCircle2, BadgeCheck, Quote 
} from "lucide-react";
import { useCartStore } from "../store/cartStore"; // ✅ IMPORTED YOUR GLOBAL STORE

// --- DATA ---
const PRODUCT = {
  id: "digestwell-1",
  name: "DXN CARE DigestWell",
  price: 899,
  slug: "digestwell"
};

const faqs = [
  { q: "How do I use DigestWell?", a: "Take 1 teaspoon of DigestWell powder with half a glass of water after your main meals (lunch and dinner)." },
  { q: "Is it safe for diabetic patients?", a: "Absolutely! DigestWell is 100% Sugar-Free and Gluten-Free, making it perfectly safe for blood sugar management." },
  { q: "Will it help me lose weight?", a: "By improving your gut health and boosting your metabolism, DigestWell indirectly helps in managing obesity caused by poor digestion." },
  { q: "Are there any side effects?", a: "No. It is made from 100% natural herbs (like Mint, Fennel, and Ginger) and is entirely chemical-free." }
];

const reviews = [
  { name: "Ali Raza", city: "Lahore", rating: 5, text: "Bohot aala product! Khane ke baad jo seene mein jalan hoti thi, sirf 2 din mein bilkul theek ho gayi. Highly recommended." },
  { name: "Fatima S.", city: "Karachi", rating: 5, text: "I have tried many antacids, but DigestWell is different. Pait ka phoolna (bloating) bilkul khatam ho gaya hai. Plus, it's sugar-free!" },
  { name: "Usman Tariq", city: "Islamabad", rating: 4, text: "Delivery was fast. Powder is very fine and easy to swallow. My acidity issue is 80% resolved in just a week." },
  { name: "Dr. Ayesha", city: "Multan", rating: 5, text: "Being a doctor, I appreciate the herbal and micronized formulation. I prescribe this to my patients complaining of regular gas issues." },
];

const recommendingDoctors = [
  { 
    name: "Dr. Muhammad Iqbal", 
    spec: "Homeopathic Doctor, 30+ Yrs Exp", 
    image: "https://cdn.prod.website-files.com/68a581e57b0d5d6252900e4c/68cb9b098a6738f627df19d8_Dr%20Iqbal.avif" 
  },
  { 
    name: "Dr. Qasim Iqbal", 
    spec: "General Practitioner", 
    image: "https://cdn.prod.website-files.com/68a581e57b0d5d6252900e4c/68cb9b2c71b79dec2208d6d6_Dr%20Qasim.avif" 
  },
  { 
    name: "Dr. Rabia Iqbal", 
    spec: "Plastic Surgeon & Nutritionist", 
    image: "https://cdn.prod.website-files.com/68a581e57b0d5d6252900e4c/68b33cc8fb4f82f391124735_Rabia.avif" 
  },
  { 
    name: "Dr. Zikria Aqeel", 
    spec: "Medical Professional", 
    image: "https://cdn.prod.website-files.com/68a581e57b0d5d6252900e4c/696fd04c61994501aea952c0_WhatsApp%20Image%202026-01-20%20at%2023.57.19.jpeg" 
  }
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function DigestWellUI() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  
  // ✅ GLOBAL CART LOGIC
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({ 
      id: PRODUCT.id, 
      name: PRODUCT.name, 
      price: PRODUCT.price, 
      image: "/images/digestwell.png", // Ensure this path matches your global cart's expected image structure
      slug: PRODUCT.slug 
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 font-jakarta overflow-hidden relative">

      {/* Floating Background Leaves */}
      <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-40 left-10 text-teal-200/40 z-0">
        <Leaf size={64} />
      </motion.div>
      <motion.div animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/4 right-10 text-emerald-200/30 z-0">
        <Leaf size={80} />
      </motion.div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/5 to-transparent clip-path-hero -z-10"></div>
        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-start">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-sm border border-teal-200">
              <Leaf size={16} /> 100% Herbal Ingredients
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold text-teal-950 leading-tight mb-6 tracking-tight">
              Sukoon Ab <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Har Khane Ke Baad.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              Formulated by top doctors. Get instant, natural relief from acidity, gas, and bloating with our fine micronized powder.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={handleAddToCart} // ✅ GLOBAL ADD TO CART TRIGGER
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-teal-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingCart size={20} /> Order Now - Rs. {PRODUCT.price}
              </button>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500 justify-center px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
                <ShieldCheck className="text-emerald-500" size={20} /> Cash on Delivery Available
              </div>
            </motion.div>

            {/* Quick Badges */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-y-4 gap-x-6 mt-10 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm w-full max-w-lg">
              <div className="flex items-center gap-3"><CheckCircle2 className="text-teal-500 shrink-0"/> <span className="font-semibold text-slate-700">Sugar-Free</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 className="text-teal-500 shrink-0"/> <span className="font-semibold text-slate-700">Gluten-Free</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 className="text-teal-500 shrink-0"/> <span className="font-semibold text-slate-700">Fast Absorption</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 className="text-teal-500 shrink-0"/> <span className="font-semibold text-slate-700">60g Net Weight</span></div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative flex justify-center items-center h-[550px] lg:h-[600px] group">
            <div className="absolute w-[80%] h-[80%] bg-emerald-400/30 rounded-full blur-3xl animate-pulse"></div>
            
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="relative z-10 w-full max-w-[400px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-2xl shadow-teal-900/20 bg-white">
              <Image src={DigestWell} alt="DigestWell Bottle" fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" priority />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem] pointer-events-none"></div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="absolute bottom-10 -right-4 md:-right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20">
              <div className="bg-amber-100 p-2 rounded-full text-amber-500"><Star size={24} fill="currentColor"/></div>
              <div>
                <p className="font-bold text-slate-900 leading-tight">4.8/5 Rating</p>
                <p className="text-xs text-slate-500 font-medium">Proven Results</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- DOCTORS AUTHORITY SECTION --- */}
      <section className="py-20 bg-teal-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} className="text-center mb-12">
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-2 block">Trust & Authority</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Recommended by DXN Medical Experts</h2>
            <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm relative">
              <Quote size={40} className="absolute -top-4 -left-2 text-emerald-500/30 rotate-180" />
              <p className="text-teal-50 text-lg md:text-xl leading-relaxed italic relative z-10">
                "Waqti antacids aapke maide ko kamzor karte hain. DigestWell ek natural, root-cause solution hai jo hazma theek kar ke motapa aur gas ko khatam karta hai. Hum isay apne patients ko recommend karte hain."
              </p>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recommendingDoctors.map((doc, i) => (
              <motion.div key={i} variants={itemVariants} className="bg-teal-900/50 border border-teal-800 rounded-2xl p-4 md:p-6 text-center hover:bg-teal-800/50 transition-colors flex flex-col items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-emerald-500/30 mb-4 relative shadow-lg">
                  <Image src={doc.image} alt={doc.name} fill className="object-cover" />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full text-blue-500 p-0.5 shadow-sm">
                    <BadgeCheck size={18} fill="currentColor" className="text-white" />
                  </div>
                </div>
                <h4 className="font-bold text-white text-sm md:text-base">{doc.name}</h4>
                <p className="text-teal-300 text-xs mt-1 font-medium px-2">{doc.spec}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- BENEFITS SECTION --- */}
      <section className="py-24 bg-white px-4 relative">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-4xl font-bold text-teal-950 mb-4">How DigestWell Heals You</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Targeting the root cause of indigestion for permanent relief.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Flame size={36}/>, title: "Stops Acidity & Heartburn", desc: "Instantly cools the stomach lining and neutralizes excess acid production." },
              { icon: <Wind size={36}/>, title: "Eliminates Gas & Bloating", desc: "Carminative herbs break down trapped gas, leaving you feeling light." },
              { icon: <Activity size={36}/>, title: "Boosts Slow Metabolism", desc: "A healthy gut processes food into energy, preventing unwanted weight gain." }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -10 }} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all group">
                <div className="w-16 h-16 bg-white shadow-sm border border-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- REVIEWS --- */}
      <section className="py-24 bg-teal-50/50 px-4 border-t border-slate-200">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-teal-950 mb-4">Trusted Across Pakistan</h2>
            <div className="flex items-center justify-center gap-2 text-amber-400">
              {[1,2,3,4,5].map(n => <Star key={n} fill="currentColor" />)}
              <span className="text-slate-600 font-bold ml-2">4.8/5 (150+ Reviews)</span>
            </div>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 mb-6 italic text-sm flex-1">"{rev.text}"</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold shrink-0">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                    <span className="text-xs text-slate-400">{rev.city}, PK</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FAQS --- */}
      <section className="py-24 bg-white px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl md:text-4xl font-bold text-center text-teal-950 mb-12">Frequently Asked Questions</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={itemVariants} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                  <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                  <div className={`p-2 rounded-full transition-colors ${openFAQ === i ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-400"}`}>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${openFAQ === i ? "rotate-180" : ""}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFAQ === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-6 py-4 text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="py-24 bg-gradient-to-br from-teal-800 to-teal-950 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto max-w-2xl relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready for a Healthy Gut?</h2>
            <p className="text-teal-100 text-lg md:text-xl mb-10 leading-relaxed">Stop relying on temporary pills. Heal your digestive system naturally starting today.</p>
            <button 
              onClick={handleAddToCart} // ✅ GLOBAL ADD TO CART TRIGGER
              className="bg-emerald-500 hover:bg-emerald-400 text-teal-950 px-10 py-5 rounded-2xl font-extrabold text-xl flex items-center justify-center gap-3 mx-auto shadow-2xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingCart size={24} /> Buy DigestWell Now
            </button>
            <p className="mt-6 text-teal-300/80 text-sm font-medium">100% Herbal • Secure Checkout • Cash on Delivery</p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}