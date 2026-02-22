import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'app', 'data');

export interface Medicine {
  name: string;
  category: string;
  price: string | number;
  id: string;
}

// 1. Existing function to get medicines for the list view
export function getMedicinesByLetter(letter: string): Medicine[] {
  const char = letter.toLowerCase();
  const filePath = path.join(dataDirectory, `medicine-${char}.json`);
  
  try {
    if (!fs.existsSync(filePath)) return [];
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

export function getAllInitialMedicines(): Medicine[] {
  return getMedicinesByLetter('a');
}

// 2. NEW: Function to find a specific medicine for SEO/Detail pages
export async function getMedicineBySlug(slug: string): Promise<Medicine | null> {
  // Extract the first letter from the slug to know which JSON file to search
  const firstLetter = slug.charAt(0).toLowerCase();
  const medicines = getMedicinesByLetter(firstLetter);

  // Find the medicine where the generated slug matches the URL slug
  const medicine = medicines.find(m => {
    const medicineId = m.id || m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return medicineId === slug;
  });

  return medicine || null;
}