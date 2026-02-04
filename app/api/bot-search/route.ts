import { NextResponse } from "next/server";
import { getAllData } from "../../lib/markdown"; // Adjust path to your lib

// --- HELPER: SEARCH SCORING ---
// This assigns points based on where the keyword is found
const calculateScore = (item: any, queryWords: string[]) => {
  let score = 0;
  const searchableText = `
    ${item.name || item.title || ""} 
    ${item.short_description || item.intro || ""} 
    ${item.specialization || ""} 
    ${item.tags || ""}
    ${item.faq_question___1 || ""}
  `.toLowerCase();

  queryWords.forEach((word) => {
    if (searchableText.includes(word)) {
      // Title matches are worth more
      if ((item.name || item.title || "").toLowerCase().includes(word)) {
        score += 10;
      }
      // Description matches
      else if ((item.short_description || "").toLowerCase().includes(word)) {
        score += 5;
      }
      // General content match
      else {
        score += 1;
      }
    }
  });

  return score;
};

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const lowerQuery = query.toLowerCase();
    const queryWords = lowerQuery.split(" ").filter((w: string) => w.length > 2); // Ignore small words

    // 1. Fetch All Data
    const products = getAllData("products");
    const blogs = getAllData("blogs");
    const doctors = getAllData("doctors");
    const intelligence = getAllData("intelligence");

    // 2. Score & Filter Everything
    const allContent = [
      ...products.map((i) => ({ ...i, type: "product" })),
      ...blogs.map((i) => ({ ...i, type: "blog" })),
      ...doctors.map((i) => ({ ...i, type: "doctor" })),
      ...intelligence.map((i) => ({ ...i, type: "intelligence" })),
    ];

    const results = allContent
      .map((item) => ({ item, score: calculateScore(item, queryWords) }))
      .filter((result) => result.score > 0) // Only keep matches
      .sort((a, b) => b.score - a.score) // Sort by relevance
      .slice(0, 5); // Limit to top 5 results

    return NextResponse.json({ results: results.map((r) => r.item) });

  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}