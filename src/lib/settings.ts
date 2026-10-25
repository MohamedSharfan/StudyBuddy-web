import "server-only";
import { unstable_cache } from "next/cache";
import { createClient as createAnonClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./supabase/env";

export type SiteSettings = {
  contact: { whatsapp: string; message: string };
  announcement: { text: string; active: boolean };
};

export const SETTINGS_TAG = "site-settings";

const DEFAULTS: SiteSettings = {
  contact: { whatsapp: "", message: "Hi! I would like to unlock a subject on StudyBuddy. My student code is" },
  announcement: { text: "", active: false },
};

/**
 * Site settings are public and rarely change, so they're cached across requests
 * (admin saves call `revalidateTag(SETTINGS_TAG)`), saving a database round trip per page.
 */
export const getSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    if (!isSupabaseConfigured) return DEFAULTS;
    const supabase = createAnonClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
    const { data } = await supabase.from("site_settings").select("key, value");
    const out = structuredClone(DEFAULTS);
    for (const row of data ?? []) {
      if (row.key === "contact") out.contact = { ...out.contact, ...(row.value as object) };
      if (row.key === "announcement") out.announcement = { ...out.announcement, ...(row.value as object) };
    }
    return out;
  },
  ["site-settings"],
  { tags: [SETTINGS_TAG], revalidate: 600 },
);

export function whatsappLink(settings: SiteSettings, studentCode?: string) {
  const number = settings.contact.whatsapp.replace(/[^\d]/g, "");
  if (!number) return null;
  const text = `${settings.contact.message} ${studentCode ?? ""}`.trim();
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
