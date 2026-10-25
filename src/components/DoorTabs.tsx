"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Brain, Check, DoorOpen, Layers, ScrollText } from "lucide-react";

const TABS = [
  { slug: "", label: "Overview", icon: DoorOpen },
  { slug: "notes", label: "Read", icon: BookOpen },
  { slug: "flashcards", label: "Recall", icon: Layers },
  { slug: "quiz", label: "Quiz", icon: Brain },
  { slug: "past-papers", label: "Exam vault", icon: ScrollText },
];

export function DoorTabs({ base, steps }: { base: string; steps: boolean[] }) {
  const path = usePathname();
  return (
    <nav className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0" aria-label="Chapter sections">
      {TABS.map(({ slug, label, icon: I }, i) => {
        const href = slug ? `${base}/${slug}` : base;
        const active = slug ? path.startsWith(href) : path === base;
        const done = i > 0 && steps[i - 1];
        return (
          <Link
            key={label}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex-none flex items-center gap-2 px-4 py-2.5 rounded-t-[22px] rounded-b-lg border font-bold text-sm transition-all ${
              active
                ? "bg-gradient-to-b from-electric to-royal border-neon/60 text-white shadow-[0_8px_24px_-10px_rgba(124,58,237,1)]"
                : "border-line bg-white/[.03] text-muted hover:text-white hover:border-line-strong"
            }`}
          >
            <I size={16} />
            {label}
            {done && (
              <span className="grid place-items-center w-4.5 h-4.5 rounded-full bg-gold text-bg">
                <Check size={11} strokeWidth={4} />
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
