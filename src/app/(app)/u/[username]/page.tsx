import { notFound, redirect } from "next/navigation";
import { ConnectButton } from "@/components/ConnectButton";
import { BadgeGrid, ProfileHeader, ProfileStats, type PublicProfile } from "@/components/ProfileView";
import { requireViewer, getDb } from "@/lib/session";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  return { title: `@${(await params).username}` };
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const viewer = await requireViewer(`/u/${username}`);
  const supabase = await getDb();
  const { data } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, headline, bio, province, grade, coins, streak_days, badge_codes, created_at")
    .ilike("username", username.toLowerCase().replace(/[%_\\]/g, "\\$&"))
    .maybeSingle();
  if (!data) notFound();
  const p = data as PublicProfile;
  if (p.id === viewer.userId) redirect("/profile");

  const [{ data: counts }, { data: links }] = await Promise.all([
    supabase.rpc("profile_counts", { p_user: p.id }),
    supabase
      .from("student_connections")
      .select("from_user_id, to_user_id, status")
      .or(`and(from_user_id.eq.${viewer.userId},to_user_id.eq.${p.id}),and(from_user_id.eq.${p.id},to_user_id.eq.${viewer.userId})`),
  ]);
  const link = links?.[0];
  const status = !link ? "none" : link.status === "accepted" ? "connected" : link.from_user_id === viewer.userId ? "outgoing" : "incoming";
  const c = (counts ?? {}) as { lessons?: number; quizzes?: number };

  return (
    <div className="space-y-5 max-w-[1000px] mx-auto">
      <ProfileHeader p={p} actions={<ConnectButton targetId={p.id} status={status} />} />
      <ProfileStats p={p} lessons={c.lessons ?? 0} quizzes={c.quizzes ?? 0} />
      <BadgeGrid codes={p.badge_codes} />
    </div>
  );
}
