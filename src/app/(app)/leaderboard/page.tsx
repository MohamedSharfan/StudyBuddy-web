import Link from "next/link";
import { Flame } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { PROVINCES, rankFor } from "@/lib/gamification";
import { gradesFor } from "@/lib/levels";
import { requireViewer, getDb } from "@/lib/session";

export const metadata = { title: "Ranks" };

type Row = {
  id: string;
  username: string | null;
  display_name: string;
  avatar_url: string | null;
  province: string | null;
  grade: number;
  coins: number;
  streak_days: number;
};

export default async function Leaderboard({ searchParams }: { searchParams: Promise<{ province?: string; grade?: string }> }) {
  const viewer = await requireViewer("/leaderboard");
  const { province, grade } = await searchParams;
  const me = viewer.profile!;
  const levelGrades = gradesFor(me.education_level);
  const supabase = await getDb();
  let q = supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, province, grade, coins, streak_days")
    .eq("onboarded", true)
    .eq("education_level", me.education_level)
    .order("coins", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(50);
  if (province && PROVINCES.includes(province as (typeof PROVINCES)[number])) q = q.eq("province", province);
  if (levelGrades.includes(Number(grade))) q = q.eq("grade", Number(grade));
  const { data } = await q;
  const rows = (data ?? []) as Row[];

  const { count: ahead } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("onboarded", true)
    .eq("education_level", me.education_level)
    .gt("coins", me.coins);
  const myPos = (ahead ?? 0) + 1;

  const medals = ["🥇", "🥈", "🥉"];
  const filterHref = (p?: string, g?: string) => {
    const s = new URLSearchParams();
    if (p) s.set("province", p);
    if (g) s.set("grade", g);
    const str = s.toString();
    return `/leaderboard${str ? `?${str}` : ""}`;
  };

  return (
    <div className="space-y-6 max-w-[900px] mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="display text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted mt-1">{me.education_level} students ranked by coins</p>
        </div>
        <div className="rounded-xl border border-line px-4 py-2 text-sm">
          You&apos;re <b className="text-gold">#{myPos}</b> with <b>{me.coins}</b> coins
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        <Link href={filterHref(undefined, grade)} className={`chip ${!province ? "chip-active" : ""}`}>
          All Sri Lanka
        </Link>
        {PROVINCES.map((p) => (
          <Link key={p} href={filterHref(p, grade)} className={`chip ${province === p ? "chip-active" : ""}`}>
            {p}
          </Link>
        ))}
      </div>
      <div className="flex gap-2">
        {[undefined, ...levelGrades.map(String)].map((g) => (
          <Link key={g ?? "all"} href={filterHref(province, g)} className={`chip ${grade === g ? "chip-active" : ""}`}>
            {g ? `Grade ${g}` : "All grades"}
          </Link>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="glass p-10 text-center text-muted">No students here yet. Be the first!</div>
      ) : (
        <ol className="glass divide-y divide-line overflow-hidden">
            {rows.map((r, i) => {
              const rank = rankFor(r.coins);
              const isMe = r.id === me.id;
              return (
                <li key={r.id}>
                  <Link href={r.username ? `/u/${r.username}` : "#"} className={`flex items-center gap-3 px-4 py-3 hover:bg-white/[.03] ${isMe ? "bg-card-2" : ""}`}>
                    <span className="w-8 text-center font-bold text-muted">{i < 3 ? medals[i] : i + 1}</span>
                    <Avatar name={r.display_name} url={r.avatar_url} size={40} />
                    <span className="flex-1 min-w-0">
                      <span className="block font-bold truncate">
                        {r.display_name} {isMe && <span className="text-xs text-gold">(you)</span>}
                      </span>
                      <span className="text-xs text-muted">
                        {r.username ? `@${r.username}` : ""} {r.province ? `· ${r.province}` : ""} · G{r.grade}
                      </span>
                    </span>
                    <span className="hidden sm:flex items-center gap-1 text-xs text-orange font-bold">
                      <Flame size={13} /> {r.streak_days}
                    </span>
                    <span className="text-xs font-bold hidden sm:block w-20 text-right" style={{ color: rank.color }}>
                      {rank.name}
                    </span>
                    <span className="flex items-center gap-1.5 font-bold w-20 justify-end">
                      <span className="coin" /> {r.coins}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
      )}
    </div>
  );
}
