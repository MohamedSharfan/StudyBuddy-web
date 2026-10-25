"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { parseChapterId } from "@/lib/catalog";
import { loadChapter } from "@/lib/content";
import { PROVINCES, type CompletionKind } from "@/lib/gamification";
import { getStream, gradesFor, isLevel } from "@/lib/levels";
import { SETTINGS_TAG } from "@/lib/settings";
import { createClient, getAuthUser } from "@/lib/supabase/server";

export type AwardResult = {
  ok: boolean;
  error?: string;
  needsLogin?: boolean;
  passed?: boolean;
  already?: boolean;
  coinsAwarded?: number;
  coins?: number;
  rank?: string;
  streak?: number;
  newBadges?: string[];
  score?: number;
  correct?: number;
  total?: number;
};

/**
 * Records a completed activity and awards coins.
 * Quiz / past-paper scores are computed here from the server copy of the answers.
 */
export async function awardActivity(kind: CompletionKind, itemId: string, answers?: Record<number, string>): Promise<AwardResult> {
  const supabase = await createClient();
  if (!supabase) return { ok: false, error: "Sign-in is not configured yet." };
  const user = await getAuthUser(supabase);
  if (!user) return { ok: false, needsLogin: true };

  const parsed = parseChapterId(itemId);
  if (!parsed) return { ok: false, error: "Unknown chapter" };

  let score: number | null = null;
  let correct = 0;
  let total = 0;
  if (kind === "quiz" || kind === "pastpaper") {
    const chapter = await loadChapter(parsed.subjectId, parsed.grade, parsed.number);
    if (!chapter) return { ok: false, error: "Unknown chapter" };
    const questions = kind === "quiz" ? chapter.quiz : chapter.pastPapers.mcq;
    total = questions.length;
    correct = questions.reduce((n, q, i) => n + (answers?.[i] === q.answer ? 1 : 0), 0);
    score = total ? Math.round((correct / total) * 100) : 0;
  }

  const { data, error } = await supabase.rpc("award_activity", { p_kind: kind, p_item: itemId, p_score: score });
  if (error) return { ok: false, error: error.message.includes("locked") ? "This chapter is locked." : error.message };

  const r = data as {
    passed: boolean;
    already?: boolean;
    coins_awarded: number;
    coins?: number;
    rank?: string;
    streak?: number;
    new_badges?: string[];
  };
  revalidatePath("/", "layout");
  return {
    ok: true,
    passed: r.passed,
    already: r.already,
    coinsAwarded: r.coins_awarded,
    coins: r.coins,
    rank: r.rank,
    streak: r.streak,
    newBadges: r.new_badges ?? [],
    score: score ?? undefined,
    correct,
    total,
  };
}

// ─────────── profile ───────────

function cleanUsername(v: FormDataEntryValue | null) {
  return String(v ?? "")
    .trim()
    .toLowerCase()
    .replace(/^@/, "");
}

export type FormState = { error?: string; ok?: boolean; message?: string };

export async function saveProfile(_: FormState, form: FormData): Promise<FormState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Not configured" };
  const user = await getAuthUser(supabase);
  if (!user) return { error: "Please sign in again." };

  const username = cleanUsername(form.get("username"));
  const displayName = String(form.get("display_name") ?? "").trim();
  const level = form.get("education_level");
  const stream = level === "A/L" ? String(form.get("stream") ?? "") : null;
  const grade = Number(form.get("grade") ?? 0);
  const province = String(form.get("province") ?? "");
  const medium = String(form.get("medium") ?? "Tamil");
  const bio = String(form.get("bio") ?? "").trim();
  const headline = String(form.get("headline") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const next = String(form.get("next") ?? "");

  if (!/^[a-z0-9_]{3,20}$/.test(username)) return { error: "Username: 3–20 letters, numbers or _" };
  if (!displayName) return { error: "Please enter your name." };
  if (!isLevel(level)) return { error: "Choose O/L or A/L." };
  if (level === "A/L" && !getStream(stream)) return { error: "Choose your A/L stream." };
  if (!gradesFor(level).includes(grade)) return { error: "Choose your grade." };
  if (province && !PROVINCES.includes(province as (typeof PROVINCES)[number])) return { error: "Choose a province." };
  if (phone && !/^[+\d\s-]{7,20}$/.test(phone)) return { error: "Phone number looks wrong." };

  const { error } = await supabase
    .from("profiles")
    .update({
      username,
      display_name: displayName.slice(0, 60),
      education_level: level,
      stream,
      grade,
      province: province || null,
      medium,
      bio: bio.slice(0, 280),
      headline: headline.slice(0, 80),
      onboarded: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);
  if (error) {
    if (error.code === "23505") return { error: "That username is taken — try another." };
    if (error.message.includes("stream")) return { error: "Please ask the admin to run the latest database update (levels and streams)." };
    return { error: error.message };
  }
  await supabase.from("student_private").update({ phone: phone || null }).eq("user_id", user.id);

  revalidatePath("/", "layout");
  if (next) redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/home");
  return { ok: true, message: "Profile saved" };
}

// ─────────── unlock requests ───────────

export async function requestUnlock(_: FormState, form: FormData): Promise<FormState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Not configured" };
  const user = await getAuthUser(supabase);
  if (!user) return { error: "Please sign in first." };
  const subjectId = String(form.get("subject_id") ?? "islam-ol");
  const phone = String(form.get("phone") ?? "").trim();
  const message = String(form.get("message") ?? "")
    .trim()
    .slice(0, 500);
  if (phone && !/^[+\d\s-]{7,20}$/.test(phone)) return { error: "Phone number looks wrong." };

  const { error } = await supabase.from("unlock_requests").insert({ user_id: user.id, subject_id: subjectId, phone: phone || null, message });
  if (error) {
    if (error.code === "23505") return { ok: true, message: "Your request is already with us — we'll unlock it soon." };
    return { error: error.message };
  }
  if (phone) await supabase.from("student_private").update({ phone }).eq("user_id", user.id);
  revalidatePath("/unlock");
  return { ok: true, message: "Request sent! An admin will unlock your subject after confirming payment." };
}

