import Link from "next/link";
import { RequestRow, type RequestItem } from "@/components/admin/RequestRow";
import { getDb } from "@/lib/session";

export const metadata = { title: "Unlock requests" };

export default async function AdminRequests({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status = "pending" } = await searchParams;
  const st = ["pending", "done", "dismissed"].includes(status) ? status : "pending";
  const supabase = await getDb();
  const { data: reqs } = await supabase
    .from("unlock_requests")
    .select("id, user_id, subject_id, phone, message, status, created_at")
    .eq("status", st)
    .order("created_at", { ascending: st === "pending" })
    .limit(100);
  const ids = [...new Set((reqs ?? []).map((r) => r.user_id))];
  const { data: people } = ids.length
    ? await supabase.from("profiles").select("id, display_name, student_code, avatar_url, grade").in("id", ids)
    : { data: [] };
  const byId = new Map((people ?? []).map((p) => [p.id, p]));
  const items: RequestItem[] = (reqs ?? []).map((r) => ({ ...r, student: byId.get(r.user_id) ?? null }));

  return (
    <div className="space-y-5">
      <div>
        <p className="eyebrow !text-gold">Admin</p>
        <h1 className="display text-4xl font-bold mt-1">Unlock requests</h1>
        <p className="text-sm text-muted mt-1">Confirm the student&apos;s payment (WhatsApp / bank), then press Unlock. The request closes automatically.</p>
      </div>
      <div className="flex gap-2">
        {["pending", "done", "dismissed"].map((s) => (
          <Link key={s} href={`/admin/requests?status=${s}`} className={`chip capitalize ${st === s ? "chip-active" : ""}`}>
            {s}
          </Link>
        ))}
      </div>
      <div className="glass px-5">
        {items.length === 0 ? (
          <p className="py-10 text-center text-muted">{st === "pending" ? "No pending requests — all caught up 🎉" : "Nothing here."}</p>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((r) => (
              <RequestRow key={r.id} r={r} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
