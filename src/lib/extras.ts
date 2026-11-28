import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import type { PastMcq, PastStructured } from "./content";

export type YearPaper = { slug: string; title: string; yearLabel: string; year: number | null; mcq: PastMcq[]; structured: PastStructured[] };
export type Guide = { slug: string; title: string; intro: string; sections: { slug: string; title: string; body: string }[] };
type Extras = { papers: YearPaper[]; guides: Guide[] };

const cache = new Map<string, Extras>();

/** Year-by-year past papers and reading guides of a subject (Tamil, Maths), written by scripts/build-content.mjs. */
async function loadExtras(subjectId: string): Promise<Extras> {
  if (!/^[a-z0-9-]+$/.test(subjectId)) return { papers: [], guides: [] };
  const hit = cache.get(subjectId);
  if (hit) return hit;
  try {
    const data = JSON.parse(await fs.readFile(path.join(process.cwd(), "generated", "extras", `${subjectId}.json`), "utf8")) as Extras;
    cache.set(subjectId, data);
    return data;
  } catch {
    return { papers: [], guides: [] };
  }
}

export async function loadPaper(subjectId: string, slug: string) {
  return (await loadExtras(subjectId)).papers.find((p) => p.slug === slug) ?? null;
}

export async function loadGuide(subjectId: string, slug: string) {
  return (await loadExtras(subjectId)).guides.find((g) => g.slug === slug) ?? null;
}
