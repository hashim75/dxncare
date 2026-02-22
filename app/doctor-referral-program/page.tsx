"use client";

import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser'; 
import { 
  Stethoscope, ShieldCheck, TrendingUp, Network, 
  ArrowRight, Zap, Award, CheckCircle,
  CreditCard, LineChart, X, ChevronLeft, ChevronRight,
  ShoppingBag, Users, Star, Percent, Gem, LayoutDashboard, Loader2,
  FileText
} from 'lucide-react';

// --- 📧 EMAILJS CONFIGURATION ---
const EMAILJS_SERVICE_ID = "service_bhpyljt";
const EMAILJS_TEMPLATE_ID = "template_vkr09eu";
const EMAILJS_PUBLIC_KEY = "ykMzk7yOAMHR1Ip8o";

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// --- 5-STEP PV SYSTEM DATA ---
const PVSlides = [
    {
        title: "1. Purchase Products & Earn Personal PV",
        desc: "Every product from DXN carries a Point Value (PV). When you purchase or sell products, you earn Personal PV (PPV). This keeps you active and qualifies you for bonuses.",
        icon: <ShoppingBag size={48} />,
        visual: "🛒 Buy Product → ⚡ Earn PV"
    },
    {
        title: "2. Build a Team & Generate Group PV",
        desc: "When you introduce new members, their purchases generate PV which adds to your Group PV (GPV). Bigger team = Higher Group PV.",
        icon: <Users size={48} />,
        visual: "👥 Team Buys → 📈 Your GPV Grows"
    },
    {
        title: "3. Increase Your Rank Through PV Growth",
        desc: "DXN ranks are based on accumulated Group PV. As your GPV increases, you move from Distributor → Star Agent → Higher ranks. Higher PV = Higher Status.",
        icon: <Star size={48} />,
        visual: "⭐ Star Agent (4500 PV)"
    },
    {
        title: "4. Earn Bonuses Based on Rank Difference",
        desc: "DXN pays bonuses based on the percentage difference between your rank and your team's. More PV in your network = Bigger bonus payouts.",
        icon: <Percent size={48} />,
        visual: "💰 Your Rank % - Team Rank % = Profit"
    },
    {
        title: "5. Develop Leaders & Unlock Long-Term Income",
        desc: "When your team members reach higher ranks, you earn development bonuses. Team growth = Sustainable long-term income.",
        icon: <Gem size={48} />,
        visual: "💎 Leadership Bonus = Passive Income"
    }
];

// --- FLOATING INPUT COMPONENT ---
const FloatingInput = ({ label, name, type = "text", value, onChange, readOnly = false, placeholder = "" }: any) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="relative mt-2">
            <input
                type={type}
                name={name}
                value={value}
                readOnly={readOnly}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(value !== "")}
                placeholder={focused ? placeholder : ""}
                className={`
                    peer w-full h-14 bg-slate-50 border-2 rounded-xl px-4 pt-4 text-teal-950 outline-none transition-all font-bold
                    ${readOnly ? 'border-slate-100 bg-slate-100 text-slate-500 cursor-not-allowed' : 'border-slate-100 focus:border-teal-500 focus:bg-white'}
                `}
            />
            <label
                className={`
                    absolute left-4 transition-all pointer-events-none font-bold uppercase tracking-widest
                    ${(focused || value) ? 'top-2 text-[10px] text-teal-600' : 'top-4 text-xs text-slate-400'}
                `}
            >
                {label}
            </label>
        </div>
    );
};

