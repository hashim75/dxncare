"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, ChevronUp } from "lucide-react";

interface NavbarProps {
  products: any[];
  doctors: any[];
  intelligence: any[];
  blogs: any[];
}

export default function Navbar({ products, doctors, intelligence }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null); // For mobile accordion
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  let menuTimeout: NodeJS.Timeout;

  // 1. Handle Scroll for Shadow effect only (Bg is always white now)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveMenu(null);
    setMobileSubMenu(null);
  }, [pathname]);

  // 3. Desktop Hover Handlers
  const handleMouseEnter = (menuId: string) => {
    clearTimeout(menuTimeout);
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    menuTimeout = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  // 4. Desktop Mega Menu Content
  const renderMegaContent = (type: string) => {
    let items: any[] = [];
    let linkBase = "";
    let title = "";
    
    switch(type) {
      case "products": items = products; linkBase = "/products"; title = "Products"; break;
      case "doctors": items = doctors; linkBase = "/doctors"; title = "Doctors"; break;
      case "health-intelligence": items = intelligence; linkBase = "/health-intelligences"; title = "Health Intelligence"; break;
      default: return null;
    }

    if (!items || items.length === 0) return null;

    return (
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-9">
            <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-6">Latest {title}</h4>
            <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                {items.slice(0, 6).map((item: any, idx: number) => (
                    <Link 
                        key={idx} 
                        href={`${linkBase}/${item.id}`} 
                        className="group block p-3 rounded-xl hover:bg-slate-50 transition-all"
                    >
                        <h4 className="font-bold text-slate-900 text-[15px] group-hover:text-teal-700 mb-1 line-clamp-1">
                            {item.name || item.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2">
                           {item.short_description || item.excerpt || item.specialization || "View details"}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
        
        <div className="col-span-3">
            <div className="bg-slate-50 rounded-2xl p-6 h-full flex flex-col justify-center items-start border border-slate-100">
                <h4 className="font-bold text-slate-900 text-lg mb-2">View All {title}</h4>
                <p className="text-xs text-slate-500 mb-6">Browse our complete collection.</p>
                <Link 
                    href={linkBase} 
                    className="flex items-center gap-2 text-teal-700 font-bold text-sm hover:underline"
                >
                    See All <ArrowRight size={14} />
                </Link>
            </div>
        </div>
      </div>
    );
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", id: "products" },
    { name: "Doctors", id: "doctors" },
    { name: "Health Intelligence", id: "health-intelligence" },
    { name: "Blogs", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Order", href: "/order" }
  ];

  return (
    <>
    {/* --- MAIN NAVBAR --- */}
    <nav 
        className={`fixed w-full z-[100] top-0 left-0 bg-white border-b border-slate-100 transition-all duration-300 ${scrolled ? "shadow-md py-0" : "py-2"}`}
        onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4 h-[80px] flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="relative z-[101]">
           <Image 
             src="/images/logo.png" 
             alt="DXN Care"
             width={180}           
             height={60}
             className="object-contain h-[50px] w-auto" 
             priority              
           />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
                <div 
                    key={item.name} 
                    className="h-[80px] flex items-center"
                    onMouseEnter={() => item.id && handleMouseEnter(item.id)}
                >
                    {item.href ? (
                        <Link 
                          href={item.href} 
                          className="text-[15px] font-bold text-slate-600 hover:text-teal-700 px-4 py-2 rounded-lg transition-colors hover:bg-slate-50"
                        >
                            {item.name}
                        </Link>
                    ) : (
                        <button 
                          className={`flex items-center gap-1 text-[15px] font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer
                          ${activeMenu === item.id ? "text-teal-700 bg-teal-50" : "text-slate-600 hover:text-teal-700 hover:bg-slate-50"}`}
                        >
                            {item.name} 
                            <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === item.id ? "rotate-180" : ""}`} />
                        </button>
                    )}
                </div>
            ))}
        </div>

        {/* DESKTOP CTA BUTTON */}
        <div className="hidden lg:flex items-center gap-4">
             <a 
                href="https://eworld.dxn2u.com/s/accreg/en/821641493" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-teal-600/20 active:scale-95 flex items-center gap-2"
             >
                Join DXN <ArrowRight size={14} />
             </a>
        </div>

        {/* MOBILE HAMBURGER */}
        <button 
          className="lg:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors z-[101]"
          onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* DESKTOP MEGA MENU DROPDOWN */}
        <div 
            className={`absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl overflow-hidden transition-all duration-300 ease-out origin-top -z-10
            ${activeMenu ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
            onMouseEnter={() => activeMenu && handleMouseEnter(activeMenu)}
        >
            <div className="container mx-auto p-10">
                {activeMenu && renderMegaContent(activeMenu)}
            </div>
        </div>
      </div>
    </nav>

    {/* --- MOBILE MENU OVERLAY --- */}
    <div 
        className={`fixed inset-0 bg-white z-[90] lg:hidden transition-transform duration-300 ease-in-out pt-[100px] px-6 overflow-y-auto
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
        <div className="flex flex-col space-y-2 pb-10">
            {navItems.map((item) => (
                <div key={item.name} className="border-b border-slate-50">
                    {item.href ? (
                        <Link 
                            href={item.href} 
                            className="block py-4 text-lg font-bold text-slate-800 hover:text-teal-600"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ) : (
                        // Mobile Accordion for Sub-menus
                        <div>
                            <button 
                                onClick={() => setMobileSubMenu(mobileSubMenu === item.id ? null : item.id!)}
                                className="flex items-center justify-between w-full py-4 text-lg font-bold text-slate-800"
                            >
                                {item.name}
                                {mobileSubMenu === item.id ? <ChevronUp size={20} className="text-teal-600"/> : <ChevronDown size={20} className="text-slate-400"/>}
                            </button>
                            
                            {/* Accordion Content */}
                            <div className={`overflow-hidden transition-all duration-300 ${mobileSubMenu === item.id ? "max-h-[500px] opacity-100 mb-4" : "max-h-0 opacity-0"}`}>
                                <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                                    {(item.id === "products" ? products : 
                                      item.id === "doctors" ? doctors : 
                                      intelligence).slice(0, 5).map((subItem: any, i) => (
                                        <Link 
                                            key={i}
                                            href={`/${item.id === "health-intelligence" ? "health-intelligences" : item.id}/${subItem.id}`}
                                            className="block text-sm text-slate-600 hover:text-teal-600 font-medium truncate"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {subItem.name || subItem.title}
                                        </Link>
                                    ))}
                                    <Link 
                                        href={`/${item.id === "health-intelligence" ? "health-intelligences" : item.id}`}
                                        className="block text-sm font-bold text-teal-700 mt-2 underline"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        View All {item.name}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            
            <a 
                href="https://eworld.dxn2u.com/s/accreg/en/821641493" 
                target="_blank"
                className="block w-full bg-teal-600 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg mt-8"
            >
                Join DXN Family
            </a>
        </div>
    </div>
    </>
  );
}