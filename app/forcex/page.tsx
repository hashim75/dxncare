import { Metadata } from "next";
import ForceXUI from "./ForceXUI";

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: "Force-X by DXN CARE | Advanced Mass & Muscle Complex",
  description: "Push past your limits. Force-X capsules provide the clinical support needed for explosive strength, fast muscle recovery, and lean mass building.",
  openGraph: {
    title: "Force-X | 30 Capsules Muscle Complex",
    description: "Advanced strength and recovery for serious fitness goals. Formulated without synthetic steroids.",
    images: ["/images/forcex-1.jpg"], // Ensure this matches your public folder path
  },
};

export default function ForceXPage() {
  // --- 2. PRODUCT & REVIEW SCHEMA ---
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "DXN CARE Force-X",
    "image": "https://www.dxncare.com/images/forcex-1.jpg",
    "description": "Advanced capsule complex for lean muscle mass, explosive strength, and rapid post-workout recovery. 100% Herbal.",
    "brand": {
      "@type": "Brand",
      "name": "DXN CARE"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.dxncare.com/forcex",
      "priceCurrency": "PKR",
      "price": "1299",
      "priceValidUntil": "2026-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "DXN CARE"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "210"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Umar F." },
        "datePublished": "2026-04-10",
        "reviewBody": "My bench press went up by 15kg in one month. The strength increase is insane, and I recover instantly.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Ali M." },
        "datePublished": "2026-04-22",
        "reviewBody": "I recover so much faster now. No more intense soreness for days after a heavy leg day.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      }
    ]
  };

  // --- 3. FAQ SCHEMA ---
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I use Force-X?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Take 1 capsule daily with a glass of water or warm milk. On training days, take it 30 minutes before your workout."
        }
      },
      {
        "@type": "Question",
        "name": "Does it contain synthetic steroids?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely not. Force-X is a 100% herbal, clinical formula. It provides explosive strength without harmful liver stress."
        }
      },
      {
        "@type": "Question",
        "name": "Can I stack this with GainForte?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Stacking Force-X with GainForte is the ultimate bundle for maximizing both overall weight gain and lean muscle mass."
        }
      }
    ]
  };

  return (
    <>
      {/* Injecting Schemas into the Head */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      {/* Client UI Component */}
      <ForceXUI />
    </>
  );
}