import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@new_project"],
  outputFileTracingRoot: path.join(__dirname, "../../../"),
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
