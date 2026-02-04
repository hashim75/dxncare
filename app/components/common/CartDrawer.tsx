"use client";

import Image from "next/image";
import Link from "next/link"; // Import Link
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

const CartDrawer = () => {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, total } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-[70] flex flex-col border-l border-slate-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <h2 className="text-xl font-bold font-jakarta text-teal-950 flex items-center gap-2">
                <ShoppingBag className="text-red-600" /> Your Cart ({items.length})
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                    <ShoppingBag size={40} className="text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium">Your cart is empty.</p>
                  <button onClick={toggleCart} className="text-red-600 font-bold hover:underline">
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout 
                    key={item.id} 
                    className="flex gap-4 bg-white"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-300">No Img</div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-red-600 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-red-600 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-bold text-teal-700">Rs. {item.price * item.quantity}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout Button */}
            {items.length > 0 && (
              <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold text-slate-900">
                  <span>Subtotal</span>
                  <span>Rs. {total().toLocaleString()}</span>
                </div>
                
                {/* CHECKOUT BUTTON - Navigates to /checkout */}
                <Link 
                  href="/checkout"
                  onClick={toggleCart} // Close drawer when clicked
                  className="w-full py-4 rounded-xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={20} />
                </Link>

                <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
                  <ShieldCheck size={12}/> Secure checkout via WhatsApp
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;