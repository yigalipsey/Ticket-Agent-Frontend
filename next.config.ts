/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "example.com", "media.api-sports.io"],
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
