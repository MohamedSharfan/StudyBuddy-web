import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight, Globe, MapPinned } from "lucide-react";
import { LockedPanel } from "@/components/LockedPanel";
import { MapPractice } from "@/components/MapPractice";
import { chapterHref } from "@/lib/catalog";
import { resolveChapter, type ChapterParams } from "@/lib/chapter";
import { prepareMap } from "@/lib/maps/prepare";
import { mapSetsForChapter } from "@/lib/maps/sets";
import { canonicalUrl, chapterSeo } from "@/lib/seo";

export async function generateMetadata({ params }: { params: ChapterParams }) {
  const { subjectId, grade, chapter } = await params;
  const seo = chapterSeo(subjectId, Number(grade), Number(chapter), "/map");
  if (!seo) return { title: "O/L Map Practice" };
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: canonicalUrl(seo.path), languages: seo.languages },
    openGraph: { type: "article", siteName: "StudyBuddy", title: seo.title, description: seo.description, url: canonicalUrl(seo.path), images: ["/logo.jpg"] },
  };
}

export default async function ChapterMapPage({ params, searchParams }: { params: ChapterParams; searchParams: Promise<{ set?: string }> }) {
  const { subject, summary: c, viewer, open } = await resolveChapter(params);
  const sets = subject.maps ? mapSetsForChapter(c.grade, c.number) : [];
  // Notes link here from every textbook map; chapters without a practice map go to the full list.
  if (!sets.length) redirect(subject.maps ? `/subjects/${subject.id}/maps?grade=${c.grade}` : chapterHref(subject.id, c.grade, c.number));
  if (!open) return <LockedPanel chapter={c} viewer={viewer} />;
  const en = subject.lang === "en";
  const wanted = (await searchParams).set;
  const set = sets.find((s) => s.id === wanted) ?? sets[0];

  return (
    <div className="space-y-5">
      {sets.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0" role="tablist">
          {sets.map((s) => (
            <Link
              key={s.id}
              href={`?set=${s.id}`}
              role="tab"
              aria-selected={s.id === set.id}
              className={`chip flex-none !py-2 !px-3.5 ${s.id === set.id ? "chip-active" : "hover:!text-white"}`}
            >
              {s.base === "world" ? <Globe size={14} /> : <MapPinned size={14} />} {en ? s.en : s.ta}
            </Link>
          ))}
        </div>
      )}
      {/* key: a fresh practice session for each map */}
      <MapPractice key={set.id} map={prepareMap(set, subject.lang)} setId={set.id} lang={subject.lang} />
      <Link href={`/subjects/${subject.id}/maps`} className="glass glass-hover flex items-center justify-between gap-3 p-4 text-sm">
        <span>
          <span className="block font-bold">{en ? "Past-paper map questions 2016–2025" : "கடந்தகால தேசப்பட வினாக்கள் 2016–2025"}</span>
          <span className="block text-muted">{en ? "Practise the exact places asked in each year's paper." : "ஒவ்வோர் ஆண்டும் கேட்கப்பட்ட இடங்களைப் பயிற்சி செய்யுங்கள்."}</span>
        </span>
        <ChevronRight size={18} className="text-muted flex-none" />
      </Link>
    </div>
  );
}
