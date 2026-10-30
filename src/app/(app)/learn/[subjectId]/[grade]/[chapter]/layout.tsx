import Link from "next/link";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { DoorTabs } from "@/components/DoorTabs";
import { chapterHref, getChapterSummary } from "@/lib/catalog";
import { resolveChapter, type ChapterParams } from "@/lib/chapter";

export async function generateMetadata({ params }: { params: ChapterParams }) {
  const { subjectId, grade, chapter } = await params;
  const c = getChapterSummary(subjectId, Number(grade), Number(chapter));
  return { title: c ? `G${c.grade} Ch ${c.number} · ${c.title}` : "Chapter" };
}

export default async function ChapterLayout({ params, children }: { params: ChapterParams; children: React.ReactNode }) {
  const { subject, summary: c, open, steps } = await resolveChapter(params);
  const grade = subject.grades.find((g) => g.grade === c.grade)!;
  const idx = grade.chapters.findIndex((x) => x.number === c.number);
  const prev = grade.chapters[idx - 1];
  const nextC = grade.chapters[idx + 1];
  const base = chapterHref(subject.id, c.grade, c.number);
  const doneCount = steps.filter(Boolean).length;

  return (
    <div lang={subject.lang}>
      <div className="flex items-center justify-between gap-3 text-sm">
        <Link href={`/subjects/${subject.id}?grade=${c.grade}`} className="flex items-center gap-1 text-muted hover:text-white font-semibold">
          <ChevronLeft size={16} /> {subject.name} · Grade {c.grade}
        </Link>
        <div className="flex gap-1">
          {prev && (
            <Link href={chapterHref(subject.id, c.grade, prev.number)} className="chip hover:!text-white" aria-label="Previous chapter">
              <ChevronLeft size={14} /> {prev.number}
            </Link>
          )}
          {nextC && (
            <Link href={chapterHref(subject.id, c.grade, nextC.number)} className="chip hover:!text-white" aria-label="Next chapter">
              {nextC.number} <ChevronRight size={14} />
            </Link>
          )}
        </div>
      </div>

      <header className="mt-4">
        <p className="eyebrow">
          Grade {c.grade} · Chapter {c.number} {c.free && <span className="text-green">· Free</span>}
          {!open && (
            <span className="text-gold">
              {" "}
              · <Lock size={11} className="inline -mt-0.5" /> Locked
            </span>
          )}
        </p>
        <h1 className="display text-2xl sm:text-[1.75rem] font-bold leading-snug mt-1">
          {c.title}
        </h1>
        <p className="text-sm text-muted mt-1">
          {doneCount}/4 steps done · {c.minutes} min read · {c.counts.quiz} quiz · {c.counts.mcq + c.counts.structured} past-paper questions
        </p>
      </header>

      <div className="mt-4 mb-6 border-b border-line">
        <DoorTabs base={base} steps={steps} />
      </div>
      {children}
    </div>
  );
}
