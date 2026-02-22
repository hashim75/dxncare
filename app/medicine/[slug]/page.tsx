import { Metadata } from 'next';
import { getMedicineBySlug } from '../../lib/medicine-api';
import { Pill, ChevronLeft, ShieldCheck, Truck, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import MedicineDetailsClient from '../../components/medicine/MedicineDetailsClient';

interface Props {
  params: { slug: string };
}

// === DYNAMIC SEO ===
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const medicine = await getMedicineBySlug(params.slug);
  
  if (!medicine) return { title: 'Medicine Not Found | DXN Care' };

  const name = medicine.name;
  const price = typeof medicine.price === 'number' 
    ? `Rs. ${medicine.price.toLocaleString()}` 
    : medicine.price;

  return {
    title: `${name} Price in Pakistan | Buy Online - DXN Care`,
    description: `Get the latest verified price for ${name} in Pakistan. Current Retail Price: ${price}. Secure delivery and authentic allopathic medicines via DXN Care.`,
    alternates: {
      canonical: `https://dxncare.com/medicine/${params.slug}`,
    }
  };
}

export default async function MedicineDetailPage({ params }: Props) {
  const medicine = await getMedicineBySlug(params.slug);

  if (!medicine) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#F8FAFC]">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-xl text-center">
            <Pill size={64} className="text-slate-200 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-slate-900 mb-4 font-jakarta">Medicine Not Found</h1>
            <Link href="/medicine" className="text-teal-600 font-bold hover:underline">Return to Directory</Link>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": medicine.name,
    "description": `Authentic allopathic medicine: ${medicine.name}. Verified pricing and availability in Pakistan.`,
    "brand": { "@type": "Brand", "name": "Allopathic" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "PKR",
      "price": String(medicine.price).replace(/[^0-9.]/g, ''),
      "availability": "https://schema.org/InStock",
      "url": `https://dxncare.com/medicine/${params.slug}`
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center py-20 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full max-w-4xl">
        <Link href="/medicine" className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold mb-6 transition-colors group text-sm uppercase tracking-widest">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Directory
        </Link>

        <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          
          {/* Visual Side - Fixed Height to prevent jumping */}
          <div className="bg-teal-50 aspect-square rounded-[2rem] flex items-center justify-center relative overflow-hidden group border border-teal-100/50">
             <Pill size={180} className="text-teal-600/10 group-hover:scale-110 transition-transform duration-700 absolute" />
             <div className="relative z-10 bg-white/40 backdrop-blur-sm p-8 rounded-full shadow-inner">
                <Pill size={80} className="text-teal-600" />
             </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col h-full pt-4">
            <div className="mb-6">
                <span className="bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100 mb-4 inline-block">
                {medicine.category || "Medicine"}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight font-jakarta">
                {medicine.name}
                </h1>
            </div>
            
            <div className="mb-10 bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-100">
               <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Current Retail Price</p>
               <p className="text-teal-600 text-4xl md:text-5xl font-black font-jakarta">
                  Rs. {medicine.price.toLocaleString()}
               </p>
            </div>

            <div className="space-y-4">
                <MedicineDetailsClient medicine={medicine} />
                
                <div className="grid grid-cols-1 gap-3 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                            <ShieldCheck size={18} className="text-teal-500" />
                        </div>
                        Verified Pharmaceutical Database
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                            <Truck size={18} className="text-teal-500" />
                        </div>
                        Delivery: Rs. 250 (Flat Rate)
                    </div>
                </div>

                <div className="mt-6 flex items-start gap-3 text-amber-700 text-xs bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 leading-relaxed">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <p>
                        <strong>Pricing Note:</strong> Allopathic medicine prices are subject to DRAP regulations and market fluctuations. Final price confirmed via WhatsApp.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}