import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/auth/", "/login", "/onboarding", "/profile", "/home", "/leaderboard", "/rewards", "/unlock", "/panda", "/choose"],
    },
    sitemap: canonicalUrl("/sitemap.xml"),
    host: "https://studybuddy.com.lk",
  };
}
