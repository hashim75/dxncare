"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ShieldCheck, Copyright, Scale, Gavel, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("intro");

  const sections = [
    { id: "intro", label: "Introduction", icon: BookOpen },
    { id: "applicability", label: "Applicability & Updates", icon: BookOpen },
    { id: "usage", label: "Terms of Usage", icon: ShieldCheck },
    { id: "intellectual", label: "Intellectual Property", icon: Copyright },
    { id: "liability", label: "Indemnity & Liability", icon: Scale },
    { id: "termination", label: "Termination", icon: Gavel },
    { id: "severability", label: "Severability & Waiver", icon: Scale },
    { id: "governing", label: "Governing Law", icon: Gavel },
  ];

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
      const yOffset = window.innerWidth < 768 ? -100 : -140; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen pb-20 md:pb-32">
      
      {/* HEADER SECTION */}
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
        </div>
      </section>

      {/* MOBILE NAVIGATION BAR */}
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

      {/* MAIN LAYOUT */}
      <section className="container mx-auto px-4 -mt-10 md:-mt-20 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* CONTENT */}
          <div className="flex-1 bg-white rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-slate-200 p-6 md:p-16">
            <article className="prose prose-base md:prose-lg max-w-none text-slate-600 prose-headings:text-teal-950 prose-strong:text-teal-900 leading-relaxed">

              {/* 1. Introduction */}
              <div id="intro" className="scroll-mt-32 md:scroll-mt-40 mb-12">
                {/* ALIGNMENT FIX: items-center, !m-0, leading-none */}
                <div className="flex flex-row items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg border border-teal-100 shrink-0">01</div>
                    <h2 className="text-2xl md:text-3xl font-bold !m-0 font-jakarta leading-none text-slate-900">Introduction</h2>
                </div>
                <ul className="list-none pl-0 space-y-4">
                  <li><strong>a.</strong> This website is owned and operated by DXN CARE (hereinafter and throughout this website referred to as "we", "us" and "our"). Our registered office is at Khanpur, Asad Town, House No 2, Rahim Yar Khan. Our principal place of business is located at Khanpur, Asad Town, House No 2, Rahim Yar Khan.</li>
                  <li><strong>b.</strong> We offer this website, including all information, tools, products and services available from this website to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</li>
                  <li><strong>c.</strong> If you have any problems placing your order on our website, or require support after placing an order through our website, please contact us by calling us on +92 333 8656601 or send us an email on support@dxncare.com.</li>
                </ul>
              </div>

              {/* 2. Applicability and Updates */}
              <div id="applicability" className="scroll-mt-32 md:scroll-mt-40 mb-12">
                {/* ALIGNMENT FIX */}
                <div className="flex flex-row items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center font-bold text-lg border border-slate-100 shrink-0">02</div>
                    <h2 className="text-2xl md:text-3xl font-bold !m-0 font-jakarta leading-none text-slate-900">Applicability and Updates</h2>
                </div>
                <ul className="list-none pl-0 space-y-4">
                  <li><strong>a.</strong> By visiting our site and/ or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms and Conditions"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms and Conditions apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.</li>
                  <li><strong>b.</strong> In consideration of your use of our website and services, you represent that you are of legal age to form a binding contract and are not a person barred from receiving products and services under the laws of Pakistan or other applicable jurisdiction.</li>
                  <li><strong>c.</strong> We may need to update our Terms and Conditions from time to time, each time you place an order on our website you will be agreeing to the latest version of our Terms and Conditions.</li>
                </ul>
              </div>

              {/* 3. Terms of Usage */}
              <div id="usage" className="scroll-mt-32 md:scroll-mt-40 mb-12">
                {/* ALIGNMENT FIX */}
                <div className="flex flex-row items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center font-bold text-lg border border-slate-100 shrink-0">03</div>
                    <h2 className="text-2xl md:text-3xl font-bold !m-0 font-jakarta leading-none text-slate-900">Terms of Usage</h2>
                </div>
                <p><strong>a.</strong> You are prohibited from using this website or its content:</p>
                
                <div className="space-y-3 my-6">
                    {[
                        "for any unlawful purpose;",
                        "to solicit others to perform or participate in any unlawful acts;",
                        "to violate any international, federal, provincial or state laws, regulations and rules;",
                        "to infringe upon or violate our intellectual property rights or the intellectual property rights of others;",
                        "to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;",
                        "to submit false or misleading information;",
                        "to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the service or interfere with or circumvent the security features of our service, any related website, other websites, or the internet;",
                        "to collect or track the personal information of others or spam, phish, pharm, pretext, spider, crawl, or scrape; or",
                        "for any obscene or immoral purpose."
                    ].map((rule, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-start gap-3">
                            <AlertTriangle className="text-rose-500 shrink-0 mt-1" size={18}/>
                            <span className="text-sm md:text-base font-medium text-slate-700">{rule}</span>
                        </div>
                    ))}
                </div>
                <p className="text-rose-600 font-bold"><strong>b.</strong> We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</p>
              </div>

              {/* 4. Intellectual Property */}
              <div id="intellectual" className="scroll-mt-32 md:scroll-mt-40 mb-12">
                {/* ALIGNMENT FIX */}
                <div className="flex flex-row items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center font-bold text-lg border border-slate-100 shrink-0">04</div>
                    <h2 className="text-2xl md:text-3xl font-bold !m-0 font-jakarta leading-none text-slate-900">Intellectual Property</h2>
                </div>
                <p>
                    This website and its related software and content (including images and designs) are the intellectual property of and is exclusively owned by DXN CARE. The structure, organization, and code of the website and its related software contain valuable trade secrets and confidential information of DXN CARE. Except as expressly stated herein, these terms and conditions do not grant you any intellectual property rights whatsoever in the website and its related software and all rights are reserved by DXN CARE.
                </p>
              </div>

              {/* 5. Indemnity and Limitation of Liability */}
              <div id="liability" className="scroll-mt-32 md:scroll-mt-40 mb-12">
                {/* ALIGNMENT FIX */}
                <div className="flex flex-row items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center font-bold text-lg border border-slate-100 shrink-0">05</div>
                    <h2 className="text-2xl md:text-3xl font-bold !m-0 font-jakarta leading-none text-slate-900">Indemnity and Limitation of Liability</h2>
                </div>
                <ul className="list-none pl-0 space-y-4">
                  <li><strong>a.</strong> You agree to indemnify us, defend and hold us harmless and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms and Conditions or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.</li>
                  <li><strong>b.</strong> Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                  <li><strong>c.</strong> Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</li>
                  <li><strong>d.</strong> To the extent permitted by law, we also disclaim all warranties, whether express or implied, including the implied warranties of merchantability, fitness for a particular purpose, title and non-infringement.</li>
                  <li>
                    <strong>e.</strong> We reserve the right to not process an order that you place on our website. This is usually for the following reasons:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>We no longer hold stock of the goods or services that you ordered from us.</li>
                      <li>We are unable to ship goods to your location.</li>
                      <li>The goods or services that you have ordered are no longer available.</li>
                      <li>Any reason outside of our control.</li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* 6. Termination */}
              <div id="termination" className="scroll-mt-32 md:scroll-mt-40 mb-12">
                {/* ALIGNMENT FIX */}
                <div className="flex flex-row items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center font-bold text-lg border border-slate-100 shrink-0">06</div>
                    <h2 className="text-2xl md:text-3xl font-bold !m-0 font-jakarta leading-none text-slate-900">Termination</h2>
                </div>
                <p>
                    We may immediately change or terminate your access to our products, services and this website, or any online membership(s) with us, with or without notice, at any time, without liability to you, any other user or any third party. We reserve the right to terminate your access if, without limitation, you have: (1) provided us with false or misleading registration information; (2) interfered with other users or the administration of our services or websites; (3) upon a request by law enforcement or other governmental authorities; or (4) otherwise violated these Terms and Conditions.
                </p>
              </div>

              {/* 7. Severability and Waiver */}
              <div id="severability" className="scroll-mt-32 md:scroll-mt-40 mb-12">
                {/* ALIGNMENT FIX */}
                <div className="flex flex-row items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center font-bold text-lg border border-slate-100 shrink-0">07</div>
                    <h2 className="text-2xl md:text-3xl font-bold !m-0 font-jakarta leading-none text-slate-900">Severability and Waiver</h2>
                </div>
                <p>
                    If any portion of these terms is found to be unenforceable, the unenforceable portion will be deemed amended to the minimum extent necessary to make it enforceable, and if it can't be made enforceable, then it will be severed and the remaining portion will remain in full force and effect. If we fail to enforce any of these terms, it will not be considered a waiver. Any amendment to or waiver of these terms must be made in writing and signed by us.
                </p>
              </div>

              {/* 8. Governing Law */}
              <div id="governing" className="scroll-mt-32 md:scroll-mt-40">
                {/* ALIGNMENT FIX */}
                <div className="flex flex-row items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center font-bold text-lg border border-slate-100 shrink-0">08</div>
                    <h2 className="text-2xl md:text-3xl font-bold !m-0 font-jakarta leading-none text-slate-900">Governing Law</h2>
                </div>
                <p>
                    Our Terms and Conditions are governed by the laws of the Islamic Republic of Pakistan and you agree that the courts of Rahim Yar Khan (including any consumer court) will have exclusive jurisdiction in any dispute that you have with us.
                </p>
              </div>

            </article>
          </div>

          {/* TIMELINE SIDEBAR (Desktop Only) */}
          <div className="hidden lg:block w-80 relative">
            <div className="sticky top-32">
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
                    <h4 className="font-bold text-black mb-8 uppercase tracking-wider text-xs">On this page</h4>
                    
                    <div className="relative pl-4">
                        <div className="absolute left-[34px] top-4 bottom-4 w-0.5 bg-slate-100 rounded-full"></div>
                        <motion.div 
                            className="absolute left-[34px] top-4 w-0.5 bg-gradient-to-b from-teal-500 to-teal-300 rounded-full z-0"
                            animate={{ 
                                height: `${(sections.findIndex(s => s.id === activeSection) / (sections.length - 1)) * 100}%` 
                            }}
                        />

                        <div className="space-y-6 relative z-10">
                            {sections.map((section) => {
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
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}