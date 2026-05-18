import { Metadata } from "next";
import GainForteUI from "./GainForteUI";

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: "GainForte by DXN CARE | Natural Weight Gain & Mass Syrup",
  description: "Struggling to gain weight? GainForte is a natural, clinically formulated syrup designed to increase your appetite, boost metabolism, and build healthy muscle mass.",
  openGraph: {
    title: "GainForte | 100% Herbal Weight Gain Support",
    description: "Naturally increase your appetite and build healthy mass. Formulated by experts.",
    images: ["/images/gainforte-1.jpg"], // Ensure this matches your public folder path
  },
};

export default function GainFortePage() {
  // --- 2. PRODUCT & REVIEW SCHEMA ---
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "DXN CARE GainForte",
    "image": "https://www.dxncare.com/images/gainforte-1.jpg",
    "description": "Herbal Weight Gain Syrup. Natural support for increased appetite, muscle mass, and daily energy. 100% Herbal Ingredients.",
    "brand": {
      "@type": "Brand",
      "name": "DXN CARE"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.dxncare.com/gainforte",
      "priceCurrency": "PKR",
      "price": "1499",
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
      "reviewCount": "214"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Bilal K." },
        "datePublished": "2026-03-15",
        "reviewBody": "Amazing product. My appetite doubled in a week and I've already gained 3kg of healthy weight.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Sarah M." },
        "datePublished": "2026-04-02",
        "reviewBody": "Finally something that works. I feel so much more energetic and my clothes fit perfectly now.",
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
        "name": "How do I use GainForte?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Take 2 tablespoons of GainForte syrup twice a day, preferably after breakfast and dinner."
        }
      },
      {
        "@type": "Question",
        "name": "How long until I see weight gain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most users notice an increased appetite within the first week, and visible healthy mass gain after 3 to 4 weeks of consistent use."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any side effects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. It is formulated with 100% natural herbal ingredients and is completely free from harmful chemicals."
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
      <GainForteUI />
    </>
  );
}