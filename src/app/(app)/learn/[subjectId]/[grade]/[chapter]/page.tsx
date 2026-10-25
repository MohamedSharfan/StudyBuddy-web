import Link from "next/link";
import { BookOpen, Brain, Check, Layers, Lock, ScrollText } from "lucide-react";
import { LockedPanel } from "@/components/LockedPanel";
import { ExamRadar } from "@/components/ExamRadar";
import { chapterHref } from "@/lib/catalog";
import { resolveChapter, type ChapterParams } from "@/lib/chapter";
import { REWARDS } from "@/lib/gamification";

export default async function ChapterHub({ params }: { params: ChapterParams }) {
  const { subject, summary: c, viewer, open, steps } = await resolveChapter(params);
  if (!open) return <LockedPanel chapter={c} viewer={viewer} />;

  const doors = [
    { slug: "notes", t: "Notes", sub: `${c.minutes} min read`, icon: BookOpen, coins: REWARDS.lesson },
    { slug: "flashcards", t: "Flashcards", sub: `${c.counts.flashcards} cards`, icon: Layers, coins: REWARDS.flashcards },
    { slug: "quiz", t: "Quiz", sub: `${c.counts.quiz} questions · pass with 80%`, icon: Brain, coins: REWARDS.quiz },
    { slug: "past-papers", t: "Past papers", sub: `${c.counts.mcq} MCQ · ${c.counts.structured} structured`, icon: ScrollText, coins: REWARDS.pastpaper },
  ];
  const firstOpen = steps.findIndex((s) => !s);

  return (
    <div className="space-y-6">
      <ol className="grid sm:grid-cols-2 gap-3">
        {doors.map((d, i) => {
          const done = steps[i];
          const I = d.icon;
          return (
            <li key={d.slug}>
              <Link
                href={chapterHref(subject.id, c.grade, c.number, d.slug)}
                className={`glass glass-hover flex items-center gap-4 p-4 ${i === firstOpen ? "!border-gold/60" : ""}`}
              >
                <span className={`grid place-items-center w-11 h-11 rounded-xl flex-none ${done ? "bg-green text-bg" : "bg-card-2"}`}>
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
                    <span className="text-green">Done</span>
                  ) : i === firstOpen ? (
                    <span className="text-gold">Start here</span>
                  ) : (
                    <span className="text-muted flex items-center gap-1.5">
                      <span className="coin" /> +{d.coins}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass p-6">
          <h3 className="font-bold">In this chapter you&apos;ll learn</h3>
          <ul lang="ta" className="mt-4 space-y-2.5">
            {c.objectives.map((o) => (
              <li key={o} className="flex gap-3 text-[0.95rem]">
                <span className="text-muted">•</span> {o}
              </li>
            ))}
          </ul>
          {!viewer && (
            <p className="mt-5 text-sm rounded-xl border border-line p-3">
              <Lock size={13} className="inline -mt-0.5 mr-1" />
              <Link href="/login" className="font-bold text-lilac underline">
                Sign in
              </Link>{" "}
              to save progress and earn coins.
            </p>
          )}
        </div>
        <ExamRadar years={c.years} />
      </div>
    </div>
  );
}
