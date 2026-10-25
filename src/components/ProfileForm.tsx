"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { saveProfile, type FormState } from "@/app/actions";
import { PROVINCES } from "@/lib/gamification";

type Initial = {
  username: string | null;
  display_name: string;
  grade: number;
  province: string | null;
  medium: string;
  bio: string;
  headline: string;
  phone: string | null;
};

export function ProfileForm({ initial, next, full = false, submitLabel = "Save" }: { initial: Initial; next?: string; full?: boolean; submitLabel?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProfile, {});
  return (
    <form action={action} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="display_name">
            Your name
          </label>
          <input id="display_name" name="display_name" required maxLength={60} defaultValue={initial.display_name} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="username">
            Username
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint">@</span>
            <input
              id="username"
              name="username"
              required
              pattern="[a-zA-Z0-9_]{3,20}"
              title="3–20 letters, numbers or _"
              defaultValue={initial.username ?? ""}
              className="input !pl-8"
              autoCapitalize="off"
            />
          </div>
        </div>
      </div>

      <fieldset>
        <legend className="label">Grade</legend>
        <div className="grid grid-cols-2 gap-3">
          {[10, 11].map((g) => (
            <label key={g} className="cursor-pointer">
              <input type="radio" name="grade" value={g} defaultChecked={initial.grade === g} className="peer sr-only" />
              <span className="glass !rounded-2xl flex items-center justify-center gap-2 py-3.5 font-bold peer-checked:border-neon peer-checked:bg-electric/30 peer-focus-visible:ring-2 ring-gold">
                Grade {g}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="province">
            Province
          </label>
          <select id="province" name="province" defaultValue={initial.province ?? ""} className="input">
            <option value="">Choose province</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="medium">
            Medium
          </label>
          <select id="medium" name="medium" defaultValue={initial.medium} className="input">
            <option>Tamil</option>
            <option>Sinhala</option>
            <option>English</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="phone">
          WhatsApp / phone <span className="text-faint font-normal">(optional — helps us match your payment)</span>
        </label>
        <input id="phone" name="phone" type="tel" defaultValue={initial.phone ?? ""} placeholder="07X XXX XXXX" className="input" />
      </div>

      {full && (
        <>
          <div>
            <label className="label" htmlFor="headline">
              Headline
            </label>
            <input id="headline" name="headline" maxLength={80} defaultValue={initial.headline} placeholder="O/L 2026 · aiming for A" className="input" />
          </div>
          <div>
            <label className="label" htmlFor="bio">
              Bio
            </label>
            <textarea id="bio" name="bio" maxLength={280} rows={3} defaultValue={initial.bio} className="input" />
          </div>
        </>
      )}

      {state.error && <p className="text-sm rounded-xl px-3 py-2 bg-red-500/15 border border-red-400/30">{state.error}</p>}
      {state.ok && state.message && <p className="text-sm rounded-xl px-3 py-2 bg-green/10 border border-green/30">{state.message}</p>}

      <button className="btn btn-gold w-full sm:w-auto" disabled={pending}>
        {pending && <Loader2 size={18} className="animate-spin" />} {submitLabel}
      </button>
    </form>
  );
}
