"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, Bot, House, LayoutGrid, ShieldCheck, Trophy, UserRound } from "lucide-react";

const ITEMS = [
  { href: "/home", label: "Home", icon: House, match: ["/home"] },
  { href: "/subjects", label: "Subjects", icon: LayoutGrid, match: ["/subjects", "/learn"] },
  { href: "/leaderboard", label: "Ranks", icon: Trophy, match: ["/leaderboard"] },
  { href: "/panda", label: "Panda", icon: Bot, match: ["/panda"] },
  { href: "/profile", label: "Profile", icon: UserRound, match: ["/profile", "/rewards", "/u/"] },
];

function useActive() {
  const path = usePathname();
  return (match: string[]) => match.some((m) => path === m || path.startsWith(m.endsWith("/") ? m : m + "/") || path.startsWith(m));
}

export function SideNav({ isAdmin }: { isAdmin: boolean }) {
  const isActive = useActive();
  return (
    <nav className="flex flex-col gap-1.5" aria-label="Main">
      {ITEMS.map(({ href, label, icon: I, match }) => {
        const active = isActive(match);
        return (
          <Link
            key={href}
            href={href}
            className={`group flex items-center gap-3 rounded-2xl px-3.5 py-2.5 font-bold transition-all ${
              active ? "bg-gradient-to-r from-electric/45 to-transparent text-white shadow-[inset_3px_0_0_var(--gold)]" : "text-muted hover:text-white hover:bg-white/5"
            }`}
          >
            <I size={20} className={active ? "text-gold" : "group-hover:scale-110 transition-transform"} />
            {label}
          </Link>
        );
      })}
      <Link href="/subjects/islam-ol" className="mt-2 flex items-center gap-3 rounded-2xl px-3.5 py-2.5 font-bold text-muted hover:text-white hover:bg-white/5">
        <BookOpenText size={20} /> Islam O/L
      </Link>
      {isAdmin && (
        <Link
          href="/admin"
          className="mt-2 flex items-center gap-3 rounded-2xl px-3.5 py-2.5 font-bold text-gold/90 hover:text-gold hover:bg-gold/10 border border-gold/20"
        >
          <ShieldCheck size={20} /> Admin panel
        </Link>
      )}
    </nav>
  );
}

export function BottomNav() {
  const isActive = useActive();
  const items = ITEMS.filter((i) => i.href !== "/subjects");
  return (
    <nav
      aria-label="Main"
      className="app-bottomnav lg:hidden fixed bottom-3 inset-x-3 z-40 glass !rounded-[26px] shadow-[0_10px_40px_-10px_rgba(123,44,191,.7)] px-2 py-1.5 flex justify-around"
    >
      {items.map(({ href, label, icon: I, match }) => {
        const active = isActive(match);
        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl min-w-[64px]" aria-current={active ? "page" : undefined}>
            <span className={`grid place-items-center w-11 h-8 rounded-full transition-all ${active ? "bg-electric/40 -translate-y-0.5" : ""}`}>
              <I size={21} className={active ? "text-white" : "text-muted"} />
            </span>
            <span className={`text-[11px] font-bold ${active ? "text-white" : "text-faint"}`}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
