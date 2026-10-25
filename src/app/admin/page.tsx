import Link from "next/link";
import { Activity, ArrowRight, Inbox, Unlock, UserPlus, Users } from "lucide-react";
import { RequestRow, type RequestItem } from "@/components/admin/RequestRow";
import { getChapterSummary, parseChapterId } from "@/lib/catalog";
import { getDb } from "@/lib/session";

export const metadata = { title: "Overview" };

type Stats = {
  students: number;
  new_this_week: number;
  unlocked_students: number;
  pending_requests: number;
  active_today: number;
  completions_week: number;
  signups_by_day: { day: string; count: number }[];
  top_chapters: { item_id: string; completions: number }[];
};

export default async function AdminOverview() {
  const supabase = await getDb();
  const [{ data: statsRaw, error }, { data: reqs }] = await Promise.all([
    supabase.rpc("admin_stats"),
    supabase.from("unlock_requests").select("id, user_id, subject_id, phone, message, status, created_at").eq("status", "pending").order("created_at").limit(5),
  ]);
  if (error) return <p className="glass p-6 text-pink">Could not load stats: {error.message}</p>;
  const s = statsRaw as Stats;

  const ids = [...new Set((reqs ?? []).map((r) => r.user_id))];
  const { data: people } = ids.length
    ? await supabase.from("profiles").select("id, display_name, student_code, avatar_url, grade").in("id", ids)
    : { data: [] };
  const byId = new Map((people ?? []).map((p) => [p.id, p]));
  const items: RequestItem[] = (reqs ?? []).map((r) => ({ ...r, student: byId.get(r.user_id) ?? null }));
  const maxDay = Math.max(1, ...s.signups_by_day.map((d) => d.count));
  const conversion = s.students ? Math.round((s.unlocked_students / s.students) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow !text-gold">Admin</p>
        <h1 className="display text-4xl font-bold mt-1">Overview</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Students", value: s.students, sub: `+${s.new_this_week} this week`, c: "text-lilac" },
          { icon: Unlock, label: "Unlocked", value: s.unlocked_students, sub: `${conversion}% of students`, c: "text-green" },
          { icon: Inbox, label: "Pending requests", value: s.pending_requests, sub: "waiting for you", c: "text-pink" },
          { icon: Activity, label: "Active today", value: s.active_today, sub: `${s.completions_week} activities this week`, c: "text-gold" },
        ].map(({ icon: I, label, value, sub, c }) => (
          <div key={label} className="glass p-5">
            <I size={20} className={c} />
            <p className="display text-4xl font-bold mt-2">{value}</p>
            <p className="text-sm font-bold">{label}</p>
            <p className="text-xs text-muted">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <div className="glass p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="font-extrabold flex items-center gap-2">
              <UserPlus size={16} className="text-lilac" /> New students · last 14 days
            </p>
          </div>
          <div className="flex items-end gap-1.5 h-40 mt-6">
            {s.signups_by_day.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end" title={`${d.day}: ${d.count}`}>
                <span className="text-[10px] text-muted">{d.count || ""}</span>
                <div className="w-full rounded-t-md bg-gradient-to-t from-electric to-neon" style={{ height: `${d.count ? 8 + (d.count / maxDay) * 92 : 3}%`, opacity: d.count ? 1 : 0.25 }} />
                <span className="text-[9px] text-faint">{d.day.slice(8)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass p-5 sm:p-6">
          <p className="font-extrabold">Most studied chapters</p>
          {s.top_chapters.length === 0 ? (
            <p className="text-sm text-muted mt-3">No activity yet.</p>
          ) : (
            <ol className="mt-3 space-y-2">
              {s.top_chapters.map((t) => {
                const id = parseChapterId(t.item_id);
                const c = id && getChapterSummary(id.subjectId, id.grade, id.number);
                return (
                  <li key={t.item_id} className="flex items-center gap-3 text-sm">
                    <span className="chip">G{c?.grade} · {c?.number}</span>
                    <span lang="ta" className="flex-1 truncate">
                      {c?.title ?? t.item_id}
                    </span>
                    <b>{t.completions}</b>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>

      <div className="glass p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="font-extrabold">Oldest pending unlock requests</p>
          <Link href="/admin/requests" className="text-sm font-bold text-gold flex items-center gap-1">
            All requests <ArrowRight size={14} />
          </Link>
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-muted mt-3">All caught up 🎉</p>
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {items.map((r) => (
              <RequestRow key={r.id} r={r} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
