import { Metadata } from "next";
import DigestWellUI from "./DigestWellUI";

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: "DigestWell by DXN CARE | Natural Relief for Acidity & Gas",
  description: "Get instant relief from gas, bloating, and acidity with DigestWell. 100% Herbal, Sugar-Free, fine micronized powder by DXN CARE.",
  openGraph: {
    title: "DigestWell | 100% Herbal Digestive Support",
    description: "Sukoon ab har khane ke baad. Formulated by top doctors for instant gut relief.",
    images: ["/images/dxncare-digestwell_3.jpg"], // Ensure you move your uploaded image to the public folder
  },
};

export default function DigestWellPage() {
  // --- 2. PRODUCT & REVIEW SCHEMA ---
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "DXN CARE DigestWell",
    "image": "https://www.dxncare.com/images/dxncare-digestwell_1.jpg",
    "description": "Herbal Digestive Support. Natural Relief for Gas, Acidity & Gut Health. 100% Herbal Ingredients, Fine Micronized Powder, Sugar-Free & Gluten-Free.",
    "brand": {
      "@type": "Brand",
      "name": "DXN CARE"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.dxncare.com/digestwell",
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
      "reviewCount": "156"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Ali Raza" },
        "datePublished": "2026-02-15",
        "reviewBody": "Best product for acidity. Seene ki jalan bilkul theek ho gayi hai.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Fatima Saeed" },
        "datePublished": "2026-02-28",
        "reviewBody": "I am a diabetic patient and this sugar-free powder is a blessing for my digestion.",
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
        "name": "How do I use DigestWell?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Take one teaspoon of DigestWell powder with room temperature water after your main meals (lunch and dinner)."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe for diabetic patients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! DigestWell is 100% Sugar-Free and Gluten-Free, making it completely safe for diabetic patients."
        }
      },
      {
        "@type": "Question",
        "name": "Does it have any side effects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, it is formulated with 100% natural herbal ingredients like fennel, mint, and ginger, ensuring zero harmful side effects."
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
      <DigestWellUI />
    </>
  );
}