// ─────────── connections ───────────

export async function connect(targetId: string) {
  const supabase = await createClient();
  if (!supabase) return;
  const user = await getAuthUser(supabase);
  if (!user || user.id === targetId) return;
  // If they already asked us, accept instead.
  const { data: incoming } = await supabase
    .from("student_connections")
    .select("status")
    .eq("from_user_id", targetId)
    .eq("to_user_id", user.id)
    .maybeSingle();
  if (incoming) {
    await supabase.from("student_connections").update({ status: "accepted" }).eq("from_user_id", targetId).eq("to_user_id", user.id);
  } else {
    await supabase.from("student_connections").insert({ from_user_id: user.id, to_user_id: targetId, status: "pending" });
  }
  revalidatePath("/", "layout");
}

export async function disconnect(targetId: string) {
  const supabase = await createClient();
  if (!supabase) return;
  const user = await getAuthUser(supabase);
  if (!user) return;
  await supabase.from("student_connections").delete().eq("from_user_id", user.id).eq("to_user_id", targetId);
  await supabase.from("student_connections").delete().eq("from_user_id", targetId).eq("to_user_id", user.id);
  revalidatePath("/", "layout");
}

// ─────────── admin ───────────

async function adminClient() {
  const supabase = await createClient();
  if (!supabase) throw new Error("Not configured");
  const { data } = await supabase.rpc("is_admin");
  if (!data) throw new Error("Admins only");
  return supabase;
}

export async function adminSetUnlock(userId: string, subjectId: string, unlock: boolean, note = "") {
  const supabase = await adminClient();
  const { error } = await supabase.rpc("admin_set_unlock", { p_user: userId, p_subject: subjectId, p_unlock: unlock, p_note: note });
  if (error) return { error: error.message };
  revalidatePath("/admin", "layout");
  return { ok: true };
}

export async function adminResolveRequest(id: number, status: "done" | "dismissed") {
  const supabase = await adminClient();
  const { error } = await supabase.from("unlock_requests").update({ status, resolved_at: new Date().toISOString() }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin", "layout");
  return { ok: true };
}

export async function adminAddAdmin(_: FormState, form: FormData): Promise<FormState> {
  try {
    const supabase = await adminClient();
    const { error } = await supabase.rpc("admin_add_admin", { p_email: String(form.get("email") ?? "") });
    if (error) return { error: error.message };
    revalidatePath("/admin/settings");
    return { ok: true, message: "Admin added" };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function adminRemoveAdmin(userId: string) {
  const supabase = await adminClient();
  const { error } = await supabase.rpc("admin_remove_admin", { p_user: userId });
  if (error) return { error: error.message };
  revalidatePath("/admin/settings");
  return { ok: true };
}

export async function adminSaveSettings(_: FormState, form: FormData): Promise<FormState> {
  try {
    const supabase = await adminClient();
    const whatsapp = String(form.get("whatsapp") ?? "").replace(/[^\d+]/g, "");
    const message = String(form.get("message") ?? "").slice(0, 300);
    const announcement = String(form.get("announcement") ?? "").slice(0, 200);
    const active = form.get("announcement_active") === "on";
    const { error } = await supabase.from("site_settings").upsert([
      { key: "contact", value: { whatsapp, message }, updated_at: new Date().toISOString() },
      { key: "announcement", value: { text: announcement, active }, updated_at: new Date().toISOString() },
    ]);
    if (error) return { error: error.message };
    revalidateTag(SETTINGS_TAG);
    revalidatePath("/", "layout");
    return { ok: true, message: "Settings saved" };
  } catch (e) {
    return { error: (e as Error).message };
  }
}
