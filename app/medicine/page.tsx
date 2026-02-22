import MedicineExplorer from '../components/medicine/MedicineExplorer';
import { getAllInitialMedicines } from '../lib/medicine-api';

export const metadata = {
  title: 'Medicine Directory | Allopathic Medicine Price List Pakistan | DXN Care',
  description: 'Search and find authentic allopathic medicine prices and details in Pakistan. Explore our comprehensive A-Z database.',
};

export default function MedicinePage() {
  const initialData = getAllInitialMedicines();

  return (
    <main className="bg-[#F8FAFC] min-h-screen pt-32 pb-20">
      <MedicineExplorer initialMedicines={initialData} />
    </main>
  );
}