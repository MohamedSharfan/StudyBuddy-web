import "server-only";
import fs from "node:fs/promises";
import path from "node:path";

/** A textbook picture with the facts to remember about it. */
export type TextbookPicture = {
  id: string;
  type: string;
  /** "Fig 1.1" / "உரு 1.1" (may be empty) */
  fig: string;
  title: string;
  section: string;
  notes: string[];
  src: string;
  w: number;
  h: number;
};

/** A past-paper picture question: Part II, Q1 (b)(ii) "picture A" or (iii) "picture B". */
export type PaperPicture = {
  year: number;
  part: "ii" | "iii";
  label: "A" | "B";
  grade: number;
  /** null: old-syllabus question outside the current textbooks */
  chapter: number | null;
  intro: string;
  questions: string[];
  /** One answer per question; empty when the answer is only available as text (answerText). */
  answers: string[];
  answerText: string;
  marks: number;
  src: string;
  w: number;
  h: number;
};

export type PictureBook = {
  textbook: Record<string, { number: number; title: string; pictures: TextbookPicture[] }[]>;
  papers: PaperPicture[];
};

const cache = new Map<string, PictureBook>();

/** History picture study, built by scripts/build-content.mjs. */
export async function loadPictureBook(subjectId: string): Promise<PictureBook> {
  const empty: PictureBook = { textbook: {}, papers: [] };
  if (!/^[a-z0-9-]+$/.test(subjectId)) return empty;
  const hit = cache.get(subjectId);
  if (hit) return hit;
  try {
    const data = JSON.parse(await fs.readFile(path.join(process.cwd(), "generated", "pictures", `${subjectId}.json`), "utf8")) as PictureBook;
    cache.set(subjectId, data);
    return data;
  } catch {
    return empty;
  }
}

export function chapterPictures(book: PictureBook, grade: number, chapter: number) {
  return {
    pictures: book.textbook[grade]?.find((c) => c.number === chapter)?.pictures ?? [],
    papers: book.papers.filter((p) => p.grade === grade && p.chapter === chapter),
  };
}
