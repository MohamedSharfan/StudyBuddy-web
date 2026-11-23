import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { PictureStudy, type StudyPicture } from "@/components/PictureStudy";
import { getSubject } from "@/lib/catalog";
import { loadPictureBook } from "@/lib/pictures";
import { isChapterOpen } from "@/lib/progress";
import { canonicalUrl } from "@/lib/seo";
import { canSeeSubject, getViewer, hasSubjectAccess } from "@/lib/session";

type Params = Promise<{ subjectId: string; grade: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { subjectId, grade } = await params;
  const s = getSubject(subjectId);
  if (!s?.pictures?.textbook[grade]) return { title: "Textbook pictures" };
  const title = `O/L ${s.name} Grade ${grade} Textbook Pictures · ${s.medium} Medium`;
  const description = `Learn and test yourself on all ${s.pictures.textbook[grade]} pictures of the O/L ${s.name} Grade ${grade} textbook, with the facts to remember for the picture question.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/subjects/${s.id}/pictures/grade/${grade}`) },
    openGraph: { type: "website", siteName: "StudyBuddy", title, description, url: canonicalUrl(`/subjects/${s.id}/pictures/grade/${grade}`), images: ["/logo.jpg"] },
  };
}

export default async function GradePicturesPage({ params }: { params: Params }) {
  const { subjectId, grade: rawGrade } = await params;
  const subject = getSubject(subjectId);
  const grade = Number(rawGrade);
  if (!subject?.pictures?.textbook[grade]) notFound();
  const viewer = await getViewer();
  if (!canSeeSubject(viewer, subject)) redirect("/subjects");
  const access = hasSubjectAccess(viewer, subject.id);
  const en = subject.lang === "en";
  const book = await loadPictureBook(subject.id);
  const summaries = subject.grades.find((g) => g.grade === grade)?.chapters ?? [];
  // only chapters the student can open (all of them in the free launch)
  const pictures: StudyPicture[] = (book.textbook[grade] ?? [])
    .filter((c) => {
      const s = summaries.find((x) => x.number === c.number);
      return s && isChapterOpen(s, access);
    })
    .flatMap((c) =>
      c.pictures.map((p) => ({ ...p, chapterLabel: en ? `Chapter ${c.number} · ${c.title}` : `அலகு ${c.number} · ${c.title}` })),
    );

  return (
    <div className="max-w-[900px] space-y-5" lang={subject.lang}>
      <Link href={`/subjects/${subject.id}/pictures?grade=${grade}`} className="flex items-center gap-1 text-sm text-muted hover:text-white font-semibold">
        <ChevronLeft size={16} /> {en ? "All picture questions" : "எல்லாப் பட வினாக்களும்"}
      </Link>
      <header>
        <p className="eyebrow">O/L {subject.name} · {en ? `Grade ${grade}` : `தரம் ${grade}`}</p>
        <h1 className="display text-2xl sm:text-3xl font-bold mt-1">{en ? `Grade ${grade} textbook pictures` : `தரம் ${grade} பாடநூல் படங்கள்`}</h1>
        <p className="text-sm text-muted mt-1">
          {en ? `${pictures.length} pictures. Learn them chapter by chapter, then test yourself on all of them.` : `${pictures.length} படங்கள். அலகு வாரியாகக் கற்று, பின் அனைத்திலும் உங்களைப் பரீட்சித்துப் பாருங்கள்.`}
        </p>
      </header>
      <PictureStudy pictures={pictures} lang={subject.lang} startWith="test" />
    </div>
  );
}
