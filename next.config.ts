import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "uploads-ssl.webflow.com", 
      },
      {
        protocol: "https",
        hostname: "cdn.webflow.com",
      },
      // 👇 THIS IS THE MISSING ONE CAUSING YOUR ERROR
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },
};

export default nextConfig;