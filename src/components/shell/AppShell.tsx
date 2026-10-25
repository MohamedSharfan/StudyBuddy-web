import Link from "next/link";
import { Flame, LogIn, Megaphone } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Logo } from "@/components/ui/Logo";
import { rankFor } from "@/lib/gamification";
import type { Viewer } from "@/lib/session";
import type { SiteSettings } from "@/lib/settings";
import { FocusTimer } from "./FocusTimer";
import { BottomNav, SideNav } from "./NavLinks";

export function Hud({ viewer }: { viewer: Viewer | null }) {
  if (!viewer?.profile)
    return (
      <Link href="/login" className="btn btn-sm">
        <LogIn size={16} /> Sign in
      </Link>
    );
  const p = viewer.profile;
  const rank = rankFor(p.coins);
  return (
    <div className="flex items-center gap-2">
      <span className="chip !text-white" title="Day streak">
        <Flame size={15} className="text-orange" /> {p.streak_days}
      </span>
      <Link href="/rewards" className="chip !text-white" title="Coins">
        <span className="coin" /> {p.coins.toLocaleString()}
      </Link>
      <span className="chip hidden sm:inline-flex font-bold" style={{ color: rank.color }} title="Rank">
        {rank.name}
      </span>
      <Link href="/profile" aria-label="Your profile" className="ml-1">
        <Avatar name={p.display_name} url={p.avatar_url} size={36} />
      </Link>
    </div>
  );
}

export function AppShell({ viewer, settings, children }: { viewer: Viewer | null; settings: SiteSettings; children: React.ReactNode }) {
  return (
    <div className="app-root min-h-dvh lg:pl-[240px]">
      <aside className="app-sidebar hidden lg:flex fixed inset-y-0 left-0 w-[240px] flex-col gap-7 p-5 border-r border-line bg-bg-2 z-30">
        <Logo href="/home" />
        <SideNav isAdmin={Boolean(viewer?.isAdmin)} />
        <div className="mt-auto rounded-xl border border-line p-4">
          {viewer?.profile ? (
            <>
              <p className="text-xs text-muted">Your student code</p>
              <p className="text-lg font-bold tracking-wider text-gold font-mono">{viewer.profile.student_code}</p>
              <p className="text-xs text-muted mt-1">Share this code when you unlock a subject.</p>
            </>
          ) : (
            <>
              <p className="text-sm font-bold">Save your progress</p>
              <p className="text-xs text-muted mt-1 mb-3">Sign in to earn coins, streaks and ranks.</p>
              <Link href="/login" className="btn btn-sm w-full">
                Sign in
              </Link>
            </>
          )}
        </div>
      </aside>

      <header className="sticky top-0 z-30 bg-bg border-b border-line">
        {settings.announcement.active && settings.announcement.text && (
          <div className="flex items-center justify-center gap-2 text-center text-sm font-semibold px-4 py-2 bg-electric">
            <Megaphone size={15} /> {settings.announcement.text}
          </div>
        )}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 h-16 max-w-[1200px] mx-auto">
          <div className="lg:hidden">
            <Logo href="/home" size={34} />
          </div>
          <div className="hidden lg:block" />
          <Hud viewer={viewer} />
        </div>
      </header>

      <main className="px-4 sm:px-6 pb-32 lg:pb-16 pt-6 max-w-[1200px] mx-auto">{children}</main>
      <BottomNav />
      <FocusTimer />
    </div>
  );
}
