import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Lock } from "lucide-react";
import { AskTeacher } from "@/components/AskTeacher";
import { ChapterList } from "@/components/ChapterList";
import { ALComingSoon, FreeOffer } from "@/components/FreeOffer";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { catalog, getSubject, subjectTotals } from "@/lib/catalog";
import { LOGIN_ENABLED, MEDIUMS } from "@/lib/config";
import { starItems, subjectProgress } from "@/lib/progress";
import { canSeeSubject, completionSet, getViewer, hasSubjectAccess } from "@/lib/session";

export async function generateMetadata({ params }: { params: Promise<{ subjectId: string }> }) {
  const s = getSubject((await params).subjectId);
  return { title: s ? `${s.name} ${s.level} · ${s.medium} medium` : "Subject" };
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

  // The same subject in the other medium(s), for the Tamil / English switch.
  const versions = catalog.subjects.filter((s) => s.name === subject.name && s.level === subject.level);

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
      <div className="min-w-0" lang={subject.lang}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">
              {subject.level} · Grade 10 &amp; 11 · {subject.medium} medium
            </p>
            <h1 className="display text-3xl font-bold mt-1">
              {subject.name} {subject.nameLocal && <span className="text-muted text-xl font-semibold">{subject.nameLocal}</span>}
            </h1>
          </div>
          {versions.length > 1 && (
            <div className="flex rounded-xl border border-line p-1" aria-label="Medium">
              {versions.map((v) => {
                const code = MEDIUMS.find((m) => m.name === v.medium)?.code;
                const current = v.id === subject.id;
                const cls = `px-4 py-1.5 rounded-lg font-semibold text-sm ${current ? "bg-card-2 text-white" : "text-muted hover:text-white"}`;
                // Free launch: switching medium goes through /choose (remembers it), so use a plain link.
                return LOGIN_ENABLED || !code ? (
                  <Link key={v.id} href={`/subjects/${v.id}?grade=${grade}`} aria-current={current ? "page" : undefined} className={cls}>
                    {v.medium}
                  </Link>
                ) : (
                  <a key={v.id} href={`/choose?medium=${code}&grade=${grade}`} aria-current={current ? "page" : undefined} className={cls}>
                    {v.medium}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-5" role="tablist" aria-label="Grade">
          {grades.map((g) => (
            <Link
              key={g}
              href={`/subjects/${subject.id}?grade=${g}`}
              role="tab"
              aria-selected={g === grade}
              className={`text-center py-3 rounded-xl font-bold border ${g === grade ? "bg-electric border-electric text-white" : "border-line text-muted hover:text-white"}`}
            >
              Grade {g}
            </Link>
          ))}
        </div>

        <FreeOffer className="mt-4" />
        <ALComingSoon className="mt-2" />

        <p className="text-muted mt-4 mb-3 text-sm">
          {LOGIN_ENABLED ? `${gradeDone} of ${items.length} chapters done` : `${items.length} chapters · tap a chapter to start`}
        </p>
        <ChapterList items={items} showProgress={LOGIN_ENABLED} />
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24">
        <AskTeacher context={`${subject.name} (${subject.medium} medium), Grade ${grade}`} />
        {LOGIN_ENABLED && (
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
        )}
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
        {LOGIN_ENABLED && !viewer && (
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
