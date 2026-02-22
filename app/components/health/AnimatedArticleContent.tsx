"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  ArrowLeft, Calendar, Clock, User, Stethoscope, 
  CheckCircle2, HelpCircle, Sparkles, Share2, 
  ArrowRight, Bookmark, ChevronDown 
} from 'lucide-react';

// Import sub-components
import QuickSnapshot from './QuickSnapshot';
import BenefitGrid from './BenefitGrid';
import FAQAccordion from './FAQAccordion';
import ProductSidebar from './ProductSidebar';
import ArticleBody from './ArticleBody'; // 👈 NEW IMPORT

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AnimatedArticleContent({ 
  post, 
  doctor, 
  benefits = [], 
  faqs = [], 
  suggestedProducts = [] 
}: any) {
  
  // Safety Check
  if (!post) return null;

  // Scroll Hooks
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroRef = useRef(null);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); 
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      
      {/* 1. READING PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 origin-left z-[100]" 
        style={{ scaleX }} 
      />

      {/* 2. CINEMATIC HERO SECTION */}
      <header ref={heroRef} className="relative h-[65vh] min-h-[500px] w-full overflow-hidden flex items-end">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
           <Image 
             src={post.main_image || post.image || "/images/placeholder.jpg"} 
             alt={post.name || post.title || "Health Article"} 
             fill
             className="object-cover scale-105"
             priority
           />
           {/* Gradient Overlays for Readability */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pb-16 lg:pb-24">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl"
            >
                <Link href="/blog" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 font-bold transition-colors text-xs uppercase tracking-widest backdrop-blur-md bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/30">
                    <ArrowLeft size={12} /> Back to Library
                </Link>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-slate-900 mb-6 leading-[1.1] drop-shadow-sm">
                    {post.name || post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600">
                    <span className="bg-teal-50 text-teal-800 border border-teal-100 px-3 py-1 rounded-md uppercase tracking-wider text-[10px] font-bold">
                        {post.blog_category || post.category || "Health Report"}
                    </span>
                    <span className="flex items-center gap-2">
                        <Calendar size={16} className="text-teal-600"/> 
                        {post.created_on ? new Date(post.created_on).toLocaleDateString() : "Recent"}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock size={16} className="text-teal-600"/> 
                        {post.reading_time || "8 min read"}
                    </span>
                </div>
            </motion.div>
        </div>
      </header>

      {/* 3. MAIN CONTENT GRID */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 pb-24 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* --- LEFT SIDEBAR (Doctor & Share) --- */}
            <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-32 space-y-6">
                    {/* Doctor Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-center group"
                    >
                        {doctor ? (
                            <>
                                <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-slate-100 group-hover:border-teal-500 transition-colors shadow-sm">
                                    <Image src={doctor.profile_image || "/images/placeholder.jpg"} fill className="object-cover" alt={doctor.name} />
                                </div>
                                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-1">Medically Reviewed</p>
                                <h4 className="font-bold text-slate-900 text-sm mb-1">{doctor.name}</h4>
                                <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">{doctor.specialization}</p>
                                <Link href={`/doctors/${doctor.slug}`} className="text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 py-2 px-4 rounded-lg transition-colors inline-flex items-center gap-1">
                                    View Profile <ArrowRight size={12}/>
                                </Link>
                            </>
                        ) : (
                            <div className="py-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-teal-600"><User /></div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Authored By</p>
                                <p className="font-bold text-slate-900 mt-1">DXN Research Team</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Share Tools */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center gap-3"
                    >
                        <button className="flex-1 p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-teal-600 hover:border-teal-200 hover:shadow-md transition-all flex justify-center">
                            <Share2 size={18} />
                        </button>
                        <button className="flex-1 p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-teal-600 hover:border-teal-200 hover:shadow-md transition-all flex justify-center">
                            <Bookmark size={18} />
                        </button>
                    </motion.div>
                </div>
            </aside>

            {/* --- CENTER CONTENT --- */}
            <article className="col-span-1 lg:col-span-6 space-y-12">
                
                {/* Mobile Author Bar */}
                <div className="lg:hidden flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    {doctor ? (
                        <>
                           <div className="relative w-12 h-12 rounded-full overflow-hidden border border-teal-100 shrink-0">
                               <Image src={doctor.profile_image || "/images/placeholder.jpg"} fill className="object-cover" alt={doctor.name} />
                           </div>
                           <div>
                               <p className="text-[10px] font-bold text-teal-600 uppercase">Medical Reviewer</p>
                               <p className="font-bold text-slate-900 text-sm">{doctor.name}</p>
                           </div>
                        </>
                    ) : <span className="text-sm font-bold text-slate-500">By DXN Team</span>}
                </div>

                {/* Intro Text - Magazine Style */}
                {post.intro && (
                    <motion.div 
                        variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="prose prose-xl prose-slate max-w-none font-serif text-slate-600 leading-relaxed 
                        first-letter:text-6xl first-letter:font-bold first-letter:text-teal-900 first-letter:mr-3 first-letter:float-left"
                    >
                        {post.intro}
                    </motion.div>
                )}

                {/* Quick Snapshot - Dark Theme Card */}
                {post.quick_snapshot && (
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                        className="my-8"
                    >
                        <QuickSnapshot htmlContent={post.quick_snapshot} />
                    </motion.div>
                )}

                {/* --- 📝 MAIN CONTENT COMPONENT --- */}
                <ArticleBody content={post.main_content || post.content} />

                {/* Key Benefits Grid */}
                {benefits.length > 0 && (
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="pt-12 border-t border-slate-200">
                        <div className="flex items-center gap-4 mb-10">
                            <h3 className="text-2xl font-serif text-slate-900 italic">Clinical Mechanisms</h3>
                            <div className="h-px flex-1 bg-slate-200"></div>
                        </div>
                        <BenefitGrid benefits={benefits} />
                    </motion.div>
                )}

                {/* The Functional Protocol (Timeline Style) */}
                {post.how_to_use && (
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                        className="mt-20 bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-xl shadow-teal-900/5 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 to-emerald-400" />
                        <h3 className="text-2xl font-serif text-teal-900 mb-8 flex items-center gap-3">
                            <Sparkles className="text-teal-500" /> The Functional Protocol
                        </h3>
                        <div 
                            className="prose prose-slate prose-lg max-w-none 
                            prose-li:pl-0 prose-li:border-l-0 
                            prose-strong:text-teal-800 prose-strong:font-bold"
                            dangerouslySetInnerHTML={{ __html: post.how_to_use }} 
                        />
                    </motion.div>
                )}
                
                {/* FAQ Section */}
                {faqs.length > 0 && (
                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="pt-12">
                         <h3 className="text-2xl font-serif text-slate-900 mb-8 flex items-center gap-2">
                            <HelpCircle className="text-teal-600" /> Common Questions
                         </h3>
                         <FAQAccordion faqs={faqs} />
                    </motion.section>
                )}
            </article>

            {/* --- RIGHT SIDEBAR (Products) --- */}
            <aside className="col-span-1 lg:col-span-3">
                <div className="sticky top-32">
                    <ProductSidebar productIds={post.blogs_products} />
                </div>
            </aside>

        </div>
      </div>
    </div>
  );
}