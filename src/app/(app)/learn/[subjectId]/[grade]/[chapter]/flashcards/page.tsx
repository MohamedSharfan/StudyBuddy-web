import { FlashcardDeck } from "@/components/FlashcardDeck";
import { LockedPanel } from "@/components/LockedPanel";
import { chapterHref } from "@/lib/catalog";
import { resolveChapter, type ChapterParams } from "@/lib/chapter";

export default async function FlashcardsPage({ params }: { params: ChapterParams }) {
  const { subject, summary: c, viewer, open, content, steps } = await resolveChapter(params, true);
  if (!open || !content) return <LockedPanel chapter={c} viewer={viewer} />;
  if (!content.flashcards.length) return <p className="text-muted">Flashcards for this chapter are coming soon.</p>;
  return <FlashcardDeck cards={content.flashcards} itemId={c.id} done={steps[1]} nextHref={chapterHref(subject.id, c.grade, c.number, "quiz")} />;
}
