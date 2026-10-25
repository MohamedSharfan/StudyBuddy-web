import Link from "next/link";
import { Check, Lock } from "lucide-react";
import type { ChapterSummary } from "@/lib/catalog";

export type StarState = "done" | "progress" | "open" | "locked";

export type StarItem = {
  chapter: ChapterSummary;
  href: string;
  state: StarState;
  steps: boolean[]; // notes, flashcards, quiz, past papers
  next?: boolean;
};

/** Chapters of one grade as a simple list: number, title, step progress and lock state. */
export function ChapterList({ items }: { items: StarItem[] }) {
  return (
    <ol className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
      {items.map((it) => {
        const c = it.chapter;
        const locked = it.state === "locked";
        return (
          <li key={c.id} className="min-w-0">
            <Link
              href={it.href}
              className={`glass glass-hover flex items-center gap-3.5 p-3.5 ${it.next ? "!border-gold/60" : ""}`}
              aria-label={`Chapter ${c.number}: ${c.title}${locked ? " (locked)" : ""}`}
            >
              <span
                className={`grid place-items-center w-10 h-10 rounded-xl flex-none font-bold ${
                  it.state === "done" ? "bg-green text-bg" : locked ? "bg-white/[.04] text-faint" : "bg-card-2 text-white"
                }`}
              >
                {it.state === "done" ? <Check size={18} strokeWidth={3} /> : locked ? <Lock size={16} /> : c.number}
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-2 text-xs text-muted">
                  Chapter {c.number}
                  {c.free && <span className="text-green font-semibold">Free</span>}
                  {it.next && <span className="text-gold font-semibold">Up next</span>}
                </span>
                <span lang="ta" className={`block font-semibold leading-snug truncate ${locked ? "text-muted" : ""}`}>
                  {c.title}
                </span>
              </span>
              <span className="hidden sm:flex gap-1 flex-none" aria-hidden>
                {it.steps.map((s, k) => (
                  <span key={k} className={`h-1.5 w-4 rounded-full ${s ? "bg-green" : "bg-white/10"}`} />
                ))}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
