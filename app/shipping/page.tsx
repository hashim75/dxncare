"use client";

import { motion } from "framer-motion";
import { Truck, Clock, MapPin, Package, HelpCircle, Globe, Mail, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const ShippingPage = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24"> {/* Increased top/bottom padding */}
      
      {/* --- HERO SECTION --- */}
      <section className="container mx-auto px-4 mb-24 text-center"> {/* Increased margin bottom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-6" // Added vertical space between elements
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider">
            <Truck size={14} /> Fast & Reliable
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-jakarta text-slate-900 tracking-tight leading-tight">
            Shipping <span className="text-teal-600">Policy</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed px-4">
            We believe getting your wellness essentials should be as stress-free as using them. 
            Here is everything you need to know about how we get DXN products to your doorstep.
          </p>
        </motion.div>
      </section>

      {/* --- VISUAL TIMELINE --- */}
      <section className="container mx-auto px-4 mb-32"> {/* Increased section spacing */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-slate-100 relative overflow-hidden"> {/* Larger padding & rounding */}
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />
          
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 font-jakarta">The Journey to You</h2> {/* More space below title */}
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10"> {/* Increased gap */}
            {[
              { icon: Package, title: "Order Placed", desc: "You confirm your wellness essentials." },
              { icon: Clock, title: "Processing", desc: "We pack your order within 24-48 hours." },
              { icon: Truck, title: "Shipped", desc: "Handed to our trusted courier partners." },
              { icon: CheckCircle2, title: "Delivered", desc: "Arrives at your door, ready to use." },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center group relative"
              >
                <div className="w-20 h-20 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shadow-sm ring-4 ring-white"> {/* Larger icon box */}
                  <step.icon size={36} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed px-2">{step.desc}</p>
                
                {/* Connector Line (Desktop Only) */}
                {i !== 3 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-0.5 bg-slate-100 -z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DETAILED POLICY GRID --- */}
      <section className="container mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 lg:gap-10" // Increased gap between cards
        >
          
          {/* Card 1: Processing Time */}
          <motion.div variants={itemVariants} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-teal-200 transition-all hover:shadow-xl hover:shadow-teal-900/5 group h-full">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform shrink-0">
                <Clock size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-jakarta">Processing Time</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  All orders are processed within <strong>1–2 business days</strong> (excluding weekends and holidays). You will receive a notification once your order has shipped.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Shipping Rates */}
          <motion.div variants={itemVariants} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-teal-200 transition-all hover:shadow-xl hover:shadow-teal-900/5 group h-full">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform shrink-0">
                <Globe size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-jakarta">Shipping Rates</h3>
                <ul className="text-slate-600 space-y-3 list-disc list-inside text-lg">
                  <li><strong>Standard:</strong> Calculated at checkout based on location.</li>
                  <li><strong>Free Shipping:</strong> Available on orders over Rs. 5,000.</li>
                  <li><strong>International:</strong> Rates vary by destination zone.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Estimated Delivery */}
          <motion.div variants={itemVariants} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-teal-200 transition-all hover:shadow-xl hover:shadow-teal-900/5 group h-full">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform shrink-0">
                <MapPin size={28} />
              </div>
              <div className="w-full">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-jakarta">Estimated Delivery</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-base border-b border-slate-100 pb-3">
                    <span className="text-slate-500">Major Cities (ISB, LHR, KHI)</span>
                    <span className="font-bold text-slate-900">2–3 Days</span>
                  </div>
                  <div className="flex justify-between text-base border-b border-slate-100 pb-3">
                    <span className="text-slate-500">Other Cities</span>
                    <span className="font-bold text-slate-900">3–5 Days</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-slate-500">Remote Areas</span>
                    <span className="font-bold text-slate-900">5–7 Days</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Issues & Support */}
          <motion.div variants={itemVariants} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-teal-200 transition-all hover:shadow-xl hover:shadow-teal-900/5 group h-full">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl group-hover:scale-110 transition-transform shrink-0">
                <HelpCircle size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-jakarta">Lost or Damaged?</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  DXN Care is not liable for products damaged or lost during shipping, but we will do our best to help. If your order arrives damaged, please save all packaging materials.
                </p>
                <a href="mailto:support@dxncare.com" className="inline-flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700 transition-colors text-lg">
                  <Mail size={20} /> support@dxncare.com
                </a>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* --- FAQ / CONTACT CTA --- */}
      <section className="container mx-auto px-4 mt-32 text-center"> {/* Increased top margin */}
        <div className="bg-teal-900 rounded-[3rem] p-16 text-white relative overflow-hidden shadow-2xl shadow-teal-900/20">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.svg')] opacity-10"></div>
           <div className="relative z-10 space-y-6">
             <h2 className="text-3xl md:text-4xl font-bold font-jakarta">Still have questions?</h2>
             <p className="text-teal-100 text-lg max-w-2xl mx-auto leading-relaxed">
               Our support team is just an email away. Whether it's tracking an order or a shipping inquiry, we're here to help.
             </p>
             <div className="pt-4">
               <Link 
                 href="/contact" 
                 className="inline-flex items-center gap-3 bg-white text-teal-900 px-10 py-4 rounded-full font-bold hover:bg-teal-50 transition-all active:scale-95 shadow-lg"
               >
                 Contact Support
               </Link>
             </div>
           </div>
        </div>
      </section>

    </main>
  );
};

export default ShippingPage;