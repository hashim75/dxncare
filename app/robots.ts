// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',           // keep backend routes out
        '/medicine/',      // auto‑generated thin content (not indexed)
        '/order',          // no content / login required
        '/checkout',
        '/cart',
        '/products?*',     // any product listing with query params
        '/buy/',           // duplicate of /products
        '/*?category=*',   // filter pages (duplicate content)
        '/*?page=*',
        '/*?filter=*',
        '/products/dxn-spirulina-tablet', // duplicate product URL (already redirected)
      ],
    },
    // ✅ Use your canonical domain (non‑www, HTTPS)
    sitemap: 'https://dxncare.com/sitemap.xml',
  };
}