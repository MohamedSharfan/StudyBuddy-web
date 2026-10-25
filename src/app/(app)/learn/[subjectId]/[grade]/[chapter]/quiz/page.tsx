import { LockedPanel } from "@/components/LockedPanel";
import { QuizRunner } from "@/components/QuizRunner";
import { chapterHref } from "@/lib/catalog";
import { resolveChapter, type ChapterParams } from "@/lib/chapter";

const DIFFICULTY: Record<string, string> = { Easy: "🟢 Easy", Medium: "🟡 Medium", Hard: "🔴 Hard" };

export default async function QuizPage({ params }: { params: ChapterParams }) {
  const { subject, summary: c, viewer, open, content, steps } = await resolveChapter(params, true);
  if (!open || !content) return <LockedPanel chapter={c} viewer={viewer} />;
  return (
    <QuizRunner
      kind="quiz"
      itemId={c.id}
      done={steps[2]}
      nextHref={chapterHref(subject.id, c.grade, c.number, "past-papers")}
      nextLabel="Next door: Exam vault"
      questions={content.quiz.map((q) => ({ ...q, meta: [DIFFICULTY[q.difficulty] ?? q.difficulty] }))}
    />
  );
}
