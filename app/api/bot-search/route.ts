import { NextResponse } from "next/server";
import { getAllData } from "../../lib/markdown";

// --- 1. MEDICAL SYNONYM MAPPER ---
// This bridges the gap between patient language and doctor terminology
const MEDICAL_MAP: Record<string, string[]> = {
  diabetes: ["sugar", "diabetes", "insulin", "glucose", "diabetic", "endocrinology"],
  nutritionist: ["diet", "weight", "obesity", "food", "nutrition", "meal", "fat"],
  skincare: ["acne", "skin", "rash", "dermatology", "pimples", "glow", "eczema"],
  cardiology: ["heart", "blood pressure", "hypertension", "chest pain", "cardiac"],
  mental: ["anxiety", "stress", "depression", "mental health", "therapy", "psychology"],
  pediatrics: ["child", "baby", "infant", "kids", "growth", "pediatric"],
  digestive: ["stomach", "gut", "acidity", "digestion", "bloating", "liver"],
};

// --- 2. IMPROVED SEARCH SCORING ---
const calculateScore = (item: any, queryWords: string[]) => {
  let score = 0;
  const name = (item.name || item.title || "").toLowerCase();
  const spec = (item.specialization || "").toLowerCase();
  const desc = (item.short_description || item.intro || "").toLowerCase();
  const tags = (item.tags || []).toString().toLowerCase();

  queryWords.forEach((word) => {
    // A. Direct Specialization Match (Highest Priority)
    if (spec.includes(word)) {
      score += 25;
    }

    // B. Medical Context Match (Smart Matching)
    // Check if the query word belongs to a medical category that matches the doctor's specialization
    Object.entries(MEDICAL_MAP).forEach(([category, synonyms]) => {
      if (synonyms.includes(word) && spec.includes(category)) {
        score += 20; // High score for matching a symptom to a specialty
      }
    });

    // C. Name Match
    if (name.includes(word)) {
      score += 15;
    }

    // D. Description & Tags Match
    if (desc.includes(word) || tags.includes(word)) {
      score += 5;
    }
  });

  // E. Premium Boost: Give a small nudge to our Paid Tier partners
  if (item.plan_tier === "paid") {
    score += 2;
  }

  return score;
};

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const lowerQuery = query.toLowerCase();
    // Split and filter common stop words
    const queryWords = lowerQuery.split(/\s+/).filter((w: string) => w.length > 2);

    // Fetch All Data
    const products = getAllData("products");
    const blogs = getAllData("blogs");
    const doctors = getAllData("doctors");
    const intelligence = getAllData("intelligence");

    const allContent = [
      ...products.map((i) => ({ ...i, type: "product" })),
      ...blogs.map((i) => ({ ...i, type: "blog" })),
      ...doctors.map((i) => ({ ...i, type: "doctor" })),
      ...intelligence.map((i) => ({ ...i, type: "intelligence" })),
    ];

    const results = allContent
      .map((item) => ({ item, score: calculateScore(item, queryWords) }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score) 
      .slice(0, 5); 

    return NextResponse.json({ results: results.map((r) => r.item) });

  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}