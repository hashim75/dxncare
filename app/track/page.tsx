"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PackageSearch, Mail, Phone, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";
import Link from "next/link";

// --- CONFIGURATION ---
// You can use the same config as your checkout page or create a new template for Tracking Requests
const EMAILJS_CONFIG = {
  publicKey: "ykMzk7yOAMHR1Ip8o",
  serviceId: "service_bhpyljt",
  templateId: "template_vkr09eu", // Ensure this template accepts tracking details
};

export default function TrackOrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phoneOrOrder: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `
      📦 NEW TRACKING REQUEST 
      -------------------------
      Customer Email: ${formData.email}
      Phone / Order #: ${formData.phoneOrOrder}
      
      Please check the system and update the customer on their delivery status.
    `;

    try {
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        from_name: "DXN Tracking Portal",
        from_email: formData.email,
        message: message,
      }, EMAILJS_CONFIG.publicKey);

      setIsSuccess(true);
      
    } catch (error) {
      console.error("FAILED to send tracking request:", error);
      alert("Something went wrong. Please try again or contact us directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <PackageSearch size={32} className="text-teal-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3">Track Your Order</h1>
            <p className="text-slate-500 text-sm md:text-base">Enter your details below and our team will send you a live status update.</p>
        </div>

        {isSuccess ? (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center"
          >
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Request Received!</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              We've received your tracking request. Our team is checking your order status and will email or WhatsApp you shortly.
            </p>
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center gap-2 w-full bg-teal-50 text-teal-700 py-3 rounded-xl font-bold hover:bg-teal-100 transition-colors"
            >
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide ml-1">Email Address</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                        <Mail size={18} />
                    </div>
                    <input 
                        required 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange} 
                        type="email" 
                        placeholder="your@email.com" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium placeholder:text-slate-400" 
                    />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide ml-1">Phone or Order Number</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                        <Phone size={18} />
                    </div>
                    <input 
                        required 
                        name="phoneOrOrder" 
                        value={formData.phoneOrOrder}
                        onChange={handleChange} 
                        type="text" 
                        placeholder="e.g. 0300 1234567 or #ORD-123" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium placeholder:text-slate-400" 
                    />
                </div>
              </div>

              <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-teal-950 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-teal-950/20 hover:bg-teal-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 mt-4"
              >
                  {isSubmitting ? (
                      <><Loader2 className="animate-spin" size={18} /> Searching Records...</>
                  ) : (
                      <><PackageSearch size={18} /> Get Tracking Update</>
                  )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </main>
  );
}