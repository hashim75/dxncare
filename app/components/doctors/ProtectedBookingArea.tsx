"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode, Suspense } from "react";
import CheckoutButton from "./CheckoutButton"; // Your Safepay button
import { Lock } from "lucide-react";

function PaywallLogic({ children, doctorId, fee }: { children: ReactNode, doctorId: string, fee: number }) {
  const searchParams = useSearchParams();
  const isPaid = searchParams.get("payment") === "success";

  // If paid, show the calendar and social links normally
  if (isPaid) {
    return (
      <div className="animate-in fade-in duration-1000">
        {children}
      </div>
    );
  }

  // If NOT paid, blur the content and show the lock screen overlay
  return (
    <div className="relative group overflow-hidden rounded-[2rem] border border-slate-100">
      
      {/* Blurred Content (Calendar & Socials) */}
      <div className="blur-md opacity-40 pointer-events-none select-none transition-all duration-300">
        {children}
      </div>

      {/* Payment Overlay overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/30 backdrop-blur-[2px] p-6 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-teal-50 flex flex-col items-center animate-in zoom-in-95 duration-500">
          <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-5 shadow-inner">
            <Lock size={24} />
          </div>
          <h3 className="text-xl font-bold font-jakarta text-teal-950 mb-2">
            Unlock Consultation
          </h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Pay the consultation fee of <strong>PKR {fee}</strong> to view the doctor's calendar, social links, and lock in your time slot.
          </p>
          
          {/* This triggers Safepay! */}
          <CheckoutButton doctorId={doctorId} fee={fee} />
        </div>
      </div>
      
    </div>
  );
}

export default function ProtectedBookingArea(props: any) {
  return (
    <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse rounded-[2rem]"></div>}>
      <PaywallLogic {...props} />
    </Suspense>
  );
}