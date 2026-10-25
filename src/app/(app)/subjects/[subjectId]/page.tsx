import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Lock } from "lucide-react";
import { ChapterList } from "@/components/ChapterList";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { getSubject, subjectTotals } from "@/lib/catalog";
import { starItems, subjectProgress } from "@/lib/progress";
import { canSeeSubject, completionSet, getViewer, hasSubjectAccess } from "@/lib/session";

export async function generateMetadata({ params }: { params: Promise<{ subjectId: string }> }) {
  const s = getSubject((await params).subjectId);
  return { title: s ? `${s.name} ${s.level}` : "Subject" };
}

export default async function SubjectPage({ params, searchParams }: { params: Promise<{ subjectId: string }>; searchParams: Promise<{ grade?: string }> }) {
  const { subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject) notFound();
  const viewer = await getViewer();
  if (!canSeeSubject(viewer, subject)) redirect("/subjects");
  const done = completionSet(viewer);
  const access = hasSubjectAccess(viewer, subject.id);
  const grades = subject.grades.map((g) => g.grade);
  const requested = Number((await searchParams).grade);
  const grade = grades.includes(requested) ? requested : grades.includes(viewer?.profile?.grade ?? 0) ? viewer!.profile!.grade : grades[0];
  const items = starItems(subject, grade, done, access);
  const prog = subjectProgress(subject, done);
  const totals = subjectTotals(subject.id);
  const gradeDone = items.filter((i) => i.state === "done").length;

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
      <div className="min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">
              {subject.level} · {subject.medium} medium
            </p>
            <h1 className="display text-3xl font-bold mt-1">
              {subject.name}{" "}
              <span lang="ta" className="text-muted text-xl font-semibold">
                {subject.nameLocal}
              </span>
            </h1>
          </div>
          <div className="flex rounded-xl border border-line p-1" role="tablist" aria-label="Grade">
            {grades.map((g) => (
              <Link
                key={g}
                href={`/subjects/${subject.id}?grade=${g}`}
                role="tab"
                aria-selected={g === grade}
                className={`px-4 py-1.5 rounded-lg font-semibold text-sm ${g === grade ? "bg-electric text-white" : "text-muted hover:text-white"}`}
              >
                Grade {g}
              </Link>
            ))}
          </div>
        </div>
        <p className="text-muted mt-3 mb-4 text-sm">
          {gradeDone} of {items.length} chapters done
        </p>
        <ChapterList items={items} />
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24">
        <div className="glass p-5 flex items-center gap-4">
          <ProgressRing value={prog.percent} size={70}>
            <span className="font-bold">{prog.percent}%</span>
          </ProgressRing>
          <div>
            <p className="font-bold">Whole subject</p>
            <p className="text-sm text-muted">
              {prog.completedChapters}/{prog.chapterCount} chapters done
            </p>
          </div>
        </div>
        {!access && (
          <div className="glass p-5 !border-gold/40">
            <p className="font-bold flex items-center gap-2">
              <Lock size={16} className="text-gold" /> Free preview
            </p>
            <p className="text-sm text-muted mt-2">
              Chapter 1 of each grade is open. Unlock all {totals.chapters} chapters, {totals.quiz} quiz questions and every past paper.
            </p>
            <Link href={viewer ? "/unlock" : "/login?next=/unlock"} className="btn btn-gold btn-sm w-full mt-4">
              How to unlock
            </Link>
          </div>
        )}
        <div className="glass p-5 text-sm space-y-2">
          <p className="font-bold mb-1">In this subject</p>
          {[
            ["Chapters", totals.chapters],
            ["Flashcards", totals.flashcards],
            ["Quiz questions", totals.quiz],
            ["Past-paper MCQs", totals.mcq],
            ["Structured questions", totals.structured],
          ].map(([l, n]) => (
            <div key={l} className="flex justify-between">
              <span className="text-muted">{l}</span>
              <b>{n}</b>
            </div>
          ))}
        </div>
        {!viewer && (
          <div className="glass p-5 text-sm">
            <p className="font-bold">Save your progress</p>
            <p className="text-muted mt-1 mb-3">Sign in to track the chapters you finish.</p>
            <Link href={`/login?next=/subjects/${subject.id}`} className="btn btn-sm w-full">
              Sign in
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
