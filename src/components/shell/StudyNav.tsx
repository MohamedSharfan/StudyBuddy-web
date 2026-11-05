"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Languages, LayoutGrid, MessageCircle } from "lucide-react";
import { teacherWhatsAppLink } from "@/lib/config";

/** Navigation for the free launch (no accounts): study, subjects, ask a tutor, change medium. */
function useItems(studyHref: string) {
  const path = usePathname();
  return [
    { href: studyHref, label: "Chapters", icon: BookOpen, active: path.startsWith("/learn") || path.startsWith("/subjects/") },
    { href: "/subjects", label: "Subjects", icon: LayoutGrid, active: path === "/subjects" },
    { href: teacherWhatsAppLink(), label: "Ask tutor", icon: MessageCircle, external: true, active: false },
    { href: "/?change=1", label: "Medium", icon: Languages, active: false },
  ];
}

export function StudySideNav({ studyHref }: { studyHref: string }) {
  const items = useItems(studyHref);
  return (
    <nav className="flex flex-col gap-1.5" aria-label="Main">
      {items.map(({ href, label, icon: I, active, external }) => {
        const cls = `flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold ${
          active ? "bg-card-2 text-white" : "text-muted hover:text-white hover:bg-white/[.04]"
        }`;
        const inner = (
          <>
            <I size={19} className={active ? "text-gold" : ""} /> {label === "Medium" ? "Change medium" : label === "Ask tutor" ? "Ask a tutor" : label}
          </>
        );
        return external ? (
          <a key={label} href={href} target="_blank" rel="noreferrer" className={cls}>
            {inner}
          </a>
        ) : (
          <Link key={label} href={href} aria-current={active ? "page" : undefined} className={cls}>
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}

export function StudyBottomNav({ studyHref }: { studyHref: string }) {
  const items = useItems(studyHref);
  return (
    <nav
      aria-label="Main"
      className="app-bottomnav lg:hidden fixed bottom-0 inset-x-0 z-40 bg-bg-2 border-t border-line px-1 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] flex justify-around"
    >
      {items.map(({ href, label, icon: I, active, external }) => {
        const inner = (
          <>
            <I size={22} className={active ? "text-gold" : "text-muted"} />
            <span className={`text-[11px] font-semibold ${active ? "text-white" : "text-muted"}`}>{label}</span>
          </>
        );
        const cls = "flex flex-col items-center gap-0.5 px-2 py-1.5 min-w-[68px] min-h-[52px] justify-center";
        return external ? (
          <a key={label} href={href} target="_blank" rel="noreferrer" className={cls}>
            {inner}
          </a>
        ) : (
          <Link key={label} href={href} className={cls} aria-current={active ? "page" : undefined}>
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
