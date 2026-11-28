import { withArabic } from "@/components/ArabicText";
import Link from "next/link";
import { BookOpen, Brain, Check, ChevronRight, Images, Layers, Lock, MapPinned, ScrollText } from "lucide-react";
import { LockedPanel } from "@/components/LockedPanel";
import { ExamRadar } from "@/components/ExamRadar";
import { chapterHref, getChapterSummary, hasPastPapers, subjectVersions } from "@/lib/catalog";
import { mapSetsForChapter } from "@/lib/maps/sets";
import { resolveChapter, type ChapterParams } from "@/lib/chapter";
import { LOGIN_ENABLED } from "@/lib/config";
import { REWARDS } from "@/lib/gamification";

export default async function ChapterHub({ params }: { params: ChapterParams }) {
  const { subject, summary: c, viewer, open, steps } = await resolveChapter(params);
  if (!open) return <LockedPanel chapter={c} viewer={viewer} />;

  const doors = [
    { step: 0, slug: "notes", t: "Notes", sub: `${c.minutes} min read`, icon: BookOpen, coins: REWARDS.lesson },
    { step: 1, slug: "flashcards", t: "Flashcards", sub: `${c.counts.flashcards} cards`, icon: Layers, coins: REWARDS.flashcards },
    { step: 2, slug: "quiz", t: "Quiz", sub: `${c.counts.quiz} questions · pass with 80%`, icon: Brain, coins: REWARDS.quiz },
    { step: 3, slug: "past-papers", t: "Past papers", sub: `${c.counts.mcq} MCQ · ${c.counts.structured} structured`, icon: ScrollText, coins: REWARDS.pastpaper },
  ].filter((d) => (d.slug !== "past-papers" || hasPastPapers(c)) && (d.slug !== "quiz" || c.counts.quiz > 0));
  const maps = subject.maps ? mapSetsForChapter(c.grade, c.number) : [];
  const en = subject.lang === "en";
  const pictureCount = subject.pictures ? c.counts.pictures ?? 0 : 0;
  const paperPictures = subject.pictures ? c.counts.paperPictures ?? 0 : 0;
  // Same exam in every medium: without past papers here, show how often the other medium's chapter was asked.
  const years = hasPastPapers(c)
    ? c.years
    : subjectVersions(subject)
        .map((v) => getChapterSummary(v.id, c.grade, c.number))
        .find((x) => x && hasPastPapers(x))?.years;
  const firstOpen = doors.findIndex((d) => !steps[d.step]);

  return (
    <div className="space-y-6">
      <ol className="grid sm:grid-cols-2 gap-3">
        {doors.map((d, i) => {
          const done = steps[d.step];
          const I = d.icon;
          return (
            <li key={d.slug}>
              <Link
                href={chapterHref(subject.id, c.grade, c.number, d.slug)}
                className={`glass glass-hover flex items-center gap-4 p-4 ${i === firstOpen ? "!border-gold/60" : ""}`}
              >
                <span className={`grid place-items-center w-11 h-11 rounded-xl flex-none ${done ? "bg-gold text-bg" : "bg-card-2"}`}>
                  {done ? <Check size={20} strokeWidth={3} /> : <I size={20} />}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold">
                    {i + 1}. {d.t}
                  </span>
                  <span className="block text-sm text-muted">{d.sub}</span>
                </span>
                <span className="text-sm font-semibold flex-none">
                  {done ? (
                    <span className="text-gold">Done</span>
                  ) : i === firstOpen ? (
                    <span className="text-gold">Start here</span>
                  ) : LOGIN_ENABLED ? (
                    <span className="text-muted flex items-center gap-1.5">
                      <span className="coin" /> +{d.coins}
                    </span>
                  ) : (
                    <ChevronRight size={18} className="text-muted" />
                  )}
                </span>
              </Link>
            </li>
          );
        })}
        {pictureCount + paperPictures > 0 && (
          <li>
            <Link href={chapterHref(subject.id, c.grade, c.number, "pictures")} className="glass glass-hover flex items-center gap-4 p-4">
              <span className="grid place-items-center w-11 h-11 rounded-xl flex-none bg-card-2 text-gold">
                <Images size={20} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-bold">{en ? "Picture questions" : "படம் சார்ந்த வினாக்கள்"}</span>
                <span className="block text-sm text-muted">
                  {en
                    ? `${pictureCount} textbook pictures${paperPictures ? ` · ${paperPictures} from past papers` : ""}`
                    : `${pictureCount} பாடநூல் படங்கள்${paperPictures ? ` · கடந்தகால வினாத்தாள்களில் ${paperPictures}` : ""}`}
                </span>
              </span>
              <ChevronRight size={18} className="text-muted flex-none" />
            </Link>
          </li>
        )}
        {maps.length > 0 && (
          <li>
            <Link href={chapterHref(subject.id, c.grade, c.number, "map")} className="glass glass-hover flex items-center gap-4 p-4">
              <span className="grid place-items-center w-11 h-11 rounded-xl flex-none bg-card-2 text-gold">
                <MapPinned size={20} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-bold">{en ? "Map practice" : "தேசப்படப் பயிற்சி"}</span>
                <span className="block text-sm text-muted">
                  {en ? `${maps.length} ${maps.length === 1 ? "map" : "maps"} · tap the places` : `${maps.length} தேசப்படம் · இடங்களைத் தொட்டுக் குறியுங்கள்`}
                </span>
              </span>
              <ChevronRight size={18} className="text-muted flex-none" />
            </Link>
          </li>
        )}
      </ol>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass p-6">
          <h3 className="font-bold">In this chapter you&apos;ll learn</h3>
          <ul className="mt-4 space-y-2.5">
            {c.objectives.map((o) => (
              <li key={o} className="flex gap-3 text-[0.95rem]">
                <span className="text-muted">•</span> <span>{withArabic(o)}</span>
              </li>
            ))}
          </ul>
          {LOGIN_ENABLED && !viewer && (
            <p className="mt-5 text-sm rounded-xl border border-line p-3">
              <Lock size={13} className="inline -mt-0.5 mr-1" />
              <Link href="/login" className="font-bold text-lilac underline">
                Sign in
              </Link>{" "}
              to save progress and earn coins.
            </p>
          )}
        </div>
        {years && <ExamRadar years={years} />}
      </div>
    </div>
  );
}
