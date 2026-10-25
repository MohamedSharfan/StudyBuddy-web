import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Bot, Brain, Check, Layers, ScrollText } from "lucide-react";
import { ExamRadar } from "@/components/ExamRadar";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { catalog, chapterHref, subjectTotals } from "@/lib/catalog";
import { AL_STREAMS, OL_UPCOMING } from "@/lib/levels";
import { getViewer } from "@/lib/session";

export default async function Landing() {
  const viewer = await getViewer();
  const subject = catalog.subjects[0];
  const totals = subjectTotals(subject.id);

  // The chapter that appeared in the most past-paper years, as a sample.
  const radarChapter = subject.grades
    .flatMap((g) => g.chapters)
    .sort((a, b) => Object.keys(b.years).length - Object.keys(a.years).length)[0];

  const cta = viewer ? { href: "/home", label: "Open my dashboard" } : { href: "/login", label: "Start free" };

  return (
    <div className="overflow-x-clip">
      <header className="sticky top-0 z-40 bg-bg border-b border-line">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-muted">
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#subjects" className="hover:text-white">Subjects</a>
            <a href="#unlock" className="hover:text-white">Pricing</a>
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

      <section className="max-w-[1120px] mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-14 grid lg:grid-cols-[1.2fr_.8fr] gap-10 items-center">
        <div>
          <p className="chip">For Sri Lankan O/L and A/L students</p>
          <h1 className="display text-[2.3rem] sm:text-[3.4rem] font-bold leading-[1.1] mt-5">Study for your exams, one chapter at a time.</h1>
          <p className="text-lg text-muted mt-5 max-w-[540px]">
            Short notes, flashcards, quizzes and ten years of past-paper questions for every chapter. Earn coins and keep your streak going while
            you revise.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href={cta.href} className="btn btn-gold !min-h-[50px] !px-6 !text-base">
              {cta.label} <ArrowRight size={18} />
            </Link>
            <Link href={chapterHref(subject.id, 10, 1)} className="btn btn-ghost !min-h-[50px] !px-6">
              Try a free chapter
            </Link>
          </div>
          <p className="text-sm text-muted mt-6">
            Live now: <b className="text-white">O/L {subject.name}</b> ({subject.medium} medium, Grade 10 &amp; 11). More subjects and A/L streams are
            coming.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[360px]">
          <div className="relative aspect-square rounded-[28px] overflow-hidden border border-line">
            <Image src="/logo.jpg" alt="StudyBuddy panda mascot" fill sizes="360px" className="object-cover" priority />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-bg-2">
        <dl className="max-w-[1120px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            [totals.chapters, "chapters"],
            [totals.quiz, "quiz questions"],
            [totals.flashcards, "flashcards"],
            [totals.mcq + totals.structured, "past-paper questions"],
          ].map(([n, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd className="text-2xl sm:text-3xl font-bold">{n}</dd>
              <dd className="text-sm text-muted">{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="how" className="max-w-[1120px] mx-auto px-4 sm:px-6 py-16">
        <h2 className="display text-3xl sm:text-4xl font-bold">How each chapter works</h2>
        <p className="text-muted mt-2 max-w-[600px]">Four steps, in order. Finish all four and the chapter is done.</p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { icon: BookOpen, t: "Notes", d: "Clear notes in your medium, with key points and exam tips highlighted.", coins: 1 },
            { icon: Layers, t: "Flashcards", d: "Flip through cards and repeat the ones you missed until you know them all.", coins: 2 },
            { icon: Brain, t: "Quiz", d: "Instant feedback with explanations. Score 80% to pass.", coins: 5 },
            { icon: ScrollText, t: "Past papers", d: "Real exam questions from 2016–2025 for this chapter, with answers.", coins: 5 },
          ].map(({ icon: I, t, d, coins }, i) => (
            <li key={t} className="glass p-5">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-card-2">
                <I size={20} />
              </span>
              <h3 className="font-bold text-lg mt-4">
                {i + 1}. {t}
              </h3>
              <p className="text-sm text-muted mt-1">{d}</p>
              <p className="text-sm font-semibold mt-4 flex items-center gap-1.5 text-gold">
                <span className="coin" /> +{coins} coins
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-[1120px] mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="display text-3xl sm:text-4xl font-bold">Know what to revise first</h2>
          <p className="text-muted mt-3">
            Every past-paper question is matched to its chapter, so you can see which chapters come up most often and spend your time where it
            counts.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {[`${totals.mcq} MCQs and ${totals.structured} structured questions`, "Model answers for structured questions", "Sorted by chapter and year"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check size={16} className="text-green" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p lang="ta" className="text-sm text-muted mb-2">
            Example: Grade {radarChapter.grade} · Chapter {radarChapter.number} · {radarChapter.title}
          </p>
          <ExamRadar years={radarChapter.years} />
        </div>
      </section>

      <section className="max-w-[1120px] mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-[auto_1fr] gap-6 items-center">
        <span className="grid place-items-center w-16 h-16 rounded-2xl bg-card-2">
          <Bot size={30} className="text-lilac" />
        </span>
        <div>
          <h2 className="display text-2xl sm:text-3xl font-bold">Ask AI Panda when you&apos;re stuck</h2>
          <p className="text-muted mt-2 max-w-[640px]">
            Panda answers from the StudyBuddy notes, in Tamil or English, and tells you which chapter to revise.
          </p>
        </div>
      </section>

      <section id="subjects" className="max-w-[1120px] mx-auto px-4 sm:px-6 py-16">
        <h2 className="display text-3xl sm:text-4xl font-bold">Subjects</h2>
        <p className="text-muted mt-2">We&apos;re starting with O/L and adding more every term.</p>
        <div className="grid lg:grid-cols-2 gap-5 mt-8">
          <div className="glass p-6">
            <p className="font-bold">O/L · Grade 10 &amp; 11</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {catalog.subjects
                .filter((s) => s.level === "O/L")
                .map((s) => (
                  <Link key={s.id} href={`/subjects/${s.id}`} className="rounded-xl border border-green/40 p-3 hover:bg-white/[.03]">
                    <Icon name={s.icon ?? "book-open"} size={20} className="text-green" />
                    <p className="font-semibold mt-2">{s.name}</p>
                    <p className="text-xs text-green">Live</p>
                  </Link>
                ))}
              {OL_UPCOMING.map((s) => (
                <div key={s.name} className="rounded-xl border border-line p-3">
                  <Icon name={s.icon} size={20} className="text-muted" />
                  <p className="font-semibold mt-2">{s.name}</p>
                  <p className="text-xs text-muted">Coming soon</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass p-6">
            <p className="font-bold">A/L · Grade 12 &amp; 13</p>
            <ul className="mt-4 divide-y divide-line">
              {AL_STREAMS.map((s) => (
                <li key={s.id} className="py-2.5 flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-semibold">{s.name}</span>
                  <span className="text-xs text-muted">Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="unlock" className="max-w-[1120px] mx-auto px-4 sm:px-6 py-16">
        <div className="glass p-6 sm:p-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="display text-3xl font-bold">Chapter 1 is free</h2>
            <p className="text-muted mt-2">
              Try the notes, flashcards, quiz and past papers of Chapter 1 in each grade. When you&apos;re ready, unlock the full subject and we
              activate it on your account, usually the same day.
            </p>
          </div>
          <div>
            <ol className="space-y-3 text-sm">
              {["Sign in with Google or email", "Choose O/L or A/L and your grade", "Contact us with your student code to unlock"].map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="grid place-items-center w-7 h-7 rounded-full bg-card-2 font-bold text-xs flex-none">{i + 1}</span> {s}
                </li>
              ))}
            </ol>
            <Link href={cta.href} className="btn btn-gold mt-6">
              {cta.label} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-line mt-6">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Logo />
          <p className="text-sm text-muted">© {new Date().getFullYear()} StudyBuddy · Play · Learn · Level up</p>
        </div>
      </footer>
    </div>
  );
}