export default function DoctorReferralPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPVSlide, setCurrentPVSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    passport: '',
    taxId: '',
    mobile: '',
    email: '',
    address: '',
    state: '',
    city: '',
    postcode: ''
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const nextSlide = () => setCurrentPVSlide((prev) => (prev + 1) % PVSlides.length);
  const prevSlide = () => setCurrentPVSlide((prev) => (prev - 1 + PVSlides.length) % PVSlides.length);

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Prepare EmailJS Template Params
    const templateParams = {
        to_name: "Muhammad Hashim",
        sponsor_code: "821641493",
        sponsor_name: "MUHAMMAD HASHIM",
        from_name: formData.fullName,
        message: `New Doctor Registration Request:
        Gender: ${formData.gender}
        DOB: ${formData.dobDay}/${formData.dobMonth}/${formData.dobYear}
        Passport/IC: ${formData.passport}
        Tax ID: ${formData.taxId}
        Mobile: ${formData.mobile}
        Email: ${formData.email}
        Address: ${formData.address}, ${formData.city}, ${formData.state}, ${formData.postcode}
        `,
        ...formData 
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
            setIsFormOpen(false);
            setSuccess(false);
            setFormData({ fullName: '', gender: 'Male', dobDay: '', dobMonth: '', dobYear: '', passport: '', taxId: '', mobile: '', email: '', address: '', state: '', city: '', postcode: '' });
        }, 3000);
      }, (err) => {
        console.log('FAILED...', err);
        setLoading(false);
        alert("Failed to send application. Please try again.");
      });
  };

  const schemaData = {

"@context": "https://schema.org",

"@type": "WebPage",

"name": "Doctor Referral Program | DXN CARE Partner Program",

"description": "Join Pakistan's premier network of holistic healthcare providers. Integrate certified Ganoderma research into your treatment plans and receive qualified patient leads.",

"url": "https://www.dxncare.com/doctor-referral-program",

"publisher": {

"@type": "Organization",

"name": "DXN CARE ",

"logo": {

"@type": "ImageObject",

"url": "https://cdn.prod.website-files.com/6833690dd0efea69de65146d/699a956e7c1793e16f8f9a72_logo.webp"

}

}

};

  return (
    <>
      <Head>
        <title>Doctor Referral Program | DXN Partner Program</title>
        <meta name="description" content="Join Pakistan's premier network of holistic healthcare providers. Integrate certified Ganoderma research into your treatment plans and receive qualified patient leads." />
        <meta name="keywords" content="doctor referral program, dxn partner program, holistic healthcare providers, ganoderma research, patient leads, b2b healthcare integration, passive income for doctors" />
        <link rel="canonical" href="https://www.yourdomain.com/doctor-referral-program" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

    <main ref={containerRef} className="bg-white min-h-screen overflow-hidden relative">
      
      {/* ====================== 1. HERO SECTION ====================== */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <motion.div style={{ y: yParallax }} className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-teal-50 rounded-full blur-3xl -z-10 opacity-60" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-100/80 text-teal-800 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md border border-teal-200">
            <Award size={14} /> Official DXN Partner Program
          </motion.div>
          <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="text-5xl md:text-8xl font-bold text-teal-950 font-jakarta leading-tight mb-8">
            Empower Your Practice <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">With Medical Science.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12">
             Join Pakistan's premier network of holistic healthcare providers. Integrate certified Ganoderma research into your treatment plans and receive qualified patient leads via our Smart Triage system.
          </motion.p>
          <motion.button 
            onClick={() => setIsFormOpen(true)}
            variants={fadeInUp} initial="hidden" animate="visible"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-teal-950 text-white rounded-full font-bold shadow-2xl shadow-teal-950/30 flex items-center gap-3 mx-auto hover:bg-teal-800 transition-all relative overflow-hidden group"
          >
              <span className="relative z-10 flex items-center gap-2">Activate Partner ID <ArrowRight size={20} /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </div>
      </section>

      {/* ====================== 2. WHAT IS REFERRAL? ====================== */}
      <section className="py-24 bg-slate-50 relative z-20 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            
            {/* Left Content */}
            <motion.div className="md:w-1/2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <h2 className="text-3xl md:text-5xl font-bold text-teal-950 font-jakarta mb-6 leading-tight">What is the Referral Program?</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    It is a professional <strong className="text-teal-700">B2B integration</strong> that allows medical practitioners to prescribe DXN products via a secure portal. You earn professional fees (PV) without managing inventory or logistics.
                </p>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 shrink-0"><CheckCircle size={24}/></div>
                        <div>
                            <h4 className="font-bold text-teal-950 text-lg">Zero Inventory</h4>
                            <p className="text-sm text-slate-500">DXN handles global shipping & logistics.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0"><LineChart size={24}/></div>
                        <div>
                            <h4 className="font-bold text-teal-950 text-lg">Professional Dashboard</h4>
                            <p className="text-sm text-slate-500">Track patients and commissions in real-time.</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div 
                className="md:w-1/2 w-full flex justify-center relative"
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            >
                <div className="relative w-full max-w-lg aspect-video bg-white rounded-3xl shadow-2xl border border-slate-200 p-2 overflow-hidden">
                     <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                     </div>
                     <div className="p-6 flex flex-col h-full bg-slate-50/50">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-teal-950">Dr. Dashboard</h3>
                                <p className="text-xs text-slate-400">Partner ID: 821641493</p>
                            </div>
                            <LayoutDashboard className="text-teal-600" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                <div className="text-xs text-slate-400 font-bold uppercase">Total PV</div>
                                <div className="text-2xl font-bold text-teal-600">4,500</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                <div className="text-xs text-slate-400 font-bold uppercase">Patients</div>
                                <div className="text-2xl font-bold text-blue-600">128</div>
                            </div>
                        </div>
                        <div className="w-full h-24 bg-teal-50 rounded-xl border border-teal-100 flex items-center justify-center text-teal-300">
                            <LineChart className="w-full h-full p-4 opacity-50" />
                        </div>
                     </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* ====================== 3. TIMELINE ROADMAP ====================== */}
      <section className="py-32 relative z-20">
        <div className="container mx-auto px-6 text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-teal-950 font-jakarta mb-6">Your Roadmap to Success</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Five strategic steps to integrate DXN into your clinical practice.</p>
        </div>
        <div className="container mx-auto px-6 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 hidden md:block -translate-x-1/2 z-0">
                <motion.div className="w-full bg-teal-500 origin-top" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 1.5 }} viewport={{ margin: "-20% 0px -20% 0px" }} style={{ height: '100%' }} />
            </div>
            <div className="space-y-20 relative z-10">
                {[
                    { title: "Register", desc: "Fill out the professional application form below.", icon: <FileText /> },
                    { title: "Verify", desc: "Receive your Partner ID and eWorld access.", icon: <ShieldCheck /> },
                    { title: "Integrate", desc: "Link your profile to our Symptom Checker for leads.", icon: <Zap /> },
                    { title: "Prescribe", desc: "Recommend products; DXN ships to patient.", icon: <Stethoscope /> },
                    { title: "Earn", desc: "Receive monthly bonuses based on PV generated.", icon: <CreditCard /> }
                ].map((step, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-100px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`flex flex-col md:flex-row items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`md:w-1/2 p-6 ${i % 2 === 1 ? 'md:text-left' : 'md:text-right'} flex flex-col items-center ${i % 2 === 1 ? 'md:items-start' : 'md:items-end'}`}>
                            <div className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-2">Step {i + 1}</div>
                            <h3 className="text-3xl font-bold text-teal-950 mb-3">{step.title}</h3>
                            <p className="text-slate-600 max-w-sm font-medium">{step.desc}</p>
                        </div>
                        <div className="relative mx-auto md:mx-0 z-10 bg-white p-2 rounded-full shadow-xl">
                            <div className="w-16 h-16 bg-teal-950 text-white rounded-full flex items-center justify-center relative z-20">{step.icon}</div>
                        </div>
                        <div className="md:w-1/2"></div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* ====================== 4. PV SYSTEM SLIDER ====================== */}
      <section className="py-32 bg-teal-950 relative overflow-hidden z-20">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/grid-pattern.png')] bg-repeat" />
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center text-white mb-16">
                <h2 className="text-4xl md:text-6xl font-bold font-jakarta mb-6">How the <span className="text-teal-400">PV System</span> Works</h2>
                <p className="text-teal-200/70 max-w-xl mx-auto">Understanding the engine behind your passive income.</p>
            </div>

            <div className="max-w-6xl mx-auto relative">
                <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 p-8 md:p-20 min-h-[500px] flex items-center justify-center relative overflow-hidden">
                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={currentPVSlide}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full flex flex-col md:flex-row items-center gap-12 justify-center px-0 md:px-12"
                        >
                            <div className="md:w-1/3 flex flex-col items-center justify-center text-center shrink-0">
                                <div className="w-40 h-40 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-teal-500/30 text-white ring-8 ring-white/10">
                                    {PVSlides[currentPVSlide].icon}
                                </div>
                            </div>
                            <div className="md:w-2/3 text-white text-center md:text-left flex flex-col justify-center">
                                <h3 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">{PVSlides[currentPVSlide].title}</h3>
                                <p className="text-teal-100/90 text-base md:text-lg leading-relaxed mb-8 font-light">{PVSlides[currentPVSlide].desc}</p>
                                <div className="inline-block bg-white/10 px-6 py-4 rounded-2xl border border-white/5 font-bold text-teal-300 self-center md:self-start">
                                    {PVSlides[currentPVSlide].visual}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    
                    <button onClick={prevSlide} aria-label="Previous Slide" className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-teal-500 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/10 z-20 group">
                        <ChevronLeft className="group-hover:-translate-x-1 transition-transform"/>
                    </button>
                    <button onClick={nextSlide} aria-label="Next Slide" className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-teal-500 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/10 z-20 group">
                        <ChevronRight className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                </div>
                
                <div className="flex justify-center gap-3 mt-8">
                    {PVSlides.map((_, i) => (
                        <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i === currentPVSlide ? 'w-12 bg-teal-400' : 'w-2 bg-teal-900'}`} />
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* ====================== 5. FINAL CTA ====================== */}
      <section className="py-40 bg-white relative z-20">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-teal-950 font-jakarta mb-8">Ready to Partner?</h2>
            <div className="flex justify-center">
              <motion.button 
                  onClick={() => setIsFormOpen(true)}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-teal-600 text-white rounded-full font-bold text-xl shadow-2xl shadow-teal-600/30 flex items-center gap-3 transition-all animate-pulse"
              >
                  Join DXN Professional Network <ArrowRight size={24} />
              </motion.button>
            </div>
        </div>
      </section>

      {/* ====================== 6. FIXED HEIGHT MODAL & EMAILJS ====================== */}
      <AnimatePresence>
        {isFormOpen && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-teal-950/90 backdrop-blur-md z-[100] flex justify-center items-center p-4"
                onClick={() => setIsFormOpen(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 100 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 100 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-[2rem] w-full max-w-4xl shadow-2xl relative flex flex-col h-[85vh]"
                >
                    <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center rounded-t-[2rem] shrink-0">
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-teal-950 font-jakarta">New Distributor Registration</h3>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Secure Professional Portal</p>
                        </div>
                        <button onClick={() => setIsFormOpen(false)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 shadow-sm border border-slate-200 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {success ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-12">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle size={48} />
                            </motion.div>
                            <h3 className="text-3xl font-bold text-teal-950 mb-2">Application Submitted!</h3>
                            <p className="text-slate-500">We have received your registration details. A DXN representative will contact you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-200 scrollbar-track-transparent">
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center"><CheckCircle size={16}/></div>
                                    <h4 className="font-bold text-teal-950 text-lg">Sponsor Identity</h4>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <FloatingInput label="Country" value="Pakistan" readOnly />
                                    <FloatingInput label="Sponsor Code" value="821641493" readOnly />
                                    <div className="md:col-span-2">
                                        <FloatingInput label="Sponsor Name" value="MUHAMMAD HASHIM" readOnly />
                                    </div>
                                </div>
                            </div>

                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Users size={16}/></div>
                                    <h4 className="font-bold text-teal-950 text-lg">Personal Details</h4>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <FloatingInput label="Full Name *" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="As per CNIC/Passport" />
                                    </div>
                                    <div className="relative mt-2">
                                        <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 pt-4 text-teal-950 outline-none focus:border-teal-500 font-bold appearance-none"><option>Male</option><option>Female</option></select>
                                        <label className="absolute left-4 top-2 text-[10px] text-teal-600 font-bold uppercase tracking-widest">Gender</label>
                                    </div>
                                    <div className="flex gap-2">
                                        <FloatingInput label="Day" name="dobDay" value={formData.dobDay} onChange={handleInputChange} placeholder="DD" />
                                        <FloatingInput label="Month" name="dobMonth" value={formData.dobMonth} onChange={handleInputChange} placeholder="MM" />
                                        <FloatingInput label="Year" name="dobYear" value={formData.dobYear} onChange={handleInputChange} placeholder="YYYY" />
                                    </div>
                                    <FloatingInput label="IC No. / Passport No." name="passport" value={formData.passport} onChange={handleInputChange} />
                                    <FloatingInput label="Personal Tax ID" name="taxId" value={formData.taxId} onChange={handleInputChange} />
                                    <FloatingInput label="Nationality" value="Pakistani" readOnly />
                                </div>
                            </div>

                            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center"><Network size={16}/></div>
                                    <h4 className="font-bold text-teal-950 text-lg">Contact & Address</h4>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <FloatingInput label="Mobile No *" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="+92..." />
                                    <FloatingInput label="E-Mail" name="email" value={formData.email} onChange={handleInputChange} type="email" />
                                    <div className="md:col-span-2">
                                        <FloatingInput label="Address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street Address" />
                                    </div>
                                    <FloatingInput label="State / Province" name="state" value={formData.state} onChange={handleInputChange} />
                                    <FloatingInput label="City / Town" name="city" value={formData.city} onChange={handleInputChange} />
                                    <FloatingInput label="Post Code" name="postcode" value={formData.postcode} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100">
                                <button type="submit" disabled={loading} className="w-full py-5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold text-xl shadow-xl shadow-teal-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {loading ? <Loader2 className="animate-spin" /> : <>Submit Registration <ArrowRight /></>}
                                </button>
                                <p className="text-center text-xs text-slate-400 mt-4 font-medium">By registering, you agree to become a part of the DXN Global Family.</p>
                            </div>
                        </form>
                    )}
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </main>
    </>
  );
}