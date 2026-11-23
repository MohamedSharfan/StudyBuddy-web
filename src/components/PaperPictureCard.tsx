"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, Check, Eye, EyeOff, Maximize2, Target, X } from "lucide-react";
import type { PaperPicture } from "@/lib/pictures";
import { RichText } from "@/components/RichText";

/**
 * One past-paper picture question (Part II, Q1 (b)): the picture, its four questions and the answers.
 * Students answer in their head, reveal each answer and tick whether they got it — like the 1 mark per answer in the exam.
 */
export function PaperPictureCard({ q, lang, chapterHref }: { q: PaperPicture; lang: string; chapterHref?: string | null }) {
  const en = lang === "en";
  const [shown, setShown] = useState<boolean[]>(() => q.questions.map(() => false));
  const [marks, setMarks] = useState<(boolean | null)[]>(() => q.questions.map(() => null));
  const [showText, setShowText] = useState(false);
  const all = shown.every(Boolean);
  const marked = marks.filter((m) => m !== null).length;
  const score = marks.filter(Boolean).length;

  const reveal = (i: number) => setShown((s) => s.map((v, k) => (k === i ? !v : v)));
  const mark = (i: number, ok: boolean) => setMarks((m) => m.map((v, k) => (k === i ? (v === ok ? null : ok) : v)));

  return (
    <article className="glass p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip !text-gold !border-gold/40">
          <CalendarDays size={14} /> {q.year}
        </span>
        <span className="chip">
          {en ? `Q1 (b)(${q.part}) · Picture ${q.label}` : `வினா 1 (ஆ)(${q.part}) · படம் ${q.label}`}
        </span>
        <span className="chip">
          <Target size={14} /> {q.marks} {en ? "marks" : "புள்ளிகள்"}
        </span>
        {chapterHref && (
          <Link href={chapterHref} className="chip hover:!text-white">
            {en ? `Grade ${q.grade} · Chapter ${q.chapter}` : `தரம் ${q.grade} · அலகு ${q.chapter}`}
          </Link>
        )}
      </div>

      <div className="relative mt-4 rounded-2xl bg-white p-2 sm:p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={q.src}
          width={q.w}
          height={q.h}
          alt={en ? `${q.year} picture ${q.label}` : `${q.year} படம் ${q.label}`}
          loading="lazy"
          decoding="async"
          className="block mx-auto w-auto max-w-full h-auto max-h-[460px] rounded-lg"
        />
        <a
          href={q.src}
          target="_blank"
          rel="noreferrer"
          className="absolute top-2 right-2 grid place-items-center w-9 h-9 rounded-xl bg-black/60 text-white hover:bg-black/80"
          aria-label={en ? "Open the picture full size" : "படத்தை முழு அளவில் திறக்க"}
        >
          <Maximize2 size={16} />
        </a>
      </div>

      {q.intro && <p className="text-sm text-muted mt-4">{q.intro}</p>}

      <ol className="mt-4 space-y-2.5">
        {q.questions.map((text, i) => (
          <li key={i} className="rounded-2xl border border-line bg-card-2/60 p-3.5">
            <div className="flex gap-3">
              <span className="grid place-items-center w-7 h-7 rounded-lg bg-card-2 text-gold text-sm font-bold flex-none">{i + 1}</span>
              <p className="flex-1 min-w-0 font-semibold leading-relaxed pt-0.5">{text}</p>
            </div>
            {q.answers.length > 0 && (
              <div className="mt-2.5 pl-10">
                {shown[i] ? (
                  <div className="flex flex-wrap items-center gap-2 pop">
                    <p className="flex-1 min-w-[12rem] rounded-xl border border-gold/50 bg-card-2 px-3 py-2 text-[0.95rem]">
                      <span className="text-gold font-bold">{en ? "Answer: " : "விடை: "}</span>
                      {q.answers[i]}
                    </p>
                    <span className="flex gap-1.5" role="group" aria-label={en ? "Did you get it?" : "சரியாகச் சொன்னீர்களா?"}>
                      <button
                        type="button"
                        onClick={() => mark(i, true)}
                        aria-pressed={marks[i] === true}
                        aria-label={en ? "I got it" : "சரி"}
                        className={`grid place-items-center w-9 h-9 rounded-xl border ${marks[i] === true ? "bg-gold border-gold text-bg" : "border-line text-muted hover:text-white"}`}
                      >
                        <Check size={16} strokeWidth={3} />
                      </button>
                      <button
                        type="button"
                        onClick={() => mark(i, false)}
                        aria-pressed={marks[i] === false}
                        aria-label={en ? "I missed it" : "தவறு"}
                        className={`grid place-items-center w-9 h-9 rounded-xl border ${marks[i] === false ? "bg-lilac border-lilac text-bg" : "border-line text-muted hover:text-white"}`}
                      >
                        <X size={16} strokeWidth={3} />
                      </button>
                    </span>
                  </div>
                ) : (
                  <button type="button" onClick={() => reveal(i)} className="text-sm font-semibold text-lilac hover:text-white flex items-center gap-1.5">
                    <Eye size={14} /> {en ? "Show answer" : "விடையைக் காட்டு"}
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
        {q.answers.length > 0 ? (
          <button
            type="button"
            onClick={() => setShown(q.questions.map(() => !all))}
            className={`btn btn-sm ${all ? "btn-ghost" : ""}`}
            aria-expanded={all}
          >
            {all ? <EyeOff size={15} /> : <Eye size={15} />} {all ? (en ? "Hide answers" : "விடைகளை மறை") : en ? "Show all answers" : "எல்லா விடைகளையும் காட்டு"}
          </button>
        ) : (
          <button type="button" onClick={() => setShowText((s) => !s)} className="btn btn-sm" aria-expanded={showText}>
            {showText ? <EyeOff size={15} /> : <Eye size={15} />} {en ? "Model answer" : "மாதிரி விடை"}
          </button>
        )}
        {marked > 0 && (
          <span className="chip !text-gold !border-gold/40 pop" aria-live="polite">
            {en ? `Your score: ${score}/${q.questions.length}` : `உங்கள் புள்ளி: ${score}/${q.questions.length}`}
          </span>
        )}
      </div>
      {showText && q.answerText && (
        <div className="mt-3 rounded-2xl p-4 bg-card-2 border border-gold/50">
          <RichText text={q.answerText} />
        </div>
      )}
    </article>
  );
}
