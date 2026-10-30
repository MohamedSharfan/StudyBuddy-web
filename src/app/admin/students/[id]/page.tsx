import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Mail, MessageCircle } from "lucide-react";
import { UnlockToggle } from "@/components/admin/UnlockToggle";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { catalog, getChapterSummary, parseChapterId, subjectLabel } from "@/lib/catalog";
import { subjectProgress } from "@/lib/progress";
import type { AdminStudent } from "@/lib/admin-types";
import { getDb } from "@/lib/session";

export const metadata = { title: "Student" };

type Detail = {
  completions: { item_id: string; kind: string; score_percent: number | null; completed_at: string; coins_awarded: number }[];
  events: { id: number; subject_id: string; action: string; note: string; created_at: string; admin_id: string | null }[];
  requests: { id: number; subject_id: string; status: string; message: string; phone: string | null; created_at: string }[];
};

const KIND: Record<string, string> = { lesson: "Notes", flashcards: "Flashcards", quiz: "Quiz", pastpaper: "Past papers" };

export default async function AdminStudentDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const supabase = await getDb();
  const [{ data: priv }, { data: detailRaw }] = await Promise.all([
    supabase.from("student_private").select("email").eq("user_id", id).maybeSingle(),
    supabase.rpc("admin_student_detail", { p_user: id }),
  ]);
  const { data: list } = await supabase.rpc("admin_list_students", { p_search: priv?.email ?? id, p_filter: "all", p_limit: 5, p_offset: 0 });
  const s = ((list ?? []) as AdminStudent[]).find((r) => r.id === id);
  if (!s) notFound();
  const d = (detailRaw ?? { completions: [], events: [], requests: [] }) as Detail;
  const done = new Set(d.completions.map((c) => `${c.item_id}:${c.kind}`));
  const wa = s.phone ? `https://wa.me/${s.phone.replace(/[^\d]/g, "").replace(/^0/, "94")}` : null;

  return (
    <div className="space-y-5 max-w-[1000px]">
      <Link href="/admin/students" className="text-sm text-muted hover:text-white flex items-center gap-1 font-semibold">
        <ChevronLeft size={16} /> Students
      </Link>

      <div className="glass p-6 flex flex-col sm:flex-row gap-5 sm:items-center">
        <Avatar name={s.display_name} url={s.avatar_url} size={80} />
        <div className="flex-1 min-w-0">
          <h1 className="display text-3xl font-bold">{s.display_name}</h1>
          <p className="text-sm text-muted">
            <span className="font-mono text-gold text-base">{s.student_code}</span> {s.username && `· @${s.username}`} · {s.grade >= 12 ? "A/L" : "O/L"} · Grade {s.grade}
            {s.province && ` · ${s.province}`}
          </p>
          <p className="text-xs text-faint mt-1">
            Joined {new Date(s.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            {s.last_activity_day && ` · last active ${s.last_activity_day}`}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {s.email && (
            <a href={`mailto:${s.email}`} className="btn btn-ghost btn-sm">
              <Mail size={14} /> {s.email}
            </a>
          )}
          {wa && (
            <a href={wa} target="_blank" rel="noreferrer" className="btn btn-green btn-sm">
              <MessageCircle size={14} /> {s.phone}
            </a>
          )}
        </div>
      </div>

      <div className="glass p-5 sm:p-6">
        <p className="font-extrabold">Subject access</p>
        <ul className="mt-4 divide-y divide-line">
          {catalog.subjects.map((sub) => {
            const prog = subjectProgress(sub, done);
            return (
              <li key={sub.id} className="flex flex-wrap items-center gap-4 py-3">
                <Icon name={sub.icon ?? "book-open"} size={22} className="text-lilac" />
                <span className="flex-1">
                  <span className="block font-bold">
                    {subjectLabel(sub)}
                  </span>
                  <span className="text-xs text-muted">
                    {prog.percent}% complete · {prog.completedChapters}/{prog.chapterCount} chapters
                  </span>
                </span>
                <UnlockToggle userId={s.id} subjectId={sub.id} unlocked={s.unlocked_subjects.includes(sub.id)} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass p-5">
          <p className="font-extrabold">Unlock history</p>
          {d.events.length === 0 && d.requests.length === 0 ? (
            <p className="text-sm text-muted mt-3">No unlock activity.</p>
          ) : (
            <ul className="mt-3 space-y-2.5 text-sm">
              {[
                ...d.events.map((e) => ({ at: e.created_at, text: `${e.action === "unlock" ? "🔓 Unlocked" : "🔒 Locked"} ${e.subject_id}${e.note ? ` — ${e.note}` : ""}` })),
                ...d.requests.map((r) => ({ at: r.created_at, text: `📨 Requested ${r.subject_id} (${r.status})${r.message ? ` — “${r.message}”` : ""}` })),
              ]
                .sort((a, b) => b.at.localeCompare(a.at))
                .map((e, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[11px] text-faint w-20 flex-none pt-0.5">{new Date(e.at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                    <span className="break-words">{e.text}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="glass p-5">
          <p className="font-extrabold">
            Study activity <span className="text-muted font-semibold">· {s.coins} coins</span>
          </p>
          {d.completions.length === 0 ? (
            <p className="text-sm text-muted mt-3">No activity yet.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm max-h-[360px] overflow-y-auto pr-1">
              {d.completions.map((c) => {
                const pid = parseChapterId(c.item_id);
                const ch = pid && getChapterSummary(pid.subjectId, pid.grade, pid.number);
                return (
                  <li key={c.item_id + c.kind} className="flex items-center gap-3">
                    <span className="chip !py-0.5">{KIND[c.kind]}</span>
                    <span lang="ta" className="flex-1 truncate">
                      {ch ? `${pid.subjectId.endsWith("-en") ? "EN" : "TA"} · G${ch.grade} Ch ${ch.number} · ${ch.title}` : c.item_id}
                    </span>
                    {c.score_percent != null && <span className="text-xs text-muted">{c.score_percent}%</span>}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
