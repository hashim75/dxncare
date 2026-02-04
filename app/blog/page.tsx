import { getSortedData } from "../lib/markdown";
import BlogListClient from "./BlogListClient";

export default function BlogPage() {
  // 1. Fetch Real Data on Server
  const blogs = getSortedData("blogs");

  // 2. Pass to Client Component
  return <BlogListClient blogs={blogs} />;
}