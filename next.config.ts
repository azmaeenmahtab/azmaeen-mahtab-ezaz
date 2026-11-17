import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Serve sharper images at common viewport widths
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384, 512],
    // Default quality bump (Next.js default is 75 which looks soft)
    qualities: [75, 85, 90, 95],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
