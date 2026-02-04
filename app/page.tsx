import Hero from "./components/home/Hero";
import FeaturedSlider from "./components/home/FeaturedSlider";
import DoctorSection from "./components/home/DoctorSection"; // Adjust path if needed
import FAQSection from "./components/home/FAQSection";
import ContactSection from "./components/home/ContactSection";
import { getSortedData } from "./lib/markdown";


export default function Home() {
  // ✅ FIX: Cast to 'any[]' so TypeScript knows it has all the required fields
  const doctors = getSortedData("doctors") as any[]; 

  return (
    <main>

      <Hero />
      <FeaturedSlider />
      
      {/* Pass the doctors data */}
      <DoctorSection doctors={doctors} />
      
      <FAQSection />
      <ContactSection />
    </main>
  );
}