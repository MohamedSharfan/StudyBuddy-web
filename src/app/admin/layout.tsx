import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { AdminNav } from "@/components/admin/AdminNav";
import { Avatar } from "@/components/ui/Avatar";
import { Logo } from "@/components/ui/Logo";
import { requireAdmin, getDb } from "@/lib/session";

export const metadata = { title: { default: "Admin", template: "%s · Admin · StudyBuddy" }, robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const viewer = await requireAdmin();
  const supabase = await getDb();
  const { count } = await supabase.from("unlock_requests").select("id", { count: "exact", head: true }).eq("status", "pending");

  return (
    <div className="min-h-dvh lg:pl-[250px]">
      <aside className="lg:fixed lg:inset-y-0 lg:left-0 lg:w-[250px] border-b lg:border-b-0 lg:border-r border-line bg-bg/80 backdrop-blur-xl p-4 lg:p-5 flex flex-col gap-5 z-30">
        <div className="flex items-center justify-between">
          <Logo href="/admin" size={36} />
        </div>
        <p className="hidden lg:flex items-center gap-2 text-xs font-extrabold tracking-widest text-gold">
          <ShieldCheck size={14} /> ADMIN PANEL
        </p>
        <AdminNav pending={count ?? 0} />
        <div className="hidden lg:block mt-auto space-y-3">
          <div className="flex items-center gap-3">
            <Avatar name={viewer.profile?.display_name ?? "Admin"} url={viewer.profile?.avatar_url} size={36} />
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">{viewer.profile?.display_name}</p>
              <p className="text-[11px] text-muted truncate">{viewer.email}</p>
            </div>
          </div>
          <Link href="/home" className="btn btn-ghost btn-sm w-full">
            <ArrowLeft size={14} /> Back to app
          </Link>
        </div>
      </aside>
      <main className="px-4 sm:px-8 py-6 sm:py-8 max-w-[1250px]">{children}</main>
    </div>
  );
}
