"use client";

import { useCallback, useState, useTransition } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { awardActivity, type AwardResult } from "@/app/actions";
import { BADGES, type CompletionKind } from "@/lib/gamification";
import { Panda } from "@/components/ui/Panda";

export function burst() {
  const colors = ["#fbbf24", "#a855f7", "#22d3ee", "#ec4899", "#ffffff"];
  confetti({ particleCount: 90, spread: 75, origin: { y: 0.65 }, colors, disableForReducedMotion: true });
  setTimeout(() => confetti({ particleCount: 50, spread: 110, origin: { y: 0.55 }, colors, scalar: 0.8, disableForReducedMotion: true }), 220);
}

const TITLES: Record<CompletionKind, string> = {
  lesson: "Lesson complete!",
  flashcards: "Flashcards cleared!",
  quiz: "Quiz conquered!",
  pastpaper: "Exam vault cracked!",
};

export function useAward(kind: CompletionKind, itemId: string) {
  const [result, setResult] = useState<AwardResult | null>(null);
  const [pending, start] = useTransition();
  const claim = useCallback(
    (answers?: Record<number, string>) =>
      new Promise<AwardResult>((resolve) => {
        start(async () => {
          const r = await awardActivity(kind, itemId, answers);
          setResult(r);
          if (r.ok && r.passed && r.coinsAwarded) burst();
          resolve(r);
        });
      }),
    [kind, itemId],
  );
  return { result, pending, claim, clear: () => setResult(null) };
}

export function RewardModal({ kind, result, onClose, nextHref, nextLabel }: { kind: CompletionKind; result: AwardResult | null; onClose: () => void; nextHref?: string; nextLabel?: string }) {
  if (!result) return null;
  const badges = BADGES.filter((b) => result.newBadges?.includes(b.code));
  let title = TITLES[kind];
  let body: React.ReactNode = null;

  if (!result.ok && result.needsLogin) {
    title = "Nice work!";
    body = <p className="text-muted">Sign in to save this and earn coins, streaks and ranks.</p>;
  } else if (!result.ok) {
    title = "Couldn't save";
    body = <p className="text-muted">{result.error}</p>;
  } else if (!result.passed) {
    title = "Almost there!";
    body = (
      <p className="text-muted">
        You scored <b className="text-white">{result.score}%</b> ({result.correct}/{result.total}). Score 80% or higher to conquer it and earn coins.
      </p>
    );
  } else if (result.already) {
    body = (
      <p className="text-muted">
        {result.score !== undefined && (
          <>
            You scored <b className="text-white">{result.score}%</b>.{" "}
          </>
        )}
        Coins for this one were already collected — great revision!
      </p>
    );
  } else {
    body = (
      <>
        {result.score !== undefined && (
          <p className="text-muted">
            {result.correct}/{result.total} correct · <b className="text-white">{result.score}%</b>
          </p>
        )}
        <p className="display text-5xl font-bold text-gold flex items-center justify-center gap-3 mt-3 pop">
          <span className="coin" /> +{result.coinsAwarded}
        </p>
        <p className="text-sm text-muted mt-2">
          {result.coins} coins · 🔥 {result.streak} day streak · {result.rank}
        </p>
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-bg/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="glass w-full max-w-[400px] p-7 text-center pop shadow-[0_30px_80px_-20px_rgba(124,58,237,.8)]" onClick={(e) => e.stopPropagation()}>
        <Panda size={92} mood={result.ok && result.passed ? "wink" : "think"} className="mx-auto float" />
        <h2 className="display text-3xl font-bold mt-3">{title}</h2>
        <div className="mt-2">{body}</div>
        {badges.length > 0 && (
          <div className="mt-5 rounded-2xl bg-gold/10 border border-gold/30 p-3">
            <p className="text-xs font-extrabold text-gold tracking-widest">NEW BADGE{badges.length > 1 ? "S" : ""}</p>
            {badges.map((b) => (
              <p key={b.code} className="font-bold mt-1">
                🏅 {b.title}
              </p>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2 mt-6">
          {!result.ok && result.needsLogin ? (
            <Link href="/login" className="btn btn-gold">
              Sign in to save
            </Link>
          ) : (
            nextHref && (
              <Link href={nextHref} className="btn btn-gold">
                {nextLabel ?? "Next"}
              </Link>
            )
          )}
          <button className="btn btn-ghost" onClick={onClose}>
            {result.ok && !result.passed ? "Try again" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
