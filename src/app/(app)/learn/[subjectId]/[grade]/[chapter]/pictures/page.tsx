import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { LockedPanel } from "@/components/LockedPanel";
import { PaperPictureCard } from "@/components/PaperPictureCard";
import { PictureStudy } from "@/components/PictureStudy";
import { chapterHref } from "@/lib/catalog";
import { resolveChapter, type ChapterParams } from "@/lib/chapter";
import { chapterPictures, loadPictureBook } from "@/lib/pictures";
import { canonicalUrl, chapterSeo } from "@/lib/seo";

export async function generateMetadata({ params }: { params: ChapterParams }) {
  const { subjectId, grade, chapter } = await params;
  const seo = chapterSeo(subjectId, Number(grade), Number(chapter), "/pictures");
  if (!seo) return { title: "O/L Picture Questions" };
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: canonicalUrl(seo.path), languages: seo.languages },
    openGraph: { type: "article", siteName: "StudyBuddy", title: seo.title, description: seo.description, url: canonicalUrl(seo.path), images: ["/logo.jpg"] },
  };
}

export default async function ChapterPicturesPage({ params }: { params: ChapterParams }) {
  const { subject, summary: c, viewer, open } = await resolveChapter(params);
  if (!subject.pictures) redirect(chapterHref(subject.id, c.grade, c.number));
  if (!open) return <LockedPanel chapter={c} viewer={viewer} />;
  const en = subject.lang === "en";
  const { pictures, papers } = chapterPictures(await loadPictureBook(subject.id), c.grade, c.number);
  if (!pictures.length && !papers.length) redirect(`/subjects/${subject.id}/pictures?grade=${c.grade}`);

  return (
    <div className="space-y-8">
      {pictures.length > 0 && (
        <section>
          <h2 className="font-bold text-lg">{en ? `Textbook pictures · ${pictures.length}` : `பாடநூல் படங்கள் · ${pictures.length}`}</h2>
          <p className="text-sm text-muted mt-1 mb-4">
            {en
              ? "Tap a picture to see what it shows and the facts to remember. Then test yourself: can you name each picture?"
              : "படத்தைத் தொட்டு, அது காட்டுவதையும் நினைவில் கொள்ள வேண்டிய தகவல்களையும் பாருங்கள். பின் ஒவ்வொரு படத்தையும் அடையாளம் காண முடிகிறதா எனப் பரீட்சித்துப் பாருங்கள்."}
          </p>
          <PictureStudy pictures={pictures} lang={subject.lang} />
        </section>
      )}

      {papers.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="font-bold text-lg">{en ? "Asked in past papers" : "கடந்தகால வினாத்தாள்களில் கேட்கப்பட்டவை"}</h2>
            <p className="text-sm text-muted mt-1">
              {en ? "Part II, Question 1 (b) — four questions on each picture, 1 mark each." : "பகுதி II, வினா 1 (ஆ) – ஒவ்வொரு படத்துக்கும் நான்கு வினாக்கள், தலா 1 புள்ளி."}
            </p>
          </div>
          {papers.map((q) => (
            <PaperPictureCard key={`${q.year}-${q.part}`} q={q} lang={subject.lang} />
          ))}
        </section>
      )}

      <Link href={`/subjects/${subject.id}/pictures?grade=${c.grade}`} className="glass glass-hover flex items-center justify-between gap-3 p-4 text-sm">
        <span>
          <span className="block font-bold">{en ? "All picture questions 2016–2025" : "எல்லாப் பட வினாக்களும் 2016–2025"}</span>
          <span className="block text-muted">{en ? "Every year's pictures A and B, and every textbook picture." : "ஒவ்வோர் ஆண்டின் A, B படங்களும் எல்லாப் பாடநூல் படங்களும்."}</span>
        </span>
        <ChevronRight size={18} className="text-muted flex-none" />
      </Link>
    </div>
  );
}
