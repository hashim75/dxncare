"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, ArrowLeft, UserCheck, Package, 
  CreditCard, AlertTriangle, Gavel, Scale, CheckCircle2 
} from "lucide-react";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("intro");

  // SECTIONS CONFIGURATION FOR TIMELINE
  const sections = [
    { id: "eligibility", label: "Eligibility", icon: UserCheck },
    { id: "services", label: "Services", icon: Package },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "medical", label: "Medical Notice", icon: AlertTriangle },
    { id: "responsibilities", label: "Responsibilities", icon: Gavel },
    { id: "liability", label: "Liability", icon: Scale },
  ];

  // SCROLL SPY LOGIC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -50% 0px" }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Adjust offset for mobile header
      const yOffset = window.innerWidth < 768 ? -100 : -140; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen pb-20 md:pb-32">
      
      {/* 1. HEADER SECTION */}
      <section className="relative bg-teal-950 pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-b from-teal-800 to-transparent rounded-full blur-[60px] md:blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-900 rounded-full blur-[50px] md:blur-[80px] opacity-20 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-teal-200 hover:text-white transition-colors mb-6 md:mb-8 font-medium group text-sm md:text-base">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-jakarta text-white mb-4 md:mb-6 tracking-tight">
              Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white">Conditions</span>
            </h1>
            <p className="text-teal-100/80 text-base md:text-lg max-w-2xl mx-auto px-4">
              These are the rules that guide how our website and services work.
            </p>
        </div>
      </section>

      {/* 2. MOBILE NAVIGATION BAR (Sticky on Mobile) */}
      <div className="lg:hidden sticky top-[70px] z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 overflow-x-auto no-scrollbar py-3 px-4 shadow-sm">
         <div className="flex items-center gap-3 min-w-max">
            {sections.map((section) => (
               <button 
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                     activeSection === section.id 
                     ? "bg-teal-600 text-white border-teal-600" 
                     : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}
               >
                  <section.icon size={12} />
                  {section.label}
               </button>
            ))}
         </div>
      </div>

      {/* 3. MAIN LAYOUT */}
      <section className="container mx-auto px-4 -mt-10 md:-mt-20 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* === LEFT COLUMN: CONTENT === */}
          <div className="flex-1 bg-white rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-slate-200 p-6 md:p-16">
            <article className="prose prose-base md:prose-lg max-w-none text-slate-600 prose-headings:text-teal-950 prose-strong:text-teal-900 leading-relaxed">
              
              {/* INTRO */}
              <div className="mb-8 md:mb-12 border-b border-slate-100 pb-6 md:pb-8">
                <p className="text-lg md:text-xl font-medium text-slate-800">
                  Thanks for visiting <strong>dxncare.com</strong>. These are the rules that guide how our website and services work. By using our site, you’re agreeing to follow these rules. If you are not comfortable with any of these options, we kindly request that you refrain from using the site. We may update these terms from time to time, and by continuing to use the site, you agree to accept any new changes.
                </p>
              </div>

              {/* SECTION 1: ELIGIBILITY */}
              <div id="eligibility" className="scroll-mt-32 md:scroll-mt-40 mb-12 md:mb-20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold border border-teal-200 shadow-sm shrink-0">01</span>
                    <h2 className="text-2xl md:text-3xl font-bold m-0 font-jakarta">Eligibility to Use Our Services</h2>
                </div>
                <p>
                  You must be at least 18 years old to make a purchase or book a consultation. If you’re not yet 18, you'll need permission from a parent or guardian to use our services. To access certain parts of our site, you’ll be asked to create an account. When you do, please give us accurate and complete information. It’s your job to keep your account details and password secure, as you are responsible for all activity that happens under your account.
                </p>
              </div>

              {/* SECTION 2: WHAT WE PROVIDE */}
              <div id="services" className="scroll-mt-32 md:scroll-mt-40 mb-12 md:mb-20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold border border-slate-200 shadow-sm shrink-0">02</span>
                    <h2 className="text-2xl md:text-3xl font-bold m-0 font-jakarta">What We Provide</h2>
                </div>
                
                <div className="space-y-6 md:space-y-8 mt-6">
                    <div className="bg-slate-50 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100">
                        <h3 className="text-lg md:text-xl font-bold mt-0 mb-2 md:mb-3 text-teal-900">DXN Product Sales</h3>
                        <p className="mb-0 text-sm md:text-base">We sell genuine DXN wellness products. All physical items are shipped directly from our official distribution channel in Pakistan and are for delivery within Pakistan only. Please remember that these are dietary supplements, not medication. They are meant to support your general well-being and should not be used to treat or cure any illness.</p>
                    </div>

                    <div className="bg-slate-50 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100">
                        <h3 className="text-lg md:text-xl font-bold mt-0 mb-2 md:mb-3 text-teal-900">Online Doctor Consultations</h3>
                        <p className="mb-0 text-sm md:text-base">You can book an online video chat with a qualified doctor. You'll need to pay for your appointment when you book it. We'll set up a private video call for a time that works for both of you. A quick heads-up: these sessions are not for emergencies. If you are experiencing a medical emergency, please call your local emergency services immediately. The doctor’s advice will be based on what you tell them and their own professional expertise.</p>
                    </div>

                    <div className="bg-slate-50 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100">
                        <h3 className="text-lg md:text-xl font-bold mt-0 mb-2 md:mb-3 text-teal-900">Intellectual Property and Site Content</h3>
                        <p className="mb-0 text-sm md:text-base">All the content on our site—including articles, videos, and guides—is our property. We ask that you don't copy, sell, or modify any of it without our permission. You are free to browse and use the information as intended, but you may not redistribute or sell our materials.</p>
                    </div>
                </div>
              </div>

              {/* SECTION 3: PAYMENTS */}
              <div id="payments" className="scroll-mt-32 md:scroll-mt-40 mb-12 md:mb-20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold border border-slate-200 shadow-sm shrink-0">03</span>
                    <h2 className="text-2xl md:text-3xl font-bold m-0 font-jakarta">Payments and Our Refund Policy</h2>
                </div>
                <p>
                    All of our fees are clearly listed and must be paid in full up front. Once you've had a consultation, the payment is not refundable. If you need to cancel or reschedule, please let us know at least 24 hours in advance. If you do, we may offer a partial refund or a credit toward a future appointment; however, last-minute cancellations may incur a small fee. We can’t provide a refund if you miss your appointment without notice.
                </p>
                <p>
                    For digital downloads, all sales are final, as you receive the content immediately. If you encounter a problem, such as a corrupted file, don't hesitate to get in touch with us and we'll provide you with a new one.
                </p>
              </div>

              {/* SECTION 4: MEDICAL NOTICE (Highlight) */}
              <div id="medical" className="scroll-mt-32 md:scroll-mt-40 mb-12 md:mb-20">
                <div className="bg-red-600 text-white p-6 md:p-10 rounded-2xl md:rounded-[2rem] shadow-xl shadow-red-900/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="text-white shrink-0" size={28} />
                            <h2 className="text-2xl md:text-3xl font-bold m-0 text-white font-jakarta">Important Medical Notice</h2>
                        </div>
                        <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed">
                            The information provided on this website is <strong>not intended as medical advice</strong>. This information is provided for general wellness and educational purposes only. You should always talk to a licensed doctor or other healthcare professional about any health concerns. Please don't use the information on this site to make health decisions without consulting a healthcare professional.
                        </p>
                        <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed mt-4">
                            Just so you know, during an online consultation, the doctor-patient relationship is established between you and the doctor, not with dxncare.com. We don't promise any specific health outcomes, as everyone is different. We also can't guarantee that every piece of information on our site is perfect or right for you, so please use it at your own risk.
                        </p>
                    </div>
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                </div>
              </div>

              {/* SECTION 5: RESPONSIBILITIES */}
              <div id="responsibilities" className="scroll-mt-32 md:scroll-mt-40 mb-12 md:mb-20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold border border-slate-200 shadow-sm shrink-0">05</span>
                    <h2 className="text-2xl md:text-3xl font-bold m-0 font-jakarta">Your Responsibilities</h2>
                </div>
                <p className="mb-6">By using our site, you agree to these ground rules:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { title: "No illegal activity", desc: "Only use our site for lawful purposes." },
                        { title: "Be respectful", desc: "Don't use our platform to be abusive or post hateful content. We have a zero-tolerance policy for such behavior." },
                        { title: "Keep your account secure", desc: "You are responsible for all activity under your account." },
                        { title: "Be truthful", desc: "Provide us with accurate information about yourself, especially during consultations." },
                        { title: "Don't mess with the site", desc: "Don’t try to hack our security, upload viruses, or access other users' accounts." },
                        { title: "Leave the medical advice to the pros", desc: "Unless you’re a doctor using our service, don't use the site to give medical advice to other people." }
                    ].map((rule, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                            <h4 className="font-bold text-black text-xs md:text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-teal-600"/> {rule.title}
                            </h4>
                            <p className="text-sm m-0 leading-normal">{rule.desc}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-sm text-red-600 font-bold">
                    If you don't follow these rules, we may suspend or terminate your access.
                </p>
              </div>

              {/* SECTION 6: LIABILITY */}
              <div id="liability" className="scroll-mt-32 md:scroll-mt-40">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold border border-slate-200 shadow-sm shrink-0">06</span>
                    <h2 className="text-2xl md:text-3xl font-bold m-0 font-jakarta">Our Liability</h2>
                </div>
                <p>
                    We are not responsible for any indirect or consequential damages that might arise from your use of our site. Our total liability is limited to the amount you paid for a specific service. All health information is provided without warranty, and you use it at your own risk. Any legal issues will be handled in Pakistani courts under Pakistani law. If you're using the site from another country, you are responsible for complying with the laws of your local jurisdiction.
                </p>
                <div className="mt-8 pt-8 border-t border-slate-200">
                    <p className="font-bold">
                        We hope this helps explain things for you. If you have any questions, please don't hesitate to contact us through our contact form.
                    </p>
                </div>
              </div>

            </article>
          </div>

          {/* === RIGHT COLUMN: TIMELINE SIDEBAR (Desktop Only) === */}
          <div className="hidden lg:block w-80 relative">
            <div className="sticky top-32">
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
                    <h4 className="font-bold text-black mb-8 uppercase tracking-wider text-xs">On this page</h4>
                    
                    <div className="relative pl-4">
                        {/* Gray Line */}
                        <div className="absolute left-[34px] top-4 bottom-4 w-0.5 bg-slate-100 rounded-full"></div>
                        
                        {/* Colored Line */}
                        <motion.div 
                            className="absolute left-[34px] top-4 w-0.5 bg-gradient-to-b from-teal-500 to-teal-300 rounded-full z-0"
                            animate={{ 
                                height: `${(sections.findIndex(s => s.id === activeSection) / (sections.length - 1)) * 100}%` 
                            }}
                        />

                        {/* Items */}
                        <div className="space-y-6 relative z-10">
                            {sections.map((section, index) => {
                                const isActive = activeSection === section.id;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className="flex items-center gap-4 w-full text-left group"
                                    >
                                        <div 
                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 shrink-0
                                            ${isActive 
                                                ? "bg-teal-600 border-teal-600 text-white scale-110 shadow-lg" 
                                                : "bg-white border-slate-200 text-slate-300 group-hover:border-teal-300"
                                            }`}
                                        >
                                            <section.icon size={14} />
                                        </div>
                                        <span className={`text-sm font-bold transition-colors duration-300 ${isActive ? "text-teal-900" : "text-slate-400 group-hover:text-teal-700"}`}>
                                            {section.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-teal-900 p-6 rounded-[2rem] shadow-lg text-white text-center">
                    <p className="font-bold mb-2 text-sm">Need clarification?</p>
                    <Link href="/contact" className="text-xs text-teal-200 hover:text-white underline font-medium">
                        Contact Support Team
                    </Link>
                </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}