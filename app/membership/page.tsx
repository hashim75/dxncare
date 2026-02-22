import { Metadata } from "next";
import JoinDoctorClient from "./JoinDoctorClient";

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: "Join DXN Care as a Doctor | Grow Your Digital Practice",
  description: "Onboard as a specialist on Pakistan's premier holistic health platform. Choose between our Free and Premium plans to scale your reach and manage patient bookings.",
  openGraph: {
    title: "Join the DXN Care Provider Network",
    description: "Scale your medical practice with our digital intelligence tools.",
    type: "website",
    url: "https://dxncare.com/join-as-a-doctor",
  }
};

export default function JoinAsDoctorPage() {
  // --- 2. JSON-LD SCHEMA ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Join DXN Care - Doctor Onboarding",
    "description": "Onboarding page for medical specialists to join the DXN Care provider network.",
    "publisher": {
      "@type": "Organization",
      "name": "DXN Care",
      "url": "https://dxncare.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JoinDoctorClient />
    </>
  );
}