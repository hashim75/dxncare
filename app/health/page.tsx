import HealthDirectoryClient from "./HealthDirectoryClient";

export const metadata = {
  title: "Health Intelligence Hub | DXN Care",
  description: "Explore our medically reviewed library of health conditions, nutrition guides, and natural wellness strategies.",
};

export default function HealthDirectoryPage() {
  return (
    <main className="bg-white min-h-screen font-sans text-slate-900">
       {/* We moved everything visual into the Client Component 
          so the search state works instantly.
       */}
       <HealthDirectoryClient />
    </main>
  );
}