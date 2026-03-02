"use client";

import { motion } from "framer-motion";
import { Truck, MapPin, Globe, AlertTriangle, XCircle, RotateCcw, PackageCheck } from "lucide-react";

export default function ShippingPage() {
  
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"> 
      
      {/* --- WELCOMING HERO SECTION --- */}
      <section className="container mx-auto px-4 mb-16 md:mb-24 text-center relative"> 
        {/* Soft Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-teal-400/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-4xl mx-auto space-y-4 md:space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest shadow-sm">
            <PackageCheck size={16} /> Transparent Policies
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-jakarta text-slate-900 tracking-tight leading-tight">
            Shipping & <span className="text-teal-600">Returns</span>
          </h1>
          <p className="text-base md:text-xl text-slate-500 leading-relaxed px-2 md:px-4 max-w-2xl mx-auto">
            We want your experience with DXN CARE to be as smooth as possible. Below is the exact, transparent breakdown of how we handle your orders and returns.
          </p>
        </motion.div>
      </section>

      {/* --- INNOVATIVE BENTO GRID LAYOUT --- */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            
            {/* 1. Domestic Shipping (Left Column) */}
            <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="md:col-span-6 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-teal-200 transition-colors group relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <MapPin size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-jakarta">1. Domestic shipping</h2>
                <ul className="space-y-4 text-slate-600 leading-relaxed">
                    <li className="flex gap-3">
                        <strong className="text-teal-700 shrink-0">a.</strong> 
                        <span>We deliver orders from within Pakistan using reputable courier companies such as TCS, Leopards, or domestically using our own riders. We also deliver</span>
                    </li>
                    <li className="flex gap-3">
                        <strong className="text-teal-700 shrink-0">b.</strong> 
                        <span>We will deliver your order to the address that you provide when placing the order on our website within 3 to 5 days of placing the order. This timeline is only tentative and we shall not be liable for any delays arising out of any events outside our reasonable control.</span>
                    </li>
                </ul>
            </motion.div>

            {/* 2. International Shipping (Right Column) */}
            <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="md:col-span-6 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-blue-200 transition-colors group relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Globe size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-jakarta">2. International shipping</h2>
                <ul className="space-y-4 text-slate-600 leading-relaxed">
                    <li className="flex gap-3">
                        <strong className="text-blue-700 shrink-0">a.</strong> 
                        <span>We deliver orders outside of Pakistan using reputable courier companies such as DHL or FedEx.</span>
                    </li>
                    <li className="flex gap-3">
                        <strong className="text-blue-700 shrink-0">b.</strong> 
                        <span>We will deliver your order to the address that you provide when placing the order on our website within 10 to 15 days of placing the order, however this might take longer due to circumstances outside of our control and we shall not be held liable for any such delays.</span>
                    </li>
                    <li className="flex gap-3">
                        <strong className="text-blue-700 shrink-0">c.</strong> 
                        <span>You may be required to pay customs, duties or other taxes upon receipt of goods received by you that have been shipped from Pakistan.</span>
                    </li>
                </ul>
            </motion.div>

            {/* Complaints (Half Width) */}
            <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="md:col-span-6 bg-amber-50 p-8 md:p-10 rounded-[2.5rem] border border-amber-100"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center">
                        <AlertTriangle size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-amber-900 font-jakarta m-0">Complaints</h2>
                </div>
                <p className="text-amber-800 leading-relaxed">
                    For any complaints or queries in relation to this website, our products or service, you can contact us on this number +92 333 8656601 or on this email support@dxncare.com. We shall use our best endeavors to respond to your complaints or queries within 2 days of receipt. In case of a complaint for any defective or incorrect product, you must ensure that you share proper and complete evidence of receiving an incorrect or defective product such as receipts, pictures and videos.
                </p>
            </motion.div>

            {/* Cancellations (Half Width) */}
            <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="md:col-span-6 bg-rose-50 p-8 md:p-10 rounded-[2.5rem] border border-rose-100"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center">
                        <XCircle size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-rose-900 font-jakarta m-0">Cancellations</h2>
                </div>
                <p className="text-rose-800 leading-relaxed">
                    You may cancel any order within 24 hours of placement. Post expiry of the aforementioned period, no cancellation requests shall be entertained by us.
                </p>
            </motion.div>

            {/* Returns, Exchanges and Refunds (Full Width Featured Card) */}
            <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="md:col-span-12 bg-teal-900 text-white p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem] relative overflow-hidden shadow-2xl shadow-teal-900/20"
            >
                {/* Decorative Pattern inside dark card */}
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5 pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 bg-teal-800 text-teal-200 rounded-2xl flex items-center justify-center shadow-inner">
                            <RotateCcw size={28} />
                        </div>
                        <h2 className="text-3xl font-bold font-jakarta text-white m-0">Returns, Exchanges and Refunds</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-teal-50 text-base md:text-lg leading-relaxed">
                        <div className="space-y-6">
                            <p>We operate a no return, exchange and no refund policy except where the goods you receive are different from what you have ordered on our website or defective or damaged.</p>
                            <p>All goods being returned need to be sent by courier to Khanpur, Asad Town, House No 2, Rahim Yar Khan, Pakistan.</p>
                            <p>We only accept returns of goods within 7 days of you placing an order through our website.</p>
                            <p>Goods that are returned to us must be in a condition that they can be sold again.</p>
                        </div>
                        <div className="space-y-6">
                            <p>We will credit any refund for any goods returned and that are in a saleable condition within 7 to 10 days of receipt of the goods by us.</p>
                            <p>Instead of a refund, we may also provide you with store credit so that you can exchange the goods you want to return to purchase any other items from our website of the same value.</p>
                            <p>You will be responsible for paying for your own shipping costs for returning any goods. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
      </section>
    </main>
  );
}