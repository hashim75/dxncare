import { MetadataRoute } from 'next';
import { getSortedData } from './lib/markdown'; 

const BASE_URL = 'https://dxncare.com';

export default function sitemap(): MetadataRoute.Sitemap {
  
  // --- 1. FETCH ALL DYNAMIC DATA ---
  // Using fallback empty arrays `|| []` to prevent build crashes if a folder is temporarily empty
  const products = getSortedData('products') || [];
  const blogs = getSortedData('blogs') || [];
  const doctors = getSortedData('doctors') || [];
  const healthIntelligences = getSortedData('health-intelligences') || [];

  // --- 2. GENERATE URLS FOR DYNAMIC CONTENT ---
  
  const productUrls = products.map((product: any) => ({
    url: `${BASE_URL}/products/${product.id || product.slug}`,
    lastModified: new Date(product.updated_on || product.created_on || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogUrls = blogs.map((blog: any) => ({
    url: `${BASE_URL}/blog/${blog.id || blog.slug}`,
    lastModified: new Date(blog.updated_on || blog.created_on || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const doctorUrls = doctors.map((doctor: any) => ({
    url: `${BASE_URL}/doctors/${doctor.id || doctor.slug}`,
    lastModified: new Date(doctor.updated_on || doctor.created_on || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const healthIntelUrls = healthIntelligences.map((intel: any) => ({
    url: `${BASE_URL}/health-intelligences/${intel.id || intel.slug}`,
    lastModified: new Date(intel.updated_on || intel.created_on || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));


  // --- 3. DEFINE ALL STATIC PAGES ---
  const staticPages = [
    // Core Pages
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.7 },
    { url: `${BASE_URL}/mission`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.6 },
    
    // Main Hubs & Directories
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/dxn-care-products`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/medicine`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/doctors`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/health`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/health-intelligences`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    
    // Features & Services
    { url: `${BASE_URL}/symptom-checker`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/doctor-referral-program`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/membership`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/success-stories`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/track`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    
    // Legal & Support Policies
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${BASE_URL}/shipping`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
  ];

  // --- 4. COMBINE EVERYTHING ---
  // Note: We intentionally exclude /checkout and /order to prevent search engines from indexing secure/private steps.
  return [
    ...staticPages,
    ...productUrls,
    ...blogUrls,
    ...doctorUrls,
    ...healthIntelUrls,
  ];
}