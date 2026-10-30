"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, LayoutList, RotateCcw, Shuffle, Undo2, X } from "lucide-react";
import type { Flashcard } from "@/lib/content";
import { RewardModal, useAward } from "@/components/Reward";

export function FlashcardDeck({ cards, itemId, done, nextHref }: { cards: Flashcard[]; itemId: string; done: boolean; nextHref: string }) {
  const initial = useMemo(() => cards.map((_, i) => i), [cards]);
  const [queue, setQueue] = useState<number[]>(initial);
  const [known, setKnown] = useState<number[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [exit, setExit] = useState<"left" | "right" | null>(null);
  const [list, setList] = useState(false);
  const [claimed, setClaimed] = useState(done);
  const [rounds, setRounds] = useState(1);
  const { result, pending, claim, clear } = useAward("flashcards", itemId);

  const current = queue[0];
  const finished = queue.length === 0;

  const answer = useCallback(
    (gotIt: boolean) => {
      if (current === undefined || exit) return;
      setExit(gotIt ? "right" : "left");
      setTimeout(() => {
        setQueue((q) => (gotIt ? q.slice(1) : [...q.slice(1), q[0]]));
        if (gotIt) setKnown((k) => [...k, current]);
        else setRounds((r) => r + (queue.length === 1 ? 1 : 0));
        setFlipped(false);
        setExit(null);
      }, 260);
    },
    [current, exit, queue.length],
  );

  const restart = (shuffle = false) => {
    const order = [...initial];
    if (shuffle)
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
    setQueue(order);
    setKnown([]);
    setFlipped(false);
    setRounds(1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (list || (e.target as HTMLElement)?.closest("input,textarea")) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === "ArrowRight") answer(true);
      else if (e.key === "ArrowLeft") answer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answer, list]);

  useEffect(() => {
    if (finished && !claimed && known.length === cards.length && cards.length > 0) {
      claim().then((r) => r.ok && setClaimed(true));
    }
  }, [finished, claimed, known.length, cards.length, claim]);

  const pct = Math.round((known.length / Math.max(1, cards.length)) * 100);

  return (
    <div className="max-w-[760px] mx-auto">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold text-muted mb-1.5">
            <span>
              {known.length}/{cards.length} mastered
            </span>
            <span>Round {rounds}</span>
          </div>
          <div className="bar">
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
        <button onClick={() => restart(true)} className="btn btn-ghost btn-sm" aria-label="Shuffle and restart">
          <Shuffle size={15} />
        </button>
        <button onClick={() => setList((l) => !l)} className={`btn btn-ghost btn-sm ${list ? "!border-neon" : ""}`} aria-pressed={list} aria-label="List view">
          <LayoutList size={15} />
        </button>
      </div>

      {list ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {cards.map((c, i) => (
            <div key={i} className="glass p-4">
              <p className="font-bold">{c.front}</p>
              <p className="text-sm text-muted mt-2 border-t border-line pt-2">{c.back}</p>
            </div>
          ))}
        </div>
      ) : finished ? (
        <div className="glass p-10 text-center pop">
          <p className="text-6xl">🌟</p>
          <h2 className="display text-3xl font-bold mt-3">Deck cleared!</h2>
          <p className="text-muted mt-2">
            All {cards.length} cards mastered in {rounds} round{rounds > 1 ? "s" : ""}.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link href={nextHref} className="btn btn-gold">
              Next door: Quiz →
            </Link>
            <button onClick={() => restart(true)} className="btn btn-ghost" disabled={pending}>
              <RotateCcw size={16} /> Go again
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative h-[360px] sm:h-[380px]">
            {/* the stack behind */}
            {queue.slice(1, 3).map((_, k) => (
              <div
                key={k}
                className="absolute inset-x-6 glass !rounded-[28px]"
                style={{ top: 14 * (k + 1), bottom: -14 * (k + 1), transform: `scale(${1 - 0.05 * (k + 1)})`, opacity: 0.5 - k * 0.2, zIndex: -k - 1 }}
              />
            ))}
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              className={`flip absolute inset-0 w-full text-left ${flipped ? "is-flipped" : ""}`}
              style={{
                transition: "transform .26s ease, opacity .26s ease",
                transform: exit ? `translateX(${exit === "right" ? 120 : -120}%) rotate(${exit === "right" ? 14 : -14}deg)` : undefined,
                opacity: exit ? 0 : 1,
              }}
              aria-label={flipped ? "Show question" : "Show answer"}
            >
              <div className="flip-inner">
                <div className="flip-face glass !bg-card-2 p-7 sm:p-10 flex flex-col">
                  <span className="eyebrow">{queue.length} left · Question</span>
                  <p className="flex-1 grid place-items-center text-center display text-2xl sm:text-3xl font-bold leading-snug">{cards[current].front}</p>
                  <span className="text-center text-xs text-muted">Tap or press Space to flip</span>
                </div>
                <div className="flip-face flip-back glass p-7 sm:p-10 flex flex-col !border-gold/50">
                  <span className="eyebrow !text-gold">Answer</span>
                  <p className="flex-1 grid place-items-center text-center text-lg sm:text-xl font-semibold leading-relaxed">{cards[current].back}</p>
                  <span className="text-center text-xs text-muted">Did you know it?</span>
                </div>
              </div>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-8">
            <button onClick={() => answer(false)} className="btn btn-ghost !min-h-[56px] !border-pink/40 hover:!bg-pink/10">
              <X size={18} className="text-pink" /> Again <kbd className="hidden sm:inline text-[10px] text-faint">←</kbd>
            </button>
            <button onClick={() => answer(true)} className="btn btn-green !min-h-[56px]">
              <Check size={18} /> Got it <kbd className="hidden sm:inline text-[10px] opacity-70">→</kbd>
            </button>
          </div>
          {known.length > 0 && (
            <button
              onClick={() => {
                const last = known[known.length - 1];
                setKnown((k) => k.slice(0, -1));
                setQueue((q) => [last, ...q]);
                setFlipped(false);
              }}
              className="mx-auto mt-4 flex items-center gap-1.5 text-xs text-muted hover:text-white"
            >
              <Undo2 size={13} /> Undo last
            </button>
          )}
        </>
      )}
      <RewardModal kind="flashcards" result={result} onClose={clear} nextHref={nextHref} nextLabel="Next door: Quiz →" />
    </div>
  );
}
