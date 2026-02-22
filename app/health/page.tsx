import HealthHubAnimated from '../components/health/HealthHubAnimated';
import { getHealthCategories, getArticlesByCategory } from '../lib/health-api';

export const metadata = {
  title: 'Health Intelligence Hub | Functional Medicine Protocols | DXN Care',
  description: 'Evidence-based protocols for diabetes, fatigue, and gut health. Medically reviewed library.',
};

export default function HealthPage() {
  // 1. Get Raw Categories (Folder Names like 'diabetes-sugar')
  const rawCategories = getHealthCategories();

  // 2. Transform into UI-Ready Data
  const categories = rawCategories.map((slug) => {
    const articles = getArticlesByCategory(slug);
    
    // Format Title: "diabetes-sugar" -> "Diabetes & Sugar"
    const title = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace('And', '&');

    // Dynamic Description based on content volume
    const description = articles.length > 0 
      ? `Explore ${articles.length} evidence-based protocols and guides.` 
      : "New protocols coming soon.";

    return {
      slug,
      title,
      description,
      articleCount: articles.length
    };
  });

  // 3. Aggregate Trending Research (Get top 3 articles across all categories)
  let allArticles: any[] = [];
  
  rawCategories.forEach(catSlug => {
    const articles = getArticlesByCategory(catSlug);
    // Add category slug to each article for linking
    const enrichedArticles = articles.map(art => ({ ...art, categorySlug: catSlug }));
    allArticles = [...allArticles, ...enrichedArticles];
  });

  // Simple logic: Take first 3 articles (You can refine this to sort by date if available in meta)
  const trendingArticles = allArticles.slice(0, 3);

  return (
    <main>
      <HealthHubAnimated categories={categories} trendingArticles={trendingArticles} />
    </main>
  );
}