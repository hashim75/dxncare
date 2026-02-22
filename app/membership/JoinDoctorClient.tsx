"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { 
  Check, X, Sparkles, ShieldCheck, 
  ArrowRight, Award, User, AlignLeft, 
  MessageCircle, Star, Loader2, UploadCloud,
  Zap, Globe, ZapOff, ChevronRight, ChevronLeft
} from "lucide-react";

// --- CONFIG ---
const EMAILJS_CONFIG = {
  publicKey: "ykMzk7yOAMHR1Ip8o",
  serviceId: "service_bhpyljt",
  templateId: "template_vkr09eu", 
};

// --- INNOVATION: MAGNETIC BUTTON ---
const MagneticButton = ({ children, className, onClick, type = "button", disabled = false }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    x.set(clientX - (left + width / 2));
    y.set(clientY - (top + height / 2));
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref} style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      onClick={onClick} type={type} disabled={disabled}
      className={className} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default function JoinDoctorInnovation() {
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- COMPREHENSIVE FORM STATE ---
  const [formData, setFormData] = useState({
    fullName: "", specialization: "", pmdc: "", education: "", tagline: "",
    expertise1: "", expertise2: "", expertise3: "", bio: "", whatsapp: "",
    facebook: "", linkedin: "", service1: "", service2: "", service3: "",
    service4: "", consultationHours: "", profileImageName: "" 
  });
  const [profileImageFile, setProfileImageFile] = useState<string | null>(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const messageBody = `Plan: ${selectedPlan}\nName: ${formData.fullName}\nBio: ${formData.bio}`;
    
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, { 
      ...formData, 
      message: messageBody,
      profile_image: profileImageFile, 
      plan_type: selectedPlan 
    }, EMAILJS_CONFIG.publicKey)
    .then(() => {
      setLoading(false);
      setSuccess(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#0d9488', '#facc15'] });
      setTimeout(() => { 
        setSelectedPlan(null); 
        setSuccess(false); 
        setCurrentStep(1);
        setFormData({fullName: "", specialization: "", pmdc: "", education: "", tagline: "", expertise1: "", expertise2: "", expertise3: "", bio: "", whatsapp: "", facebook: "", linkedin: "", service1: "", service2: "", service3: "", service4: "", consultationHours: "", profileImageName: ""});
      }, 5000);
    });
  };

  return (
    <main className="min-h-screen bg-[#fafafa] overflow-x-hidden font-jakarta selection:bg-teal-100 selection:text-teal-900">
      
      {/* --- KINETIC AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-gradient-to-br from-teal-200 to-emerald-100 blur-[140px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 100, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[0%] w-[50%] h-[50%] bg-gradient-to-tr from-yellow-100 to-orange-50 blur-[120px] rounded-full"
        />
      </div>

      <div className="relative z-10">
        {/* --- HERO SECTION --- */}
        <section className="pt-32 pb-20 container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-xl shadow-slate-200/50 border border-slate-100 text-teal-700 text-xs font-black mb-8"
          >
            <Sparkles size={14} className="text-yellow-500 animate-pulse" /> JOIN THE TOP 1% OF CLINICIANS
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]"
          >
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-400 to-teal-600 bg-[length:200%_auto] animate-gradient-x">
              Clinical Legacy.
            </span>
          </motion.h1>

          <p className="max-w-2xl mx-auto text-slate-500 text-xl font-medium mb-12">
            The most advanced practitioner network in Pakistan. Built for verified experts, designed for growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <MagneticButton 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-teal-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-teal-500/40 flex items-center gap-3"
            >
                View Membership <ArrowRight />
            </MagneticButton>
          </div>
        </section>

        {/* --- PRICING GRID WITH 3D HOVER --- */}
        <section id="pricing" className="py-32 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Choose Your Path</h2>
            <div className="bg-slate-200/50 p-1.5 rounded-2xl inline-flex gap-2 backdrop-blur-md">
              <button onClick={() => setIsYearly(false)} className={`px-8 py-3 rounded-xl font-bold transition-all ${!isYearly ? 'bg-white shadow-xl scale-105 text-teal-600' : 'text-slate-500'}`}>Monthly</button>
              <button onClick={() => setIsYearly(true)} className={`px-8 py-3 rounded-xl font-bold transition-all ${isYearly ? 'bg-white shadow-xl scale-105 text-teal-600' : 'text-slate-500'}`}>Yearly (-20%)</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <PlanCard 
              name="Starter" price="Free" tagline="Begin your digital journey" 
              features={["Verified Profile", "Search Listing", "Basic Bio"]}
              onSelect={() => setSelectedPlan('free')}
            />
            <PlanCard 
              name="Standard" featured price={`Rs. ${isYearly ? '2099' : '199'}`} tagline="Most popular for growing clinics"
              features={["Everything in Free", "WhatsApp Integration", "Social Connectivity", "Custom Taglines"]}
              onSelect={() => setSelectedPlan('standard')}
            />
            <PlanCard 
              name="Premium" price={`Rs. ${isYearly ? '3099' : '299'}`} tagline="The ultimate practitioner toolkit"
              features={["Everything in Standard", "Blue Tick Verification", "Interactive Calendar", "Image Galleries"]}
              onSelect={() => setSelectedPlan('premium')}
            />
          </div>
        </section>
      </div>

      {/* --- INNOVATIVE STEP-BY-STEP MODAL --- */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-950/80 backdrop-blur-xl"
            onClick={() => setSelectedPlan(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white w-full max-w-4xl h-fit max-h-[90vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Step Header */}
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <div className="flex gap-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-2 w-16 rounded-full transition-all duration-700 ${currentStep >= i ? 'bg-teal-500' : 'bg-slate-200'}`} />
                  ))}
                </div>
                <h3 className="font-black text-teal-900 uppercase tracking-widest text-xs">{selectedPlan} Application</h3>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-12">
                {success ? (
                  <SuccessState plan={selectedPlan} />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    
                    {/* STEP 1: IDENTITY */}
                    {currentStep === 1 && (
                      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2 flex flex-col items-center">
                             <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-32 h-32 rounded-[2.5rem] border-4 border-dashed border-teal-200 bg-teal-50 flex items-center justify-center cursor-pointer overflow-hidden hover:border-teal-400 transition-all"
                             >
                               {profileImageFile ? <img src={profileImageFile} className="w-full h-full object-cover" /> : <UploadCloud className="text-teal-400" />}
                               <input type="file" ref={fileInputRef} className="hidden" onChange={(e:any) => {
                                 const reader = new FileReader();
                                 reader.onload = () => setProfileImageFile(reader.result as string);
                                 if(e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
                               }} />
                             </div>
                             <span className="mt-4 text-[10px] font-black text-slate-400 tracking-widest">UPLOAD HEADSHOT</span>
                          </div>
                          <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                          <InputField label="PMDC Number" name="pmdc" value={formData.pmdc} onChange={handleInputChange} />
                          <InputField label="Specialization" name="specialization" value={formData.specialization} onChange={handleInputChange} />
                          <InputField label="Education" name="education" value={formData.education} onChange={handleInputChange} />
                        </div>
                        <MagneticButton onClick={nextStep} className="w-full py-5 bg-teal-900 text-white rounded-2xl font-black flex items-center justify-center gap-2">
                           Next Step <ChevronRight size={18} />
                        </MagneticButton>
                      </motion.div>
                    )}

                    {/* STEP 2: PROFESSIONAL DATA */}
                    {currentStep === 2 && (
                      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-8">
                        <InputField label="Tagline (Brief)" name="tagline" value={formData.tagline} onChange={handleInputChange} />
                        <div className="grid grid-cols-3 gap-4">
                          <InputField label="Expertise 1" name="expertise1" value={formData.expertise1} onChange={handleInputChange} />
                          <InputField label="Expertise 2" name="expertise2" value={formData.expertise2} onChange={handleInputChange} />
                          <InputField label="Expertise 3" name="expertise3" value={formData.expertise3} onChange={handleInputChange} />
                        </div>
                        <div className="relative">
                          <textarea 
                            name="bio" value={formData.bio} onChange={handleInputChange}
                            className="w-full h-40 p-6 bg-slate-50 rounded-3xl outline-none border-2 border-transparent focus:border-teal-500 font-bold transition-all"
                            placeholder="Professional Biography..."
                          />
                        </div>
                        <div className="flex gap-4">
                          <button type="button" onClick={prevStep} className="flex-1 py-5 border-2 border-slate-100 rounded-2xl font-black">Back</button>
                          <button type="button" onClick={nextStep} className="flex-[2] py-5 bg-teal-900 text-white rounded-2xl font-black">Final Step</button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: CONTACT & FINISH */}
                    {currentStep === 3 && (
                      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-8">
                        <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100">
                          <h4 className="text-teal-900 font-black text-sm mb-4">CONNECTIVITY CHANNELS</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="WhatsApp" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} />
                            <InputField label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleInputChange} />
                          </div>
                        </div>
                        {selectedPlan === 'premium' && (
                          <div className="grid grid-cols-2 gap-4">
                            <InputField label="Service 1" name="service1" value={formData.service1} onChange={handleInputChange} />
                            <InputField label="Service 2" name="service2" value={formData.service2} onChange={handleInputChange} />
                          </div>
                        )}
                        <div className="flex gap-4">
                          <button type="button" onClick={prevStep} className="flex-1 py-5 border-2 border-slate-100 rounded-2xl font-black text-slate-400">Back</button>
                          <button type="submit" disabled={loading} className="flex-[3] py-5 bg-teal-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-teal-500/30 flex items-center justify-center gap-3">
                            {loading ? <Loader2 className="animate-spin" /> : 'Finish & Submit'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// --- INNOVATIVE COMPONENTS ---

function PlanCard({ name, price, tagline, features, featured = false, onSelect }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={(e: any) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`p-10 rounded-[3rem] border-2 transition-all duration-500 flex flex-col h-full ${
        featured ? 'bg-teal-950 text-white border-teal-400 shadow-[0_40px_80px_-15px_rgba(13,148,136,0.3)]' : 'bg-white border-slate-100 hover:border-teal-100'
      }`}
    >
      <div className="mb-8">
        <h3 className={`text-2xl font-black mb-2 ${featured ? 'text-teal-400' : 'text-slate-900'}`}>{name}</h3>
        <p className="opacity-60 font-medium text-sm">{tagline}</p>
      </div>
      <div className="mb-10 flex items-baseline gap-1">
        <span className="text-5xl font-black tracking-tighter">{price}</span>
        {price !== 'Free' && <span className="text-sm opacity-50">/yr</span>}
      </div>
      <ul className="space-y-4 mb-12 flex-1">
        {features.map((f: string) => (
          <li key={f} className="flex items-center gap-3 font-bold text-sm">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${featured ? 'bg-teal-400 text-teal-950' : 'bg-teal-100 text-teal-600'}`}>
              <Check size={12} strokeWidth={4} />
            </div>
            {f}
          </li>
        ))}
      </ul>
      <button onClick={onSelect} className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${
        featured ? 'bg-teal-400 text-teal-950 hover:bg-white' : 'bg-slate-900 text-white hover:bg-teal-600'
      }`}>
        Select Plan
      </button>
    </motion.div>
  );
}

function InputField({ label, name, value, onChange }: any) {
  return (
    <div className="relative group">
      <input 
        name={name} value={value} onChange={onChange} required
        className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-teal-500 rounded-2xl outline-none font-bold transition-all peer placeholder-transparent"
        placeholder={label}
      />
      <label className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xs uppercase tracking-widest pointer-events-none transition-all peer-focus:top-3 peer-focus:text-teal-500 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-teal-500">
        {label}
      </label>
    </div>
  );
}

function SuccessState({ plan }: any) {
  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-16">
      <div className="w-24 h-24 bg-teal-100 text-teal-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl">
        <ShieldCheck size={48} />
      </div>
      <h2 className="text-4xl font-black text-slate-900 mb-4">Application Sent!</h2>
      <p className="text-slate-500 text-lg max-w-sm mx-auto font-medium">
        We are now verifying your PMDC credentials for the <span className="text-teal-600 font-black">{plan}</span> tier.
      </p>
    </motion.div>
  );
}