import "server-only";
import { cache } from "react";
import { createClient } from "./supabase/server";

export type SiteSettings = {
  contact: { whatsapp: string; message: string };
  announcement: { text: string; active: boolean };
};

const DEFAULTS: SiteSettings = {
  contact: { whatsapp: "", message: "Assalamu alaikum! I would like to unlock StudyBuddy Islam. My student code is" },
  announcement: { text: "", active: false },
};

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const supabase = await createClient();
  if (!supabase) return DEFAULTS;
  const { data } = await supabase.from("site_settings").select("key, value");
  const out = structuredClone(DEFAULTS);
  for (const row of data ?? []) {
    if (row.key === "contact") out.contact = { ...out.contact, ...(row.value as object) };
    if (row.key === "announcement") out.announcement = { ...out.announcement, ...(row.value as object) };
  }
  return out;
});

export function whatsappLink(settings: SiteSettings, studentCode?: string) {
  const number = settings.contact.whatsapp.replace(/[^\d]/g, "");
  if (!number) return null;
  const text = `${settings.contact.message} ${studentCode ?? ""}`.trim();
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
