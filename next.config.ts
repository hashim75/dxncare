import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "uploads-ssl.webflow.com", 
      },
      {
        protocol: "https",
        hostname: "cdn.webflow.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },

  // ✅ INTELLIGENT REDIRECTS (Fixing your 404s)
  async redirects() {
    return [
      // 1. Fix Product Links (Old "/buy/" -> New "/products/")
      {
        source: '/buy/:slug*',
        destination: '/products/:slug*',
        permanent: true, // 301 Redirect (Passes SEO power to new page)
      },

      // 2. Fix Old Collections Page
      {
        source: '/dxn-care-products',
        destination: '/products',
        permanent: true,
      },

      // 3. Fix Blogs that were previously at the "Root" (domain.com/blog-title -> domain.com/blog/blog-title)
      // I have extracted these specific URLs from your screenshot
      {
        source: '/the-natural-way-to-boost-immunity-why-you-need-dxn-spirulina',
        destination: '/blog/the-natural-way-to-boost-immunity-why-you-need-dxn-spirulina',
        permanent: true,
      },
      {
        source: '/heart-health-101-risk-factors-everyone-should-know',
        destination: '/blog/heart-health-101-risk-factors-everyone-should-know',
        permanent: true,
      },
      {
        source: '/why-weight-keeps-coming-back-the-science-behind-obesity-and-long-term-success',
        destination: '/blog/why-weight-keeps-coming-back-the-science-behind-obesity-and-long-term-success',
        permanent: true,
      },
      {
        source: '/everyday-tips-to-protect-your-lungs-air-quality-smoking-and-nutrition',
        destination: '/blog/everyday-tips-to-protect-your-lungs-air-quality-smoking-and-nutrition',
        permanent: true,
      },
      {
        source: '/early-signs-of-type-2-diabetes',
        destination: '/blog/early-signs-of-type-2-diabetes',
        permanent: true,
      },
      {
        source: '/tired-of-fatigue-how-dxns-ganoderma-coffee-can-boost-your-energy',
        destination: '/blog/tired-of-fatigue-how-dxns-ganoderma-coffee-can-boost-your-energy',
        permanent: true,
      },
      {
        source: '/beyond-the-buzz-how-dxn-coffee-gives-you-lasting-energy',
        destination: '/blog/beyond-the-buzz-how-dxn-coffee-gives-you-lasting-energy',
        permanent: true,
      },
      {
        source: '/common-causes-of-adult-acne-what-your-diet-has-to-do-with-it',
        destination: '/blog/common-causes-of-adult-acne-what-your-diet-has-to-do-with-it',
        permanent: true,
      },

      // 4. Fix Broken/Truncated URLs from screenshot (Redirect to main Blog page)
      {
        source: '/blog/cancer-',
        destination: '/blog',
        permanent: true,
      },
      // 5. Catch-all: If an old blog post is truly deleted, redirect to the main blog page so you don't lose the visitor
      {
        source: '/blog/struggling-with-weight-discover-how-this-dxn-product-can-help',
        destination: '/blog', 
        permanent: true,
      },
    ];
  },
};

export default nextConfig;