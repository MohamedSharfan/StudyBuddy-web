import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { AskTeacher } from "@/components/AskTeacher";
import { ExamVault } from "@/components/ExamVault";
import { getSubject } from "@/lib/catalog";
import { loadPaper } from "@/lib/extras";
import { canonicalUrl } from "@/lib/seo";
import { canSeeSubject, getViewer, hasSubjectAccess } from "@/lib/session";

type Params = Promise<{ subjectId: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { subjectId, slug } = await params;
  const s = getSubject(subjectId);
  const p = s?.extras?.papers.find((x) => x.slug === slug);
  if (!s || !p) return { title: "Past paper" };
  const title = `O/L ${s.name} ${p.yearLabel} Past Paper · ${p.title}`;
  const description = `Sri Lankan O/L ${s.name} ${p.yearLabel} past paper (${p.title}) with answers: ${p.mcq ? `${p.mcq} MCQs` : `${p.structured} questions`}, free on StudyBuddy.`;
  const url = canonicalUrl(`/subjects/${s.id}/papers/${slug}`);
  return { title, description, alternates: { canonical: url }, openGraph: { type: "article", siteName: "StudyBuddy", title, description, url, images: ["/logo.jpg"] } };
}

/** One past paper (a year and paper number) with MCQ practice and reveal-the-answer questions. */
export default async function YearPaperPage({ params }: { params: Params }) {
  const { subjectId, slug } = await params;
  const subject = getSubject(subjectId);
  const index = subject?.extras?.papers ?? [];
  const at = index.findIndex((p) => p.slug === slug);
  if (!subject || at < 0) notFound();
  const viewer = await getViewer();
  if (!canSeeSubject(viewer, subject)) redirect("/subjects");
  const open = hasSubjectAccess(viewer, subject.id);
  const paper = open ? await loadPaper(subject.id, slug) : null;
  if (open && !paper) notFound();
  const prev = index[at - 1];
  const next = index[at + 1];
  const back = `/subjects/${subject.id}#papers`;

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start" lang={subject.lang}>
      <div className="min-w-0 space-y-5">
        <div className="flex items-center justify-between gap-3 text-sm">
          <Link href={back} className="flex items-center gap-1 text-muted hover:text-white font-semibold">
            <ChevronLeft size={16} /> {subject.name} · Past papers
          </Link>
          <div className="flex gap-1">
            {prev && (
              <Link href={`/subjects/${subject.id}/papers/${prev.slug}`} className="chip hover:!text-white" aria-label="Previous paper">
                <ChevronLeft size={14} /> {prev.yearLabel}
              </Link>
            )}
            {next && (
              <Link href={`/subjects/${subject.id}/papers/${next.slug}`} className="chip hover:!text-white" aria-label="Next paper">
                {next.yearLabel} <ChevronRight size={14} />
              </Link>
            )}
          </div>
        </div>
        <header>
          <p className="eyebrow">O/L {subject.name} · {index[at].yearLabel}</p>
          <h1 className="display text-2xl sm:text-[1.75rem] font-bold leading-snug mt-1">{index[at].title}</h1>
          <p className="text-sm text-muted mt-1">{subject.pastPaperNote}</p>
        </header>
        {paper ? (
          <ExamVault mcq={paper.mcq} structured={paper.structured} itemId={`${subject.id}-paper-${slug}`} done={false} nextHref={back} pattern={null} />
        ) : (
          <div className="glass p-6 text-center">
            <p className="font-bold flex items-center justify-center gap-2">
              <Lock size={16} className="text-gold" /> Unlock {subject.name} to open the past papers
            </p>
            <Link href={viewer ? "/unlock" : "/login?next=/unlock"} className="btn btn-gold btn-sm mt-4">
              How to unlock
            </Link>
          </div>
        )}
      </div>
      <aside className="lg:sticky lg:top-24">
        <AskTeacher context={`${subject.name} (${subject.medium} medium), past paper ${index[at].title}`} />
      </aside>
    </div>
  );
}
