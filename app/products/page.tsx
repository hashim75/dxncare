import { getSortedData } from "../lib/markdown";
import ProductListing from "../components/products/ProductListing";

// Define Interface
interface Product {
  id: string;
  name?: string;
  title?: string;
  category?: string;
  main_image?: string;
  image?: string;
  short_description?: string;
}

export default function ProductsPage() {
  // 1. Fetch data on the Server
  const products = getSortedData("products") as Product[];

  // 2. Pass data to the Client Component
  return <ProductListing products={products} />;
}