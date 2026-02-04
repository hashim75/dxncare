import { getSortedData } from "../../lib/markdown"; // Ensure this path points to your lib folder
import FeaturedSliderClient from "./FeaturedSliderClient";

// Define Data Type
interface Product {
  id: string;
  name?: string;
  title?: string;
  category?: string;
  main_image?: string;
  image?: string;
}

export default function FeaturedSlider() {
  // 1. Fetch data on the Server
  const allProducts = getSortedData("products") as Product[];
  
  // 2. Take first 8 products
  const featuredProducts = allProducts.slice(0, 8);

  // 3. Pass data to the Client Component
  return <FeaturedSliderClient products={featuredProducts} />;
}