"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, ArrowRight, Stethoscope, UserPlus, 
  Activity, Brain, Leaf, ShoppingBag, Pill, Info, 
  Target, Star, ShieldCheck, BookOpen, PackageSearch, Phone,
  ChevronRight, Sparkles
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher"; 

interface NavbarProps {
  products?: any[];
  doctors?: any[];
  intelligence?: any[];
  blogs?: any[];
}

export default function Navbar({ products = [], doctors = [], intelligence = [], blogs = [] }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  let menuTimeout: NodeJS.Timeout;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveMenu(null);
    setMobileSubMenu(null);
  }, [pathname]);

  const handleMouseEnter = (menuId: string) => {
    clearTimeout(menuTimeout);
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    menuTimeout = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const isActive = (path: string) => pathname === path;

  // --- MEGA MENU SCHEMA ---
  const NAV_SCHEMA = [
    { label: "Home", href: "/" },
    {
      label: "Health Hub",
      id: "health",
      items: [
        { label: "Symptom Checker", href: "/symptom-checker", icon: Activity, desc: "AI-powered health triage" },
        { label: "Health Intelligence", href: "/health-intelligences", icon: Brain, desc: "Clinical research database" },
        { label: "Functional Protocols", href: "/health", icon: Leaf, desc: "Root cause healing guides" }
      ],
      featuredTitle: "Latest Intelligence",
      featuredData: intelligence,
      featuredBase: "/health-intelligences",
      cta: { title: "Not sure what you have?", desc: "Use our AI tool.", link: "/symptom-checker", linkText: "Check Symptoms" }
    },
    {
      label: "Pharmacy & Store",
      id: "store",
      items: [
        { label: "DXN Care Products", href: "/dxn-care-products", icon: ShoppingBag, desc: "Premium organic supplements" },
        { label: "Allopathic Directory", href: "/medicine", icon: Pill, desc: "Verified pharmacy pricing" },
        { label: "Track Order", href: "/track", icon: PackageSearch, desc: "Check your delivery status" }
      ],
      featuredTitle: "Featured Products",
      featuredData: products,
      featuredBase: "/products",
      cta: { title: "Looking for supplements?", desc: "Explore DXN premium range.", link: "/dxn-care-products", linkText: "Shop Now" }
    },
    {
      label: "Professionals",
      id: "professionals",
      items: [
        { label: "Our Doctors", href: "/doctors", icon: Stethoscope, desc: "Consult with verified experts" },
        { label: "Partnership Program", href: "/doctor-referral-program", icon: UserPlus, desc: "Join our referral network" }
      ],
      featuredTitle: "Top Specialists",
      featuredData: doctors,
      featuredBase: "/doctors",
      cta: { title: "Are you a Doctor?", desc: "Join our professional network.", link: "/doctor-referral-program", linkText: "Partner with us" }
    },
    {
      label: "Discover DXN",
      id: "discover",
      items: [
        { label: "About Us", href: "/about", icon: Info, desc: "Our story and vision" },
        { label: "Our Mission", href: "/mission", icon: Target, desc: "What drives us forward" },
        { label: "Success Stories", href: "/success-stories", icon: Star, desc: "Real patient transformations" },
        { label: "VIP Membership", href: "/membership", icon: ShieldCheck, desc: "Exclusive health perks" },
        { label: "Wellness Blog", href: "/blog", icon: BookOpen, desc: "Latest health articles" },
        { label: "Contact Us", href: "/contact", icon: Phone, desc: "Get in touch with support" }
      ],
      featuredTitle: "Latest Stories",
      featuredData: blogs,
      featuredBase: "/blog",
      cta: { title: "Want exclusive perks?", desc: "Join DXN Membership today.", link: "/membership", linkText: "View Benefits" }
    }
  ];

  // --- MODERN MEGA MENU RENDERER ---
  const renderMegaContent = (menu: any) => {
    return (
      // FIX: Added max-w-5xl and mx-auto to prevent the menu from stretching awkwardly on large screens
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-5xl mx-auto w-full">
        {/* LEFT PANE */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 content-start">
          {menu.items.map((item: any, idx: number) => {
            const Icon = item.icon;
            return (
              <Link 
                key={idx} 
                href={item.href} 
                className="group relative flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-[14px] bg-slate-50 text-slate-500 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:border-teal-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-teal-600/20 transition-all duration-300">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <h4 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-0.5 flex items-center gap-1">
                    {item.label}
                    <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h4>
                  <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* RIGHT PANE: Timeline Style Featured & CTA */}
        <div className="w-full lg:w-[380px] shrink-0 flex flex-col justify-between bg-gradient-to-br from-slate-50 to-white rounded-[2rem] p-7 border border-slate-100/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
          <div>
            <h4 className="font-bold text-teal-900 text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <Sparkles size={14} className="text-amber-500" /> {menu.featuredTitle}
            </h4>
            
            <div className="space-y-6 mb-8 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200/60 z-0" />
              {/* FIX: Sliced to 2 instead of 3 */}
              {menu.featuredData?.slice(0, 2).map((feat: any, idx: number) => (
                <Link key={idx} href={`${menu.featuredBase}/${feat.id || feat.slug}`} className="relative z-10 flex gap-4 group">
                  <div className="w-4 h-4 rounded-full bg-white border-[3px] border-slate-200 group-hover:border-teal-500 mt-1 shrink-0 transition-colors duration-300 shadow-sm" />
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 group-hover:text-teal-600 line-clamp-1 transition-colors leading-tight mb-1">
                      {feat.name || feat.title}
                    </h5>
                    <p className="text-xs text-slate-400 line-clamp-1 font-medium">
                      {feat.short_description || feat.specialization || "Read more..."}
                    </p>
                  </div>
                </Link>
              ))}
              {(!menu.featuredData || menu.featuredData.length === 0) && (
                <p className="text-xs text-slate-400 italic pl-8">Curated content updating soon...</p>
              )}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
             <div className="absolute right-0 top-0 w-24 h-24 bg-teal-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
             <h5 className="font-bold text-slate-900 text-sm mb-1">{menu.cta.title}</h5>
             <p className="text-xs text-slate-500 mb-4">{menu.cta.desc}</p>
             <Link href={menu.cta.link} className="inline-flex items-center gap-2 text-xs font-bold text-white bg-teal-950 hover:bg-teal-600 px-5 py-2.5 rounded-xl transition-all shadow-md shadow-slate-900/10">
               {menu.cta.linkText} <ArrowRight size={14} />
             </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    <nav 
        className={`fixed w-full z-[100] top-0 left-0 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-white/20" : "bg-white border-b border-slate-100"}`}
        onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4 lg:px-8 h-[72px] flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="relative z-[101] shrink-0 transform hover:scale-105 transition-transform duration-300">
           <Image 
             src="/images/logo.png" 
             alt="DXN Care"
             width={140}           
             height={50}
             className="object-contain h-[38px] md:h-[45px] w-auto" 
             priority              
           />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-1">
            {NAV_SCHEMA.map((item) => (
                <div 
                    key={item.label} 
                    className="h-[72px] flex items-center px-1"
                    onMouseEnter={() => item.id && handleMouseEnter(item.id)}
                >
                    {item.href ? (
                        <Link 
                          href={item.href} 
                          className="relative px-4 py-2 text-[14px] font-bold text-slate-600 hover:text-teal-950 transition-colors group rounded-full hover:bg-slate-50"
                        >
                            {item.label}
                            {isActive(item.href) && (
                              <motion.div layoutId="nav-indicator" className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-600 rounded-full" />
                            )}
                        </Link>
                    ) : (
                        <button 
                          className={`flex items-center gap-1.5 px-4 py-2 text-[14px] font-bold rounded-full transition-all duration-300
                          ${activeMenu === item.id ? "text-teal-900 bg-teal-50/80" : "text-slate-600 hover:text-teal-950 hover:bg-slate-50"}`}
                        >
                            {item.label} 
                            <motion.div animate={{ rotate: activeMenu === item.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                <ChevronDown size={14} className={activeMenu === item.id ? "text-teal-600" : "text-slate-400"} />
                            </motion.div>
                        </button>
                    )}
                </div>
            ))}
        </div>

        {/* DESKTOP CTA & UTILITIES */}
        <div className="hidden lg:flex items-center gap-4">
             <LanguageSwitcher /> 
             <a 
                href="https://eworld.dxn2u.com/s/accreg/en/821641493" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-950 hover:bg-teal-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg shadow-teal-950/20 hover:shadow-teal-600/30 flex items-center gap-2 group"
             >
                Join DXN <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </a>
        </div>

        {/* MOBILE HAMBURGER */}
        <div className="lg:hidden flex items-center gap-3 z-[101]">
            <LanguageSwitcher /> 
            <button 
                className="p-2.5 text-slate-800 hover:bg-slate-100 rounded-full transition-colors bg-slate-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
            </button>
        </div>

        {/* DESKTOP MEGA MENU DROPDOWN (ANIMATED) */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div 
                initial={{ opacity: 0, y: 5, scaleY: 0.98 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: 5, scaleY: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-[72px] left-0 w-full bg-white/95 backdrop-blur-2xl border-t border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] origin-top rounded-b-[2.5rem] overflow-hidden flex justify-center"
                onMouseEnter={() => handleMouseEnter(activeMenu)}
            >
                {/* FIX: Added width constraints inside the expanded menu */}
                <div className="w-full p-8 lg:p-10">
                    {renderMegaContent(NAV_SCHEMA.find(m => m.id === activeMenu))}
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>

    {/* --- MOBILE MENU OVERLAY (ANIMATED) --- */}
    <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[90] lg:hidden pt-[90px] px-6 overflow-y-auto pb-24"
        >
            <div className="flex flex-col space-y-2">
                {NAV_SCHEMA.map((item, index) => (
                    <motion.div 
                      key={item.label} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-slate-100/60 last:border-0"
                    >
                        {item.href ? (
                            <Link 
                                href={item.href} 
                                className={`block py-5 text-xl font-bold transition-colors
                                ${isActive(item.href) ? "text-teal-600" : "text-slate-800"}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <div>
                                <button 
                                    onClick={() => setMobileSubMenu(mobileSubMenu === item.id ? null : item.id!)}
                                    className="flex items-center justify-between w-full py-5 text-xl font-bold text-slate-800"
                                >
                                    {item.label}
                                    <motion.div animate={{ rotate: mobileSubMenu === item.id ? 180 : 0 }}>
                                      <ChevronDown size={22} className={mobileSubMenu === item.id ? "text-teal-600" : "text-slate-400"}/>
                                    </motion.div>
                                </button>
                                
                                {/* Mobile Accordion */}
                                <AnimatePresence>
                                  {mobileSubMenu === item.id && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden mb-4"
                                    >
                                        <div className="bg-slate-50/80 rounded-3xl p-3 space-y-1">
                                            {item.items?.map((subItem: any, i) => {
                                              const Icon = subItem.icon;
                                              return (
                                                <Link 
                                                    key={i}
                                                    href={subItem.href}
                                                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all text-slate-700 font-bold"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <div className="bg-white p-2.5 rounded-xl text-teal-600 shadow-sm border border-slate-100">
                                                      <Icon size={18} strokeWidth={2} />
                                                    </div>
                                                    {subItem.label}
                                                </Link>
                                              )
                                            })}
                                        </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                ))}
                
                <motion.a 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    href="https://eworld.dxn2u.com/s/accreg/en/821641493" 
                    target="_blank"
                    className="flex items-center justify-center gap-2 w-full bg-teal-950 text-white text-center py-5 rounded-[1.5rem] font-bold text-lg shadow-xl shadow-teal-950/20 mt-8 mb-8"
                >
                    Join DXN Family <ArrowRight size={20} />
                </motion.a>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}