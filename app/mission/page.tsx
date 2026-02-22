import { Metadata } from "next";
import MissionClient from "./MissionClient";

export const metadata: Metadata = {
  title: "Our Mission | DXN Care - The Digital Bridge to Holistic Health",
  description: "Discover the vision of Muhammad Hashim at DXN Care. We are democratizing wellness through a verified digital ecosystem for specialists and patients.",
  openGraph: {
    title: "DXN Care: Reimagining Holistic Healthcare",
    description: "Bridging the gap between world-class expertise and patient care.",
    type: "website",
    url: "https://dxncare.com/mission",
    images: ["/images/mission-og-image.jpg"],
  }
};

export default function MissionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MissionPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "DXN Care",
      "url": "https://dxncare.com",
      "logo": "https://cdn.prod.website-files.com/6833690dd0efea69de65146d/699a956e7c1793e16f8f9a72_logo.webp",
      "founder": {
        "@type": "Person",
        "name": "Muhammad Hashim",
        "jobTitle": "Founder & Lead Architect"
      },
      "description": "A digital intelligence platform for healthcare providers and holistic wellness in Pakistan."
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MissionClient />
    </>
  );
}