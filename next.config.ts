import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the site deploys to GitHub Pages.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  experimental: { agentUpgrade: "security" },
};

export default nextConfig;
