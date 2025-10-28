/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "example.com",
      "ticketagent.co.il",
      "media.api-sports.io",
      "res.cloudinary.com",
      "images.unsplash.com",
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable source maps in development to avoid DevTools errors
  productionBrowserSourceMaps: false,
};

export default nextConfig;
