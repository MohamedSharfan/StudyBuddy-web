import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock, Sparkles } from "lucide-react";
import { Constellation } from "@/components/Constellation";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { getSubject, subjectTotals } from "@/lib/catalog";
import { starItems, subjectProgress } from "@/lib/progress";
import { completionSet, getViewer, hasSubjectAccess } from "@/lib/session";

export async function generateMetadata({ params }: { params: Promise<{ subjectId: string }> }) {
  const s = getSubject((await params).subjectId);
  return { title: s ? `${s.name} ${s.level}` : "Subject" };
}

export default async function SubjectPage({ params, searchParams }: { params: Promise<{ subjectId: string }>; searchParams: Promise<{ grade?: string }> }) {
  const { subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject) notFound();
  const viewer = await getViewer();
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
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">
              {subject.level} · {subject.medium} medium
            </p>
            <h1 className="display text-4xl font-bold mt-1">
              {subject.name} <span lang="ta" className="text-muted text-2xl">{subject.nameLocal}</span>
            </h1>
          </div>
          <div className="glass !rounded-full p-1 flex" role="tablist" aria-label="Grade">
            {grades.map((g) => (
              <Link
                key={g}
                href={`/subjects/${subject.id}?grade=${g}`}
                role="tab"
                aria-selected={g === grade}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${g === grade ? "bg-electric text-white shadow-[0_6px_20px_-6px_rgba(124,58,237,.9)]" : "text-muted hover:text-white"}`}
              >
                Grade {g} sky
              </Link>
            ))}
          </div>
        </div>
        <p className="text-muted mt-3 text-sm">
          {gradeDone} of {items.length} stars glowing · tap a star to open its chapter
        </p>
        <div className="mt-6">
          <Constellation items={items} />
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24">
        <div className="glass p-5 flex items-center gap-4">
          <ProgressRing value={prog.percent} size={78}>
            <span className="display font-bold">{prog.percent}%</span>
          </ProgressRing>
          <div>
            <p className="font-extrabold">Whole subject</p>
            <p className="text-sm text-muted">
              {prog.completedChapters}/{prog.chapterCount} chapters conquered
            </p>
          </div>
        </div>
        {!access && (
          <div className="glass p-5 bg-gradient-to-br from-gold/15 to-transparent border-gold/30">
            <p className="font-extrabold flex items-center gap-2">
              <Lock size={16} className="text-gold" /> Free preview
            </p>
            <p className="text-sm text-muted mt-2">
              Chapter 1 of each grade is open. Unlock all {totals.chapters} chapters, {totals.quiz} quiz questions and every past paper.
            </p>
            <Link href={viewer ? "/unlock" : "/login?next=/unlock"} className="btn btn-gold btn-sm w-full mt-4">
              <Sparkles size={15} /> How to unlock
            </Link>
          </div>
        )}
        <div className="glass p-5 text-sm space-y-2">
          <p className="font-extrabold mb-1">Inside this subject</p>
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
            <p className="font-extrabold">Track your sky</p>
            <p className="text-muted mt-1 mb-3">Sign in so your stars light up as you study.</p>
            <Link href={`/login?next=/subjects/${subject.id}`} className="btn btn-sm w-full">
              Sign in
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
