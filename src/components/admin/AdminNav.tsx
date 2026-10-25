"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, Inbox, LayoutDashboard, Settings, Users } from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/requests", label: "Unlock requests", icon: Inbox },
  { href: "/admin/content", label: "Content", icon: BookMarked },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminNav({ pending }: { pending: number }) {
  const path = usePathname();
  return (
    <nav className="flex lg:flex-col gap-1.5 overflow-x-auto no-scrollbar">
      {ITEMS.map(({ href, label, icon: I }) => {
        const active = href === "/admin" ? path === href : path.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex-none flex items-center gap-3 rounded-2xl px-3.5 py-2.5 font-bold text-sm transition-colors ${
              active ? "bg-gold/15 text-gold shadow-[inset_3px_0_0_var(--gold)]" : "text-muted hover:text-white hover:bg-white/5"
            }`}
          >
            <I size={18} /> {label}
            {href === "/admin/requests" && pending > 0 && <span className="ml-auto rounded-full bg-pink text-white text-[11px] px-2 py-0.5">{pending}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
