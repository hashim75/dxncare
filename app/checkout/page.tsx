"use client";

import { useState, useRef } from "react";
import { useCartStore } from "../store/cartStore";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser"; 
import { useRouter } from "next/navigation"; // <-- Added Router
import { trackTiktokEvent, identifyTiktokUser } from "../utils/tiktok"; // <-- Added TikTok tracking
import { ArrowLeft, Truck, ShieldCheck, Loader2, Pill, AlertCircle, UploadCloud, FileImage, XCircle } from "lucide-react";

// --- CONFIGURATION ---
const EMAILJS_CONFIG = {
  publicKey: "ykMzk7yOAMHR1Ip8o",
  serviceId: "service_bhpyljt",
  templateId: "template_vkr09eu", 
};

// 👇 PASTE YOUR FREE IMGBB API KEY HERE 👇
const IMGBB_API_KEY = "4b980fa6ded8baf61a97f99dac579c98"; 

export default function CheckoutPage() {
  const router = useRouter(); // <-- Initialize router
  const { items, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [screenshotBase64, setScreenshotBase64] = useState<string | null>(null);
  const [screenshotError, setScreenshotError] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 250; 
  const taxRate = 0.04; 
  const tax = Math.round(subtotal * taxRate);
  const finalTotal = subtotal + shipping + tax;

  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", address: "", city: "", notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        setScreenshotError("Please upload a valid image file.");
        return;
    }
    setScreenshotError("");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; 
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6); 
        setScreenshotBase64(compressedBase64);
      };
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!screenshotBase64) {
        setScreenshotError("You must upload a screenshot of the advance delivery payment to process your order.");
        document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    setIsSubmitting(true);
    const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const orderItemsText = items.map(item => {
      // @ts-ignore
      const isMedicine = item.image === "allopathic-icon" || item.category === "Allopathic";
      return `• ${item.name} ${isMedicine ? '(Allopathic)' : ''} (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}`;
    }).join('\n');

    try {
      // --- 1. UPLOAD SCREENSHOT TO IMGBB ---
      setUploadStatus("Uploading Receipt...");
      
      const base64Data = screenshotBase64.split(",")[1]; 
      const imgBbFormData = new FormData();
      imgBbFormData.append("image", base64Data);

      const imgBbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: "POST",
          body: imgBbFormData,
      });
      const imgBbResult = await imgBbResponse.json();
      
      if (!imgBbResult.success) throw new Error("Failed to upload receipt image.");
      
      const receiptImageUrl = imgBbResult.data.url; 

      // --- 2. EMAIL JS SENDING ---
      setUploadStatus("Sending Email...");
      const fullOrderMessage = `
NEW ORDER RECEIVED 🛍️
-------------------------
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}, ${formData.city}

ORDER ITEMS:
${orderItemsText}

-------------------------
Subtotal: Rs. ${subtotal.toLocaleString()}
Shipping: Rs. ${shipping.toLocaleString()}
Tax: Rs. ${tax.toLocaleString()}
GRAND TOTAL: Rs. ${finalTotal.toLocaleString()}
      `;

      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        from_name: formData.name,       
        from_email: formData.email,     
        message: fullOrderMessage,
        screenshot: receiptImageUrl,  
        doctor_name: "DXN Sales Team",  
        booking_date: new Date().toLocaleDateString() 
      }, EMAILJS_CONFIG.publicKey);

      // --- 3. WHATSAPP REDIRECTION ---
      setUploadStatus("Opening WhatsApp...");
      const myPhoneNumber = "923338656601"; 
      const whatsappMessage = `*NEW ORDER FROM WEBSITE* 🛍️
    
*Customer Details:*
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📍 Address: ${formData.address}, ${formData.city}

*Order Summary:*
${orderItemsText}

----------------------------
*💰 TOTAL COD: Rs. ${(subtotal + tax).toLocaleString()}*
*(Advance delivery fee of Rs. 250 has been paid via screenshot)*
----------------------------

_Please confirm my order._`;

      const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank"); 
      
      // --- 4. TIKTOK TRACKING & REDIRECT ---
      // Identify user for better ad matching
      identifyTiktokUser(formData.email, formData.phone);
      
      // Track the actual purchase value
      trackTiktokEvent('Purchase', {
        contents: items.map(item => ({
          content_id: item.id || "product",
          content_name: item.name,
          content_type: "product",
          price: item.price,
          num_items: item.quantity
        })),
        value: finalTotal,
        currency: "PKR"
      });

      clearCart();
      router.push("/thank-you"); // <-- Redirects to your new Thank You page!
      
    } catch (error: any) {
      console.error("FAILED to send order:", error);
      alert(`Error: ${error.message || "Failed to process order"}`); 
    } finally {
      setIsSubmitting(false);
      setUploadStatus("");
    }
  };

  // === EMPTY CART SCREEN ===
  if (items.length === 0) {
    return (
        <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 text-center flex flex-col items-center justify-center">
            <Truck size={40} className="text-slate-300 mb-6" />
            <h1 className="text-3xl font-bold text-teal-950 mb-4">Your Cart is Empty</h1>
            <Link href="/products" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold">Browse Products</Link>
        </main>
    );
  }

  // === MAIN CHECKOUT UI ===
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <Link href="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-black font-bold mb-6 md:mb-8 uppercase text-xs tracking-widest transition-colors">
            <ArrowLeft size={14} /> Back to Shopping
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold font-jakarta text-teal-950 mb-8 md:mb-12 leading-tight">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start font-jakarta">
          
          {/* === LEFT: UNIFIED FORM (PAYMENT & SHIPPING) === */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. ADVANCE PAYMENT SECTION */}
                <div id="payment-section" className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border-2 border-red-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[100px] -z-10"></div>
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                            <AlertCircle className="text-red-600" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-black mb-1">Advance Delivery Required</h2>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                To confirm and process your order, delivery charges of <strong className="text-black">Rs. {shipping}</strong> must be paid in advance. 
                                The remaining total (Rs. {subtotal + tax}) will be Cash on Delivery.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#00a99d]">Easypaisa</span>
                                <img src="https://img.logo.dev/easypaisa.com.pk?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=true&format=png" alt="Easypaisa" className="h-6 w-auto object-contain opacity-80" />
                            </div>
                            <p className="text-sm text-slate-500 mb-1">Title: <span className="font-bold text-black">Muhammad Hashim</span></p>
                            <p className="text-lg font-black text-slate-900 tracking-wider">03048862472</p>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#ec1b24]">JazzCash</span>
                                <img src="https://img.logo.dev/jazzcash.com.pk?token=pk_Or_51lkkSnmQhpX75nkUnA" alt="JazzCash" className="h-6 w-auto object-contain opacity-80" />
                            </div>
                            <p className="text-sm text-slate-500 mb-1">Title: <span className="font-bold text-black">Muhammad Hashim</span></p>
                            <p className="text-lg font-black text-slate-900 tracking-wider">03338656601</p>
                        </div>

                        <div className="sm:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#004f98]">Bank Alfalah</span>
                                <img src="https://img.logo.dev/pakistansmetoolkit.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=true&format=png" alt="Bank Alfalah" className="h-6 w-auto object-contain opacity-80" />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div><p className="text-xs text-slate-500 mb-1">Account Title</p><p className="text-sm font-bold text-black">MUHAMMAD HASHIM</p></div>
                                <div><p className="text-xs text-slate-500 mb-1">Account Number</p><p className="text-sm font-bold text-black tracking-wider">57755002725708</p></div>
                                <div className="sm:col-span-2 border-t border-slate-200 pt-3 mt-1"><p className="text-xs text-slate-500 mb-1">IBAN</p><p className="text-xs md:text-sm font-bold text-black tracking-widest break-all">PK52ALFH5775005002725708</p></div>
                            </div>
                        </div>
                    </div>

                    {/* Screenshot Upload Field */}
                    <div className="border-t border-slate-100 pt-6">
                        <label className="block text-sm font-bold text-slate-900 mb-3">Upload Payment Screenshot <span className="text-red-500">*</span></label>
                        <div onClick={() => fileInputRef.current?.click()} className={`w-full border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${screenshotBase64 ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                            {screenshotBase64 ? (
                                <div className="flex flex-col items-center">
                                    <FileImage size={32} className="text-green-600 mb-2" />
                                    <span className="text-sm font-bold text-green-700">Screenshot Attached</span>
                                    <span className="text-xs text-green-600 underline mt-1">Click to replace</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-slate-500">
                                    <UploadCloud size={32} className="mb-2 text-slate-400" />
                                    <span className="text-sm font-bold text-slate-700 mb-1">Tap to upload receipt</span>
                                    <span className="text-xs text-slate-500">(JPG, PNG max 5MB)</span>
                                </div>
                            )}
                        </div>
                        {screenshotError && <div className="flex items-center gap-1.5 mt-3 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-bold border border-red-100"><XCircle size={16} /> {screenshotError}</div>}
                    </div>
                </div>

                {/* 2. SHIPPING FORM */}
                <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                        <Truck className="text-slate-800" size={24} />
                        <h2 className="text-xl md:text-2xl font-bold text-black">Shipping Details</h2>
                    </div>
                    <div className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name</label><input required name="name" onChange={handleChange} type="text" placeholder="e.g. Ali Khan" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" /></div>
                            <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Phone Number</label><input required name="phone" onChange={handleChange} type="tel" placeholder="03XXXXXXXXX" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" /></div>
                        </div>
                        <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address</label><input required name="email" onChange={handleChange} type="email" placeholder="ali@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" /></div>
                        <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Shipping Address</label><textarea required name="address" onChange={handleChange} rows={3} placeholder="House #, Street #, Area..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"></textarea></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">City</label><input required name="city" onChange={handleChange} type="text" placeholder="e.g. Lahore" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" /></div>
                            <div>
                                 <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Product Payment</label>
                                 <div className="w-full bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-teal-600 border-[3px] border-white ring-1 ring-teal-600 shrink-0"></div>
                                    <span className="font-bold text-teal-900 text-sm">Cash on Delivery (COD)</span>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
          </div>

          {/* === RIGHT: ORDER SUMMARY === */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100 sticky top-32">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                    <ShieldCheck className="text-teal-600" size={24} />
                    <h2 className="text-xl md:text-2xl font-bold text-black">Order Summary</h2>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar mb-6 pr-2">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center">
                            <div className="relative w-14 h-14 md:w-16 md:h-16 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100 flex items-center justify-center">
                                {/* @ts-ignore */}
                                {item.image === "allopathic-icon" || item.category === "Allopathic" ? (
                                  <div className="bg-teal-50 w-full h-full flex items-center justify-center"><Pill className="w-8 h-8 text-teal-600" /></div>
                                ) : (
                                  <Image src={item.image || "/placeholder.jpg"} alt={item.name} fill className="object-contain p-2 mix-blend-multiply" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-black text-sm line-clamp-2 leading-tight">{item.name}</h4>
                                <p className="text-xs text-slate-500 font-bold mt-1">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-bold text-black text-sm whitespace-nowrap">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-3 mb-8 text-sm">
                    <div className="flex justify-between text-slate-500 font-medium"><span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
                    <div className="flex justify-between text-slate-500 font-medium"><span>Delivery Fee (Advance)</span><span className="text-red-600 font-bold">Rs. {shipping.toLocaleString()}</span></div>
                    <div className="flex justify-between text-slate-500 font-medium"><span>Govt Tax (4%)</span><span className="text-black font-bold">Rs. {tax.toLocaleString()}</span></div>
                    <div className="flex justify-between text-lg md:text-xl font-extrabold text-teal-950 pt-4 border-t border-slate-100">
                        <span>Total COD</span>
                        <span>Rs. {(subtotal + tax).toLocaleString()}</span>
                    </div>
                </div>

                <button form="checkout-form" disabled={isSubmitting} type="submit" className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-500/30 hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95">
                    {isSubmitting ? <><Loader2 className="animate-spin" /> {uploadStatus || "Processing..."}</> : "Confirm Payment & Order"}
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest"><ShieldCheck size={12}/> Secure checkout</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}