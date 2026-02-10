export const HEALTH_NAVIGATION = {
  conditions: [
    // ✅ Mapped to folder: /health/diabetes-sugar
    { name: "Type 2 Diabetes", slug: "diabetes-sugar", featured: true },
    
    // ⚠️ No folder for "heart-health" yet, pointing to Diabetes (Metabolic) for now
    { name: "Heart Health", slug: "diabetes-sugar" }, 

    // ✅ Mapped to folder: /health/gut-digestion
    { name: "Digestive Health (Gut)", slug: "gut-digestion", featured: true },

    // ⚠️ Mapped to Diabetes (Metabolic)
    { name: "High Blood Pressure", slug: "diabetes-sugar" },

    // ✅ Mapped to folder: /health/immune-defense
    { name: "Immune Disorders", slug: "immune-defense" },

    // ✅ Mapped to folder: /health/skin-beauty
    { name: "Skin Conditions (Acne/Eczema)", slug: "skin-beauty" },

    // ✅ Mapped to folder: /health/immune-defense
    { name: "Respiratory (Asthma/Lungs)", slug: "immune-defense" },

    { name: "View All Conditions", slug: "/health" }
  ],
  
  wellness: [
    { name: "Nutrition & Diet", slug: "gut-digestion" },
    { name: "Weight Management", slug: "diabetes-sugar" },
    
    // ✅ Mapped to folder: /health/energy-fatigue
    { name: "Energy & Fatigue", slug: "energy-fatigue" },
    
    { name: "Sleep Science", slug: "energy-fatigue" },
    { name: "Mental Health & Stress", slug: "energy-fatigue" },
    { name: "Healthy Aging", slug: "immune-defense" }
  ],

  therapies: [
    { name: "Ganoderma (Reishi)", slug: "immune-defense" },
    { name: "Cordyceps", slug: "energy-fatigue" },
    { name: "Spirulina", slug: "gut-digestion" },
    { name: "Lion's Mane", slug: "energy-fatigue" },
    { name: "Morinzhi (Noni)", slug: "gut-digestion" }
  ]
};