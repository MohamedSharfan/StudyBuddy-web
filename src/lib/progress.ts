import { chapterHref, type ChapterSummary, type SubjectSummary } from "./catalog";
import type { StarItem, StarState } from "@/components/Constellation";

export const STEP_KINDS = ["lesson", "flashcards", "quiz", "pastpaper"] as const;
export const STEP_LABELS = ["Read", "Recall", "Quiz", "Exam"] as const;

export function chapterSteps(chapter: ChapterSummary, done: Set<string>) {
  return STEP_KINDS.map((k) => done.has(`${chapter.id}:${k}`) || (k === "pastpaper" && chapter.counts.mcq === 0 && done.has(`${chapter.id}:quiz`)));
}

export function isChapterOpen(chapter: ChapterSummary, hasAccess: boolean) {
  return chapter.free || hasAccess;
}

export function subjectProgress(subject: SubjectSummary, done: Set<string>) {
  const chapters = subject.grades.flatMap((g) => g.chapters);
  const total = chapters.length * STEP_KINDS.length;
  const finished = chapters.reduce((n, c) => n + chapterSteps(c, done).filter(Boolean).length, 0);
  const completedChapters = chapters.filter((c) => chapterSteps(c, done).every(Boolean)).length;
  return { percent: total ? Math.round((finished / total) * 100) : 0, finished, total, completedChapters, chapterCount: chapters.length };
}

/** First open chapter that isn't fully complete. */
export function nextChapter(subject: SubjectSummary, done: Set<string>, hasAccess: boolean, preferGrade?: number) {
  const grades = [...subject.grades].sort((a, b) => (a.grade === preferGrade ? -1 : b.grade === preferGrade ? 1 : a.grade - b.grade));
  for (const g of grades)
    for (const c of g.chapters) if (isChapterOpen(c, hasAccess) && !chapterSteps(c, done).every(Boolean)) return c;
  return null;
}

export function starItems(subject: SubjectSummary, grade: number, done: Set<string>, hasAccess: boolean): StarItem[] {
  const chapters = subject.grades.find((g) => g.grade === grade)?.chapters ?? [];
  let nextMarked = false;
  return chapters.map((c) => {
    const steps = chapterSteps(c, done);
    const open = isChapterOpen(c, hasAccess);
    const state: StarState = !open ? "locked" : steps.every(Boolean) ? "done" : steps.some(Boolean) ? "progress" : "open";
    const next = open && state !== "done" && !nextMarked;
    if (next) nextMarked = true;
    return { chapter: c, href: chapterHref(subject.id, c.grade, c.number), state, steps, next };
  });
}
