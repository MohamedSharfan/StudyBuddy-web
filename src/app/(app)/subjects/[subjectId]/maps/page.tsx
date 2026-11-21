import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, ChevronRight, Globe, MapPinned } from "lucide-react";
import { Markdown } from "@/components/Markdown";
import { getSubject, subjectVersions } from "@/lib/catalog";
import { loadMapGuides } from "@/lib/maps/guides";
import { PAST_MAP_SETS, TEXTBOOK_MAP_SETS, type MapSet } from "@/lib/maps/sets";
import { canonicalUrl } from "@/lib/seo";
import { canSeeSubject, getViewer } from "@/lib/session";

type Params = Promise<{ subjectId: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const s = getSubject((await params).subjectId);
  if (!s?.maps) return { title: "Map practice" };
  const title = `O/L ${s.name} Map Marking Practice · ${s.medium} Medium`;
  const description = `Practise the O/L ${s.name} map-marking question (Part II, Q1) on an interactive map of Sri Lanka and the world: every past paper from 2016–2025 and the Grade 10 and 11 textbook maps.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/subjects/${s.id}/maps`) },
    openGraph: { type: "website", siteName: "StudyBuddy", title, description, url: canonicalUrl(`/subjects/${s.id}/maps`), images: ["/logo.jpg"] },
  };
}

function SetLink({ subjectId, set, lang }: { subjectId: string; set: MapSet; lang: string }) {
  const en = lang === "en";
  const Icon = set.base === "world" ? Globe : MapPinned;
  return (
    <Link href={`/subjects/${subjectId}/maps/${set.id}`} className="glass glass-hover flex items-center gap-3 p-3.5 min-w-0">
      <span className="grid place-items-center w-10 h-10 rounded-xl flex-none bg-card-2 text-gold">
        <Icon size={19} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-semibold text-sm leading-snug">{en ? set.en : set.ta}</span>
        <span className="block text-xs text-muted">
          {set.chapter ? (en ? `Chapter ${set.chapter} · ` : `அலகு ${set.chapter} · `) : ""}
          {en ? `${set.places.length} places` : `${set.places.length} இடங்கள்`}
        </span>
      </span>
      <ChevronRight size={18} className="text-muted flex-none" />
    </Link>
  );
}

export default async function MapsHub({ params, searchParams }: { params: Params; searchParams: Promise<{ grade?: string }> }) {
  const { subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject?.maps) notFound();
  const viewer = await getViewer();
  if (!canSeeSubject(viewer, subject)) redirect("/subjects");
  const lang = subject.lang;
  const en = lang === "en";
  const requested = Number((await searchParams).grade);
  const grades = requested === 11 ? [11, 10] : [10, 11];
  const guides = await loadMapGuides(subject.id);
  const years = [...new Set(PAST_MAP_SETS.map((s) => s.year!))].sort((a, b) => b - a);
  const versions = subjectVersions(subject);

  return (
    <div className="space-y-7 max-w-[900px]" lang={lang}>
      <div className="flex items-center justify-between gap-3 text-sm">
        <Link href={`/subjects/${subject.id}`} className="flex items-center gap-1 text-muted hover:text-white font-semibold">
          <ChevronLeft size={16} /> {subject.name} · {subject.medium} medium
        </Link>
        {versions.length > 1 && (
          <div className="flex rounded-xl border border-line p-1" aria-label="Medium">
            {versions.map((v) => (
              <Link
                key={v.id}
                href={`/subjects/${v.id}/maps`}
                aria-current={v.id === subject.id ? "page" : undefined}
                className={`px-3 py-1 rounded-lg font-semibold text-xs ${v.id === subject.id ? "bg-card-2 text-white" : "text-muted hover:text-white"}`}
              >
                {v.medium}
              </Link>
            ))}
          </div>
        )}
      </div>

      <header>
        <p className="eyebrow">O/L {subject.name} · {en ? "Part II, Question 1 (a)" : "பகுதி II, வினா 1 (அ)"}</p>
        <h1 className="display text-3xl font-bold mt-1">{en ? "Map marking practice" : "தேசப்படம் குறித்தல் பயிற்சி"}</h1>
        <p className="text-muted mt-2">
          {en
            ? "Every O/L paper asks you to mark about 12 places on a map of Sri Lanka and 6 on a world map — up to 18 marks. Learn the places, then practise on a blank map: tap where each place is and see how close you were."
            : "ஒவ்வொரு சா/த வினாத்தாளிலும் இலங்கைப் படத்தில் சுமார் 12 இடங்களையும் உலகப் படத்தில் 6 இடங்களையும் குறிக்க வேண்டும் – 18 புள்ளிகள் வரை. முதலில் இடங்களைக் கற்று, பின் வெற்றுப் படத்தில் ஒவ்வோர் இடத்தையும் தொட்டுக் குறித்துப் பயிற்சி செய்யுங்கள்."}
        </p>
      </header>

      <section>
        <h2 className="font-bold text-lg">{en ? "Past papers 2016–2025" : "கடந்தகால வினாத்தாள்கள் 2016–2025"}</h2>
        <p className="text-sm text-muted mt-1">
          {en ? "The exact places asked in each year's paper." : "ஒவ்வோர் ஆண்டு வினாத்தாளிலும் கேட்கப்பட்ட அதே இடங்கள்."}
        </p>
        <ul className="grid sm:grid-cols-2 gap-2.5 mt-3">
          {years.map((y) => {
            const sets = PAST_MAP_SETS.filter((s) => s.year === y);
            return (
              <li key={y} className="glass p-3.5">
                <p className="font-bold">{y}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {sets.map((s) => (
                    <Link key={s.id} href={`/subjects/${subject.id}/maps/${s.id}`} className="chip justify-center !py-2 hover:!text-white">
                      {s.base === "world" ? <Globe size={14} /> : <MapPinned size={14} />}
                      {s.base === "world" ? (en ? "World" : "உலகம்") : en ? "Sri Lanka" : "இலங்கை"}
                      <span className="opacity-70">{s.places.length}</span>
                    </Link>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {grades.map((g) => (
        <section key={g}>
          <h2 className="font-bold text-lg">{en ? `Grade ${g} textbook maps` : `தரம் ${g} பாடநூல் தேசப்படங்கள்`}</h2>
          <ul className="grid sm:grid-cols-2 gap-2.5 mt-3">
            {TEXTBOOK_MAP_SETS.filter((s) => s.grade === g).map((s) => (
              <li key={s.id} className="min-w-0">
                <SetLink subjectId={subject.id} set={s} lang={lang} />
              </li>
            ))}
          </ul>
          {guides[g] && (
            <details className="glass mt-3 group">
              <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between gap-2">
                {en ? `Grade ${g} map-learning guide` : `தரம் ${g} தேசப்படக் கற்றல் வழிகாட்டி`}
                <ChevronRight size={18} className="text-muted transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-4 pb-5">
                <Markdown>{guides[g]}</Markdown>
              </div>
            </details>
          )}
        </section>
      ))}
    </div>
  );
}
