"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, ShoppingBag } from "lucide-react";

interface NavbarProps {
  products: any[];
  doctors: any[];
  intelligence: any[];
  blogs: any[];
}

export default function Navbar({ products, doctors, intelligence, blogs }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  let menuTimeout: NodeJS.Timeout;

  const isDarkPage = pathname.includes("/health-intelligences/") || pathname.includes("/reports");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const handleMouseEnter = (menuId: string) => {
    clearTimeout(menuTimeout);
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    menuTimeout = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const isLightMode = scrolled || activeMenu || isOpen || !isDarkPage;
  
  const textColor = isLightMode ? "text-slate-700" : "text-white/90";
  const hoverColor = isLightMode ? "hover:text-teal-600" : "hover:text-white";
  const navBg = (scrolled || activeMenu || isOpen) ? "bg-white shadow-md border-b border-slate-100" : "bg-transparent";

  const renderMegaContent = (type: string) => {
    let items: any[] = [];
    let linkBase = "";
    let title = "";
    
    switch(type) {
      case "products": items = products; linkBase = "/products"; title = "Products"; break;
      case "doctors": items = doctors; linkBase = "/doctors"; title = "Doctors"; break;
      case "health-intelligence": items = intelligence; linkBase = "/health-intelligences"; title = "Health Intelligence"; break;
      // Removed "blogs" case
      default: return null;
    }

    if (items.length === 0) {
      return <div className="py-8 text-center text-slate-500 italic">No {title.toLowerCase()} found.</div>;
    }

    return (
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-9">
            <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-6">Latest {title}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8">
                {items.map((item: any, idx: number) => (
                    <Link 
                        key={idx} 
                        href={`${linkBase}/${item.id}`} 
                        className="group block -m-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200"
                        onClick={() => setActiveMenu(null)}
                    >
                        <div>
                            <h4 className="font-bold text-slate-900 text-[15px] group-hover:text-teal-700 transition-colors leading-snug mb-1.5">
                                {item.name || item.title}
                            </h4>
                            {(item.short_description || item.excerpt || item.specialization) && (
                              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                                {item.short_description || item.excerpt || item.specialization}
                              </p>
                            )}
                            {item.price && <p className="text-sm font-bold text-teal-600 mt-2">{item.price}</p>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        
        <div className="col-span-3">
            <div className="bg-slate-50/80 rounded-2xl p-8 h-full flex flex-col justify-center items-start border border-slate-100 hover:border-teal-100/50 hover:bg-teal-50/30 transition-all duration-300">
                <h4 className="font-bold text-slate-900 text-xl mb-3">Explore All {title}</h4>
                <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                    Browse our complete collection of verified {title.toLowerCase()} and find exactly what you need.
                </p>
                <Link 
                    href={linkBase} 
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 font-bold rounded-full shadow-sm border border-slate-100 hover:border-teal-200 hover:shadow-md hover:text-teal-800 transition-all"
                    onClick={() => setActiveMenu(null)}
                >
                    View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
            </div>
        </div>
      </div>
    );
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", id: "products" },
    { name: "Blogs", href: "/blog" }, // ✅ Changed from 'id' to 'href'
    { name: "Doctors", id: "doctors" },
    { name: "Health Intelligence", id: "health-intelligence" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Order", href: "/order" }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBg}`} onMouseLeave={handleMouseLeave}>
      <div className="container mx-auto px-4 h-[100px] flex items-center justify-between relative">
        
        {/* 1. LOGO */}
        <Link href="/" className="flex items-center gap-2 z-50" onClick={() => setActiveMenu(null)}>
           <Image 
             src="/images/logo.png" 
             alt="DXN Care"
             width={250}           
             height={100}
             className="object-contain min-w-[70px] h-[70px] w-auto" 
             priority              
           />
        </Link>

        {/* 2. DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
                <div 
                    key={item.name} 
                    className="h-[100px] flex items-center px-3"
                    // Only attach mouse enter if it has an ID (dropdown)
                    onMouseEnter={() => item.id && handleMouseEnter(item.id)}
                >
                    {item.href ? (
                        <Link 
                          href={item.href} 
                          className={`text-[15px] font-bold px-3 py-2 rounded-lg transition-all ${textColor} ${hoverColor} ${isLightMode ? "hover:bg-slate-50" : "hover:bg-white/10"}`}
                        >
                            {item.name}
                        </Link>
                    ) : (
                        <button 
                          className={`flex items-center gap-1.5 text-[15px] font-bold px-3 py-2 rounded-lg transition-all group cursor-pointer border-none bg-transparent
                          ${activeMenu === item.id 
                              ? "text-teal-700 bg-teal-50" 
                              : `${textColor} ${hoverColor} ${isLightMode ? "hover:bg-slate-50" : "hover:bg-white/10"}`
                           }`}
                        >
                            {item.name} 
                            <ChevronDown size={16} className={`transition-transform duration-300 opacity-70 group-hover:opacity-100 ${activeMenu === item.id ? "rotate-180" : ""}`} />
                        </button>
                    )}
                </div>
            ))}
        </div>

        {/* 3. BUTTONS */}
        <div className="hidden lg:flex items-center gap-4 z-50">
             <a 
                href="https://eworld.dxn2u.com/s/accreg/en/821641493" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`group relative overflow-hidden px-7 py-3 rounded-full text-sm font-bold transition-all shadow-lg active:scale-95 
                ${isLightMode 
                    ? "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20" 
                    : "bg-white text-teal-700 hover:bg-teal-50 shadow-black/20"}`}
             >
                <span className="relative z-10 flex items-center gap-2">
                  Join DXN <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </span>
             </a>
        </div>

        {/* 4. MOBILE MENU BUTTON */}
        <button 
          className={`lg:hidden p-2 rounded-lg transition-colors ${textColor} hover:bg-white/10`} 
          onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <X size={28} className="text-slate-900" /> : <Menu size={28} />}
        </button>

        {/* 5. MEGA MENU */}
        <div 
            className={`absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden transition-all duration-300 ease-out origin-top z-40
            ${activeMenu ? "opacity-100 visible scale-100 translate-y-0" : "opacity-0 invisible scale-[0.98] -translate-y-2 pointer-events-none"}`}
            onMouseEnter={() => activeMenu && handleMouseEnter(activeMenu)}
        >
            <div className="container mx-auto p-10 animate-in fade-in slide-in-from-top-4 duration-500">
                {activeMenu && renderMegaContent(activeMenu)}
            </div>
        </div>

      </div>

      {/* 6. MOBILE OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 top-0 bg-white z-40 overflow-y-auto lg:hidden">
            <div className="flex justify-end p-4">
               <button onClick={() => setIsOpen(false)} className="p-2 text-slate-900"><X size={28} /></button>
            </div>
            <div className="flex flex-col p-6 space-y-6 pt-0">
                {navItems.map((item) => (
                    <div key={item.name} className="border-b border-slate-100 pb-4">
                        {item.href ? (
                            <Link href={item.href} className="text-xl font-bold text-slate-900 block" onClick={() => setIsOpen(false)}>
                                {item.name}
                            </Link>
                        ) : (
                            <>
                                <div className="text-xl font-bold text-slate-900 mb-4">{item.name}</div>
                                <div className="grid grid-cols-1 gap-3 pl-4">
                                    {(item.id === "products" ? products : 
                                      item.id === "doctors" ? doctors : 
                                      item.id === "health-intelligence" ? intelligence : 
                                      // Fallback for blogs in mobile menu if needed, though usually direct links won't hit this
                                      []).slice(0, 4).map((subItem: any, i) => (
                                        <Link 
                                            key={i} 
                                            href={`/${item.id === "health-intelligence" ? "health-intelligences" : item.id}/${subItem.id}`}
                                            className="text-base text-slate-600 py-1"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {subItem.name || subItem.title}
                                        </Link>
                                    ))}
                                    <Link href={`/${item.id}`} className="text-base font-bold text-teal-600 mt-3 inline-block">
                                        View All {item.name} →
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                ))}
                
                <a 
                    href="https://eworld.dxn2u.com/s/accreg/en/821641493" 
                    target="_blank"
                    className="bg-teal-600 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg mt-4"
                >
                    Join DXN Family
                </a>
            </div>
        </div>
      )}
    </nav>
  );
}