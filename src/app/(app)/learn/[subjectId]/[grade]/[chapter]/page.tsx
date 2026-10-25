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
    { slug: "notes", t: "Read", sub: `${c.minutes} min of notes`, icon: BookOpen, coins: REWARDS.lesson, grad: "from-electric/70 via-royal/40" },
    { slug: "flashcards", t: "Recall", sub: `${c.counts.flashcards} flashcards`, icon: Layers, coins: REWARDS.flashcards, grad: "from-cyan/45 via-electric/25" },
    { slug: "quiz", t: "Quiz", sub: `${c.counts.quiz} questions · pass 80%`, icon: Brain, coins: REWARDS.quiz, grad: "from-pink/55 via-electric/25" },
    {
      slug: "past-papers",
      t: "Exam vault",
      sub: `${c.counts.mcq} MCQ · ${c.counts.structured} structured`,
      icon: ScrollText,
      coins: REWARDS.pastpaper,
      grad: "from-gold/45 via-orange/20",
    },
  ];
  const firstOpen = steps.findIndex((s) => !s);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {doors.map((d, i) => {
          const done = steps[i];
          const I = d.icon;
          return (
            <Link
              key={d.slug}
              href={chapterHref(subject.id, c.grade, c.number, d.slug)}
              className={`arch glass glass-hover bg-gradient-to-b ${d.grad} to-transparent p-4 sm:p-6 pt-10 sm:pt-14 min-h-[240px] sm:min-h-[280px] flex flex-col items-center text-center rise rise-${i + 1} ${
                i === firstOpen ? "ring-2 ring-gold/70" : ""
              }`}
            >
              <span className={`grid place-items-center w-14 h-14 rounded-full ring-1 ring-white/20 ${done ? "bg-gold text-bg" : "bg-bg/70"}`}>
                {done ? <Check size={26} strokeWidth={3} /> : <I size={26} />}
              </span>
              <p className="text-[11px] font-bold text-muted mt-4">DOOR {i + 1}</p>
              <h2 className="display text-xl sm:text-2xl font-bold">{d.t}</h2>
              <p className="text-xs sm:text-sm text-muted mt-1 flex-1">{d.sub}</p>
              <p className="text-xs sm:text-sm font-bold mt-3 flex items-center gap-1.5">
                {done ? (
                  <span className="text-gold">Completed</span>
                ) : (
                  <>
                    <span className="coin" /> <span className="text-gold">+{d.coins}</span>
                  </>
                )}
              </p>
              {i === firstOpen && <span className="mt-2 text-[11px] font-extrabold text-gold tracking-widest">START HERE</span>}
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass p-6">
          <h3 className="font-extrabold">🎯 In this chapter you&apos;ll learn</h3>
          <ul lang="ta" className="mt-4 space-y-2.5">
            {c.objectives.map((o) => (
              <li key={o} className="flex gap-3 text-[0.95rem]">
                <span className="text-gold mt-0.5">✦</span> {o}
              </li>
            ))}
          </ul>
          {!viewer && (
            <p className="mt-5 text-sm rounded-xl bg-electric/15 border border-electric/30 p-3">
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
