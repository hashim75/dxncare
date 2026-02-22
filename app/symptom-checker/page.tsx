import { Metadata } from "next";
import SymptomChecker from "../components/interactive/SymptomChecker";
import { Sparkles, ShieldCheck, Clock, Award } from "lucide-react";

// --- 1. MASTER SEO METADATA ---
export const metadata: Metadata = {
  title: "Online Symptom Checker Pakistan | Smart Health Triage | DXN Care",
  description: "Use our professional medical database to check symptoms for Malaria, Typhoid, Diabetes, and more. Match with specialist doctors in Pakistan instantly.",
  keywords: "symptom checker Pakistan, online doctor consultation, Malaria symptoms, Typhoid diagnosis, DXN Care health triage, medical database Pakistan",
  alternates: {
    canonical: "https://dxncare.com/symptom-checker",
  },
  openGraph: {
    title: "Smart Symptom Checker | DXN Care Pakistan",
    description: "Identify your health concerns using our verified medical database and find the right specialist.",
    url: "https://dxncare.com/symptom-checker",
    siteName: "DXN Care",
    images: [{ url: "https://dxncare.com/images/symptom-checker-og.jpg", width: 1200, height: 630 }],
    locale: "en_PK",
    type: "website",
  },
};

export default function SymptomCheckerPage() {
  // --- 2. JSON-LD MEDICAL SCHEMA ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "DXN Care Smart Symptom Checker",
    "description": "An interactive medical triage tool for identifying symptoms and matching with specialists in Pakistan.",
    "url": "https://dxncare.com/symptom-checker",
    "lastReviewed": "2026-02-13",
    "reviewedBy": {
      "@type": "Organization",
      "name": "DXN Care Medical Board"
    },
    "mainEntity": {
      "@type": "MedicalCondition",
      "name": "General Health Symptoms",
      "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Whole Body" }
    }
  };

 return (
    // Change: Added pt-32 to push content away from the nav and pb-20 for balance
    <main className="bg-slate-50 min-h-screen w-full flex flex-col items-center pt-32 pb-20 px-4 relative z-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Adjusted Header Spacing */}
        <div className="text-center mb-16 relative animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} /> Medical Triage Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-teal-950 font-jakarta mb-6 leading-tight">
            Find the Right <span className="text-teal-600">Care</span> for Your Symptoms.
          </h1>
          <p className="text-slate-600 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            Search our verified database of hundreds of conditions—from Common Cold to Chronic issues—and match with a specialist online.
          </p>
        </div>

        {/* The Tool */}
        <section className="w-full mb-20" aria-label="Symptom Checker Tool">
          <SymptomChecker />
        </section>

        {/* SEO Trust Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-16 w-full">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
            <ShieldCheck className="text-teal-600 mb-4" size={32} />
            <h2 className="text-lg font-bold text-teal-950 mb-2">Verified Database</h2>
            <p className="text-sm text-slate-500">Professional standards for common and chronic conditions.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
            <Clock className="text-teal-600 mb-4" size={32} />
            <h2 className="text-lg font-bold text-teal-950 mb-2">Fast & Private</h2>
            <p className="text-sm text-slate-500">Get a recommendation in under 2 minutes. 100% private.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
            <Award className="text-teal-600 mb-4" size={32} />
            <h2 className="text-lg font-bold text-teal-950 mb-2">Expert Matching</h2>
            <p className="text-sm text-slate-500">Connected directly to our specialized medical team in Pakistan.</p>
          </div>
        </div>
      </div>
    </main>
  );
}