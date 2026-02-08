"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, CheckCircle2, ShieldCheck, 
  Activity, ArrowLeft, ChevronDown, Plus, Minus, BookOpen, Star, List, Zap 
} from "lucide-react";
import { useCartStore } from "../../store/cartStore";

// --- HELPERS ---

const parseFAQs = (data: any) => {
  const faqs = [];
  let i = 1;
  while (data[`faq_question___${i}`]) {
    faqs.push({
      question: data[`faq_question___${i}`],
      answer: data[`faq_answer___${i}`],
    });
    i++;
  }
  return faqs;
};

const extractHeadings = (htmlContent: string) => {
  if (typeof window === "undefined") return [];
  
  const div = document.createElement("div");
  div.innerHTML = htmlContent;
  
  const headings: { id: string; text: string; level: number }[] = [];
  div.querySelectorAll("h2, h3").forEach((el, index) => {
    const id = `section-${index}`;
    el.id = id; 
    headings.push({
      id,
      text: el.textContent || "",
      level: el.tagName === "H2" ? 2 : 3
    });
  });
  
  return headings;
};

const injectIdsIntoHtml = (htmlContent: string) => {
    let index = 0;
    return htmlContent.replace(/<(h2|h3)(.*?)>/g, (match, tag, attrs) => {
        const newTag = `<${tag} id="section-${index}" ${attrs}>`;
        index++;
        return newTag;
    });
};

// --- ANIMATION VARIANTS ---

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

const glowVariant = {
  initial: { opacity: 0.5, scale: 0.95 },
  animate: { 
    opacity: [0.4, 0.7, 0.4], 
    scale: [0.95, 1.05, 0.95],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
  }
};

