import type { MetadataRoute } from "next";
import { catalog } from "@/lib/catalog";
import { canonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: canonicalUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: canonicalUrl("/subjects"), changeFrequency: "weekly", priority: 0.9 },
  ];

  for (const subject of catalog.subjects) {
    for (const grade of subject.grades) {
      entries.push({
        url: canonicalUrl(`/subjects/${subject.id}?grade=${grade.grade}`),
        changeFrequency: "monthly",
        priority: 0.8,
      });
      for (const chapter of grade.chapters) {
        for (const suffix of ["", "/notes", "/flashcards", "/quiz", "/past-papers"]) {
          entries.push({
            url: canonicalUrl(`/learn/${subject.id}/${grade.grade}/${chapter.number}${suffix}`),
            changeFrequency: "monthly",
            priority: suffix === "/past-papers" ? 0.8 : 0.7,
          });
        }
      }
    }
  }

  return entries;
}
