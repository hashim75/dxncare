import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

// --- 1. GET SORTED DATA (For lists, blogs, etc.) ---
export function getSortedData(directory: string) {
  const fullPath = path.join(contentDirectory, directory);
  
  // Safety check: if folder doesn't exist, return empty array
  if (!fs.existsSync(fullPath)) return [];

  const fileNames = fs.readdirSync(fullPath);
  const allData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(contentDirectory, directory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allData;
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

// --- 3. GET ALL DATA (New function for /order page) ---
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
      id: slug,      // Use slug as ID
      slug: slug,    // Explicit slug field
      ...matterResult.data,
    };
  });

  return allData;
}