import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AskTeacher } from "@/components/AskTeacher";
import { MapPractice } from "@/components/MapPractice";
import { chapterHref, getChapterSummary, getSubject } from "@/lib/catalog";
import { prepareMap } from "@/lib/maps/prepare";
import { MAP_SETS, getMapSet } from "@/lib/maps/sets";
import { canonicalUrl } from "@/lib/seo";
import { canSeeSubject, getViewer } from "@/lib/session";

type Params = Promise<{ subjectId: string; setId: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { subjectId, setId } = await params;
  const s = getSubject(subjectId);
  const set = getMapSet(setId);
  if (!s?.maps || !set) return { title: "Map practice" };
  const name = s.lang === "en" ? set.en : set.ta;
  const title = `O/L ${s.name} ${set.year ? `${set.year} Map Question` : "Map Practice"} · ${s.medium} Medium`;
  const description =
    set.kind === "past"
      ? `Practise the ${set.year} O/L ${s.name} map-marking question (${set.base === "lanka" ? "Sri Lanka" : "world"} map, ${set.places.length} places) on an interactive map.`
      : `${name}: learn and practise these places on an interactive map for O/L ${s.name} Grade ${set.grade}.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/subjects/${s.id}/maps/${set.id}`) },
    openGraph: { type: "website", siteName: "StudyBuddy", title, description, url: canonicalUrl(`/subjects/${s.id}/maps/${set.id}`), images: ["/logo.jpg"] },
  };
}

export default async function MapSetPage({ params }: { params: Params }) {
  const { subjectId, setId } = await params;
  const subject = getSubject(subjectId);
  const set = getMapSet(setId);
  if (!subject?.maps || !set) notFound();
  const viewer = await getViewer();
  if (!canSeeSubject(viewer, subject)) redirect("/subjects");
  const en = subject.lang === "en";
  const map = prepareMap(set, subject.lang);

  // next / previous set of the same kind, so students can go through all the papers
  const same = MAP_SETS.filter((s) => s.kind === set.kind);
  const i = same.findIndex((s) => s.id === set.id);
  const prev = same[i - 1];
  const next = same[i + 1];
  const chapter = set.grade && set.chapter ? getChapterSummary(subject.id, set.grade, set.chapter) : null;
  const label = (s: typeof set) => (en ? s.en : s.ta);

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start" lang={subject.lang}>
      <div className="min-w-0 space-y-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <Link href={`/subjects/${subject.id}/maps`} className="flex items-center gap-1 text-muted hover:text-white font-semibold">
            <ChevronLeft size={16} /> {en ? "All maps" : "எல்லாத் தேசப்படங்களும்"}
          </Link>
          <div className="flex gap-1">
            {prev && (
              <Link href={`/subjects/${subject.id}/maps/${prev.id}`} className="chip hover:!text-white" aria-label={label(prev)}>
                <ChevronLeft size={14} />
              </Link>
            )}
            {next && (
              <Link href={`/subjects/${subject.id}/maps/${next.id}`} className="chip hover:!text-white" aria-label={label(next)}>
                <ChevronRight size={14} />
              </Link>
            )}
          </div>
        </div>

        <header>
          <p className="eyebrow">
            O/L {subject.name} · {subject.medium} medium
            {set.kind === "past" ? ` · ${en ? "Part II, Q1 (a)" : "பகுதி II, வினா 1 (அ)"}` : ` · ${en ? "Grade" : "தரம்"} ${set.grade}`}
          </p>
          <h1 className="display text-2xl sm:text-[1.75rem] font-bold leading-snug mt-1">{label(set)}</h1>
          <p className="text-sm text-muted mt-1">
            {set.kind === "past"
              ? en
                ? `Mark all ${set.places.length} places on the ${set.base === "lanka" ? "outline map of Sri Lanka" : "outline world map"} · ${set.marks} marks`
                : `${set.base === "lanka" ? "இலங்கைப் புறவுருவப் படத்தில்" : "உலகப் புறவுருவப் படத்தில்"} ${set.places.length} இடங்களையும் குறிக்குக · ${set.marks} புள்ளிகள்`
              : chapter
                ? en
                  ? `Chapter ${chapter.number}: ${chapter.title}`
                  : `அலகு ${chapter.number}: ${chapter.title}`
                : null}
          </p>
        </header>

        <MapPractice map={map} setId={set.id} lang={subject.lang} />
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24">
        {chapter && (
          <Link href={chapterHref(subject.id, chapter.grade, chapter.number, "notes")} className="glass glass-hover block p-4 text-sm">
            <p className="font-bold">{en ? "Read the chapter notes" : "அலகுக் குறிப்புகளை வாசிக்க"}</p>
            <p className="text-muted mt-1">
              {en ? `Grade ${chapter.grade} · Chapter ${chapter.number}` : `தரம் ${chapter.grade} · அலகு ${chapter.number}`}: {chapter.title}
            </p>
          </Link>
        )}
        <AskTeacher context={`${subject.name} (${subject.medium} medium) map practice: ${set.en}`} />
      </aside>
    </div>
  );
}
