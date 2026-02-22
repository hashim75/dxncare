import { getData } from "../../lib/markdown";
import { notFound } from "next/navigation";
import ProductClient from "../../components/products/ProductClient";
import ProductReviews from "../../components/products/ProductReviews";
import { Metadata } from "next";

// --- 1. DEFINE THE SHAPE OF YOUR DATA ---
interface Product {
  id: string;
  name: string;
  price: string | number;
  main_image?: string;
  short_description?: string;
  meta_description?: string;
  reviews?: any[]; 
  contentHtml?: string;
  [key: string]: any; 
}

// --- 2. DYNAMIC SEO METADATA ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getData("products", slug) as unknown as Product;
    
    return {
      title: `${product.name} | DXNCare Shop`,
      description: product.meta_description || product.short_description || `Buy ${product.name} online.`,
      openGraph: {
        title: product.name,
        description: product.short_description,
        images: [product.main_image || "/images/placeholder.jpg"],
      },
    };
  } catch (e) {
    return { title: "Product Not Found" };
  }
}

// --- 3. MAIN PAGE COMPONENT ---
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  
  const { slug } = await params;
  
  if (!slug) return notFound();

  try {
    const product = await getData("products", slug) as unknown as Product;

    // --- HELPER: CLEAN PRICE ---
    const cleanPrice = product.price ? String(product.price).replace(/[^0-9]/g, '') : "0";

    // --- HELPER: PROCESS REVIEWS ---
    const rawReviews = Array.isArray(product.reviews) ? product.reviews : [];
    
    // Calculate Average Rating
    const totalRating = rawReviews.reduce((acc: number, r: any) => acc + (Number(r.rating) || 5), 0);
    const avgRating = rawReviews.length > 0 ? (totalRating / rawReviews.length).toFixed(1) : "5.0";

    // Map to Schema Review Objects
    const reviewSchema = rawReviews.map((review: any) => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": review.author },
      "datePublished": review.date,
      "reviewRating": { "@type": "Rating", "ratingValue": review.rating },
      "name": review.title,
      "reviewBody": review.content
    }));

    // --- HELPER: PROCESS FAQS ---
    const faqSchema = [1, 2, 3, 4, 5].map(i => {
      const q = product[`faq_question___${i}`];
      const a = product[`faq_answer___${i}`];
      if (q && a) {
        return {
          "@type": "Question",
          "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a }
        };
      }
      return null;
    }).filter(Boolean);

    // --- CONSTRUCT FINAL GRAPH SCHEMA ---
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "@id": `https://dxncare.com/products/${slug}#product`,
          "name": product.name,
          "image": product.main_image || "",
          "description": product.short_description,
          "sku": product.id,
          "mpn": product.item_id || product.id,
          "brand": {
            "@type": "Brand",
            "name": "DXN"
          },
          "offers": {
            "@type": "Offer",
            "url": `https://dxncare.com/products/${slug}`,
            "priceCurrency": "PKR",
            "price": cleanPrice,
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "DXN Care"
            }
          },
          // Object spread is valid here because we are inside an Object
          ...(rawReviews.length > 0 && {
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": avgRating,
              "reviewCount": rawReviews.length,
              "bestRating": "5",
              "worstRating": "1"
            }
          }),
          "review": reviewSchema
        },
        // FIX: Use ternary operator to spread an ARRAY [] (valid) instead of an OBJECT {} (invalid in array spread)
        ...(faqSchema.length > 0 ? [{
          "@type": "FAQPage",
          "mainEntity": faqSchema
        }] : [])
      ]
    };
    
    return (
      <>
        {/* Inject JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ProductClient product={product} />
        
        <div className="container mx-auto px-4 pb-20">
            <ProductReviews productName={product.name} reviewsData={JSON.stringify(rawReviews)} />
        </div>
      </>
    );
    
  } catch (error) {
    console.error(`❌ Error finding product "${slug}":`, error);
    return notFound();
  }
}