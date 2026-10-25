import Link from "next/link";
import { ArrowRight, Bot, Brain, Flame, Layers, Lock, ScrollText, BookOpen, TrendingUp } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Panda } from "@/components/ui/Panda";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { catalog, chapterHref, upcomingSubjects } from "@/lib/catalog";
import { BADGES, nextRank, rankFor } from "@/lib/gamification";
import { STEP_KINDS, chapterSteps, isChapterOpen, nextChapter, subjectProgress } from "@/lib/progress";
import { completionSet, hasSubjectAccess, requireViewer } from "@/lib/session";

export const metadata = { title: "Home" };

const DOOR_TABS = ["notes", "flashcards", "quiz", "past-papers"] as const;

export default async function Home() {
  const viewer = await requireViewer("/home");
  const p = viewer.profile!;
  const done = completionSet(viewer);
  const subject = catalog.subjects[0];
  const access = hasSubjectAccess(viewer, subject.id);
  const prog = subjectProgress(subject, done);
  const next = nextChapter(subject, done, access, p.grade);
  const nextSteps = next ? chapterSteps(next, done) : [];
  const nextDoor = next ? DOOR_TABS[Math.max(0, nextSteps.findIndex((s) => !s))] : "notes";
  const rank = rankFor(p.coins);
  const upcoming = nextRank(p.coins);
  const rankPct = upcoming ? Math.round(((p.coins - rank.min) / (upcoming.min - rank.min)) * 100) : 100;

  const hijri = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Colombo" }).format(
    new Date(),
  );
  const greg = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Colombo" }).format(new Date());

  const hot = subject.grades
    .flatMap((g) => g.chapters)
    .map((c) => ({ c, n: Object.values(c.years).reduce((a, b) => a + b, 0), y: Object.keys(c.years).length }))
    .sort((a, b) => b.y - a.y || b.n - a.n)
    .slice(0, 5);

  const firstName = p.display_name.split(" ")[0];

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-end justify-between gap-4 rise">
        <div>
          <p className="text-sm text-muted font-semibold">
            {greg} · <span className="text-lilac">{hijri}</span>
          </p>
          <h1 className="display text-3xl sm:text-4xl font-bold mt-1">
            Assalamu alaikum, <span className="text-gradient">{firstName}</span>
          </h1>
          <p className="text-muted mt-1">Ready to light up another star tonight?</p>
        </div>
        {!access && (
          <Link href="/unlock" className="chip !border-gold/40 !text-gold hover:!bg-gold/10">
            <Lock size={14} /> Chapter 1 is free · Unlock all {prog.chapterCount} chapters
          </Link>
        )}
      </section>

      {/* tonight's star */}
      <section className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <div className="glass relative overflow-hidden p-6 sm:p-8 rise rise-1 bg-gradient-to-br from-royal/60 via-electric/30 to-transparent">
          <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-gold/10 blur-2xl" />
          <p className="eyebrow !text-gold">✦ Tonight&apos;s star</p>
          {next ? (
            <>
              <p className="text-sm text-muted font-bold mt-3">
                Grade {next.grade} · Chapter {next.number} · {next.minutes} min read
              </p>
              <h2 lang="ta" className="display text-2xl sm:text-3xl font-bold mt-1 leading-snug">
                {next.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-5">
                {["Read", "Recall", "Quiz", "Exam"].map((label, i) => (
                  <span key={label} className={`chip ${nextSteps[i] ? "!bg-gold/20 !border-gold/50 !text-gold" : ""}`}>
                    {nextSteps[i] ? "✓" : i + 1} {label}
                  </span>
                ))}
              </div>
              <Link href={chapterHref(subject.id, next.grade, next.number, nextDoor)} className="btn btn-gold mt-6">
                Continue: {["Read notes", "Flip flashcards", "Take the quiz", "Open exam vault"][DOOR_TABS.indexOf(nextDoor)]} <ArrowRight size={18} />
              </Link>
            </>
          ) : (
            <>
              <h2 className="display text-3xl font-bold mt-3">{access ? "Every star is gold. Masha Allah! 🌟" : "Chapter 1 conquered!"}</h2>
              <p className="text-muted mt-2">
                {access ? "Revise with past papers to stay sharp." : "Unlock the full subject to keep climbing your sky."}
              </p>
              <Link href={access ? `/subjects/${subject.id}` : "/unlock"} className="btn btn-gold mt-6">
                {access ? "Open the sky map" : "Unlock all chapters"} <ArrowRight size={18} />
              </Link>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 rise rise-2">
          <div className="glass p-5">
            <span className="coin text-2xl" />
            <p className="display text-3xl font-bold mt-2">{p.coins.toLocaleString()}</p>
            <p className="text-xs text-muted font-bold">COINS</p>
          </div>
          <div className="glass p-5">
            <Flame className="text-orange fill-orange/50" size={26} />
            <p className="display text-3xl font-bold mt-2">{p.streak_days}</p>
            <p className="text-xs text-muted font-bold">DAY STREAK</p>
          </div>
          <Link href="/leaderboard" className="glass glass-hover p-5 col-span-2">
            <div className="flex items-center justify-between">
              <p className="display text-2xl font-bold" style={{ color: rank.color }}>
                ◆ {rank.name}
              </p>
              <TrendingUp size={18} className="text-muted" />
            </div>
            <div className="bar mt-3">
              <span style={{ width: `${rankPct}%` }} />
            </div>
            <p className="text-xs text-muted mt-2">{upcoming ? `${upcoming.min - p.coins} coins to ${upcoming.name}` : "Top rank reached!"}</p>
          </Link>
        </div>
      </section>

      {/* quick doors */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 rise rise-3">
        {[
          { label: "Learn", icon: BookOpen, href: next ? chapterHref(subject.id, next.grade, next.number, "notes") : `/subjects/${subject.id}`, c: "from-electric/50" },
          { label: "Flashcards", icon: Layers, href: next ? chapterHref(subject.id, next.grade, next.number, "flashcards") : `/subjects/${subject.id}`, c: "from-cyan/30" },
          { label: "Quiz", icon: Brain, href: next ? chapterHref(subject.id, next.grade, next.number, "quiz") : `/subjects/${subject.id}`, c: "from-pink/40" },
          { label: "AI Panda", icon: Bot, href: "/panda", c: "from-gold/30" },
        ].map(({ label, icon: I, href, c }) => (
          <Link key={label} href={href} className={`glass glass-hover p-4 flex items-center gap-3 bg-gradient-to-br ${c} to-transparent`}>
            <span className="grid place-items-center w-11 h-11 rounded-2xl bg-bg/60">
              <I size={22} />
            </span>
            <span className="font-extrabold tracking-wide text-sm">{label.toUpperCase()}</span>
          </Link>
        ))}
      </section>

      <section className="grid lg:grid-cols-[1.2fr_1fr] gap-5">
        {/* subject */}
        <div className="space-y-4">
          <h2 className="display text-2xl font-bold">Your subjects</h2>
          <Link href={`/subjects/${subject.id}`} className="glass glass-hover p-5 flex items-center gap-5">
            <ProgressRing value={prog.percent} size={84}>
              <span className="text-2xl">☪️</span>
            </ProgressRing>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-lg">
                {subject.name} <span lang="ta" className="text-muted font-semibold text-sm">· {subject.nameLocal}</span>
              </p>
              <p className="text-sm text-muted">{subject.tagline}</p>
              <p className="text-sm mt-2">
                <b className="text-gold">{prog.percent}%</b> complete · {prog.completedChapters}/{prog.chapterCount} chapters conquered
              </p>
            </div>
            {access ? (
              <span className="chip !text-green !border-green/30">Unlocked</span>
            ) : (
              <span className="chip !text-gold !border-gold/30">
                <Lock size={12} /> Free preview
              </span>
            )}
          </Link>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {upcomingSubjects.map((s) => (
              <div key={s.name} className="glass !rounded-2xl p-3 text-center opacity-55">
                <Icon name={s.icon} size={20} className="mx-auto text-lilac" />
                <p className="text-xs font-bold mt-1.5">{s.name}</p>
                <p className="text-[10px] text-muted">Soon</p>
              </div>
            ))}
          </div>

          <div className="glass p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold">Badges</h3>
              <Link href="/profile" className="text-sm text-lilac font-bold">
                View all
              </Link>
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar pb-1">
              {BADGES.map((b) => {
                const got = p.badge_codes.includes(b.code);
                return (
                  <div key={b.code} title={b.description} className={`flex-none w-[84px] text-center ${got ? "" : "opacity-35 grayscale"}`}>
                    <span
                      className={`mx-auto grid place-items-center w-14 h-14 rounded-2xl rotate-45 ${got ? "bg-gradient-to-br from-gold to-orange shadow-[0_0_20px_rgba(251,191,36,.4)]" : "bg-white/5 border border-line"}`}
                    >
                      <Icon name={b.icon} size={22} className={`-rotate-45 ${got ? "text-bg" : "text-muted"}`} />
                    </span>
                    <p className="text-[11px] font-bold mt-3 leading-tight">{b.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* exam radar */}
        <div className="glass p-5 sm:p-6 h-fit">
          <div className="flex items-center gap-2">
            <ScrollText size={18} className="text-gold" />
            <h2 className="font-extrabold">Most asked in O/L exams</h2>
          </div>
          <p className="text-xs text-muted mt-1">Chapters that appeared in the most papers (2016–2025). Revise these first.</p>
          <ol className="mt-4 space-y-2.5">
            {hot.map(({ c, y }, i) => {
              const open = isChapterOpen(c, access);
              const finished = STEP_KINDS.every((k) => done.has(`${c.id}:${k}`));
              return (
                <li key={c.id}>
                  <Link
                    href={open ? chapterHref(subject.id, c.grade, c.number, "past-papers") : "/unlock"}
                    className="flex items-center gap-3 rounded-2xl p-2.5 hover:bg-white/5"
                  >
                    <span className="display text-xl font-bold text-gold w-6 text-center">{i + 1}</span>
                    <span className="flex-1 min-w-0">
                      <span lang="ta" className="block text-sm font-bold truncate">
                        {c.title}
                      </span>
                      <span className="text-[11px] text-muted">
                        G{c.grade} · Ch {c.number} · in {y}/10 papers
                      </span>
                    </span>
                    {finished ? <span className="text-gold">★</span> : !open && <Lock size={14} className="text-faint" />}
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-electric/15 border border-electric/30 p-3">
            <Panda size={44} mood="think" />
            <p className="text-xs text-muted">
              <b className="text-white">Panda tip:</b> finish the four doors of a chapter in one sitting — it sticks better than four half-chapters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
