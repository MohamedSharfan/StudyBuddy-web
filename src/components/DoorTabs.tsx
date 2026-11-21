"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";

// step: index into the chapter's steps (notes, flashcards, quiz, past papers); the map has no step.
const TABS = [
  { slug: "", label: "Overview" },
  { slug: "notes", label: "Notes", step: 0 },
  { slug: "flashcards", label: "Flashcards", step: 1 },
  { slug: "quiz", label: "Quiz", step: 2 },
  { slug: "past-papers", label: "Past papers", step: 3 },
  { slug: "map", label: "Map" },
];

export function DoorTabs({
  base,
  steps,
  pastPapers = true,
  map = false,
}: {
  base: string;
  steps: boolean[];
  pastPapers?: boolean;
  map?: boolean;
}) {
  const path = usePathname();
  const tabs = TABS.filter((t) => (t.slug === "past-papers" ? pastPapers : t.slug === "map" ? map : true));
  return (
    <nav className="flex gap-1 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0" aria-label="Chapter sections">
      {tabs.map(({ slug, label, step }) => {
        const href = slug ? `${base}/${slug}` : base;
        const active = slug ? path.startsWith(href) : path === base;
        const done = step !== undefined && steps[step];
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
            {done && <Check size={14} strokeWidth={3} className="text-gold" />}
          </Link>
        );
      })}
    </nav>
  );
}
