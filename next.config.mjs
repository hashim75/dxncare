/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // 🔥 This line disables Vercel's optimization and fixes your issue
    // Allows images from any HTTPS source (useful for product images)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;