import { getSortedData } from "../lib/markdown";
import DoctorDirectory from "../components/doctors/DoctorDirectory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Medical Team | DXN Care",
  description: "Meet our specialists. Book online consultations with verified medical professionals.",
};

// This must be a Server Component to use getSortedData
export default async function DoctorsOverviewPage() {
  // Fetch doctors using your existing markdown logic
  const doctors = getSortedData("doctors");

  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-teal-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-2 block">
            Our Medical Team
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-teal-950 font-jakarta mb-4">
            Meet Our Specialists
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
            Experienced professionals dedicated to combining modern science with holistic well-being.
          </p>
        </div>

        {/* The Interactive Directory Component we just created */}
        <DoctorDirectory doctors={doctors} />

      </div>
    </main>
  );
}