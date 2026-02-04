"use client";

import { motion } from "framer-motion";
import { Send, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-24 bg-white">
      {/* CHANGED: Increased max-width to 7xl for a wider, grander look */}
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-teal-950 rounded-[3rem] p-8 md:p-20 overflow-hidden relative shadow-2xl shadow-teal-900/20"
        >
          {/* Ambient Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <div className="text-white space-y-8">
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase mb-4">
                  Contact Us
                </span>
                <h2 className="text-4xl md:text-5xl font-bold font-jakarta leading-tight">
                  Ready to prioritize <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white">
                    your wellness?
                  </span>
                </h2>
              </div>
              
              <p className="text-teal-100/80 text-lg leading-relaxed max-w-md">
                Our medical team is ready to guide you. Whether you need product recommendations or a doctor's consultation, we are here to help.
              </p>

              <div className="flex flex-col gap-6 pt-4">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-teal-300 uppercase tracking-wide font-semibold">Call Us Now</p>
                    <p className="text-xl font-bold font-jakarta">+92 300 1234567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-teal-300 uppercase tracking-wide font-semibold">Email Support</p>
                    <p className="text-xl font-bold font-jakarta">support@dxncare.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Form */}
            <div className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-teal-200 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all hover:bg-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-teal-200 ml-1">Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="+92..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all hover:bg-white/10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-teal-200 ml-1">How can we help?</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your health goals..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all hover:bg-white/10 resize-none"
                  ></textarea>
                </div>
                
                <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 rounded-xl hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 group">
                  Send Message 
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;