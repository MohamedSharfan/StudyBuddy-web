"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";

const TABS = [
  { slug: "", label: "Overview" },
  { slug: "notes", label: "Notes" },
  { slug: "flashcards", label: "Flashcards" },
  { slug: "quiz", label: "Quiz" },
  { slug: "past-papers", label: "Past papers" },
];

export function DoorTabs({ base, steps }: { base: string; steps: boolean[] }) {
  const path = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0" aria-label="Chapter sections">
      {TABS.map(({ slug, label }, i) => {
        const href = slug ? `${base}/${slug}` : base;
        const active = slug ? path.startsWith(href) : path === base;
        const done = i > 0 && steps[i - 1];
        return (
          <Link
            key={label}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex-none flex items-center gap-1.5 px-3.5 py-3 -mb-px border-b-2 font-semibold text-sm ${
              active ? "border-gold text-white" : "border-transparent text-muted hover:text-white"
            }`}
          >
            {label}
            {done && <Check size={14} strokeWidth={3} className="text-green" />}
          </Link>
        );
      })}
    </nav>
  );
}
