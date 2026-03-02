"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PackageSearch, Loader2, ArrowRight, MapPin, Calendar, CreditCard, User, AlertCircle, RefreshCcw, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [trackingInput, setTrackingInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;

    setIsSearching(true);
    setError(null);
    setTrackingData(null);

    try {
      // Calls the internal Next.js API route we created for PostEx tracking
      const response = await fetch(`/api/postex/track?trackingNumber=${encodeURIComponent(trackingInput)}`);
      const data = await response.json();

      if (data.success) {
        setTrackingData(data.trackingData); 
      } else {
        setError(data.message || "We couldn't find an order with that tracking number.");
      }
    } catch (err) {
      console.error("Tracking error:", err);
      setError("Failed to connect to the tracking server. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const resetTracking = () => {
    setTrackingData(null);
    setTrackingInput("");
    setError(null);
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
            <p className="text-slate-500 text-sm md:text-base">Enter your PostEx tracking number to see your live delivery status.</p>
        </div>

        {trackingData ? (
          /* --- SUCCESS STATE: SHOW LIVE TRACKING DATA --- */
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Live Status
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-teal-950 capitalize leading-tight">
                {trackingData.transactionStatus || "Processing"}
              </h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">Tracking ID: {trackingData.trackingNumber}</p>
            </div>

            {/* --- ORDER SUMMARY CARDS --- */}
            <div className="bg-slate-50 rounded-2xl p-5 space-y-4 mb-8 border border-slate-100">
              <div className="flex items-center gap-3">
                <User size={18} className="text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Customer</p>
                  <p className="text-slate-900 font-medium">{trackingData.customerName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Destination City</p>
                  <p className="text-slate-900 font-medium">{trackingData.cityName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CreditCard size={18} className="text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Amount to Pay (COD)</p>
                  <p className="text-slate-900 font-medium">Rs. {trackingData.invoicePayment?.toLocaleString()}</p>
                </div>
              </div>

              {trackingData.transactionDate && (
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-slate-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Order Date</p>
                    <p className="text-slate-900 font-medium">{new Date(trackingData.transactionDate).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* --- NEW: DETAILED TRACKING TIMELINE --- */}
            {trackingData.transactionStatusHistory && trackingData.transactionStatusHistory.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-900 mb-5 uppercase tracking-widest border-b border-slate-100 pb-2">Tracking History</h3>
                
                <div className="relative border-l-2 border-teal-100 ml-3 space-y-6 pb-2">
                  {trackingData.transactionStatusHistory.map((status: any, index: number) => {
                    // Check if it's the most recent status (first item if chronological, or last depending on API)
                    const isLatest = index === trackingData.transactionStatusHistory.length - 1; 

                    return (
                      <div key={index} className="relative pl-6">
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[9px] top-0.5 w-4 h-4 rounded-full ring-4 ring-white ${isLatest ? 'bg-teal-600' : 'bg-slate-300'}`} />
                        
                        {/* Status Message */}
                        <p className={`text-sm md:text-base font-bold ${isLatest ? 'text-teal-950' : 'text-slate-700'}`}>
                          {status.transactionStatusMessage}
                        </p>
                        
                        {/* Render date if PostEx provides it in the history object */}
                        {status.date || status.createdAt || status.statusDate ? (
                           <p className="text-xs text-slate-500 mt-1 font-medium">
                             {new Date(status.date || status.createdAt || status.statusDate).toLocaleString()}
                           </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* --- ACTION BUTTONS --- */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={resetTracking}
                className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-700 py-3 md:py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors text-sm"
              >
                <RefreshCcw size={16} /> Track Another
              </button>
              <Link 
                href="/products" 
                className="flex items-center justify-center gap-2 w-full bg-teal-950 text-white py-3 md:py-4 rounded-xl font-bold hover:bg-teal-800 transition-colors text-sm"
              >
                Shop <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ) : (
          /* --- INPUT FORM STATE --- */
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide ml-1">
                  Tracking Number
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                        <PackageSearch size={18} />
                    </div>
                    <input 
                        required 
                        name="trackingInput" 
                        value={trackingInput}
                        onChange={(e) => setTrackingInput(e.target.value)} 
                        type="text" 
                        placeholder="e.g. CX-1234567890" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium placeholder:text-slate-400 uppercase" 
                    />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start gap-3"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p>{error}</p>
                </motion.div>
              )}

              <button 
                  disabled={isSearching || !trackingInput.trim()}
                  type="submit"
                  className="w-full bg-teal-950 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-teal-950/20 hover:bg-teal-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 mt-4"
              >
                  {isSearching ? (
                      <><Loader2 className="animate-spin" size={18} /> Connecting to Courier...</>
                  ) : (
                      <><PackageSearch size={18} /> Track Order</>
                  )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </main>
  );
}