import { notFound } from "next/navigation";
import { getHealthArticle } from "../../../lib/health-api";
import AnimatedArticleContent from "../../../components/health/AnimatedArticleContent"; 

export default async function ArticleDetailPage({ params }: { params: { category: string, slug: string } }) {
  // 1. Fetch using BOTH category and slug
  const post = getHealthArticle(params.category, params.slug);

  if (!post) {
    console.error(`Article not found: ${params.category}/${params.slug}`);
    return notFound();
  }

  // 2. Pass data to client component
  // Note: We need to adapt the data shape if your component expects 'benefits' outside 'meta'
  // But based on my updated API, benefits are INSIDE post.meta.benefits
  
  return (
    <AnimatedArticleContent 
      post={post.meta} // We pass 'meta' as 'post' because your component expects .name, .image inside 'post'
      article={post}   // Pass full object if needed
      benefits={post.meta.benefits}
      faqs={post.meta.faqs}
    />
  );
}