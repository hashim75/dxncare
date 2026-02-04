"use client";

import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, Truck, ShieldCheck, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // === 1. CALCULATIONS ===
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 250; // Standard Delivery
  const taxRate = 0.04; // 4% Tax
  const tax = Math.round(subtotal * taxRate);
  const finalTotal = subtotal + shipping + tax;

  // Form State
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

  // === 2. WHATSAPP CHECKOUT LOGIC ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // YOUR WhatsApp Number (No + sign, just country code)
    const myPhoneNumber = "923338656601"; 

    // Format Order Items
    const orderItemsText = items.map(item => 
      `• ${item.name} (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    // Construct the Message
    const message = `*NEW ORDER FROM WEBSITE* 🛍️
    
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

    // Create Link
    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;

    // Artificial Delay for UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Show Success State
    setIsSuccess(true);
    clearCart();
    setIsSubmitting(false);
  };

  // === SUCCESS STATE ===
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[2.5rem] text-center max-w-lg w-full shadow-2xl border border-slate-100"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-bold font-jakarta text-teal-950 mb-4">Order Placed!</h1>
          <p className="text-lg text-slate-600 mb-8">
            Thank you, <strong>{formData.name}</strong>. We have generated your WhatsApp message. Please check your phone to complete the confirmation.
          </p>
          <Link href="/products" className="inline-block bg-teal-950 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-600 transition-colors">
            Continue Shopping
          </Link>
        </motion.div>
      </main>
    );
  }

  // === EMPTY CART STATE ===
  if (items.length === 0) {
    return (
        <main className="min-h-screen bg-slate-50 pt-40 pb-20 px-4 text-center">
            <h1 className="text-3xl font-bold text-teal-950 mb-4">Your Cart is Empty</h1>
            <p className="text-slate-500 mb-8">Looks like you haven't added any supplements yet.</p>
            <Link href="/products" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold">
                Browse Products
            </Link>
        </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container mx-auto px-4">
        
        <Link href="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-black font-bold mb-8 uppercase text-xs tracking-widest">
            <ArrowLeft size={14} /> Back to Shopping
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold font-jakarta text-teal-950 mb-12">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* === LEFT: SHIPPING FORM === */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                    <Truck className="text-red-600" size={24} />
                    <h2 className="text-2xl font-bold text-black font-jakarta">Shipping Details</h2>
                </div>

                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name</label>
                            <input required name="name" onChange={handleChange} type="text" placeholder="e.g. Ali Khan" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Phone Number</label>
                            <input required name="phone" onChange={handleChange} type="tel" placeholder="0300 1234567" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address</label>
                        <input required name="email" onChange={handleChange} type="email" placeholder="ali@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Shipping Address</label>
                        <textarea required name="address" onChange={handleChange} rows={3} placeholder="House #, Street #, Area..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">City</label>
                            <input required name="city" onChange={handleChange} type="text" placeholder="e.g. Lahore" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all" />
                        </div>
                        <div>
                             <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Payment Method</label>
                             <div className="w-full bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-teal-600 border-[3px] border-white ring-1 ring-teal-600"></div>
                                <span className="font-bold text-teal-900">Cash on Delivery (COD)</span>
                             </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Order Notes (Optional)</label>
                        <textarea name="notes" onChange={handleChange} rows={2} placeholder="Any special instructions..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"></textarea>
                    </div>
                </form>
            </div>
          </div>

          {/* === RIGHT: ORDER SUMMARY === */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100 sticky top-32">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                    <ShieldCheck className="text-teal-600" size={24} />
                    <h2 className="text-2xl font-bold text-black font-jakarta">Order Summary</h2>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar mb-6 pr-2">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center">
                            <div className="relative w-16 h-16 bg-slate-50 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                                {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-black text-sm line-clamp-1">{item.name}</h4>
                                <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-bold text-black text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-3 mb-8">
                    <div className="flex justify-between text-slate-500 font-medium">
                        <span>Subtotal</span>
                        <span>Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-medium">
                        <span>Delivery Fee</span>
                        <span className="text-black font-bold">Rs. {shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-medium">
                        <span>Govt Tax (4%)</span>
                        <span className="text-black font-bold">Rs. {tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xl font-extrabold text-teal-950 pt-4 border-t border-slate-100">
                        <span>Total</span>
                        <span>Rs. {finalTotal.toLocaleString()}</span>
                    </div>
                </div>

                <button 
                    form="checkout-form"
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-500/30 hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin" /> Processing...
                        </>
                    ) : (
                        <>
                            Place Order (COD)
                        </>
                    )}
                </button>
                
                <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-2">
                    <ShieldCheck size={12}/> 100% Secure WhatsApp Checkout
                </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}