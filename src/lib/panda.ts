import "server-only";
import { allChapters, catalog } from "./catalog";
import { loadChapter } from "./content";

export type Snippet = { chapterId: string; grade: number; number: number; title: string; heading: string; text: string; score: number };

type Chunk = Omit<Snippet, "score"> & { haystack: string };

let index: Chunk[] | null = null;

const tokenize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[*_>#|`"'()[\]{}.,:;!?“”‘’–—-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);

async function buildIndex() {
  const chunks: Chunk[] = [];
  for (const subject of catalog.subjects) {
    for (const c of allChapters(subject.id)) {
      const ch = await loadChapter(subject.id, c.grade, c.number);
      if (!ch?.notes) continue;
      const sections = ch.notes.body.split(/\n(?=##\s)/);
      for (const sec of sections) {
        const heading = sec.match(/^##\s+(.*)/)?.[1]?.replace(/\*\*/g, "") ?? ch.title;
        if (heading.startsWith("🎯")) continue;
        const text = sec.trim().slice(0, 2400);
        chunks.push({ chapterId: ch.id, grade: ch.grade, number: ch.number, title: ch.title, heading, text, haystack: `${ch.title} ${heading} ${text}`.toLowerCase() });
      }
      const cards = ch.flashcards.map((f) => `- ${f.front} → ${f.back}`).join("\n");
      if (cards)
        chunks.push({ chapterId: ch.id, grade: ch.grade, number: ch.number, title: ch.title, heading: "மீட்டல் அட்டைகள்", text: cards.slice(0, 2400), haystack: `${ch.title} ${cards}`.toLowerCase() });
    }
  }
  return chunks;
}

/** Keyword retrieval over the notes the student is allowed to read. */
export async function retrieve(query: string, canRead: (chapterId: string) => boolean, limit = 5): Promise<Snippet[]> {
  index ??= await buildIndex();
  const terms = [...new Set(tokenize(query))];
  if (!terms.length) return [];
  const scored: Snippet[] = [];
  for (const c of index) {
    if (!canRead(c.chapterId)) continue;
    let score = 0;
    for (const t of terms) {
      if (!c.haystack.includes(t)) continue;
      // Rare-ish, longer terms count more; title/heading hits count double.
      const w = Math.min(4, t.length / 3);
      score += w;
      if (`${c.title} ${c.heading}`.toLowerCase().includes(t)) score += w;
    }
    if (score > 0) {
      const { haystack: _h, ...rest } = c;
      void _h;
      scored.push({ ...rest, score });
    }
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
