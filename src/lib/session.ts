import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient, getAuthUser } from "./supabase/server";

export type Profile = {
  id: string;
  username: string | null;
  display_name: string;
  student_code: string;
  education_level: "O/L" | "A/L";
  stream: string | null;
  grade: number;
  medium: string;
  province: string | null;
  bio: string;
  headline: string;
  avatar_url: string | null;
  onboarded: boolean;
  coins: number;
  streak_days: number;
  current_rank: string;
  lifetime_earned: number;
  last_activity_day: string | null;
  badge_codes: string[];
  created_at: string;
};

export const PROFILE_COLUMNS =
  "id, username, display_name, student_code, education_level, stream, grade, medium, province, bio, headline, avatar_url, onboarded, coins, streak_days, current_rank, lifetime_earned, last_activity_day, badge_codes, created_at";

export type Completion = { item_id: string; kind: string; score_percent: number | null; completed_at: string };

export type Viewer = {
  userId: string;
  email: string | null;
  profile: Profile | null;
  isAdmin: boolean;
  unlocked: string[];
  completions: Completion[];
};

/** Current signed-in student (or null). Cached for the request. */
export const getViewer = cache(async (): Promise<Viewer | null> => {
  const supabase = await createClient();
  if (!supabase) return null;
  const user = await getAuthUser(supabase);
  if (!user) return null;

  const [profile, admin, unlocks, completions] = await Promise.all([
    supabase.from("profiles").select(PROFILE_COLUMNS).eq("id", user.id).maybeSingle(),
    supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle(),
    supabase.from("subject_unlocks").select("subject_id").eq("user_id", user.id),
    supabase.from("study_completions").select("item_id, kind, score_percent, completed_at").eq("user_id", user.id),
  ]);

  // Until the levels migration is applied, read the profile without the `stream` column.
  let profileRow = profile.data as Profile | null;
  if (profile.error?.message.includes("stream")) {
    const legacy = await supabase.from("profiles").select(PROFILE_COLUMNS.replace("stream, ", "")).eq("id", user.id).maybeSingle();
    profileRow = legacy.data ? ({ ...(legacy.data as object), stream: null } as Profile) : null;
  }

  return {
    userId: user.id,
    email: user.email,
    profile: profileRow,
    isAdmin: Boolean(admin.data),
    unlocked: (unlocks.data ?? []).map((u: { subject_id: string }) => u.subject_id),
    completions: (completions.data as Completion[] | null) ?? [],
  };
});

export async function requireViewer(next = "/home") {
  const viewer = await getViewer();
  if (!viewer) redirect(`/login?next=${encodeURIComponent(next)}`);
  if (viewer.profile && !viewer.profile.onboarded) redirect(`/onboarding?next=${encodeURIComponent(next)}`);
  return viewer;
}

export async function requireAdmin() {
  const viewer = await getViewer();
  if (!viewer) redirect("/login?next=/admin");
  if (!viewer.isAdmin) redirect("/home");
  return viewer;
}

/** Supabase client for pages that already require sign-in. */
export async function getDb() {
  const supabase = await createClient();
  if (!supabase) redirect("/login");
  return supabase;
}

export function hasSubjectAccess(viewer: Viewer | null, subjectId: string) {
  return Boolean(viewer && (viewer.isAdmin || viewer.unlocked.includes(subjectId)));
}

export function completionSet(viewer: Viewer | null) {
  return new Set((viewer?.completions ?? []).map((c) => `${c.item_id}:${c.kind}`));
}

/** O/L students see O/L subjects, A/L students see their stream's subjects. Guests and admins see everything. */
export function canSeeSubject(viewer: Viewer | null, subject: { level: string; streams?: string[] }) {
  const p = viewer?.profile;
  if (!p || viewer.isAdmin) return true;
  if (subject.level !== p.education_level) return false;
  return !subject.streams?.length || (p.stream !== null && subject.streams.includes(p.stream));
}
