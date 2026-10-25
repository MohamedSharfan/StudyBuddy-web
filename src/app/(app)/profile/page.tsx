import Link from "next/link";
import { LogOut, Pencil, ShieldCheck, Store } from "lucide-react";
import { ConnectButton } from "@/components/ConnectButton";
import { BadgeGrid, ProfileHeader, ProfileStats } from "@/components/ProfileView";
import { Avatar } from "@/components/ui/Avatar";
import { CopyButton } from "@/components/ui/CopyButton";
import { parseChapterId, getChapterSummary, chapterHref } from "@/lib/catalog";
import { requireViewer, getDb } from "@/lib/session";

export const metadata = { title: "Profile" };

const KIND_LABEL: Record<string, string> = { lesson: "Read notes", flashcards: "Cleared flashcards", quiz: "Passed quiz", pastpaper: "Cracked exam vault" };

export default async function ProfilePage() {
  const viewer = await requireViewer("/profile");
  const p = viewer.profile!;
  const supabase = await getDb();

  const { data: conns } = await supabase.from("student_connections").select("from_user_id, to_user_id, status").or(`from_user_id.eq.${p.id},to_user_id.eq.${p.id}`);
  const otherIds = [...new Set((conns ?? []).map((c) => (c.from_user_id === p.id ? c.to_user_id : c.from_user_id)))];
  const { data: others } = otherIds.length
    ? await supabase.from("profiles").select("id, username, display_name, avatar_url, coins").in("id", otherIds)
    : { data: [] as { id: string; username: string | null; display_name: string; avatar_url: string | null; coins: number }[] };
  const byId = new Map((others ?? []).map((o) => [o.id, o]));
  const incoming = (conns ?? []).filter((c) => c.status === "pending" && c.to_user_id === p.id);
  const connected = (conns ?? []).filter((c) => c.status === "accepted");

  const lessons = viewer.completions.filter((c) => c.kind === "lesson").length;
  const quizzes = viewer.completions.filter((c) => c.kind === "quiz").length;
  const recent = [...viewer.completions].sort((a, b) => b.completed_at.localeCompare(a.completed_at)).slice(0, 8);

  return (
    <div className="space-y-5 max-w-[1000px] mx-auto">
      <ProfileHeader
        p={p}
        actions={
          <>
            <Link href="/profile/edit" className="btn btn-sm">
              <Pencil size={14} /> Edit
            </Link>
            {p.username && <CopyButton text={`/u/${p.username}`} label="Share" />}
          </>
        }
      />

      <div className="glass p-5 flex flex-wrap items-center gap-4 justify-between">
        <div>
          <p className="text-sm text-muted">Your student code</p>
          <p className="text-2xl font-bold tracking-wider text-gold font-mono">{p.student_code}</p>
          <p className="text-xs text-muted">Send this code to us when you unlock a subject.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={p.student_code} label="Copy code" />
          <Link href="/unlock" className="btn btn-gold btn-sm">
            Unlock subjects
          </Link>
        </div>
      </div>

      <ProfileStats p={p} lessons={lessons} quizzes={quizzes} />
      <BadgeGrid codes={p.badge_codes} />

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass p-5">
          <p className="font-extrabold">Recent activity</p>
          {recent.length === 0 ? (
            <p className="text-sm text-muted mt-3">Nothing yet — open your first chapter!</p>
          ) : (
            <ul className="mt-3 space-y-1">
              {recent.map((r) => {
                const id = parseChapterId(r.item_id);
                const c = id && getChapterSummary(id.subjectId, id.grade, id.number);
                return (
                  <li key={`${r.item_id}${r.kind}`}>
                    <Link href={c && id ? chapterHref(id.subjectId, c.grade, c.number) : "#"} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/5">
                      <span className="text-muted">•</span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-bold">
                          {KIND_LABEL[r.kind]} {r.score_percent != null && <span className="text-muted">· {r.score_percent}%</span>}
                        </span>
                        <span lang="ta" className="block text-xs text-muted truncate">
                          {c ? `G${c.grade} Ch ${c.number} · ${c.title}` : r.item_id}
                        </span>
                      </span>
                      <span className="text-[11px] text-faint">{new Date(r.completed_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="glass p-5">
          <p className="font-extrabold">Study friends</p>
          {incoming.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-gold font-bold">REQUESTS</p>
              {incoming.map((c) => {
                const o = byId.get(c.from_user_id);
                return o ? (
                  <div key={o.id} className="flex items-center gap-3">
                    <Avatar name={o.display_name} url={o.avatar_url} size={36} />
                    <Link href={o.username ? `/u/${o.username}` : "#"} className="flex-1 font-bold text-sm truncate">
                      {o.display_name}
                    </Link>
                    <ConnectButton targetId={o.id} status="incoming" />
                  </div>
                ) : null;
              })}
            </div>
          )}
          {connected.length === 0 ? (
            <p className="text-sm text-muted mt-3">Find classmates on the leaderboard and connect to study together.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {connected.map((c) => {
                const o = byId.get(c.from_user_id === p.id ? c.to_user_id : c.from_user_id);
                return o ? (
                  <li key={o.id}>
                    <Link href={o.username ? `/u/${o.username}` : "#"} className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-white/5">
                      <Avatar name={o.display_name} url={o.avatar_url} size={36} />
                      <span className="flex-1 font-bold text-sm truncate">{o.display_name}</span>
                      <span className="text-xs text-gold font-bold flex items-center gap-1">
                        <span className="coin" /> {o.coins}
                      </span>
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-between">
        <div className="flex flex-wrap gap-3">
          <Link href="/rewards" className="btn btn-ghost">
            <Store size={16} /> Reward shop
          </Link>
          {viewer.isAdmin && (
            <Link href="/admin" className="btn btn-ghost !text-gold !border-gold/40">
              <ShieldCheck size={16} /> Admin panel
            </Link>
          )}
        </div>
        <form action="/auth/signout" method="post">
          <button className="btn btn-ghost !text-pink !border-pink/30">
            <LogOut size={16} /> Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
