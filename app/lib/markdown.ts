import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

// --- 1. GET SORTED DATA (For lists, blogs, health hubs) ---
export function getSortedData(directory: string) {
  const fullPath = path.join(contentDirectory, directory);
  
  // Safety check: if folder doesn't exist, return empty array instead of crashing
  if (!fs.existsSync(fullPath)) {
    console.warn(`Directory not found: ${fullPath}`);
    return [];
  }

  const fileNames = fs.readdirSync(fullPath);
  
  const allData = fileNames
    .filter(fileName => fileName.endsWith('.md')) // Only process markdown files
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPathFile = path.join(fullPath, fileName);
      const fileContents = fs.readFileSync(fullPathFile, "utf8");
      const matterResult = matter(fileContents);

      return {
        id,
        ...matterResult.data,
      };
    });

  // Sort by date (Newest First) if a date field exists
  return allData.sort((a: any, b: any) => {
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1;
    }
    return 0;
  });
}

// --- 2. GET SINGLE DATA (For individual pages like /products/slug) ---
export async function getData(directory: string, id: string) {
  const fullPath = path.join(contentDirectory, directory, `${id}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  // Process the content body into HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data, // Access frontmatter fields like price, main_image, etc.
  };
}

// --- 3. ALIAS FOR COMPATIBILITY (Fixes your Health Page Error) ---
// Your new Health pages use "getPostData", so we just point it to "getData"
export const getPostData = getData;

// --- 4. GET ALL DATA (For /order page) ---
export function getAllData(directory: string) {
  const fullPath = path.join(contentDirectory, directory);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(fullPath);

  const allData = fileNames.map((fileName) => {
    // Remove ".md" to get the slug/id
    const slug = fileName.replace(/\.md$/, "");

    // Read the file
    const filePath = path.join(contentDirectory, directory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    // Parse frontmatter
    const matterResult = matter(fileContents);

    // Return object suitable for the order grid
    return {
      id: slug,      
      slug: slug,    
      ...matterResult.data,
    };
  });

  return allData;
}