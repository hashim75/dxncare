"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { CheckCircle2, X } from "lucide-react";

function StatusBanner() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Detects if Safepay redirected the user with the success parameter
    if (searchParams.get("payment") === "success") {
      setShow(true);
      // Cleans the URL silently so if they refresh, the banner doesn't show twice
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md">
      <div className="bg-green-50 border-2 border-green-500 text-green-900 p-4 rounded-2xl shadow-2xl flex items-start gap-4 animate-in slide-in-from-top-4 duration-500">
        <CheckCircle2 className="text-green-600 mt-0.5 shrink-0" size={24} />
        <div>
          <h3 className="font-bold text-lg mb-1">Payment Successful!</h3>
          <p className="text-sm font-medium opacity-90">
            Your fee is verified. You can now proceed to pick your date and time below.
          </p>
        </div>
        <button 
          onClick={() => setShow(false)} 
          className="text-green-700 hover:bg-green-200 p-1.5 rounded-full transition-colors ml-auto"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default function PaymentStatus() {
  return (
    <Suspense fallback={null}>
      <StatusBanner />
    </Suspense>
  );
}