"use client";

import { useActionState, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { saveProfile, type FormState } from "@/app/actions";
import { PROVINCES } from "@/lib/gamification";
import { AL_STREAMS, LEVELS, gradesFor, type Level } from "@/lib/levels";

type Initial = {
  username: string | null;
  display_name: string;
  education_level: Level | null;
  stream: string | null;
  grade: number | null;
  province: string | null;
  medium: string;
  bio: string;
  headline: string;
  phone: string | null;
};

function Choice({ name, value, checked, onChange, title, sub }: { name: string; value: string; checked: boolean; onChange: () => void; title: string; sub?: string }) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors peer-focus-visible:ring-2 ring-gold ${
          checked ? "border-violet bg-violet/15" : "border-line bg-bg-2 hover:border-line-strong"
        }`}
      >
        <span>
          <span className="block font-bold">{title}</span>
          {sub && <span className="block text-xs text-muted mt-0.5">{sub}</span>}
        </span>
        <span className={`grid place-items-center w-5 h-5 rounded-full border flex-none ${checked ? "bg-violet border-violet" : "border-line-strong"}`}>
          {checked && <Check size={13} strokeWidth={3} />}
        </span>
      </span>
    </label>
  );
}

export function ProfileForm({ initial, next, full = false, submitLabel = "Save" }: { initial: Initial; next?: string; full?: boolean; submitLabel?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProfile, {});
  const [level, setLevel] = useState<Level | null>(initial.education_level);
  const [stream, setStream] = useState<string | null>(initial.stream);
  const [grade, setGrade] = useState<number | null>(initial.grade);

  const grades = level ? gradesFor(level) : [];
  const pickLevel = (l: Level) => {
    setLevel(l);
    if (!gradesFor(l).includes(grade ?? 0)) setGrade(null);
    if (l === "O/L") setStream(null);
  };
  // Show the rest of the form once the student has told us what they study.
  const ready = level === "O/L" || (level === "A/L" && Boolean(stream));

  return (
    <form action={action} className="space-y-6">
      {next && <input type="hidden" name="next" value={next} />}

      <fieldset>
        <legend className="font-bold text-lg">Which exam are you preparing for?</legend>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {LEVELS.map((l) => (
            <Choice key={l.id} name="education_level" value={l.id} checked={level === l.id} onChange={() => pickLevel(l.id)} title={l.name} sub={l.blurb} />
          ))}
        </div>
      </fieldset>

      {level === "A/L" && (
        <fieldset>
          <legend className="font-bold text-lg">Your A/L stream</legend>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            {AL_STREAMS.map((s) => (
              <Choice
                key={s.id}
                name="stream"
                value={s.id}
                checked={stream === s.id}
                onChange={() => setStream(s.id)}
                title={s.name}
                sub={s.subjects.map((x) => x.name).join(" · ")}
              />
            ))}
          </div>
        </fieldset>
      )}

      {ready && (
        <>
          <fieldset>
            <legend className="font-bold text-lg">Grade</legend>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {grades.map((g) => (
                <Choice key={g} name="grade" value={String(g)} checked={grade === g} onChange={() => setGrade(g)} title={`Grade ${g}`} />
              ))}
            </div>
          </fieldset>

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
                Medium <span className="text-faint font-normal">(your subjects are shown in this medium)</span>
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
              WhatsApp / phone <span className="text-faint font-normal">(optional, helps us match your payment)</span>
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

          <button className="btn btn-gold w-full sm:w-auto" disabled={pending || !grade}>
            {pending && <Loader2 size={18} className="animate-spin" />} {submitLabel}
          </button>
        </>
      )}
    </form>
  );
}
