"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { Facebook, Map, Mail, Phone, MapPin, ArrowRight, Loader2, Send, Linkedin } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // EMAILJS CONFIG
  const CONFIG = {
    publicKey: "ykMzk7yOAMHR1Ip8o",
    serviceId: "service_bhpyljt",
    templateId: "template_vkr09eu",
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      await emailjs.send(
        CONFIG.serviceId,
        CONFIG.templateId,
        {
          from_name: "Newsletter Subscriber",
          from_email: email,
          message: `New subscription request from: ${email}`,
          to_name: "DXN Care Team"
        },
        CONFIG.publicKey
      );
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <footer className="bg-teal-950 text-white pt-20 pb-10 border-t border-teal-900 relative overflow-hidden">
      
      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-800/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* COLUMN 1: BRAND & SOCIALS */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 z-50">
               <Image 
                 src="/images/logo-white.png" 
                 alt="DXN Care"
                 width={200}           
                 height={80}
                 className="object-contain h-[60px] w-auto" 
                 priority              
               />
            </Link>

            <p className="text-teal-100/70 leading-relaxed text-sm">
              Your trusted partner in natural wellness. We combine expert medical guidance with premium Ganoderma-based products.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/dxncarepakistan" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-900/50 p-3 rounded-xl hover:bg-[#1877F2] hover:text-white transition-all duration-300 border border-teal-800 hover:border-[#1877F2] group"
                aria-label="Facebook"
              >
                <Facebook size={20} className="text-teal-100 group-hover:text-white" />
              </a>
              
              <a 
                href="https://share.google/lgWCeghoY5o4D3HCU" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-900/50 p-3 rounded-xl hover:bg-[#34A853] hover:text-white transition-all duration-300 border border-teal-800 hover:border-[#34A853] group"
                aria-label="Google Maps Location"
              >
                <Map size={20} className="text-teal-100 group-hover:text-white" />
              </a>
              <a 
                href="https://www.linkedin.com/company/dxn-care/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-900/50 p-3 rounded-xl hover:bg-[#34A853] hover:text-white transition-all duration-300 border border-teal-800 hover:border-[#34A853] group"
                aria-label="Google Maps Location"
              >
                <Linkedin size={20} className="text-teal-100 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: COMPANY LINKS */}
          <div className="lg:pl-8">
            <h3 className="text-lg font-bold mb-6 text-white font-jakarta">Company</h3>
            <ul className="space-y-4 text-sm text-teal-100/70">
              <li><Link href="/about" className="hover:text-teal-300 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span> About Us</Link></li>
              <li><Link href="/products" className="hover:text-teal-300 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span> Our Products</Link></li>
              <li><Link href="/doctors" className="hover:text-teal-300 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span> Expert Doctors</Link></li>
              <li><Link href="/blog" className="hover:text-teal-300 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span> Wellness Blog</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: LEGAL & CONTACT */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white font-jakarta">Support</h3>
            <ul className="space-y-4 text-sm text-teal-100/70 mb-8">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Information</Link></li>
            </ul>
            
            <div className="space-y-3 text-sm">
                <div className="flex gap-3 items-start group">
                    <MapPin className="text-teal-500 mt-1 shrink-0 group-hover:text-teal-300 transition-colors" size={16} />
                    <span className="text-teal-100/70 group-hover:text-white transition-colors">Shahi Road, Khanpur,<br/>Punjab, Pakistan</span>
                </div>
                <div className="flex gap-3 items-center group">
                    <Phone className="text-teal-500 shrink-0 group-hover:text-teal-300 transition-colors" size={16} />
                    <span className="text-teal-100/70 group-hover:text-white transition-colors">+92 333 8656601</span>
                </div>
                <div className="flex gap-3 items-center group">
                    <Mail className="text-teal-500 shrink-0 group-hover:text-teal-300 transition-colors" size={16} />
                    <span className="text-teal-100/70 group-hover:text-white transition-colors">support@dxncare.com</span>
                </div>
            </div>
          </div>

          {/* COLUMN 4: NEWSLETTER (NEW) */}
          <div className="bg-teal-900/30 p-6 rounded-2xl border border-teal-800/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-2 text-white font-jakarta">Stay Connected</h3>
            <p className="text-xs text-teal-200/80 mb-6 leading-relaxed">
                Join our newsletter for exclusive health tips, doctor's advice, and new product alerts.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400" size={16} />
                    <input 
                        type="email" 
                        required
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-teal-950/50 border border-teal-700/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                </div>
                <button 
                    disabled={status === "loading" || status === "success"}
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === "loading" ? (
                        <><Loader2 size={16} className="animate-spin"/> Sending...</>
                    ) : status === "success" ? (
                        <>Subscribed!</>
                    ) : (
                        <>Subscribe <ArrowRight size={16} /></>
                    )}
                </button>
                {status === "success" && (
                    <p className="text-xs text-green-400 text-center mt-2 animate-pulse">Thank you for joining us! 🌿</p>
                )}
                {status === "error" && (
                    <p className="text-xs text-red-400 text-center mt-2">Something went wrong. Try again.</p>
                )}
            </form>
          </div>

        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-teal-800 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-teal-400/50">
          <p>&copy; {new Date().getFullYear()} DXN Care Pakistan. All rights reserved.</p>
          <div className="flex gap-6">
             <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;