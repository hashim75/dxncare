"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Lock, Eye, Database, Cookie, 
  UserCheck, ShieldCheck, FileText, Menu 
} from "lucide-react";

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("intro");

  // SECTIONS CONFIGURATION FOR TIMELINE
  const sections = [
    { id: "collection", label: "Collection", icon: Database },
    { id: "usage", label: "Usage", icon: FileText },
    { id: "security", label: "Security", icon: Lock },
    { id: "cookies", label: "Cookies", icon: Cookie },
    { id: "rights", label: "Your Rights", icon: UserCheck },
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
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-b from-teal-800 to-transparent rounded-full blur-[60px] md:blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-900 rounded-full blur-[50px] md:blur-[80px] opacity-20 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        
        {/* Floating Lock Icon Animation (Hidden on Mobile) */}
        <motion.div 
          initial={{ rotate: -10, y: 20, opacity: 0 }}
          animate={{ rotate: 0, y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute right-[5%] md:right-[15%] top-1/4 md:top-1/3 text-white/5 hidden lg:block"
        >
          <ShieldCheck size={350} strokeWidth={1} />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-teal-200 hover:text-white transition-colors mb-6 md:mb-8 font-medium group text-sm md:text-base">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-jakarta text-white mb-4 md:mb-6 tracking-tight">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white">Policy</span>
            </h1>
            <p className="text-teal-100/80 text-base md:text-lg max-w-2xl mx-auto px-4">
              Your privacy is a top priority. Learn how we collect, use, and protect your data.
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

      {/* 3. MAIN CONTENT LAYOUT */}
      <section className="container mx-auto px-4 -mt-10 md:-mt-20 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* === LEFT COLUMN: CONTENT === */}
          <div className="flex-1 bg-white rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-slate-200 p-6 md:p-16">
            <article className="prose prose-base md:prose-lg max-w-none text-slate-600 prose-headings:text-teal-950 prose-strong:text-teal-900 leading-relaxed">
              
              {/* INTRO */}
              <div className="mb-8 md:mb-12 border-b border-slate-100 pb-6 md:pb-8">
                <p className="text-lg md:text-xl font-medium text-slate-800">
                  When you visit <strong>dxncare.com</strong>, your privacy is a top priority. This Privacy Policy explains what personal information we collect, how we use it, how we keep it safe, and your rights.
                </p>
                <p>
                  This website is operated by an independent DXN distributor for a global audience. We follow privacy laws, including GDPR and CCPA, as well as best practices, to ensure that your information is handled with care. By using our site or sharing your information, you agree to the terms outlined in this document.
                </p>
              </div>

              {/* SECTION 1: COLLECTION */}
              <div id="collection" className="scroll-mt-32 md:scroll-mt-40 mb-12 md:mb-20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold border border-teal-200 shadow-sm shrink-0">01</span>
                    <h2 className="text-2xl md:text-3xl font-bold m-0 font-jakarta">Information Collection</h2>
                </div>
                <p>
                  We primarily collect information to provide our services, enhance your experience on our site, and comply with the privacy standards of your region. We only collect the personal details you choose to share with us through our contact or appointment forms. This usually includes your name, email address, phone number, and any message you send. We can use this information to respond to your questions or set up a consultation. We only ask for what's necessary to assist you.
                </p>
                
                <div className="bg-slate-50 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100 mt-6">
                    <h4 className="flex items-center gap-2 text-base md:text-lg font-bold mt-0 text-teal-900"><Eye className="text-teal-600" size={20}/> Usage and Analytics Data</h4>
                    <p className="mb-0 text-sm md:text-base mt-2">
                        We also gather non-personal information about how you use our site. This includes your IP address, browser type, pages you visit, and how long you spend on each page. We use Google Analytics and cookies to collect this data. This information is anonymous and helps us improve our content and site functionality. This data is never combined with your contact details, so your usage metrics remain separate from your personal information.
                    </p>
                </div>
              </div>

              {/* SECTION 2: USAGE */}
              <div id="usage" className="scroll-mt-32 md:scroll-mt-40 mb-12 md:mb-20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold border border-slate-200 shadow-sm shrink-0">02</span>
                    <h2 className="text-2xl md:text-3xl font-bold m-0 font-jakarta">How We Use Your Information</h2>
                </div>
                <p className="mb-6">We use the personal information you provide for a few key reasons:</p>
                
                <ul className="space-y-4 marker:text-teal-600 font-medium list-disc pl-5">
                    <li className="pl-1"><strong>Responding to Your Questions:</strong> We use your name and contact details to get back to you, answer your questions, and schedule consultations or appointments. For example, if you fill out a contact form, we'll use your email or phone number to reply.</li>
                    <li className="pl-1"><strong>Providing Services:</strong> We use your information to provide the services you request, such as health and wellness consultations. We maintain simple records of our conversations and your preferences, so you don't have to repeat your health history each time. This enables us to provide a seamless and personalized experience.</li>
                    <li className="pl-1"><strong>Improving Our Website:</strong> Analytics and cookies help us understand how people use our site. This information is combined and anonymized. We use it to make the website easier to use, faster, and more helpful for your health needs.</li>
                    <li className="pl-1"><strong>Communications and Updates:</strong> With your permission, we may send you newsletters or emails about health topics, products, or upcoming events. You can easily opt out of these communications at any time by clicking the unsubscribe link in the email or by contacting us.</li>
                </ul>
                <p className="mt-6 text-xs md:text-sm italic text-slate-500 border-l-4 border-slate-200 pl-4">
                    We will not use your personal information for any purpose other than those listed here without your explicit permission, unless required by law.
                </p>
              </div>

              {/* SECTION 3: SECURITY */}
              <div id="security" className="scroll-mt-32 md:scroll-mt-40 mb-12 md:mb-20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold border border-slate-200 shadow-sm shrink-0">03</span>
                    <h2 className="text-2xl md:text-3xl font-bold m-0 font-jakarta">Data Storage and Security</h2>
                </div>
                <div className="bg-teal-50 border border-teal-100 p-6 md:p-8 rounded-2xl md:rounded-[2rem]">
                    <div className="flex items-start gap-4">
                        <Lock className="text-teal-700 mt-1 shrink-0" size={20} />
                        <p className="m-0 text-teal-900 font-medium leading-relaxed text-sm md:text-base">
                            We protect your personal data from unauthorized access or sharing. Your information is stored securely on protected servers. We employ standard security measures, including encryption and access controls. We keep your data only as long as you need it for the purposes listed above or as required by law. Once we no longer need it, we securely delete or anonymize it.
                        </p>
                    </div>
                </div>
              </div>

              {/* SECTION 4: COOKIES */}
              <div id="cookies" className="scroll-mt-32 md:scroll-mt-40 mb-12 md:mb-20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold border border-slate-200 shadow-sm shrink-0">04</span>
                    <h2 className="text-2xl md:text-3xl font-bold m-0 font-jakarta">Cookies and Google Analytics</h2>
                </div>
                <p>
                    Our site uses cookies and similar tools. Cookies are small text files saved to your device that help improve your experience. We use them for two primary purposes:
                </p>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-6">
                    <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-100">
                        <h4 className="font-bold text-teal-950 mt-0 mb-2 text-base md:text-lg">Essential Cookies</h4>
                        <p className="text-xs md:text-sm m-0">Some cookies are necessary for the basic functions of our site, such as maintaining your login session. If you disable these, the site may not function properly for you.</p>
                    </div>
                    <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-100">
                        <h4 className="font-bold text-teal-950 mt-0 mb-2 text-base md:text-lg">Analytics Cookies</h4>
                        <p className="text-xs md:text-sm m-0">We use Google Analytics cookies to understand how users interact with our site. These cookies collect anonymous information. We use this data solely to identify trends and improve our content.</p>
                    </div>
                </div>
              </div>

              {/* SECTION 5: RIGHTS */}
              <div id="rights" className="scroll-mt-32 md:scroll-mt-40">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold border border-slate-200 shadow-sm shrink-0">05</span>
                    <h2 className="text-2xl md:text-3xl font-bold m-0 font-jakarta">Your Privacy Rights</h2>
                </div>
                <p className="mb-4">Depending on where you live, you have certain rights over your personal data:</p>
                
                <ul className="space-y-2 marker:text-teal-600 font-medium list-disc pl-5 mb-8 text-sm md:text-base">
                    <li><strong>Access and Portability:</strong> You can ask for a copy of the personal information we have about you, and we'll provide it to you in a readable format.</li>
                    <li><strong>Correction:</strong> If you believe any information we have about you is incorrect or incomplete, you can request that we correct it. We will update your data promptly.</li>
                    <li><strong>Deletion:</strong> You can request that we delete your personal information. We will do so unless we are legally required to keep it.</li>
                    <li><strong>Restriction or Objection:</strong> In some cases, you can ask us to limit how we use your data or object to certain activities.</li>
                    <li><strong>Withdrawal of Consent:</strong> If we're using your data based on your consent (like for a newsletter), you have the right to withdraw that consent at any time.</li>
                </ul>

                <p className="mb-6 text-sm md:text-base">
                    Since we do not sell personal data, the "right to opt-out of sale" under the CCPA doesn't apply; however, you can still exercise your rights to deletion or disclosure.
                </p>

                <div className="mt-8 pt-8 border-t border-slate-200">
                    <p className="font-bold mb-2 text-sm md:text-base">To use any of these rights, please get in touch using the form given below.</p>
                    <p className="text-xs md:text-sm text-slate-500 mb-6">
                        We reserve the right to update this policy from time to time to reflect changes in our practices or applicable laws and regulations. When we do, we will post the updated policy here. Please check this page periodically for updates.
                    </p>
                    <Link href="/contact" className="inline-block bg-teal-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-800 transition-colors text-sm md:text-base">
                        Contact Us
                    </Link>
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
                    <p className="font-bold mb-2 text-sm">Have privacy concerns?</p>
                    <Link href="/contact" className="text-xs text-teal-200 hover:text-white underline font-medium">
                        Contact Data Officer
                    </Link>
                </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}