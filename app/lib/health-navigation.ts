import { 
  Heart, Activity, Brain, Utensils, Moon, 
  ShieldCheck, Droplet, UserCheck, Stethoscope, 
  Leaf, Flower, Baby
} from "lucide-react";

export const HEALTH_CATEGORIES = [
  {
    title: "Health Conditions",
    slug: "conditions",
    description: "Medically reviewed guides on managing chronic and acute conditions.",
    icon: Stethoscope,
    color: "text-rose-500",
    bg: "bg-rose-50",
    items: [
      { name: "Type 2 Diabetes", slug: "diabetes", featured: true },
      { name: "Heart Health", slug: "heart-health", featured: true },
      { name: "Digestive Health (Gut)", slug: "gut-health", featured: true },
      { name: "High Blood Pressure", slug: "hypertension" },
      { name: "Immune Disorders", slug: "autoimmune" },
      { name: "Skin Conditions (Acne/Eczema)", slug: "skin-health" },
      { name: "Respiratory (Asthma/Lungs)", slug: "respiratory" },
      { name: "Joint Pain & Arthritis", slug: "joints-pain" },
      { name: "Liver Health (Fatty Liver)", slug: "liver-health" }
    ]
  },
  {
    title: "Wellness & Lifestyle",
    slug: "wellness",
    description: "Evidence-based tips for daily vitality and mental balance.",
    icon: Activity,
    color: "text-teal-600",
    bg: "bg-teal-50",
    items: [
      { name: "Nutrition & Diet", slug: "nutrition", featured: true },
      { name: "Weight Management", slug: "weight-loss", featured: true },
      { name: "Sleep Science", slug: "sleep" },
      { name: "Mental Health & Stress", slug: "mental-health" },
      { name: "Energy & Fatigue", slug: "energy-vitality" },
      { name: "Healthy Aging", slug: "aging-well" },
      { name: "Men's Health", slug: "mens-health" },
      { name: "Women's Health", slug: "womens-health" }
    ]
  },
  {
    title: "Therapies & Herbs",
    slug: "therapies",
    description: "Understanding the science behind functional mushrooms and herbs.",
    icon: Leaf,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    items: [
      { name: "Ganoderma (Reishi)", slug: "ganoderma", featured: true },
      { name: "Cordyceps", slug: "cordyceps" },
      { name: "Spirulina", slug: "spirulina" },
      { name: "Lion's Mane", slug: "lions-mane" },
      { name: "Noni (Morinda)", slug: "noni" },
      { name: "Fermented Enzymes", slug: "enzymes" }
    ]
  }
];

// Helper to find a specific category by slug
export const getCategoryBySlug = (slug: string) => {
  for (const section of HEALTH_CATEGORIES) {
    const found = section.items.find(item => item.slug === slug);
    if (found) return found;
  }
  return null;
};