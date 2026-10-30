import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, ShieldCheck } from "lucide-react";
import { UnlockToggle } from "@/components/admin/UnlockToggle";
import { Avatar } from "@/components/ui/Avatar";
import { catalog } from "@/lib/catalog";
import type { AdminStudent } from "@/lib/admin-types";
import { getDb } from "@/lib/session";

export const metadata = { title: "Students" };


const FILTERS = [
  { id: "all", label: "All" },
  { id: "requested", label: "Requested unlock" },
  { id: "locked", label: "Locked" },
  { id: "unlocked", label: "Unlocked" },
];
const PAGE = 40;

export default async function AdminStudents({ searchParams }: { searchParams: Promise<{ q?: string; filter?: string; page?: string }> }) {
  const { q = "", filter = "all", page = "1" } = await searchParams;
  const pageNum = Math.max(1, Number(page) || 1);
  const supabase = await getDb();
  const { data, error } = await supabase.rpc("admin_list_students", {
    p_search: q.trim(),
    p_filter: FILTERS.some((f) => f.id === filter) ? filter : "all",
    p_limit: PAGE,
    p_offset: (pageNum - 1) * PAGE,
  });
  const rows = (data ?? []) as AdminStudent[];
  const total = rows[0]?.total_count ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE));
  const href = (over: Record<string, string>) => {
    const s = new URLSearchParams({ q, filter, page: String(pageNum), ...over });
    if (!s.get("q")) s.delete("q");
    if (s.get("filter") === "all") s.delete("filter");
    if (s.get("page") === "1") s.delete("page");
    const str = s.toString();
    return `/admin/students${str ? `?${str}` : ""}`;
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="display text-4xl font-bold mt-1">Students</h1>
        </div>
        <p className="text-sm text-muted">{total} found</p>
      </div>

      <form className="flex gap-2" action="/admin/students">
        {filter !== "all" && <input type="hidden" name="filter" value={filter} />}
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
          <input name="q" defaultValue={q} placeholder="Search name, email, phone, @username or student code (SB-…)" className="input !pl-10" />
        </div>
        <button className="btn">Search</button>
      </form>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {FILTERS.map((f) => (
          <Link key={f.id} href={href({ filter: f.id, page: "1" })} className={`chip ${filter === f.id ? "chip-active" : ""}`}>
            {f.label}
          </Link>
        ))}
      </div>

      {error ? (
        <p className="glass p-6 text-pink">{error.message}</p>
      ) : rows.length === 0 ? (
        <p className="glass p-10 text-center text-muted">No students match.</p>
      ) : (
        <div className="glass overflow-x-auto">
          <table className="w-full text-sm min-w-[860px]">
            <thead>
              <tr className="text-left text-xs text-muted border-b border-line">
                <th className="px-4 py-3 font-bold">Student</th>
                <th className="px-4 py-3 font-bold">Contact</th>
                <th className="px-4 py-3 font-bold">Grade</th>
                <th className="px-4 py-3 font-bold">Progress</th>
                <th className="px-4 py-3 font-bold">Joined</th>
                <th className="px-4 py-3 font-bold text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.id} className={r.pending_requests > 0 ? "bg-pink/[.06]" : "hover:bg-white/[.02]"}>
                  <td className="px-4 py-3">
                    <Link href={`/admin/students/${r.id}`} className="flex items-center gap-3 group">
                      <Avatar name={r.display_name} url={r.avatar_url} size={38} />
                      <span className="min-w-0">
                        <span className="block font-bold group-hover:text-gold truncate max-w-[220px]">
                          {r.display_name} {r.is_admin && <ShieldCheck size={13} className="inline text-gold" />}
                        </span>
                        <span className="block text-xs text-muted">
                          <span className="font-mono text-gold/90">{r.student_code}</span> {r.username && `· @${r.username}`}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="block truncate max-w-[220px]">{r.email}</span>
                    <span className="block text-muted">{r.phone ?? "—"}</span>
                  </td>
                  <td className="px-4 py-3">
                    G{r.grade}
                    <span className="block text-xs text-muted">{r.province ?? ""}</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="flex items-center gap-1 font-bold">
                      <span className="coin" /> {r.coins}
                    </span>
                    <span className="text-muted">{r.completions} activities · 🔥{r.streak_days}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">
                    {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" })}
                    {r.pending_requests > 0 && <span className="block text-pink font-bold">Requested unlock</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-end gap-1.5">
                      {catalog.subjects.map((s) => (
                        <div key={s.id} className="flex items-center gap-2">
                          <span className="text-xs text-muted">{s.medium}</span>
                          <UnlockToggle userId={r.id} subjectId={s.id} unlocked={r.unlocked_subjects.includes(s.id)} compact />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3">
          {pageNum > 1 && (
            <Link href={href({ page: String(pageNum - 1) })} className="btn btn-ghost btn-sm">
              <ChevronLeft size={14} /> Prev
            </Link>
          )}
          <span className="text-sm text-muted">
            Page {pageNum} of {pages}
          </span>
          {pageNum < pages && (
            <Link href={href({ page: String(pageNum + 1) })} className="btn btn-ghost btn-sm">
              Next <ChevronRight size={14} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
