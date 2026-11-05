import { LockedPanel } from "@/components/LockedPanel";
import { QuizRunner } from "@/components/QuizRunner";
import { chapterHref } from "@/lib/catalog";
import { resolveChapter, type ChapterParams } from "@/lib/chapter";
import { canonicalUrl, chapterSeo } from "@/lib/seo";

const DIFFICULTY: Record<string, string> = { Easy: "Easy", Medium: "Medium", Hard: "Hard" };

export async function generateMetadata({ params }: { params: ChapterParams }) {
  const { subjectId, grade, chapter } = await params;
  const seo = chapterSeo(subjectId, Number(grade), Number(chapter), "/quiz");
  if (!seo) return { title: "O/L Islam Quiz" };
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: canonicalUrl(seo.path), languages: seo.languages },
    openGraph: { type: "article", siteName: "StudyBuddy", title: seo.title, description: seo.description, url: canonicalUrl(seo.path), images: ["/logo.jpg"] },
  };
}

export default async function QuizPage({ params }: { params: ChapterParams }) {
  const { subject, summary: c, viewer, open, content, steps } = await resolveChapter(params, true);
  if (!open || !content) return <LockedPanel chapter={c} viewer={viewer} />;
  return (
    <QuizRunner
      kind="quiz"
      itemId={c.id}
      done={steps[2]}
      nextHref={chapterHref(subject.id, c.grade, c.number, "past-papers")}
      nextLabel="Next: Past papers"
      questions={content.quiz.map((q) => ({ ...q, meta: [DIFFICULTY[q.difficulty] ?? q.difficulty] }))}
    />
  );
}
