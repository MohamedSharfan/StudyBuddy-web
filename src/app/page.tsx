import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Bot, Brain, Flame, Layers, Lock, ScrollText, Sparkles, Trophy } from "lucide-react";
import { Constellation, type StarItem } from "@/components/Constellation";
import { Logo } from "@/components/ui/Logo";
import { Panda } from "@/components/ui/Panda";
import { catalog, chapterHref, subjectTotals, upcomingSubjects } from "@/lib/catalog";
import { Icon } from "@/components/ui/Icon";
import { getViewer } from "@/lib/session";

const YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

export default async function Landing() {
  const viewer = await getViewer();
  const subject = catalog.subjects[0];
  const totals = subjectTotals(subject.id);
  const g10 = subject.grades.find((g) => g.grade === 10)!;

  // A demo constellation: first 6 chapters with a sample of progress.
  const demoStates: StarItem["state"][] = ["done", "done", "progress", "open", "locked", "locked"];
  const demo: StarItem[] = g10.chapters.slice(0, 6).map((c, i) => ({
    chapter: { ...c, free: i === 0 },
    href: chapterHref(subject.id, 10, c.number),
    state: demoStates[i],
    steps: [i < 3, i < 2, i < 2, i < 2],
    next: i === 2,
  }));

  // Exam radar sample: the chapter that appeared in the most past-paper years.
  const radarChapter = subject.grades
    .flatMap((g) => g.chapters)
    .sort((a, b) => Object.keys(b.years).length - Object.keys(a.years).length)[0];
  const radarMax = Math.max(...Object.values(radarChapter.years), 1);

  const cta = viewer ? { href: "/home", label: "Open my dashboard" } : { href: chapterHref(subject.id, 10, 1), label: "Start Chapter 1 free" };

  return (
    <div className="overflow-x-clip">
      {/* nav */}
      <header className="sticky top-0 z-40 bg-bg/60 backdrop-blur-xl border-b border-line">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-muted">
            <a href="#doors" className="hover:text-white">How it works</a>
            <a href="#vault" className="hover:text-white">Past papers</a>
            <a href="#panda" className="hover:text-white">AI Panda</a>
            <a href="#unlock" className="hover:text-white">Unlock</a>
          </nav>
          <div className="flex items-center gap-2">
            {!viewer && (
              <Link href="/login" className="btn btn-ghost btn-sm hidden sm:inline-flex">
                Sign in
              </Link>
            )}
            <Link href={cta.href} className="btn btn-sm">
              {viewer ? "Dashboard" : "Start free"}
            </Link>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-16 grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">
        <div>
          <p className="chip chip-active rise">
            <Sparkles size={14} className="text-gold" /> O/L Islam · Tamil medium · Grade 10 & 11
          </p>
          <h1 className="display text-[2.6rem] sm:text-6xl font-bold leading-[1.05] mt-5 rise rise-1">
            Your whole syllabus,
            <br />
            <span className="text-gradient">mapped like the night sky.</span>
          </h1>
          <p className="text-lg text-muted mt-5 max-w-[540px] rise rise-2">
            Every chapter is a star. Read the notes, flip the flashcards, beat the quiz and crack ten years of past papers — and watch your sky
            light up gold.
          </p>
          <div className="flex flex-wrap gap-3 mt-8 rise rise-3">
            <Link href={cta.href} className="btn btn-gold !min-h-[54px] !px-6 !text-base">
              {cta.label} <ArrowRight size={18} />
            </Link>
            <a href="#doors" className="btn btn-ghost !min-h-[54px] !px-6">
              See how it works
            </a>
          </div>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 rise rise-4">
            {[
              [totals.chapters, "chapters"],
              [totals.quiz, "quiz questions"],
              [totals.flashcards, "flashcards"],
              [totals.mcq + totals.structured, "past-paper Qs"],
            ].map(([n, l]) => (
              <div key={l} className="glass !rounded-2xl px-4 py-3">
                <dt className="sr-only">{l}</dt>
                <dd className="display text-3xl font-bold">{n}</dd>
                <dd className="text-xs text-muted font-semibold">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] aspect-square">
          <div className="absolute inset-[6%] rounded-full border border-dashed border-lilac/25 spin-slow" />
          <div className="absolute inset-[18%] rounded-full border border-lilac/15" />
          <div className="absolute inset-[24%] rounded-[38%] overflow-hidden ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(124,58,237,.9)] float">
            <Image src="/logo.jpg" alt="StudyBuddy panda mascot" fill sizes="300px" className="object-cover" priority />
          </div>
          <div className="absolute left-0 top-[16%] glass !rounded-2xl px-3 py-2 flex items-center gap-2 text-sm font-bold float" style={{ animationDelay: "-2s" }}>
            <span className="coin" /> +5 coins
          </div>
          <div className="absolute right-0 top-[30%] glass !rounded-2xl px-3 py-2 flex items-center gap-2 text-sm font-bold float" style={{ animationDelay: "-4s" }}>
            <Flame size={16} className="text-orange fill-orange/60" /> 7 day streak
          </div>
          <div className="absolute left-[4%] bottom-[14%] glass !rounded-2xl px-3 py-2 text-sm font-bold float" style={{ animationDelay: "-1s" }}>
            📜 2019 paper · 92%
          </div>
          <div className="absolute right-[6%] bottom-[6%] glass !rounded-2xl px-3 py-2 flex items-center gap-2 text-sm font-bold float" style={{ animationDelay: "-3s" }}>
            <Trophy size={16} className="text-gold" /> Gold rank
          </div>
        </div>
      </section>

      {/* four doors */}
      <section id="doors" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
        <p className="eyebrow">How a chapter works</p>
        <h2 className="display text-4xl sm:text-5xl font-bold mt-2 max-w-[700px]">Four doors in every chapter. Walk through all four.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {[
            { icon: BookOpen, t: "Read", d: "Clean Tamil notes with Quran & Hadith cards, memory boxes and a focus reader.", c: "from-electric/60", coins: 1 },
            { icon: Layers, t: "Recall", d: "Flip flashcards in 3D. Sort into “got it” and “again” until the deck is clear.", c: "from-cyan/40", coins: 2 },
            { icon: Brain, t: "Quiz", d: "Instant feedback and explanations. Score 80% to conquer the chapter.", c: "from-pink/50", coins: 5 },
            { icon: ScrollText, t: "Exam vault", d: "Real O/L questions 2016–2025 for this exact chapter, with model answers.", c: "from-gold/40", coins: 5 },
          ].map(({ icon: I, t, d, c, coins }, i) => (
            <div key={t} className={`arch glass glass-hover p-6 pt-14 bg-gradient-to-b ${c} to-transparent min-h-[300px] flex flex-col`}>
              <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-bg/70 ring-1 ring-white/20 mb-5">
                <I size={28} />
              </span>
              <p className="text-center text-xs font-bold text-muted">DOOR {i + 1}</p>
              <h3 className="display text-2xl font-bold text-center">{t}</h3>
              <p className="text-sm text-muted text-center mt-2 flex-1">{d}</p>
              <p className="text-center mt-4 text-sm font-bold text-gold flex items-center justify-center gap-1.5">
                <span className="coin" /> +{coins} coins
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* constellation */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="eyebrow">Your study map</p>
          <h2 className="display text-4xl sm:text-5xl font-bold mt-2">Know exactly where you are.</h2>
          <p className="text-muted text-lg mt-4">
            Grade 10 and Grade 11 are two skies. Each completed door lights a segment of the star; finish all four and it glows gold. Your next
            chapter always pulses — no more “where do I start?”.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              ["#fbbf24", "Gold star — chapter conquered"],
              ["#8b5cf6", "Violet star — in progress"],
              ["#c4b5fd", "Outline — open, ready to start"],
              ["#6f6496", "Dim with lock — unlock to open"],
            ].map(([c, t]) => (
              <li key={t} className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rotate-45 rounded-[3px]" style={{ background: c }} /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass p-4 sm:p-6">
          <Constellation items={demo} compact />
        </div>
      </section>

      {/* exam vault / radar */}
      <section id="vault" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
        <div className="glass p-6 sm:p-10 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center overflow-hidden relative">
          <div>
            <p className="eyebrow !text-gold">Exam vault + Exam radar</p>
            <h2 className="display text-4xl font-bold mt-2">Ten years of papers, sorted by chapter.</h2>
            <p className="text-muted mt-4">
              We split every O/L Islam paper from 2016 to 2025 — {totals.mcq} MCQs and {totals.structured} structured questions — into the chapter
              they belong to. The Exam radar shows how often a chapter comes up, so you know what to revise first.
            </p>
            <Link href={chapterHref(subject.id, 10, 1, "past-papers")} className="btn btn-gold mt-6">
              Try Chapter 1 past papers <ArrowRight size={18} />
            </Link>
          </div>
          <div className="glass !bg-bg/60 p-5">
            <p className="text-xs text-muted font-bold">EXAM RADAR · GRADE {radarChapter.grade} · CH {radarChapter.number}</p>
            <p lang="ta" className="font-bold text-lg mt-1">
              {radarChapter.title}
            </p>
            <div className="flex items-end gap-2 h-40 mt-6">
              {YEARS.map((y) => {
                const n = radarChapter.years[String(y)] ?? 0;
                return (
                  <div key={y} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[11px] font-bold text-gold">{n || ""}</span>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-electric to-gold"
                      style={{ height: `${n ? 12 + (n / radarMax) * 88 : 4}%`, opacity: n ? 1 : 0.25 }}
                    />
                    <span className="text-[10px] text-muted">{String(y).slice(2)}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-muted mt-4">
              Asked in <b className="text-white">{Object.keys(radarChapter.years).length} of 10</b> papers — a must-revise chapter.
            </p>
          </div>
        </div>
      </section>

      {/* panda */}
      <section id="panda" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-[auto_1fr] gap-10 items-center">
        <div className="relative mx-auto">
          <div className="absolute inset-0 rounded-full bg-electric/40 blur-3xl" />
          <Panda size={190} mood="wink" className="relative float" />
        </div>
        <div>
          <p className="eyebrow">AI Panda</p>
          <h2 className="display text-4xl sm:text-5xl font-bold mt-2">Stuck at 10pm? Ask Panda.</h2>
          <p className="text-muted text-lg mt-4 max-w-[620px]">
            Panda answers from your StudyBuddy notes — in Tamil or English — and points you to the chapter to revise. It explains, quizzes you and
            never gets tired of “one more question”.
          </p>
          <div className="mt-6 space-y-3 max-w-[560px]">
            <div className="glass !rounded-2xl !rounded-br-md px-4 py-3 ml-auto w-fit text-sm" lang="ta">
              ஈமானின் ஆறு அடிப்படைகள் எவை?
            </div>
            <div className="glass !rounded-2xl !rounded-bl-md px-4 py-3 w-fit text-sm flex gap-3">
              <Bot size={18} className="text-neon flex-none mt-0.5" />
              <span lang="ta">அல்லாஹ், மலக்குகள், வேதங்கள், தூதர்கள், மறுமை நாள், கழா கத்ர். 📌 தரம் 10 · அத்தியாயம் 1 ஐ மீட்டுக!</span>
            </div>
          </div>
        </div>
      </section>

      {/* subjects + unlock */}
      <section id="unlock" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-6">
        <div className="glass p-7 sm:p-9">
          <p className="eyebrow">Free to start</p>
          <h2 className="display text-3xl sm:text-4xl font-bold mt-2">Chapter 1 of each grade is open.</h2>
          <p className="text-muted mt-3">
            Try everything — notes, flashcards, quiz and past papers — for free. When you&apos;re ready, unlock the full subject: contact us and an
            admin activates your account, usually the same day.
          </p>
          <ol className="mt-6 space-y-3 text-sm">
            {["Sign in with Google or email", "Find your student code on your profile", "Contact us to unlock — we activate the subject for you"].map(
              (s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="grid place-items-center w-7 h-7 rounded-full bg-electric/40 font-bold text-xs">{i + 1}</span> {s}
                </li>
              ),
            )}
          </ol>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href={viewer ? "/unlock" : "/login?next=/unlock"} className="btn btn-gold">
              <Lock size={16} /> How to unlock
            </Link>
            <Link href={cta.href} className="btn btn-ghost">
              {cta.label}
            </Link>
          </div>
        </div>
        <div className="glass p-7 sm:p-9">
          <p className="eyebrow">Subjects</p>
          <h2 className="display text-3xl sm:text-4xl font-bold mt-2">Islam first. More on the way.</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link href={`/subjects/${subject.id}`} className="glass glass-hover !rounded-2xl p-4 border-neon/50 col-span-2 sm:col-span-1">
              <span className="text-2xl">☪️</span>
              <p className="font-bold mt-2">Islam</p>
              <p className="text-xs text-green font-bold">Live · O/L</p>
            </Link>
            {upcomingSubjects.map((s) => (
              <div key={s.name} className="glass !rounded-2xl p-4 opacity-60">
                <Icon name={s.icon} size={24} className="text-lilac" />
                <p className="font-bold mt-2">{s.name}</p>
                <p className="text-xs text-muted">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-line mt-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row gap-6 justify-between items-center">
          <Logo />
          <p className="text-sm text-muted text-center">Play · Learn · Level up — made for Sri Lankan O/L students.</p>
          <p className="text-xs text-faint">© {new Date().getFullYear()} StudyBuddy</p>
        </div>
      </footer>
    </div>
  );
}
