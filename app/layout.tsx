import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script"; 
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Footer from "./components/common/Footer";
import CartDrawer from "./components/common/CartDrawer";
import NavbarWrapper from "./components/common/NavbarWrapper";
import HealthBot from "./components/bot/HealthBot"; 

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL('https://dxncare.com'),
  title: {
    default: "DXN Care Pakistan - Authentic Ganoderma Products",
    template: "%s | DXN CARE"
  },
  description: "Official distributor of DXN products in Pakistan. Shop authentic supplements, coffee, and personal care items with secure cash on delivery.",
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-teal-100 selection:text-teal-900">
        
        {/* =========================================
            1. GOOGLE TRANSLATE LOGIC
           ========================================= */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                // This will search for an element with ID 'google_translate_element'
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
        <Script 
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* =========================================
            2. GOOGLE ADSENSE
           ========================================= */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8126818304311867"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* =========================================
            3. GOOGLE ANALYTICS (GA4)
           ========================================= */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DX070HV469"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DX070HV469');
          `}
        </Script>

        {/* Hidden element for Google Translate to hook into */}
        <div id="google_translate_element" style={{ display: 'none', position: 'absolute', top: '-9999px' }}></div>

        <NavbarWrapper />
        <CartDrawer />
        
        <div className="flex flex-col min-h-screen">
          {children}
        </div>

        <HealthBot />
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}