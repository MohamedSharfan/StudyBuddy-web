"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, House, LayoutGrid, ShieldCheck, Trophy, UserRound } from "lucide-react";

const ITEMS = [
  { href: "/home", label: "Home", icon: House, match: ["/home"] },
  { href: "/subjects", label: "Subjects", icon: LayoutGrid, match: ["/subjects", "/learn"] },
  { href: "/leaderboard", label: "Ranks", icon: Trophy, match: ["/leaderboard"] },
  { href: "/panda", label: "AI Panda", icon: Bot, match: ["/panda"] },
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
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold ${active ? "bg-card-2 text-white" : "text-muted hover:text-white hover:bg-white/[.04]"}`}
          >
            <I size={19} className={active ? "text-gold" : ""} />
            {label}
          </Link>
        );
      })}
      {isAdmin && (
        <Link
          href="/admin"
          className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold text-gold hover:bg-gold/10 border border-gold/25"
        >
          <ShieldCheck size={19} /> Admin panel
        </Link>
      )}
    </nav>
  );
}

export function BottomNav() {
  const isActive = useActive();
  const items = ITEMS.filter((i) => i.href !== "/leaderboard");
  return (
    <nav
      aria-label="Main"
      className="app-bottomnav lg:hidden fixed bottom-0 inset-x-0 z-40 bg-bg-2 border-t border-line px-1 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] flex justify-around"
    >
      {items.map(({ href, label, icon: I, match }) => {
        const active = isActive(match);
        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-0.5 px-2 py-1.5 min-w-[60px]" aria-current={active ? "page" : undefined}>
            <I size={21} className={active ? "text-gold" : "text-muted"} />
            <span className={`text-[11px] font-semibold ${active ? "text-white" : "text-muted"}`}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
