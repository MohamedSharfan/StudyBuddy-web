import Link from "next/link";
import { BookOpen, Lock } from "lucide-react";
import type { ChapterSummary } from "@/lib/catalog";
import type { Viewer } from "@/lib/session";

export function LockedPanel({ chapter, viewer }: { chapter: ChapterSummary; viewer: Viewer | null }) {
  return (
    <div className="glass p-6 sm:p-10 text-center max-w-[640px] mx-auto">
      <span className="mx-auto grid place-items-center w-12 h-12 rounded-full bg-gold/15 text-gold">
        <Lock size={22} />
      </span>
      <h2 className="display text-2xl font-bold mt-4">This chapter is locked</h2>
      <p className="text-muted mt-3">
        Chapter {chapter.number} has {chapter.counts.flashcards} flashcards, {chapter.counts.quiz} quiz questions and{" "}
        {chapter.counts.mcq + chapter.counts.structured} past-paper questions waiting for you.
      </p>
      {chapter.objectives.length > 0 && (
        <ul lang="ta" className="mt-5 text-left mx-auto w-fit space-y-1.5 text-sm text-muted">
          {chapter.objectives.slice(0, 4).map((o) => (
            <li key={o} className="flex gap-2">
              <span>•</span> {o}
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {viewer ? (
          <Link href="/unlock" className="btn btn-gold">
            Unlock the full subject
          </Link>
        ) : (
          <Link href="/login?next=/unlock" className="btn btn-gold">
            Sign in to unlock
          </Link>
        )}
        <Link href={`/learn/${chapter.id.replace(/-\d{2}-\d{2}$/, "")}/${chapter.grade}/1`} className="btn btn-ghost">
          <BookOpen size={16} /> Try the free chapter
        </Link>
      </div>
    </div>
  );
}
