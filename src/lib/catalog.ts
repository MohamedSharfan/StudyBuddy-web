import catalogJson from "@/generated/catalog.json";

export type ChapterSummary = {
  id: string;
  grade: number;
  number: number;
  title: string;
  objectives: string[];
  minutes: number;
  counts: { flashcards: number; quiz: number; mcq: number; structured: number };
  years: Record<string, number>;
  free: boolean;
};

export type GradeSummary = { grade: number; chapters: ChapterSummary[] };

export type SubjectSummary = {
  id: string;
  name: string;
  nameLocal: string;
  level: string;
  medium: string;
  tagline: string;
  color: string;
  freeChapters: number;
  grades: GradeSummary[];
};

export const catalog = catalogJson as unknown as { generatedAt: string; subjects: SubjectSummary[] };

/** Subjects shown as "coming soon" on the home page and landing. */
export const upcomingSubjects = [
  { name: "Science", icon: "atom" },
  { name: "Mathematics", icon: "sigma" },
  { name: "History", icon: "landmark" },
  { name: "Tamil", icon: "languages" },
  { name: "English", icon: "book-a" },
];

export function getSubject(id: string) {
  return catalog.subjects.find((s) => s.id === id) ?? null;
}

export function getChapterSummary(subjectId: string, grade: number, number: number) {
  return getSubject(subjectId)?.grades.find((g) => g.grade === grade)?.chapters.find((c) => c.number === number) ?? null;
}

export function chapterId(subjectId: string, grade: number, number: number) {
  return `${subjectId}-${grade}-${String(number).padStart(2, "0")}`;
}

export function parseChapterId(id: string) {
  const m = id.match(/^(.+)-(\d{2})-(\d{2})$/);
  if (!m) return null;
  return { subjectId: m[1], grade: Number(m[2]), number: Number(m[3]) };
}

export function chapterHref(subjectId: string, grade: number, number: number, tab?: string) {
  const base = `/learn/${subjectId}/${grade}/${number}`;
  return tab ? `${base}/${tab}` : base;
}

export function allChapters(subjectId: string) {
  return getSubject(subjectId)?.grades.flatMap((g) => g.chapters) ?? [];
}

export function subjectTotals(subjectId: string) {
  const chapters = allChapters(subjectId);
  return chapters.reduce(
    (acc, c) => ({
      chapters: acc.chapters + 1,
      quiz: acc.quiz + c.counts.quiz,
      flashcards: acc.flashcards + c.counts.flashcards,
      mcq: acc.mcq + c.counts.mcq,
      structured: acc.structured + c.counts.structured,
    }),
    { chapters: 0, quiz: 0, flashcards: 0, mcq: 0, structured: 0 },
  );
}
