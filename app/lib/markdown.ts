import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

// --- TYPE DEFINITION ---
export interface MarkdownData {
  id: string;
  slug: string;
  contentHtml?: string;
  [key: string]: any;
}

// --- 1. GET SORTED DATA ---
// Used for: Success Stories, Doctors, and Blog lists
export function getSortedData(directory: string): MarkdownData[] {
  const fullPath = path.join(contentDirectory, directory);
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ Marketing Alert: Directory not found at ${fullPath}. Create this folder to fix build errors.`);
    return [];
  }

  const fileNames = fs.readdirSync(fullPath);
  
  const allData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPathFile = path.join(fullPath, fileName);
      const fileContents = fs.readFileSync(fullPathFile, "utf8");
      const matterResult = matter(fileContents);

      return {
        id,
        slug: id,
        ...matterResult.data,
      } as MarkdownData;
    });

  // Sort by date (Newest First)
  return allData.sort((a, b) => {
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1;
    }
    return 0;
  });
}

// --- 2. GET SINGLE DATA ---
// Used for: Individual profile pages, product details, and success stories
export async function getData(directory: string, id: string): Promise<MarkdownData> {
  const fullPath = path.join(contentDirectory, directory, `${id}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Critical Error: Content file missing at ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  // Convert Markdown body to HTML for the "About" and "Bio" sections
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    slug: id,
    contentHtml,
    ...matterResult.data,
  };
}

// --- 3. ALIAS FOR COMPATIBILITY ---
export const getPostData = getData;

// --- 4. GET DATA BY CATEGORY (Fixes Health Hub Errors) ---
// This handles nested folders like content/health/heart-health/index.md
export function getDataByCategory(category: string): MarkdownData[] {
  const fullPath = path.join(contentDirectory, "health", category);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(fullPath);
  return fileNames
    .filter(file => file.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(path.join(fullPath, fileName), "utf8");
      const { data } = matter(fileContents);
      return { id, slug: id, ...data } as MarkdownData;
    });
}

// --- 5. GET ALL DATA (For Order/Sitemap) ---
export function getAllData(directory: string): MarkdownData[] {
  const fullPath = path.join(contentDirectory, directory);
  
  if (!fs.existsSync(fullPath)) return [];

  const fileNames = fs.readdirSync(fullPath);

  return fileNames
    .filter(file => file.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const filePath = path.join(fullPath, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const matterResult = matter(fileContents);

      return {
        id: slug,      
        slug: slug,    
        ...matterResult.data,
      } as MarkdownData;
    });
}