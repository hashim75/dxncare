// lib/products.ts

export const PRODUCT_DATABASE: Record<string, { name: string; image: string; price: string; link: string }> = {
  "dxn-lingzhi-black-coffee": {
    name: "DXN Lingzhi Black Coffee",
    image: "/images/products/coffee.png", // Ensure you have these images in public/images/products/
    price: "PKR 3,500",
    link: "/products/dxn-lingzhi-black-coffee"
  },
  "dxn-spirulina-tablet": {
    name: "DXN Spirulina Tablets (120)",
    image: "/images/products/spirulina.png",
    price: "PKR 3,600",
    link: "/products/dxn-spirulina-tablet"
  },
  "dxn-reishi-gano-rg-90-capsules": {
    name: "Reishi Gano (RG) 90 Caps",
    image: "/images/products/rg.png",
    price: "PKR 7,870",
    link: "/products/dxn-reishi-gano-rg-90-capsules"
  },
  "dxn-ganocelium-gl-90-capsules": {
    name: "Ganocelium (GL) 90 Caps",
    image: "/images/products/gl.png",
    price: "PKR 7,125",
    link: "/products/dxn-ganocelium-gl-90-capsules"
  },
  "dxn-morinzhi": {
    name: "DXN Morinzhi (Noni Juice)",
    image: "/images/products/morinzhi.png",
    price: "PKR 3,200",
    link: "/products/dxn-morinzhi"
  },
  "dxn-lions-mane-tablet": {
    name: "DXN Lion's Mane Tablets",
    image: "/images/products/lions-mane.png",
    price: "PKR 8,900",
    link: "/products/dxn-lions-mane-tablet"
  },
  "dxn-cordyceps-tablet": {
    name: "DXN Cordyceps Tablets",
    image: "/images/products/cordyceps.png",
    price: "PKR 12,185",
    link: "/products/dxn-cordyceps-tablet"
  },
  "dxn-black-cumin-plus": {
    name: "DXN Black Cumin Plus",
    image: "/images/products/black-cumin.png",
    price: "PKR 4,500",
    link: "/products/dxn-black-cumin-plus"
  },
  "dxn-cocozhi": {
    name: "DXN Cocozhi (Cocoa)",
    image: "/images/products/cocozhi.png",
    price: "PKR 4,200",
    link: "/products/dxn-cocozhi"
  }
};

export function getProductsBySlugs(slugString: string) {
  if (!slugString) return [];
  const slugs = slugString.split(';').map(s => s.trim());
  return slugs.map(slug => PRODUCT_DATABASE[slug]).filter(Boolean);
}