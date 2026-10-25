"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, RotateCcw, Shuffle, X } from "lucide-react";
import type { CompletionKind } from "@/lib/gamification";
import { RewardModal, useAward } from "@/components/Reward";
import { ProgressRing } from "@/components/ui/ProgressRing";

export type RunnerQuestion = {
  prompt: string;
  options: { key: string; text: string }[];
  answer: string;
  explanation: string;
  meta?: string[];
  note?: string;
};

function Dot({ state, current }: { state: "right" | "wrong" | "todo"; current: boolean }) {
  return (
    <span
      className={`block w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex-none ${current ? "ring-2 ring-white ring-offset-2 ring-offset-bg" : ""} ${
        state === "right" ? "bg-green" : state === "wrong" ? "bg-pink" : "bg-white/15"
      }`}
    />
  );
}

export function QuizRunner({
  questions,
  kind,
  itemId,
  done,
  nextHref,
  nextLabel,
  title,
}: {
  questions: RunnerQuestion[];
  kind: CompletionKind;
  itemId: string;
  done: boolean;
  nextHref?: string;
  nextLabel?: string;
  title?: string;
}) {
  const baseOrder = useMemo(() => questions.map((_, i) => i), [questions]);
  const [order, setOrder] = useState(baseOrder);
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [finished, setFinished] = useState(false);
  const { result, pending, claim, clear } = useAward(kind, itemId);

  const qi = order[pos];
  const q = questions[qi];
  const picked = answers[qi];
  const correctCount = order.filter((i) => answers[i] === questions[i].answer).length;

  const pick = useCallback(
    (key: string) => {
      if (picked || finished) return;
      setAnswers((a) => ({ ...a, [qi]: key }));
    },
    [picked, finished, qi],
  );

  const next = useCallback(async () => {
    if (!picked) return;
    if (pos < order.length - 1) {
      setPos((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setFinished(true);
      await claim(answers);
    }
  }, [picked, pos, order.length, claim, answers]);

  const restart = (shuffle: boolean) => {
    const o = [...baseOrder];
    if (shuffle)
      for (let i = o.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [o[i], o[j]] = [o[j], o[i]];
      }
    setOrder(o);
    setAnswers({});
    setPos(0);
    setFinished(false);
    clear();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished) return;
      const k = e.key.toUpperCase();
      const idx = ["1", "2", "3", "4"].indexOf(k);
      if (idx >= 0 && q?.options[idx]) pick(q.options[idx].key);
      else if (["A", "B", "C", "D"].includes(k) && q?.options.some((o) => o.key === k)) pick(k);
      else if (e.key === "Enter") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q, pick, next, finished]);

  if (!questions.length) return <p className="text-muted">No questions here yet.</p>;

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    const wrong = order.filter((i) => answers[i] !== questions[i].answer);
    return (
      <div className="max-w-[820px] mx-auto space-y-5">
        <div className="glass p-8 text-center">
          <ProgressRing value={pct} size={140} stroke={11}>
            <span className="display text-4xl font-bold">{pct}%</span>
          </ProgressRing>
          <h2 className="display text-3xl font-bold mt-4">{pct >= 80 ? "Conquered! 🌙" : pct >= 50 ? "Good effort!" : "Keep going!"}</h2>
          <p className="text-muted mt-1">
            {correctCount} of {questions.length} correct{pct < 80 && " · 80% needed to pass"}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {nextHref && pct >= 80 && (
              <Link href={nextHref} className="btn btn-gold">
                {nextLabel ?? "Next"} <ArrowRight size={16} />
              </Link>
            )}
            <button onClick={() => restart(true)} className="btn btn-ghost" disabled={pending}>
              <Shuffle size={16} /> Retry shuffled
            </button>
            {wrong.length > 0 && (
              <button
                onClick={() => {
                  setOrder(wrong);
                  setAnswers({});
                  setPos(0);
                  setFinished(false);
                  clear();
                }}
                className="btn btn-ghost"
              >
                <RotateCcw size={16} /> Practise {wrong.length} missed
              </button>
            )}
          </div>
          {order.length < questions.length && <p className="text-xs text-faint mt-3">Coins are awarded for a full run of all questions.</p>}
        </div>
        {wrong.length > 0 && (
          <div className="glass p-5 sm:p-6" lang="ta">
            <h3 className="font-extrabold mb-4">Review what you missed</h3>
            <ol className="space-y-4">
              {wrong.map((i) => {
                const w = questions[i];
                const yours = w.options.find((o) => o.key === answers[i]);
                const right = w.options.find((o) => o.key === w.answer);
                return (
                  <li key={i} className="rounded-2xl border border-line p-4">
                    <p className="font-bold whitespace-pre-wrap">{w.prompt}</p>
                    {yours && (
                      <p className="text-sm mt-2 text-pink">
                        ✗ {yours.key}. {yours.text}
                      </p>
                    )}
                    <p className="text-sm mt-1 text-green">
                      ✓ {right?.key}. {right?.text}
                    </p>
                    {w.explanation && <p className="text-sm text-muted mt-2">{w.explanation}</p>}
                  </li>
                );
              })}
            </ol>
          </div>
        )}
        <RewardModal kind={kind} result={order.length === questions.length ? result : null} onClose={clear} nextHref={nextHref} nextLabel={nextLabel} />
      </div>
    );
  }

  const isRight = picked && picked === q.answer;

  return (
    <div className="max-w-[820px] mx-auto">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-sm font-bold text-muted">
          {title ?? "Question"} {pos + 1} <span className="text-faint">/ {order.length}</span>
          {done && <span className="ml-2 text-gold">· completed before</span>}
        </p>
        <span className="chip !text-gold !border-gold/30">
          <Check size={13} /> {correctCount}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-6" aria-hidden>
        {order.map((i, k) => (
          <Dot key={k} current={k === pos} state={answers[i] ? (answers[i] === questions[i].answer ? "right" : "wrong") : "todo"} />
        ))}
      </div>

      <div key={qi} className="glass p-5 sm:p-8" lang="ta">
        {q.meta && q.meta.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {q.meta.filter(Boolean).map((m) => (
              <span key={m} className="chip">
                {m}
              </span>
            ))}
          </div>
        )}
        <h2 className="text-lg sm:text-xl font-bold leading-relaxed whitespace-pre-wrap">{q.prompt}</h2>
        <div className="grid gap-3 mt-6" role="radiogroup">
          {q.options.map((o, i) => {
            const chosen = picked === o.key;
            const correct = picked && o.key === q.answer;
            const wrong = chosen && o.key !== q.answer;
            return (
              <button
                key={o.key}
                role="radio"
                aria-checked={chosen}
                onClick={() => pick(o.key)}
                disabled={Boolean(picked)}
                className={`group flex items-center gap-4 text-left rounded-2xl border-2 px-4 py-3.5 transition-all ${
                  correct
                    ? "border-green bg-green/15"
                    : wrong
                      ? "border-pink bg-pink/15 shake"
                      : picked
                        ? "border-line opacity-60"
                        : "border-line bg-white/[.03] hover:border-neon hover:bg-electric/15 hover:-translate-y-0.5"
                }`}
              >
                <span
                  className={`grid place-items-center w-9 h-9 rounded-xl font-extrabold flex-none ${
                    correct ? "bg-green text-bg" : wrong ? "bg-pink text-white" : "bg-electric/40 group-hover:bg-electric"
                  }`}
                >
                  {correct ? <Check size={18} strokeWidth={3} /> : wrong ? <X size={18} strokeWidth={3} /> : o.key}
                </span>
                <span className="font-semibold leading-snug">{o.text}</span>
                <kbd className="ml-auto hidden sm:block text-[10px] text-faint">{i + 1}</kbd>
              </button>
            );
          })}
        </div>

        {picked && (
          <div className={`mt-6 rounded-2xl p-4 border pop ${isRight ? "bg-green/10 border-green/40" : "bg-pink/10 border-pink/40"}`}>
            <p className="font-extrabold">{isRight ? "✓ Correct!" : `✗ The answer is ${q.answer}`}</p>
            {q.explanation && <p className="text-[0.95rem] text-muted mt-1.5 leading-relaxed">{q.explanation}</p>}
            {q.note && <p className="text-xs text-faint mt-2">{q.note}</p>}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-5">
        <button onClick={next} disabled={!picked || pending} className="btn btn-gold !min-h-[52px] !px-7">
          {pos < order.length - 1 ? "Next" : "See results"} <ArrowRight size={18} />
        </button>
      </div>
      <p className="text-center text-[11px] text-faint mt-4 hidden sm:block">Keys: 1–4 or A–D to answer · Enter for next</p>
    </div>
  );
}
