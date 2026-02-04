import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script"; // ✅ Import Next.js Script component
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
  title: "DXN Care",
  description: "Natural Health & Wellness",
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
            1. GOOGLE ADSENSE
           ========================================= */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8126818304311867"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* =========================================
            2. GOOGLE ANALYTICS (GA4)
           ========================================= */}
        {/* Load the library */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DX070HV469"
          strategy="afterInteractive"
        />
        {/* Configure the dataLayer */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-DX070HV469');
          `}
        </Script>

        {/* Navbar */}
        <NavbarWrapper />
        
        {/* Cart Drawer (Now uses Zustand internally) */}
        <CartDrawer />
        
        {/* Main Content */}
        <div className="flex flex-col min-h-screen">
          {children}
        </div>

        {/* AI Health Bot */}
        <HealthBot />

        {/* Footer */}
        <Footer />
        
        {/* Vercel Web Analytics */}
        <Analytics />
        
        {/* Vercel Speed Insights */}
        <SpeedInsights />
        
      </body>
    </html>
  );
}