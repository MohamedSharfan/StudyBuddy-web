import type { MetadataRoute } from "next";
import { catalog, hasPastPapers } from "@/lib/catalog";
import { MAP_SETS, mapSetsForChapter } from "@/lib/maps/sets";
import { canonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: canonicalUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: canonicalUrl("/subjects"), changeFrequency: "weekly", priority: 0.9 },
  ];

  for (const subject of catalog.subjects) {
    if (subject.maps) {
      entries.push({ url: canonicalUrl(`/subjects/${subject.id}/maps`), changeFrequency: "monthly", priority: 0.8 });
      for (const set of MAP_SETS)
        entries.push({ url: canonicalUrl(`/subjects/${subject.id}/maps/${set.id}`), changeFrequency: "yearly", priority: set.kind === "past" ? 0.7 : 0.6 });
    }
    for (const grade of subject.grades) {
      entries.push({
        url: canonicalUrl(`/subjects/${subject.id}?grade=${grade.grade}`),
        changeFrequency: "monthly",
        priority: 0.8,
      });
      for (const chapter of grade.chapters) {
        const suffixes = ["", "/notes", "/flashcards", "/quiz"];
        if (hasPastPapers(chapter)) suffixes.push("/past-papers");
        if (subject.maps && mapSetsForChapter(grade.grade, chapter.number).length) suffixes.push("/map");
        for (const suffix of suffixes) {
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
