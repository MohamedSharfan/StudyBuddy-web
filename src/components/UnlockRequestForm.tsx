"use client";

import { useActionState } from "react";
import { Loader2, Send } from "lucide-react";
import { requestUnlock, type FormState } from "@/app/actions";

export function UnlockRequestForm({ subjectId, phone }: { subjectId: string; phone: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(requestUnlock, {});
  if (state.ok)
    return <p className="rounded-2xl bg-green/10 border border-green/30 p-4 text-sm font-semibold">✓ {state.message}</p>;
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="subject_id" value={subjectId} />
      <div>
        <label className="label" htmlFor="req-phone">
          WhatsApp / phone
        </label>
        <input id="req-phone" name="phone" type="tel" required defaultValue={phone} placeholder="07X XXX XXXX" className="input" />
      </div>
      <div>
        <label className="label" htmlFor="req-msg">
          Message <span className="text-faint font-normal">(optional — e.g. payment reference)</span>
        </label>
        <textarea id="req-msg" name="message" rows={3} maxLength={500} className="input" />
      </div>
      {state.error && <p className="text-sm rounded-xl px-3 py-2 bg-red-500/15 border border-red-400/30">{state.error}</p>}
      <button className="btn w-full" disabled={pending}>
        {pending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} Send unlock request
      </button>
    </form>
  );
}
