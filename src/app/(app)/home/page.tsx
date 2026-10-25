import Link from "next/link";
import { ArrowRight, Flame, Lock, ScrollText } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { chapterHref, subjectsFor } from "@/lib/catalog";
import { nextRank, rankFor } from "@/lib/gamification";
import { OL_UPCOMING, getStream, levelLabel } from "@/lib/levels";
import { STEP_KINDS, STEP_LABELS, chapterSteps, isChapterOpen, nextChapter, subjectProgress } from "@/lib/progress";
import { completionSet, hasSubjectAccess, requireViewer } from "@/lib/session";

export const metadata = { title: "Home" };

const DOOR_TABS = ["notes", "flashcards", "quiz", "past-papers"] as const;

export default async function Home() {
  const viewer = await requireViewer("/home");
  const p = viewer.profile!;
  const done = completionSet(viewer);
  const subjects = subjectsFor(p);
  const rank = rankFor(p.coins);
  const upcoming = nextRank(p.coins);
  const rankPct = upcoming ? Math.round(((p.coins - rank.min) / (upcoming.min - rank.min)) * 100) : 100;
  const today = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Colombo" }).format(new Date());
  const firstName = p.display_name.split(" ")[0];
  const stream = getStream(p.stream);
  const comingSoon = p.education_level === "A/L" ? (stream?.subjects ?? []) : OL_UPCOMING;

  const stats = (
    <div className="grid grid-cols-2 gap-3">
      <div className="glass p-4">
        <p className="text-sm text-muted flex items-center gap-2">
          <span className="coin" /> Coins
        </p>
        <p className="text-2xl font-bold mt-1">{p.coins.toLocaleString()}</p>
      </div>
      <div className="glass p-4">
        <p className="text-sm text-muted flex items-center gap-2">
          <Flame size={16} className="text-orange" /> Day streak
        </p>
        <p className="text-2xl font-bold mt-1">{p.streak_days}</p>
      </div>
      <Link href="/leaderboard" className="glass glass-hover p-4 col-span-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold" style={{ color: rank.color }}>
            {rank.name} rank
          </span>
          <span className="text-muted">{upcoming ? `${upcoming.min - p.coins} coins to ${upcoming.name}` : "Top rank"}</span>
        </div>
        <div className="bar mt-3">
          <span style={{ width: `${rankPct}%` }} />
        </div>
      </Link>
    </div>
  );

  const header = (
    <section className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-sm text-muted">{today}</p>
        <h1 className="display text-2xl sm:text-3xl font-bold mt-1">Hi, {firstName}</h1>
      </div>
      <Link href="/profile/edit" className="chip hover:!text-white" title="Change level">
        {levelLabel(p)}
      </Link>
    </section>
  );

  // A/L streams (and any level without live subjects yet).
  if (subjects.length === 0) {
    return (
      <div className="space-y-5">
        {header}
        <section className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
          <div className="glass p-6 sm:p-8">
            <span className="chip !text-gold !border-gold/40">Coming soon</span>
            <h2 className="display text-2xl font-bold mt-3">
              {p.education_level}
              {stream ? ` ${stream.name}` : ""} subjects are on the way
            </h2>
            <p className="text-muted mt-2 max-w-[560px]">
              We&apos;re launching O/L first. Your subjects will show up here as soon as they&apos;re ready, and everything you earn now stays on
              your account.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {comingSoon.map((s) => (
                <div key={s.name} className="rounded-xl border border-line bg-bg-2 p-3">
                  <Icon name={s.icon} size={20} className="text-lilac" />
                  <p className="text-sm font-bold mt-2">{s.name}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted mt-6">
              Picked the wrong level?{" "}
              <Link href="/profile/edit" className="text-lilac font-semibold underline underline-offset-2">
                Change it in your profile
              </Link>
            </p>
          </div>
          {stats}
        </section>
      </div>
    );
  }

  const withNext = subjects.map((s) => {
    const access = hasSubjectAccess(viewer, s.id);
    return { s, access, prog: subjectProgress(s, done), next: nextChapter(s, done, access, p.grade) };
  });
  const focus = withNext.find((x) => x.next) ?? withNext[0];
  const { s: subject, access, next } = focus;
  const nextSteps = next ? chapterSteps(next, done) : [];
  const stepIdx = Math.max(0, nextSteps.findIndex((s) => !s));

  const hot = subject.grades
    .flatMap((g) => g.chapters)
    .map((c) => ({ c, y: Object.keys(c.years).length, n: Object.values(c.years).reduce((a, b) => a + b, 0) }))
    .sort((a, b) => b.y - a.y || b.n - a.n)
    .slice(0, 5);

  return (
    <div className="space-y-5">
      {header}

      <section className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <div className="glass p-5 sm:p-7">
          <p className="text-sm font-semibold text-gold">Continue studying</p>
          {next ? (
            <>
              <p className="text-sm text-muted mt-3">
                {subject.name} · Grade {next.grade} · Chapter {next.number} · {next.minutes} min read
              </p>
              <h2 lang="ta" className="display text-xl sm:text-2xl font-bold mt-1 leading-snug">
                {next.title}
              </h2>
              <ol className="flex flex-wrap gap-2 mt-4">
                {STEP_LABELS.map((label, i) => (
                  <li key={label} className={`chip ${nextSteps[i] ? "!text-green !border-green/40" : i === stepIdx ? "!text-white !border-white/40" : ""}`}>
                    {nextSteps[i] ? "✓" : `${i + 1}.`} {label}
                  </li>
                ))}
              </ol>
              <Link href={chapterHref(subject.id, next.grade, next.number, DOOR_TABS[stepIdx])} className="btn btn-gold mt-5">
                Open {STEP_LABELS[stepIdx].toLowerCase()} <ArrowRight size={18} />
              </Link>
            </>
          ) : (
            <>
              <h2 className="display text-xl sm:text-2xl font-bold mt-3">{access ? "You've finished every chapter" : "You've finished the free chapters"}</h2>
              <p className="text-muted mt-1">{access ? "Keep revising with past papers." : "Unlock the full subject to keep going."}</p>
              <Link href={access ? `/subjects/${subject.id}` : "/unlock"} className="btn btn-gold mt-5">
                {access ? "Open chapters" : "Unlock all chapters"} <ArrowRight size={18} />
              </Link>
            </>
          )}
        </div>
        {stats}
      </section>

      <section className="grid lg:grid-cols-[1.4fr_1fr] gap-5 items-start">
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Your subjects</h2>
          {withNext.map(({ s, access: a, prog }) => (
            <Link key={s.id} href={`/subjects/${s.id}`} className="glass glass-hover p-4 flex items-center gap-4">
              <ProgressRing value={prog.percent} size={64}>
                <Icon name={s.icon ?? "book-open"} size={22} className="text-lilac" />
              </ProgressRing>
              <div className="flex-1 min-w-0">
                <p className="font-bold">
                  {s.name} <span className="text-muted font-normal text-sm">· {s.medium} medium</span>
                </p>
                <p className="text-sm text-muted mt-0.5">
                  {prog.percent}% · {prog.completedChapters}/{prog.chapterCount} chapters done
                </p>
              </div>
              {a ? (
                <span className="chip !text-green !border-green/40">Unlocked</span>
              ) : (
                <span className="chip !text-gold !border-gold/40">
                  <Lock size={12} /> Free preview
                </span>
              )}
            </Link>
          ))}
          <div className="flex flex-wrap gap-2 pt-1">
            {comingSoon.map((s) => (
              <span key={s.name} className="chip">
                <Icon name={s.icon} size={13} /> {s.name} · soon
              </span>
            ))}
          </div>
        </div>

        <div className="glass p-5">
          <h2 className="font-bold flex items-center gap-2">
            <ScrollText size={17} className="text-gold" /> Most asked in past papers
          </h2>
          <p className="text-sm text-muted mt-1">{subject.name} chapters that came up most often (2016–2025).</p>
          <ol className="mt-3 divide-y divide-line">
            {hot.map(({ c, y }, i) => {
              const open = isChapterOpen(c, access);
              const finished = STEP_KINDS.every((k) => done.has(`${c.id}:${k}`));
              return (
                <li key={c.id}>
                  <Link href={open ? chapterHref(subject.id, c.grade, c.number, "past-papers") : "/unlock"} className="flex items-center gap-3 py-2.5 hover:bg-white/[.03] -mx-2 px-2 rounded-lg">
                    <span className="w-5 text-center font-bold text-muted">{i + 1}</span>
                    <span className="flex-1 min-w-0">
                      <span lang="ta" className="block text-sm font-semibold truncate">
                        {c.title}
                      </span>
                      <span className="text-xs text-muted">
                        Grade {c.grade} · Ch {c.number} · {y} of 10 papers
                      </span>
                    </span>
                    {finished ? <span className="text-green text-sm">✓</span> : !open && <Lock size={14} className="text-faint" />}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
