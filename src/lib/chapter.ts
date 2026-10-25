import "server-only";
import { notFound, redirect } from "next/navigation";
import { getChapterSummary, getSubject } from "./catalog";
import { loadChapter } from "./content";
import { chapterSteps, isChapterOpen } from "./progress";
import { canSeeSubject, completionSet, getViewer, hasSubjectAccess } from "./session";

export type ChapterParams = Promise<{ subjectId: string; grade: string; chapter: string }>;

/** Resolves a chapter route and decides access. Content is only loaded when the chapter is open. */
export async function resolveChapter(params: ChapterParams, withContent = false) {
  const { subjectId, grade, chapter } = await params;
  const subject = getSubject(subjectId);
  const summary = getChapterSummary(subjectId, Number(grade), Number(chapter));
  if (!subject || !summary) notFound();
  const viewer = await getViewer();
  if (!canSeeSubject(viewer, subject)) redirect("/subjects");
  const access = hasSubjectAccess(viewer, subject.id);
  const open = isChapterOpen(summary, access);
  const done = completionSet(viewer);
  const steps = chapterSteps(summary, done);
  const content = open && withContent ? await loadChapter(subject.id, summary.grade, summary.number) : null;
  if (open && withContent && !content) notFound();
  return { subject, summary, viewer, access, open, done, steps, content };
}
