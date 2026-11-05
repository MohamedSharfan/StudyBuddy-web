import { LockedPanel } from "@/components/LockedPanel";
import { Markdown, slugify } from "@/components/Markdown";
import { NoteReader } from "@/components/NoteReader";
import { chapterHref } from "@/lib/catalog";
import { resolveChapter, type ChapterParams } from "@/lib/chapter";
import { canonicalUrl, chapterSeo } from "@/lib/seo";

export async function generateMetadata({ params }: { params: ChapterParams }) {
  const { subjectId, grade, chapter } = await params;
  const seo = chapterSeo(subjectId, Number(grade), Number(chapter), "/notes");
  if (!seo) return { title: "O/L Islam Notes" };
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: canonicalUrl(seo.path), languages: seo.languages },
    openGraph: { type: "article", siteName: "StudyBuddy", title: seo.title, description: seo.description, url: canonicalUrl(seo.path), images: ["/logo.jpg"] },
  };
}

export default async function NotesPage({ params }: { params: ChapterParams }) {
  const { subject, summary: c, viewer, open, content, steps } = await resolveChapter(params, true);
  if (!open || !content) return <LockedPanel chapter={c} viewer={viewer} />;
  const notes = content.notes;
  if (!notes) return <p className="text-muted">Notes for this chapter are coming soon.</p>;

  // The "what you'll learn" list is already on the overview page.
  const body = notes.body.replace(/^##\s*🎯[\s\S]*?(?=\n---|\n## )/m, "").replace(/^\s*---\s*/, "");
  const headings = notes.headings.filter((h) => !h.text.startsWith("🎯")).map((h) => ({ ...h, id: slugify(h.text) }));

  return (
    <NoteReader itemId={c.id} headings={headings} done={steps[0]} nextHref={chapterHref(subject.id, c.grade, c.number, "flashcards")}>
      <Markdown>{body}</Markdown>
    </NoteReader>
  );
}
