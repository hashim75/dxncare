import { Metadata } from "next";
import DigestWellUI from "./DigestWellUI";

export const metadata: Metadata = {
  title: "DigestWell | Premium Herbal Digestive Support",
  description: "Get instant relief from gas, bloating, and acidity with DigestWell. 100% Herbal, Sugar-Free, fine micronized powder by DXN CARE.",
  openGraph: {
    title: "DigestWell | 100% Herbal Digestive Support",
    description: "Sukoon ab har khane ke baad. Formulated by top doctors for instant gut relief.",
    images: ["/images/dxncare-digestwell_3.jpg"],
  },
};

export default function DigestWellPage() {
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "DXN CARE DigestWell",
    "image": "https://www.dxncare.com/images/dxncare-digestwell_1.jpg",
    "description": "Herbal Digestive Support. Natural Relief for Gas, Acidity & Gut Health.",
    "brand": { "@type": "Brand", "name": "DXN CARE" },
    "offers": {
      "@type": "Offer",
      "url": "https://www.dxncare.com/digestwell",
      "priceCurrency": "PKR",
      "price": "899",
      "availability": "https://schema.org/InStock",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "156"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <DigestWellUI />
    </>
  );
}