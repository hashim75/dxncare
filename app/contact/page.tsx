"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. YOUR WhatsApp Number
    const myPhoneNumber = "923338656601"; 

    // 2. Construct the Message
    const message = `*New Website Inquiry* 📩
    
👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}

💬 *Message:* ${formData.message}

----------------------------
Sent from dxncare.com`;

    // 3. Create URL
    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;

    // 4. Simulate small delay for UX then open
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.open(whatsappUrl, "_blank");
    
    // 5. Reset
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="bg-white pt-24 pb-16 md:pt-32 md:pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-red-600 font-bold tracking-wider uppercase text-xs md:text-sm bg-red-50 px-3 py-1 rounded-full">Get in Touch</span>
          <h1 className="text-3xl md:text-5xl font-bold font-jakarta text-teal-950 mt-4 md:mt-6 leading-tight">
            We're here to help you.
          </h1>
          <p className="text-slate-500 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Have questions about our products or need a consultation? Reach out to us.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Card 1: Phone */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
             className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 text-center hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone size={24} />
            </div>
            <h3 className="font-bold text-teal-950 text-lg">Call / WhatsApp</h3>
            <p className="text-slate-500 mt-2 text-sm">Mon-Sat from 9am to 6pm.</p>
            <a href="tel:+923338656601" className="text-lg md:text-xl font-bold text-teal-900 mt-4 block hover:text-red-600 transition-colors">+92 333 8656601</a>
          </motion.div>

          {/* Card 2: Email */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
             className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 text-center hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail size={24} />
            </div>
            <h3 className="font-bold text-teal-950 text-lg">Email Us</h3>
            <p className="text-slate-500 mt-2 text-sm">We usually respond within 24 hours.</p>
            <a href="mailto:support@dxncare.com" className="text-lg md:text-xl font-bold text-teal-900 mt-4 block hover:text-teal-600 transition-colors break-all">support@dxncare.com</a>
          </motion.div>

          {/* Card 3: Visit */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
             className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 text-center hover:shadow-lg transition-all hover:-translate-y-1 md:col-span-2 lg:col-span-1"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
            </div>
            <h3 className="font-bold text-teal-950 text-lg">Visit Us</h3>
            <p className="text-slate-500 mt-2 text-sm">Come see our wellness center.</p>
            <p className="text-lg md:text-xl font-bold text-teal-900 mt-4">Shahi Road, Khanpur,
Punjab, Pakistan</p>
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-teal-950 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 overflow-hidden relative shadow-2xl">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                
                {/* Left Text */}
                <div className="text-white text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold font-jakarta mb-4">Send us a Message</h2>
                    <p className="text-teal-100/80 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
                        Whether you have a question about products, trials, pricing, or anything else, our team is ready to answer all your questions.
                    </p>
                    <div className="inline-flex items-center gap-3 text-teal-200 bg-white/10 px-4 py-2 rounded-full border border-white/10 text-sm md:text-base">
                        <Clock size={18} />
                        <span className="font-medium">Response time: less than 24 hours</span>
                    </div>
                </div>
                
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 p-6 rounded-3xl backdrop-blur-sm border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                            required 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text" 
                            placeholder="Name" 
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm md:text-base" 
                        />
                        <input 
                            required 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email" 
                            placeholder="Email" 
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm md:text-base" 
                        />
                    </div>
                    <textarea 
                        required 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4} 
                        placeholder="How can we help you?" 
                        className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm md:text-base resize-none"
                    ></textarea>
                    
                    <button 
                        disabled={isSubmitting}
                        type="submit" 
                        className="w-full bg-red-600 text-white font-bold py-3 md:py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-base md:text-lg"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" /> Opening WhatsApp...
                            </>
                        ) : (
                            <>
                                <Send size={20} /> Send via WhatsApp
                            </>
                        )}
                    </button>
                    <p className="text-center text-teal-200/40 text-[10px] md:text-xs mt-2">
                        This will open WhatsApp on your device.
                    </p>
                </form>
            </div>
        </div>

      </div>
    </main>
  );
}