// --- SUB-COMPONENTS ---

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      variants={fadeInUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border border-slate-200 rounded-xl md:rounded-2xl overflow-hidden bg-white mb-4 shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left"
      >
        <span className={`font-bold text-base md:text-lg transition-colors font-jakarta pr-4 ${isOpen ? "text-red-600" : "!text-black"}`}>{question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${isOpen ? "bg-red-100 text-red-600 rotate-180" : "bg-slate-100 text-slate-600 group-hover:bg-black group-hover:text-white"}`}>
            <ChevronDown size={18} />
        </div>
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="p-4 md:p-6 pt-0 !text-black leading-relaxed border-t border-slate-100 bg-slate-50 font-medium text-base md:text-lg">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---

export default function ProductClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const [activeSection, setActiveSection] = useState("");
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  // Smooth Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Data
  const title = product.name || product.title;
  const price = product.price ? Number(product.price) : 4500; 
  const image = product.main_image || product.image || "";
  const faqs = parseFAQs(product);
  
  const processedContent = injectIdsIntoHtml(product.main_content || "");

  useEffect(() => {
    const extracted = extractHeadings(product.main_content || "");
    setHeadings(extracted);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    extracted.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [product.main_content]);

  const handleAddToCart = () => {
    addItem({ id: product.id, name: title, price: price, image: image, slug: product.id });
  };

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. PROGRESS BAR */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 md:h-2 bg-gradient-to-r from-red-600 to-black origin-left z-[100]" style={{ scaleX }} />

      <main className="bg-white min-h-screen pt-24 pb-24 lg:pt-32 lg:pb-32">
        
        {/* HEADER */}
        <div className="container mx-auto px-4 mb-4 md:mb-8">
            <Link href="/products" className="inline-flex items-center gap-2 text-slate-500 hover:!text-black transition-colors text-xs md:text-sm font-bold uppercase tracking-wider mb-4 md:mb-8 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
            </Link>
        </div>

        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* === LEFT: TOC (Hidden on Mobile) === */}
            <div className="hidden lg:block lg:col-span-3 sticky top-32 z-30">
                <div className="relative group">
                    <motion.div 
                        variants={glowVariant}
                        initial="initial"
                        animate="animate"
                        className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-red-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"
                    ></motion.div>

                    <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-xl max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center gap-2 mb-6 !text-black font-extrabold uppercase text-xs tracking-widest border-b border-slate-300 pb-4">
                            <List size={16} /> Table of Contents
                        </div>
                        <ul className="space-y-2 relative">
                            {headings.map((h) => {
                                const isActive = activeSection === h.id;
                                return (
                                    <li key={h.id} style={{ paddingLeft: h.level === 3 ? "12px" : "0px" }} className="relative">
                                        <button 
                                            onClick={() => scrollToId(h.id)}
                                            className={`relative w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-300 z-10 ${isActive ? "text-red-700 font-bold" : "text-slate-600 hover:!text-black font-medium"}`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="active-toc-bg"
                                                    className="absolute inset-0 bg-red-50 rounded-lg -z-10 border border-red-100"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                            <span className={`block truncate transition-transform duration-300 ${isActive ? "translate-x-1" : "group-hover/item:translate-x-1"}`}>
                                                {h.text}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            {/* === CENTER: CONTENT === */}
            <div className="col-span-1 lg:col-span-6">
                
                {/* HERO IMAGE */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-slate-50 rounded-3xl md:rounded-[3rem] p-6 md:p-10 mb-8 md:mb-12 flex items-center justify-center relative overflow-hidden shadow-inner border border-slate-100 group"
                >
                    <motion.div 
                        animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-teal-200/30 rounded-full blur-3xl"
                    />

                    <motion.div 
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="relative z-10 w-full max-w-[250px] md:max-w-sm aspect-square"
                    >
                        {image ? (
                           <Image src={image} alt={title} fill className="object-contain drop-shadow-2xl" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold">No Image</div>
                        )}
                    </motion.div>
                </motion.div>

                {/* TITLE & INTRO */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 md:mb-12"
                >
                    <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full font-bold uppercase text-[10px] tracking-widest mb-4 border border-red-100">
                        <Zap size={12} fill="currentColor" /> Official DXN Product
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-jakarta !text-black mb-4 md:mb-6 leading-tight">
                        {title}
                    </h1>
                    {product.short_description && (
                        <p className="text-lg md:text-xl !text-black leading-relaxed font-medium border-l-4 border-red-500 pl-4 md:pl-6 py-2 bg-gradient-to-r from-slate-50 to-transparent">
                            {product.short_description}
                        </p>
                    )}
                </motion.div>

                {/* DYNAMIC CONTENT BLOCK */}
                <div className="space-y-12 md:space-y-16">
                    
                    {/* Overview Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white border-l-4 !border-black pl-4 md:pl-6 py-4 shadow-sm"
                    >
                        <h3 className="text-sm font-bold !text-black uppercase tracking-widest mb-3 flex items-center gap-2">
                            <BookOpen size={16}/> Overview
                        </h3>
                        <div className="text-lg md:text-xl font-medium !text-black leading-loose" dangerouslySetInnerHTML={{ __html: product.introduction || "" }} />
                    </motion.div>

                    {/* MAIN CONTENT PROSE (Responsive text size) */}
                    <article className="prose prose-base md:prose-lg max-w-none 
                        !text-black
                        prose-headings:!text-black prose-p:!text-black prose-li:!text-black prose-strong:!text-black
                        prose-headings:font-jakarta prose-headings:font-bold prose-headings:scroll-mt-32
                        prose-h2:text-2xl md:prose-h2:text-4xl prose-h2:mt-12 md:prose-h2:mt-16 prose-h2:mb-6 md:prose-h2:mb-8 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-4
                        prose-h3:text-xl md:prose-h3:text-3xl prose-h3:mt-8 md:prose-h3:mt-10 prose-h3:mb-4
                        prose-p:leading-loose prose-p:mb-6
                        prose-li:marker:text-red-600 prose-li:mb-2
                        prose-strong:font-extrabold
                        prose-blockquote:bg-slate-50 prose-blockquote:border-l-red-500 prose-blockquote:!text-black prose-blockquote:not-italic prose-blockquote:py-4 md:prose-blockquote:py-6 prose-blockquote:px-6 md:prose-blockquote:px-8 prose-blockquote:rounded-r-xl"
                        dangerouslySetInnerHTML={{ __html: processedContent }} 
                    />
                    
                    {/* Expert Verdict */}
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-black p-6 md:p-10 rounded-2xl md:rounded-3xl text-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-2xl font-bold font-jakarta mb-4 flex items-center gap-3 text-white">
                                <Star className="text-yellow-400 fill-yellow-400" /> Our Expert Verdict
                            </h3>
                            <div className="prose prose-base md:prose-lg prose-invert max-w-none text-slate-200 leading-loose" dangerouslySetInnerHTML={{ __html: product.conclusion || "" }} />
                        </div>
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-20 -right-20 w-40 h-40 md:w-60 md:h-60 bg-white/5 rounded-[30%] blur-3xl"
                        />
                    </motion.div>

                    {/* FAQs */}
                    {faqs.length > 0 && (
                        <div className="pt-8 md:pt-12 border-t border-slate-200">
                            <h3 className="text-2xl md:text-4xl font-bold !text-black mb-6 md:mb-10 font-jakarta">Common Questions</h3>
                            <div>
                                {faqs.map((faq, i) => (
                                    <FAQItem key={i} index={i} question={faq.question} answer={faq.answer} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* === RIGHT: STICKY BUY RAIL (Desktop Only) === */}
            <div className="hidden lg:block lg:col-span-3 relative">
                <div className="sticky top-32">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 p-6 overflow-hidden relative"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-teal-500 to-red-500"></div>

                        <div className="text-center mb-6 pt-4">
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Current Price</p>
                            <span className="text-4xl font-bold !text-black font-jakarta">Rs. {price.toLocaleString()}</span>
                            <div className="mt-2 flex justify-center">
                                <motion.span 
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-green-200"
                                >
                                    In Stock
                                </motion.span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-slate-50 rounded-xl p-1 mb-4 border border-slate-200">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 hover:text-red-600 active:scale-90 transition-all">
                                <Minus size={16} />
                            </button>
                            <span className="font-bold text-lg !text-black tabular-nums">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 hover:text-red-600 active:scale-90 transition-all">
                                <Plus size={16} />
                            </button>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(220, 38, 38, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { for(let i = 0; i < quantity; i++) handleAddToCart(); }}
                            className="w-full py-4 bg-red-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 mb-6 transition-all"
                        >
                            <ShoppingCart size={20} /> Add to Cart
                        </motion.button>

                        <div className="space-y-3 pt-4 border-t border-slate-100">
                            {[
                                { text: "100% Authentic", icon: CheckCircle2 },
                                { text: "Fast Shipping", icon: Activity },
                                { text: "Secure Checkout", icon: ShieldCheck }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs text-slate-500 font-bold uppercase tracking-wide group cursor-default">
                                    <item.icon size={14} className="text-black group-hover:text-teal-600 transition-colors" /> 
                                    <span className="group-hover:text-teal-900 transition-colors">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            </div>
        </div>

        {/* MOBILE STICKY BAR (Visible only on lg and below) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-[90] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-safe">
            <div className="flex items-center gap-4 max-w-md mx-auto">
                 <div className="flex-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total</p>
                    <p className="text-xl font-extrabold !text-black font-jakarta">Rs. {price.toLocaleString()}</p>
                 </div>
                 <button 
                    onClick={handleAddToCart} 
                    className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-red-600/20 active:scale-95 transition-transform flex items-center gap-2"
                 >
                    <ShoppingCart size={18} /> Add to Cart
                 </button>
            </div>
        </div>

      </main>
    </>
  );
}