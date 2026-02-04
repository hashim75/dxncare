import { getAllData } from "../lib/markdown"; // Adjust path if needed
import { Metadata } from "next";
import OrderInterface from "./OrderInterface";

// 1. Define the Product type to match what OrderInterface expects
interface Product {
  id: string;
  name: string;
  slug: string;
  price: string | number;
  main_image?: string;
  short_description?: string;
  [key: string]: any;
}

export const metadata: Metadata = {
  title: "Order Premium DXN Products | Fast Delivery Pakistan",
  description: "Shop the full range of authentic DXN supplements, coffees, and personal care products. Secure checkout, cash on delivery available nationwide.",
  openGraph: {
    title: "Order DXN Products - Official Authenticity Guaranteed",
    description: "Stock up on your wellness essentials. Spirulina, Ganoderma, and more.",
    images: ["/images/order-page-og.jpg"],
  },
};

export default async function OrderPage() {
  // 2. Fetch data and CAST it as Product[] so TypeScript knows it's safe
  const products = getAllData("products") as Product[];

  // --- GENERATE CATALOG SCHEMA (SEO) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://dxncare.com/products/${product.slug}`,
      "name": product.name,
      "image": product.main_image,
      "offers": {
        "@type": "Offer",
        "price": product.price ? String(product.price).replace(/[^0-9]/g, '') : "0",
        "priceCurrency": "PKR",
        "availability": "https://schema.org/InStock"
      }
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4">
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold font-jakarta text-slate-900 mb-4 tracking-tight">
            Invest in Your <span className="text-teal-600">Health</span>
          </h1>
          <p className="text-lg text-slate-600">
            Select your daily essentials. Authentic, fresh, and delivered to your doorstep.
          </p>
        </header>

        {/* Now TypeScript is happy because 'products' is typed as Product[] */}
        <OrderInterface products={products} />
      </div>
    </main>
  );
}