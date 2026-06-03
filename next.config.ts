// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No trailing slash – matches your sitemap URLs
  trailingSlash: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "uploads-ssl.webflow.com" },
      { protocol: "https", hostname: "cdn.webflow.com" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
    ],
  },

  // ---------- REDIRECTS (301) for all broken URLs ----------
  async redirects() {
    return [
      // ---- EXISTING REDIRECTS (kept & improved) ----
      {
        source: '/buy/:slug*',
        destination: '/products/:slug*',
        permanent: true,
      },
      {
        source: '/dxn-care-products/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/products/cordyceps-coffee',
        destination: '/products/dxn-cordypine',
        permanent: true,
      },
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
      {
        source: '/blog/cancer-',
        destination: '/blog/cancer-prevention-lifestyle-choices-that-lower-your-risk',
        permanent: true,
      },
      {
        source: '/blog/struggling-with-weight-discover-how-this-dxn-product-can-help',
        destination: '/blog',
        permanent: true,
      },

      // ---- NEW REDIRECTS (from GSC 404 errors & duplicates) ----
      // Terms page
      {
        source: '/terms-and-conditions',
        destination: '/terms',
        permanent: true,
      },
      // Blogs (plural) → blog (singular)
      {
        source: '/blogs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blogs/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      // Mental health → health-intelligences
      {
        source: '/mental-health',
        destination: '/health-intelligences',
        permanent: true,
      },
      {
        source: '/mental-health/:path*',
        destination: '/health-intelligences/:path*',
        permanent: true,
      },
      // Privacy policy
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      // Missing product pages
      {
        source: '/products/dxn-cordyceps',
        destination: '/products/dxn-cordypine',
        permanent: true,
      },
      {
        source: '/products/dxn-cordyceps-tablet',
        destination: '/products/dxn-cordypine',
        permanent: true,
      },
      {
        source: '/products/dxn-spirulina-tablet',
        destination: '/products/dxn-spirulina',
        permanent: true,
      },
      // Test page
      {
        source: '/test',
        destination: '/',
        permanent: true,
      },
      // Broken category filters (remove query params)
      {
        source: '/blogs',
        has: [{ type: 'query', key: 'category' }],
        destination: '/blog',
        permanent: true,
      },
      // Trailing slash removal (optional – ensure consistency with sitemap)
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },

  // ---------- HEADERS (canonical domain & security) ----------
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;