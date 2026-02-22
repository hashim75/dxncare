/**
 * lib/search.ts
 * Scalable Search Utility for DXN Care Medical Database
 */

export interface DetailedSymptoms {
  [key: string]: string[];
}

export interface Disease {
  name: string;
  category: string;
  detailed_symptoms: DetailedSymptoms;
}

/**
 * Performs a deep search across disease names and all nested symptoms.
 */
export function searchDiseases(query: string, diseases: Disease[]): Disease[] {
  const cleanQuery = query.toLowerCase().trim();
  
  if (cleanQuery.length < 2) return [];

  return diseases.filter((disease) => {
    // Check 1: Match in the disease name
    const nameMatch = disease.name.toLowerCase().includes(cleanQuery);
    
    // Check 2: Match in the category
    const categoryMatch = disease.category.toLowerCase().includes(cleanQuery);

    // Check 3: Deep search in all symptom lists (early, advanced, motor, etc.)
    // We flatten the values of detailed_symptoms into a single array
    const allSymptoms = Object.values(disease.detailed_symptoms).flat();
    const symptomMatch = allSymptoms.some((symptom) => 
      symptom.toLowerCase().includes(cleanQuery)
    );

    return nameMatch || categoryMatch || symptomMatch;
  }).slice(0, 5); // Limit results for a cleaner UI
}