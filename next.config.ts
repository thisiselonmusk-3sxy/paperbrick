import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 390, 640, 768, 1024, 1280, 1440, 1920],
  },
  poweredByHeader: false,
};

export default nextConfig;
