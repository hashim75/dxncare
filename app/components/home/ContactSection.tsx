"use client";

import { motion } from "framer-motion";
import { Send, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-teal-950 rounded-3xl md:rounded-[3rem] p-6 md:p-12 lg:p-20 overflow-hidden relative shadow-2xl shadow-teal-900/20"
        >
          {/* Ambient Background Glows */}
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-teal-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-red-900/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
            
            {/* Left: Text Content */}
            <div className="text-white space-y-6 md:space-y-8">
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase mb-4">
                  Contact Us
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-jakarta leading-tight">
                  Ready to prioritize <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white">
                    your wellness?
                  </span>
                </h2>
              </div>
              
              <p className="text-teal-100/80 text-base md:text-lg leading-relaxed max-w-md">
                Our medical team is ready to guide you. Whether you need product recommendations or a doctor's consultation, we are here to help.
              </p>

              <div className="flex flex-col gap-6 pt-4 border-t border-white/10 mt-4 md:mt-0">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-600 transition-colors shrink-0">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-teal-300 uppercase tracking-wide font-semibold">Call Us Now</p>
                    <p className="text-lg md:text-xl font-bold font-jakarta">+92 333 8656601</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-600 transition-colors shrink-0">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-teal-300 uppercase tracking-wide font-semibold">Email Support</p>
                    <p className="text-lg md:text-xl font-bold font-jakarta break-all">support@dxncare.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Form */}
            <div className="bg-white/5 backdrop-blur-xl p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl">
              <form className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-teal-200 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all hover:bg-white/10 text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-teal-200 ml-1">Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="+92..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all hover:bg-white/10 text-sm md:text-base"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-teal-200 ml-1">How can we help?</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your health goals..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all hover:bg-white/10 resize-none text-sm md:text-base"
                  ></textarea>
                </div>
                
                <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 md:py-4 rounded-xl hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 group text-base md:text-lg">
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