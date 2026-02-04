import { getSortedData } from "../../lib/markdown";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  // Fetch and limit data to the latest 6 items for each dropdown
  const products = getSortedData("products").slice(0, 6);
  const doctors = getSortedData("doctors").slice(0, 6);
  const intelligence = getSortedData("health-intelligences").slice(0, 6);

  return (
    <Navbar 
      products={products} 
      doctors={doctors} 
      intelligence={intelligence} 
      blogs={[]} // Direct link, so no data needed
    />
  );
}