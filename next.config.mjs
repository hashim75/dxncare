/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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