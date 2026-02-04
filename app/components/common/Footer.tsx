import Link from "next/link";
import Image from "next/image"; // ✅ Import Image

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-teal-950 text-white pt-20 pb-10 border-t border-teal-900">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            
            {/* ✅ Logo Update */}
      <Link href="/" className="flex items-center gap-2 z-50" >
           <Image 
             src="/images/logo-white.png" // Points to public/images/logo.png
             alt="DXN Care"
             width={250}           
             height={100}
             // ✅ Enforcing min-width and height of 100px
             className="object-contain min-w-[70px] h-[70px] w-auto" 
             priority              
           />
        </Link>


            <p className="text-teal-100/70 leading-relaxed text-sm">
              Your trusted partner in natural wellness. We combine expert medical guidance with premium Ganoderma-based products.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="bg-teal-900/50 p-3 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 border border-teal-800 hover:border-red-500"
                >
                  <Icon size={18} className="text-teal-100" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white font-jakarta">Company</h3>
            <ul className="space-y-4 text-sm text-teal-100/70">
              <li><Link href="/about" className="hover:text-red-400 transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-red-400 transition-colors">Our Products</Link></li>
              <li><Link href="/#doctors" className="hover:text-red-400 transition-colors">Find a Doctor</Link></li>
              <li><Link href="/blog" className="hover:text-red-400 transition-colors">Wellness Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white font-jakarta">Legal & Support</h3>
            <ul className="space-y-4 text-sm text-teal-100/70">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Information</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white font-jakarta">Contact Us</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex gap-4 items-start">
                <MapPin className="text-red-500 mt-1" size={18} />
                <span className="text-teal-100/70">Shahi Road,<br />Khanpur, Pakistan</span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="text-red-500" size={18} />
                <span className="text-teal-100/70">+92 333 8656601</span>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="text-red-500" size={18} />
                <span className="text-teal-100/70">support@dxncare.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-teal-800 to-transparent mb-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-teal-400/60">
          <p>&copy; {new Date().getFullYear()} DXN Care. All rights reserved.</p>
          <div className="flex gap-6">
             <Link href="/privacy" className="hover:text-white">Privacy</Link>
             <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;