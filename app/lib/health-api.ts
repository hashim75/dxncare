import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Base content directory
const baseContentDir = path.join(process.cwd(), 'content/health');

export interface HealthArticle {
  slug: string;
  category: string;
  meta: any;
  content: string;
}

// 1. Get ALL Categories (Folders inside /content/health)
export function getHealthCategories() {
  // Returns ['diabetes-sugar', 'mental-health', etc.]
  if (!fs.existsSync(baseContentDir)) return [];
  return fs.readdirSync(baseContentDir).filter(file => 
    fs.statSync(path.join(baseContentDir, file)).isDirectory()
  );
}

// 2. Get Articles for a Specific Category
export function getArticlesByCategory(category: string): HealthArticle[] {
  const categoryDir = path.join(baseContentDir, category);
  
  if (!fs.existsSync(categoryDir)) return [];

  const files = fs.readdirSync(categoryDir);

  return files.filter(file => file.endsWith('.md')).map(file => {
    const filePath = path.join(categoryDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      slug: file.replace('.md', ''),
      category,
      meta: data,
      content: '' // Lightweight for lists
    };
  });
}

// 3. Get Single Article (Detail Page)
export function getHealthArticle(category: string, slug: string): HealthArticle | null {
  // LOOK HERE: We construct path based on Category + Slug
  const filePath = path.join(baseContentDir, category, `${slug}.md`);

  try {
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Helpers to parse arrays (Benefits/FAQs)
    const benefits = [];
    let i = 1;
    while (data[`benefit___${i}_title`]) {
      benefits.push({ title: data[`benefit___${i}_title`], detail: data[`benefit___${i}_detail`] });
      i++;
    }

    const faqs = [];
    let j = 1;
    while (data[`faq_question___${j}`]) {
      faqs.push({ q: data[`faq_question___${j}`], a: data[`faq_answer___${j}`] });
      j++;
    }

    return {
      slug,
      category,
      meta: { ...data, benefits, faqs },
      content
    };
  } catch (e) {
    console.error("Error reading MD file:", e);
    return null;
  }
}