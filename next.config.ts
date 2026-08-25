import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.pokemontcg.io' },
      { protocol: 'https', hostname: 'en.onepiece-cardgame.com' },
      { protocol: 'https', hostname: 'sixfortyfive.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};
export default nextConfig;
