import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/inbites', // Replace with your actual repository name
  assetPrefix: '/inbites', // Replace with your actual repository name
};

export default nextConfig;
