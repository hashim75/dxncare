import { Metadata } from "next";
import BundleUI from "./BundleUI";

export const metadata: Metadata = {
  title: "Mass & Muscle Stack | GainForte + Force-X Bundle by DXN CARE",
  description: "The ultimate transformation bundle. Combine GainForte's appetite stimulation with Force-X's explosive strength for maximum lean muscle mass. Save on the bundle today.",
  openGraph: {
    title: "The Ultimate Mass & Muscle Stack by DXN CARE",
    description: "Get GainForte and Force-X together for the ultimate physical transformation.",
    url: "https://www.dxncare.com/mass-muscle-bundle",
    siteName: "DXN CARE",
    images: [
      {
        url: "/images/gainforte-1.png", 
        width: 1200,
        height: 630,
        alt: "DXN CARE Mass and Muscle Bundle",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};

export default function BundlePage() {
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Mass & Muscle Stack (GainForte + Force-X)",
    "image": "https://www.dxncare.com/images/gainforte-1.png",
    "description": "The complete bundle for weight gain and muscle building. Includes 1x GainForte Syrup (300ml) and 1x Force-X Capsules (30ct).",
    "brand": { 
      "@type": "Brand", 
      "name": "DXN CARE" 
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.dxncare.com/mass-muscle-bundle",
      "priceCurrency": "PKR",
      "price": "2499",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "DXN CARE"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "342"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <BundleUI />
    </>
  );
}