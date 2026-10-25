import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { chapterId } from "./catalog";

export type QuizOption = { key: string; text: string };
export type QuizQuestion = { prompt: string; options: QuizOption[]; answer: string; explanation: string; difficulty: string };
export type Flashcard = { front: string; back: string };
export type PastMcq = QuizQuestion & {
  year: number | null;
  yearLabel: string;
  reference: string;
  answerText: string;
  status: string;
  alsoRelevant: string;
  verification: string;
};
export type PastStructured = {
  heading: string;
  year: number | null;
  question: string;
  reference: string;
  marks: string;
  answer: string;
  explanation: string;
  guidance: string;
  status: string;
  verification: string;
  alsoRelevant: string;
};
export type ChapterContent = {
  id: string;
  subjectId: string;
  grade: number;
  number: number;
  title: string;
  notes: { title: string; body: string; objectives: string[]; headings: { depth: number; text: string }[]; minutes: number } | null;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  pastPapers: { mcq: PastMcq[]; structured: PastStructured[]; related: string; pattern: string; years: Record<string, number> };
};

const cache = new Map<string, ChapterContent>();

export async function loadChapter(subjectId: string, grade: number, number: number): Promise<ChapterContent | null> {
  const id = chapterId(subjectId, grade, number);
  if (!/^[a-z0-9-]+$/.test(id)) return null;
  const hit = cache.get(id);
  if (hit) return hit;
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "generated", "chapters", `${id}.json`), "utf8");
    const data = JSON.parse(raw) as ChapterContent;
    cache.set(id, data);
    return data;
  } catch {
    return null;
  }
}
