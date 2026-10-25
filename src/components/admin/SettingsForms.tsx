"use client";

import { useActionState, useTransition } from "react";
import { Loader2, UserPlus, X } from "lucide-react";
import { adminAddAdmin, adminRemoveAdmin, adminSaveSettings, type FormState } from "@/app/actions";
import type { SiteSettings } from "@/lib/settings";

function Status({ state }: { state: FormState }) {
  if (state.error) return <p className="text-sm rounded-xl px-3 py-2 bg-red-500/15 border border-red-400/30">{state.error}</p>;
  if (state.ok) return <p className="text-sm rounded-xl px-3 py-2 bg-green/10 border border-green/30">✓ {state.message}</p>;
  return null;
}

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, action, pending] = useActionState<FormState, FormData>(adminSaveSettings, {});
  return (
    <form action={action} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="whatsapp">
            WhatsApp number (with country code)
          </label>
          <input id="whatsapp" name="whatsapp" defaultValue={settings.contact.whatsapp} placeholder="+94 77 123 4567" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="message">
            Pre-filled message
          </label>
          <input id="message" name="message" defaultValue={settings.contact.message} className="input" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="announcement">
          Announcement banner
        </label>
        <input id="announcement" name="announcement" defaultValue={settings.announcement.text} placeholder="e.g. Grade 11 past papers updated!" className="input" maxLength={200} />
        <label className="flex items-center gap-2 mt-2 text-sm">
          <input type="checkbox" name="announcement_active" defaultChecked={settings.announcement.active} className="accent-[var(--gold)] w-4 h-4" /> Show banner
        </label>
      </div>
      <Status state={state} />
      <button className="btn btn-gold" disabled={pending}>
        {pending && <Loader2 size={16} className="animate-spin" />} Save settings
      </button>
    </form>
  );
}

export function AddAdminForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(adminAddAdmin, {});
  return (
    <form action={action} className="space-y-3">
      <div className="flex gap-2">
        <input name="email" type="email" required placeholder="Email of a signed-up user" className="input" />
        <button className="btn" disabled={pending}>
          {pending ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />} Add
        </button>
      </div>
      <Status state={state} />
    </form>
  );
}

export function RemoveAdminButton({ userId }: { userId: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      className="btn btn-ghost btn-sm"
      disabled={pending}
      onClick={() => {
        if (confirm("Remove admin access for this person?")) start(() => adminRemoveAdmin(userId).then(() => undefined));
      }}
    >
      {pending ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />} Remove
    </button>
  );
}
