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

        {/* =========================================
            4. TIKTOK PIXEL (UPDATED ID)
           ========================================= */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=
              ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('D91LA1RC77U2B9GAH7U0');
              ttq.page();
            }(window, document, 'ttq');
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