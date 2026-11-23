import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AskTeacher } from "@/components/AskTeacher";
import { PaperPictureCard } from "@/components/PaperPictureCard";
import { chapterHref, getSubject } from "@/lib/catalog";
import { loadPictureBook } from "@/lib/pictures";
import { canonicalUrl } from "@/lib/seo";
import { canSeeSubject, getViewer } from "@/lib/session";

type Params = Promise<{ subjectId: string; year: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { subjectId, year } = await params;
  const s = getSubject(subjectId);
  if (!s?.pictures?.years.includes(Number(year))) return { title: "Picture questions" };
  const title = `O/L ${s.name} ${year} Picture Questions (Q1 b) · ${s.medium} Medium`;
  const description = `The ${year} O/L ${s.name} picture questions A and B (Part II, Q1 (b)) with answers, in the ${s.medium} medium.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/subjects/${s.id}/pictures/past/${year}`) },
    openGraph: { type: "article", siteName: "StudyBuddy", title, description, url: canonicalUrl(`/subjects/${s.id}/pictures/past/${year}`), images: ["/logo.jpg"] },
  };
}

export default async function PastPicturesPage({ params }: { params: Params }) {
  const { subjectId, year: rawYear } = await params;
  const subject = getSubject(subjectId);
  const year = Number(rawYear);
  if (!subject?.pictures?.years.includes(year)) notFound();
  const viewer = await getViewer();
  if (!canSeeSubject(viewer, subject)) redirect("/subjects");
  const en = subject.lang === "en";
  const book = await loadPictureBook(subject.id);
  const questions = book.papers.filter((p) => p.year === year);
  const years = subject.pictures.years;
  const prev = years[years.indexOf(year) - 1];
  const next = years[years.indexOf(year) + 1];

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start" lang={subject.lang}>
      <div className="min-w-0 space-y-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <Link href={`/subjects/${subject.id}/pictures`} className="flex items-center gap-1 text-muted hover:text-white font-semibold">
            <ChevronLeft size={16} /> {en ? "All picture questions" : "எல்லாப் பட வினாக்களும்"}
          </Link>
          <div className="flex gap-1">
            {prev && (
              <Link href={`/subjects/${subject.id}/pictures/past/${prev}`} className="chip hover:!text-white">
                <ChevronLeft size={14} /> {prev}
              </Link>
            )}
            {next && (
              <Link href={`/subjects/${subject.id}/pictures/past/${next}`} className="chip hover:!text-white">
                {next} <ChevronRight size={14} />
              </Link>
            )}
          </div>
        </div>
        <header>
          <p className="eyebrow">O/L {subject.name} · {en ? "Part II, Question 1 (b)" : "பகுதி II, வினா 1 (ஆ)"}</p>
          <h1 className="display text-2xl sm:text-3xl font-bold mt-1">
            {en ? `${year} picture questions` : `${year} பட வினாக்கள்`}
          </h1>
          <p className="text-sm text-muted mt-1">
            {en ? "Answer each question in your head, then show the answer and tick whether you got it." : "ஒவ்வொரு வினாவுக்கும் மனதில் விடை சொல்லிவிட்டு, விடையைப் பார்த்துச் சரியா எனக் குறியுங்கள்."}
          </p>
        </header>
        {questions.map((q) => (
          <PaperPictureCard key={q.part} q={q} lang={subject.lang} chapterHref={q.chapter ? chapterHref(subject.id, q.grade, q.chapter, "pictures") : null} />
        ))}
        {next && (
          <Link href={`/subjects/${subject.id}/pictures/past/${next}`} className="btn btn-gold w-full">
            {en ? `Next: ${next} paper` : `அடுத்து: ${next}`} <ChevronRight size={16} />
          </Link>
        )}
      </div>
      <aside className="space-y-4 lg:sticky lg:top-24">
        <AskTeacher context={`${subject.name} (${subject.medium} medium), ${year} picture questions`} />
      </aside>
    </div>
  );
}
