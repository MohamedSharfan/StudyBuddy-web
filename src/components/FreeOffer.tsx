import { Gift, GraduationCap } from "lucide-react";
import { AL_COMING_SOON, AL_ENABLED, FREE_ACCESS, FREE_OFFER } from "@/lib/config";

const HIGHLIGHT = "100% FREE";

/** Small marketing banner for the free launch; "100% FREE" is highlighted. */
export function FreeOffer({ className = "" }: { className?: string }) {
  if (!FREE_ACCESS) return null;
  const [before, after] = FREE_OFFER.includes(HIGHLIGHT) ? FREE_OFFER.split(HIGHLIGHT) : [FREE_OFFER, null];
  return (
    <p className={`flex items-center gap-2.5 rounded-xl border border-gold/40 bg-gold/10 px-3.5 py-2.5 text-sm font-semibold text-white ${className}`}>
      <Gift size={18} className="text-gold flex-none" />
      <span>
        {before}
        {after !== null && (
          <>
            <b className="text-gold">{HIGHLIGHT}</b>
            {after}
          </>
        )}
      </span>
    </p>
  );
}

/** Small "A/L coming soon" banner, shown until A/L launches. */
export function ALComingSoon({ className = "" }: { className?: string }) {
  if (AL_ENABLED) return null;
  const [lead, rest] = AL_COMING_SOON.split(/:\s*/, 2);
  return (
    <p className={`flex items-center gap-2.5 rounded-xl border border-violet/40 bg-violet/10 px-3.5 py-2.5 text-sm ${className}`}>
      <GraduationCap size={18} className="text-lilac flex-none" />
      <span>
        <b className="text-white">{lead}</b>
        {rest && <span className="text-muted">: {rest}</span>}
      </span>
    </p>
  );
}
