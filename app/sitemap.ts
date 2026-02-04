import { MetadataRoute } from 'next';
import { getSortedData } from './lib/markdown'; // Make sure this path is correct

const BASE_URL = 'https://dxncare.com';

export default function sitemap(): MetadataRoute.Sitemap {
  
  // 1. Fetch All Dynamic Data
  const products = getSortedData('products');
  const blogs = getSortedData('blogs');
  // If you are keeping the /buy/ pages separate, fetch them too:
  // const buyPages = getSortedData('buy'); 

  // 2. Generate URLs for Products
  const productUrls = products.map((product: any) => ({
    url: `${BASE_URL}/products/${product.id}`,
    lastModified: new Date(product.updated_on || product.created_on || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Generate URLs for Blogs
  const blogUrls = blogs.map((blog: any) => ({
    url: `${BASE_URL}/blog/${blog.id}`,
    lastModified: new Date(blog.updated_on || blog.created_on || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. (Optional) Generate URLs for Buy Pages
  // const buyUrls = buyPages.map((page: any) => ({
  //   url: `${BASE_URL}/buy/${page.id}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.9, 
  // }));

  // 5. Define Your Static Pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/doctors`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // 6. Combine Everything
  return [
    ...staticPages,
    ...productUrls,
    ...blogUrls,
    // ...buyUrls, // Uncomment if using buy pages
  ];
}