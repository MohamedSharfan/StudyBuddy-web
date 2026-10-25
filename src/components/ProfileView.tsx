import { Flame, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { BADGES, RANKS, nextRank, rankFor } from "@/lib/gamification";

export type PublicProfile = {
  id: string;
  username: string | null;
  display_name: string;
  avatar_url: string | null;
  headline: string;
  bio: string;
  province: string | null;
  grade: number;
  coins: number;
  streak_days: number;
  badge_codes: string[];
  created_at: string;
};

export function ProfileHeader({ p, actions }: { p: PublicProfile; actions?: React.ReactNode }) {
  const rank = rankFor(p.coins);
  return (
    <div className="glass overflow-hidden">
      <div className="h-28 sm:h-36 relative bg-gradient-to-r from-royal via-electric to-pink/70">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #fff 1px, transparent 1.5px), radial-gradient(circle at 70% 60%, #fff 1px, transparent 1.5px)", backgroundSize: "60px 60px, 90px 90px" }} />
      </div>
      <div className="px-5 sm:px-8 pb-6 -mt-12 flex flex-col sm:flex-row sm:items-end gap-4">
        <Avatar name={p.display_name} url={p.avatar_url} size={104} ring />
        <div className="flex-1 min-w-0">
          <h1 className="display text-3xl font-bold">{p.display_name}</h1>
          <p className="text-muted text-sm">
            {p.username && <span>@{p.username}</span>} {p.headline && <span>· {p.headline}</span>}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="chip" style={{ color: rank.color, borderColor: `${rank.color}55` }}>
              ◆ {rank.name}
            </span>
            <span className="chip">Grade {p.grade}</span>
            {p.province && (
              <span className="chip">
                <MapPin size={12} /> {p.province}
              </span>
            )}
          </div>
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {p.bio && <p className="px-5 sm:px-8 pb-6 text-sm text-muted -mt-2">{p.bio}</p>}
    </div>
  );
}

export function ProfileStats({ p, lessons, quizzes }: { p: PublicProfile; lessons: number; quizzes: number }) {
  const rank = rankFor(p.coins);
  const up = nextRank(p.coins);
  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-5">
      <div className="grid grid-cols-2 gap-3">
        {[
          [<span key="c" className="coin" />, p.coins.toLocaleString(), "Coins"],
          [<Flame key="f" size={20} className="text-orange fill-orange/50" />, p.streak_days, "Day streak"],
          ["📖", lessons, "Lessons read"],
          ["🏆", quizzes, "Quizzes passed"],
        ].map(([icon, n, l], i) => (
          <div key={i} className="glass p-4">
            <span className="text-xl">{icon}</span>
            <p className="display text-2xl font-bold mt-1">{n}</p>
            <p className="text-xs text-muted font-bold">{String(l).toUpperCase()}</p>
          </div>
        ))}
      </div>
      <div className="glass p-5">
        <p className="font-extrabold">Rank ladder</p>
        <ol className="mt-4 flex items-end gap-2 h-32">
          {RANKS.map((r, i) => {
            const reached = p.coins >= r.min;
            const current = r.name === rank.name;
            return (
              <li key={r.name} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5">
                <div
                  className={`arch w-full ${current ? "ring-2 ring-gold" : ""}`}
                  style={{ height: `${30 + i * 17}%`, background: reached ? `linear-gradient(180deg, ${r.color}, transparent)` : "rgba(255,255,255,.05)" }}
                />
                <span className={`text-[10px] font-bold ${current ? "text-white" : "text-muted"}`}>{r.name}</span>
              </li>
            );
          })}
        </ol>
        <p className="text-xs text-muted mt-3">{up ? `${up.min - p.coins} coins to ${up.name}` : "Champion — the top of the sky!"}</p>
      </div>
    </div>
  );
}

export function BadgeGrid({ codes }: { codes: string[] }) {
  return (
    <div className="glass p-5 sm:p-6">
      <p className="font-extrabold">
        Badges <span className="text-muted font-semibold">· {codes.length}/{BADGES.length}</span>
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 mt-5">
        {BADGES.map((b) => {
          const got = codes.includes(b.code);
          return (
            <div key={b.code} className={`text-center ${got ? "" : "opacity-35 grayscale"}`} title={b.description}>
              <span
                className={`mx-auto grid place-items-center w-14 h-14 rounded-2xl rotate-45 ${got ? "bg-gradient-to-br from-gold to-orange shadow-[0_0_20px_rgba(251,191,36,.4)]" : "bg-white/5 border border-line"}`}
              >
                <Icon name={b.icon} size={22} className={`-rotate-45 ${got ? "text-bg" : "text-muted"}`} />
              </span>
              <p className="text-[11px] font-bold mt-3 leading-tight">{b.title}</p>
              <p className="text-[10px] text-faint mt-0.5 leading-tight hidden sm:block">{b.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
