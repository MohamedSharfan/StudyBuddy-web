import Link from "next/link";
import { BookOpen, Lock, Sparkles } from "lucide-react";
import { Panda } from "@/components/ui/Panda";
import type { ChapterSummary } from "@/lib/catalog";
import type { Viewer } from "@/lib/session";

export function LockedPanel({ chapter, viewer }: { chapter: ChapterSummary; viewer: Viewer | null }) {
  return (
    <div className="glass p-8 sm:p-12 text-center max-w-[640px] mx-auto relative overflow-hidden rise">
      <div className="absolute inset-x-0 -top-24 h-48 bg-gold/10 blur-3xl" />
      <div className="relative mx-auto w-fit">
        <Panda size={110} mood="think" />
        <span className="absolute -bottom-1 -right-2 grid place-items-center w-10 h-10 rounded-full bg-gold text-bg shadow-[0_0_20px_rgba(251,191,36,.6)]">
          <Lock size={18} />
        </span>
      </div>
      <h2 className="display text-3xl font-bold mt-6">This star is still locked</h2>
      <p className="text-muted mt-3">
        Chapter {chapter.number} has {chapter.counts.flashcards} flashcards, {chapter.counts.quiz} quiz questions and{" "}
        {chapter.counts.mcq + chapter.counts.structured} past-paper questions waiting for you.
      </p>
      {chapter.objectives.length > 0 && (
        <ul lang="ta" className="mt-5 text-left mx-auto w-fit space-y-1.5 text-sm text-muted">
          {chapter.objectives.slice(0, 4).map((o) => (
            <li key={o} className="flex gap-2">
              <span className="text-gold">✦</span> {o}
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {viewer ? (
          <Link href="/unlock" className="btn btn-gold">
            <Sparkles size={16} /> Unlock the full subject
          </Link>
        ) : (
          <Link href="/login?next=/unlock" className="btn btn-gold">
            <Sparkles size={16} /> Sign in to unlock
          </Link>
        )}
        <Link href={`/learn/${chapter.id.replace(/-\d{2}-\d{2}$/, "")}/${chapter.grade}/1`} className="btn btn-ghost">
          <BookOpen size={16} /> Try the free chapter
        </Link>
      </div>
    </div>
  );
}
