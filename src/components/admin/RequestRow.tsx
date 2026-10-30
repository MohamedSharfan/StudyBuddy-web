import Link from "next/link";
import { Phone } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { getSubject, subjectLabel } from "@/lib/catalog";
import { DismissRequest } from "./DismissRequest";
import { UnlockToggle } from "./UnlockToggle";

export type RequestItem = {
  id: number;
  user_id: string;
  subject_id: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
  student: { id: string; display_name: string; student_code: string; avatar_url: string | null; grade: number } | null;
};

export function RequestRow({ r }: { r: RequestItem }) {
  const subject = getSubject(r.subject_id);
  return (
    <li className="py-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <Link href={`/admin/students/${r.user_id}`} className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar name={r.student?.display_name ?? "?"} url={r.student?.avatar_url} size={42} />
        <span className="min-w-0">
          <span className="block font-bold truncate">
            {r.student?.display_name ?? "Unknown"} <span className="text-gold font-mono text-sm">{r.student?.student_code}</span>
          </span>
          <span className="block text-xs text-muted">
            {subject ? subjectLabel(subject) : r.subject_id} · G{r.student?.grade} · {new Date(r.created_at).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
          </span>
          {r.message && <span className="block text-sm mt-1 text-white/90 break-words">“{r.message}”</span>}
        </span>
      </Link>
      <div className="flex items-center gap-2 flex-wrap">
        {r.phone && (
          <a href={`https://wa.me/${r.phone.replace(/[^\d]/g, "").replace(/^0/, "94")}`} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
            <Phone size={14} /> {r.phone}
          </a>
        )}
        {r.status === "pending" ? (
          <>
            <UnlockToggle userId={r.user_id} subjectId={r.subject_id} unlocked={false} />
            <DismissRequest id={r.id} />
          </>
        ) : (
          <span className={`chip ${r.status === "done" ? "!text-green" : ""}`}>{r.status}</span>
        )}
      </div>
    </li>
  );
}
