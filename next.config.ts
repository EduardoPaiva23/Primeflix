import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixa a raiz neste projeto (há outro lockfile numa pasta-pai).
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
