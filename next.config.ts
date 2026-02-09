import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "uploads-ssl.webflow.com" },
      { protocol: "https", hostname: "cdn.webflow.com" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
    ],
  },

  async redirects() {
    return [
      // -------------------------------------------------------
      // 1. PRODUCT REDIRECTS (Old Webflow "/buy/" -> New "/products/")
      // -------------------------------------------------------
      {
        source: '/buy/:slug*',
        destination: '/products/:slug*',
        permanent: true,
      },
      {
        source: '/dxn-care-products',
        destination: '/products',
        permanent: true,
      },
      // Fix specific broken product link from your screenshot
      {
        source: '/products/cordyceps-coffee',
        destination: '/products/dxn-cordypine', // Redirecting to closest match or /products
        permanent: true,
      },

      // -------------------------------------------------------
      // 2. BLOG REDIRECTS (Root -> /blog/)
      // These old pages lived at the root (dxncare.com/post-name)
      // They must move to dxncare.com/blog/post-name
      // -------------------------------------------------------
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

      // -------------------------------------------------------
      // 3. BROKEN / DELETED LINKS (From Screenshot)
      // -------------------------------------------------------
      // The broken "cancer-" link -> Redirect to your specific cancer blog
      {
        source: '/blog/cancer-',
        destination: '/blog/cancer-prevention-lifestyle-choices-that-lower-your-risk',
        permanent: true,
      },
      // Old weight loss blog that seems deleted -> Redirect to main blog
      {
        source: '/blog/struggling-with-weight-discover-how-this-dxn-product-can-help',
        destination: '/blog', 
        permanent: true,
      },
    ];
  },
};

export default nextConfig;