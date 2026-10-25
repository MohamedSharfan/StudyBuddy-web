import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Chapter JSON is read from disk at request time (so locked content never ships to the browser).
  outputFileTracingIncludes: {
    "/**": ["./generated/chapters/**/*.json", "./content/**/Questions_To_Verify.md"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
