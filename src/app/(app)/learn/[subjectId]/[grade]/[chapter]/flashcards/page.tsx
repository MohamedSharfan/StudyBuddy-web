import { FlashcardDeck } from "@/components/FlashcardDeck";
import { LockedPanel } from "@/components/LockedPanel";
import { chapterHref } from "@/lib/catalog";
import { resolveChapter, type ChapterParams } from "@/lib/chapter";
import { canonicalUrl, chapterSeo } from "@/lib/seo";

export async function generateMetadata({ params }: { params: ChapterParams }) {
  const { subjectId, grade, chapter } = await params;
  const seo = chapterSeo(subjectId, Number(grade), Number(chapter), "/flashcards");
  if (!seo) return { title: "O/L Islam Flashcards" };
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: canonicalUrl(seo.path), languages: seo.languages },
    openGraph: { type: "article", siteName: "StudyBuddy", title: seo.title, description: seo.description, url: canonicalUrl(seo.path), images: ["/logo.jpg"] },
  };
}

export default async function FlashcardsPage({ params }: { params: ChapterParams }) {
  const { subject, summary: c, viewer, open, content, steps } = await resolveChapter(params, true);
  if (!open || !content) return <LockedPanel chapter={c} viewer={viewer} />;
  if (!content.flashcards.length) return <p className="text-muted">Flashcards for this chapter are coming soon.</p>;
  return <FlashcardDeck cards={content.flashcards} itemId={c.id} done={steps[1]} nextHref={chapterHref(subject.id, c.grade, c.number, "quiz")} />;
}
