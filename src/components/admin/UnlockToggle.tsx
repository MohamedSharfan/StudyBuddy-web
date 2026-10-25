"use client";

import { useState, useTransition } from "react";
import { Loader2, Lock, Unlock } from "lucide-react";
import { adminSetUnlock } from "@/app/actions";

/** Unlock / lock a subject for one student, with an optional payment note. */
export function UnlockToggle({ userId, subjectId, unlocked, compact = false }: { userId: string; subjectId: string; unlocked: boolean; compact?: boolean }) {
  const [pending, start] = useTransition();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const run = (unlock: boolean) =>
    start(async () => {
      setErr(null);
      const r = await adminSetUnlock(userId, subjectId, unlock, note);
      if (r?.error) setErr(r.error);
      else {
        setOpen(false);
        setNote("");
      }
    });

  if (unlocked)
    return (
      <button
        onClick={() => {
          if (confirm("Lock this subject for the student again?")) run(false);
        }}
        disabled={pending}
        className={`btn btn-ghost btn-sm !border-green/40 !text-green hover:!border-pink/50 hover:!text-pink group ${compact ? "" : "min-w-[118px]"}`}
        title="Click to lock again"
      >
        {pending ? <Loader2 size={14} className="animate-spin" /> : <Unlock size={14} />}
        <span className="group-hover:hidden">Unlocked</span>
        <span className="hidden group-hover:inline">Lock</span>
      </button>
    );

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} disabled={pending} className={`btn btn-gold btn-sm ${compact ? "" : "min-w-[118px]"}`}>
        {pending ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />} Unlock
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 z-20 w-[280px] glass p-3 pop shadow-2xl">
          <label className="label" htmlFor={`note-${userId}`}>
            Payment note (optional)
          </label>
          <input
            id={`note-${userId}`}
            className="input !min-h-[40px] text-sm"
            placeholder="e.g. Paid via bank · ref 1234"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={200}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && run(true)}
          />
          {err && <p className="text-xs text-pink mt-2">{err}</p>}
          <div className="flex gap-2 mt-3">
            <button className="btn btn-green btn-sm flex-1" onClick={() => run(true)} disabled={pending}>
              {pending && <Loader2 size={14} className="animate-spin" />} Confirm unlock
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
