"use client";

import { useState } from "react";
import { Video, Rocket, X } from "lucide-react";

interface CheckoutButtonProps {
  doctorId: string;
  fee?: number;
}

export default function CheckoutButton({ doctorId, fee = 1500 }: CheckoutButtonProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {/* 1. The Trigger Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="py-3.5 px-6 rounded-xl bg-teal-950 text-white font-bold text-xs md:text-sm hover:bg-teal-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-900/20 w-full"
      >
        <Video size={16} /> Pay PKR {fee} to Consult
      </button>

      {/* 2. The Animated "Coming Soon" Modal Overlay */}
      {showPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          
          {/* Modal Box */}
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 relative flex flex-col items-center text-center border border-teal-50">
            
            {/* Close 'X' Button */}
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {/* Decorative Icon */}
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner transform -rotate-12">
              <Rocket size={32} />
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold font-jakarta text-teal-950 mb-3">
              Feature Coming Soon!
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              We are currently upgrading our secure payment gateway to serve you better. Online automated bookings will be launching in just a few days! 
            </p>

            {/* Action Button */}
            <button 
              onClick={() => setShowPopup(false)}
              className="w-full py-3.5 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20"
            >
              Got it, thanks!
            </button>
          </div>
          
        </div>
      )}
    </>
  );
}