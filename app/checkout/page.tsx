"use client";

import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser"; 
import { ArrowLeft, CheckCircle2, Truck, ShieldCheck, Loader2, Pill } from "lucide-react"; // Added Pill icon

// --- CONFIGURATION ---
const EMAILJS_CONFIG = {
  publicKey: "ykMzk7yOAMHR1Ip8o",
  serviceId: "service_bhpyljt",
  templateId: "template_vkr09eu", 
};

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // === 1. CALCULATIONS ===
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 250; 
  const taxRate = 0.04; 
  const tax = Math.round(subtotal * taxRate);
  const finalTotal = subtotal + shipping + tax;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // === 2. SUBMIT LOGIC ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- A. PREPARE ORDER DATA (Tagged for Allopathic) ---
    const orderItemsText = items.map(item => {
      // @ts-ignore
      const isMedicine = item.image === "allopathic-icon" || item.category === "Allopathic";
      return `• ${item.name} ${isMedicine ? '(Allopathic)' : ''} (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}`;
    }).join('\n');

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
      
      Notes: ${formData.notes || "None"}
    `;

    try {
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        from_name: formData.name,       
        from_email: formData.email,     
        message: fullOrderMessage,      
        doctor_name: "DXN Sales Team",  
        booking_date: new Date().toLocaleDateString() 
      }, EMAILJS_CONFIG.publicKey);

      const myPhoneNumber = "923338656601"; 
      const whatsappMessage = `*NEW ORDER FROM WEBSITE* 🛍️
    
*Customer Details:*
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email}
📍 Address: ${formData.address}, ${formData.city}

*Order Summary:*
${orderItemsText}

----------------------------
Subtotal: Rs. ${subtotal.toLocaleString()}
Delivery: Rs. ${shipping.toLocaleString()}
Tax (4%): Rs. ${tax.toLocaleString()}
*💰 GRAND TOTAL: Rs. ${finalTotal.toLocaleString()}*
----------------------------

📝 *Notes:* ${formData.notes || "None"}

_Please confirm my order._`;

      const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      window.open(whatsappUrl, "_blank"); 
      setIsSuccess(true);
      clearCart();
      
    } catch (error) {
      console.error("FAILED to send order:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 md:p-12 rounded-[2.5rem] text-center max-w-lg w-full shadow-2xl border border-slate-100">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600 md:w-12 md:h-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-jakarta text-teal-950 mb-4">Order Placed!</h1>
          <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
            Thank you, <strong>{formData.name}</strong>. We have received your order. We will contact you shortly to confirm delivery.
          </p>
          <Link href="/products" className="inline-block bg-teal-950 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-600 transition-colors w-full md:w-auto font-jakarta uppercase tracking-widest text-sm">
            Continue Shopping
          </Link>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
        <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 text-center flex flex-col items-center justify-center">
            <Truck size={40} className="text-slate-300 mb-6" />
            <h1 className="text-3xl font-bold text-teal-950 mb-4">Your Cart is Empty</h1>
            <Link href="/products" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold">Browse Products</Link>
        </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        
        <Link href="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-black font-bold mb-6 md:mb-8 uppercase text-xs tracking-widest transition-colors">
            <ArrowLeft size={14} /> Back to Shopping
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold font-jakarta text-teal-950 mb-8 md:mb-12 leading-tight">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start font-jakarta">
          
          {/* === LEFT: SHIPPING FORM === */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                    <Truck className="text-red-600" size={24} />
                    <h2 className="text-xl md:text-2xl font-bold text-black">Shipping Details</h2>
                </div>

                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4 md:space-y-6 font-jakarta">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name</label>
                            <input required name="name" onChange={handleChange} type="text" placeholder="e.g. Ali Khan" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Phone Number</label>
                            <input required name="phone" onChange={handleChange} type="tel" placeholder="0300 1234567" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address</label>
                        <input required name="email" onChange={handleChange} type="email" placeholder="ali@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Shipping Address</label>
                        <textarea required name="address" onChange={handleChange} rows={3} placeholder="House #, Street #, Area..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">City</label><input required name="city" onChange={handleChange} type="text" placeholder="e.g. Lahore" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" /></div>
                        <div>
                             <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Payment Method</label>
                             <div className="w-full bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-teal-600 border-[3px] border-white ring-1 ring-teal-600 shrink-0"></div>
                                <span className="font-bold text-teal-900 text-sm">Cash on Delivery (COD)</span>
                             </div>
                        </div>
                    </div>
                </form>
            </div>
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
                                {/* --- FIX: Conditional Logic for Allopathic Icon --- */}
                                {/* @ts-ignore */}
                                {item.image === "allopathic-icon" || item.category === "Allopathic" ? (
                                  <div className="bg-teal-50 w-full h-full flex items-center justify-center">
                                    <Pill className="w-8 h-8 text-teal-600" />
                                  </div>
                                ) : (
                                  <Image 
                                    src={item.image || "/placeholder.jpg"} 
                                    alt={item.name} 
                                    fill 
                                    className="object-contain p-2 mix-blend-multiply" 
                                  />
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
                    <div className="flex justify-between text-slate-500 font-medium"><span>Delivery Fee</span><span className="text-black font-bold">Rs. {shipping.toLocaleString()}</span></div>
                    <div className="flex justify-between text-slate-500 font-medium"><span>Govt Tax (4%)</span><span className="text-black font-bold">Rs. {tax.toLocaleString()}</span></div>
                    <div className="flex justify-between text-lg md:text-xl font-extrabold text-teal-950 pt-4 border-t border-slate-100"><span>Total</span><span>Rs. {finalTotal.toLocaleString()}</span></div>
                </div>

                <button form="checkout-form" disabled={isSubmitting} type="submit" className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-500/30 hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95">
                    {isSubmitting ? <><Loader2 className="animate-spin" /> Processing...</> : "Place Order (COD)"}
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest"><ShieldCheck size={12}/> Secure checkout via WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}