/** Minimal SVG take on the StudyBuddy panda (headset + hoodie colours). */
export function Panda({ size = 64, mood = "happy", className = "" }: { size?: number; mood?: "happy" | "wink" | "think"; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <radialGradient id="pface" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e9e4ff" />
        </radialGradient>
      </defs>
      <circle cx="28" cy="30" r="17" fill="#150b2e" />
      <circle cx="92" cy="30" r="17" fill="#150b2e" />
      <path d="M14 70 Q14 18 60 18 Q106 18 106 70 Q106 108 60 108 Q14 108 14 70Z" fill="url(#pface)" />
      <ellipse cx="42" cy="62" rx="14" ry="17" transform="rotate(-18 42 62)" fill="#150b2e" />
      <ellipse cx="78" cy="62" rx="14" ry="17" transform="rotate(18 78 62)" fill="#150b2e" />
      {mood === "wink" ? (
        <path d="M71 62 Q78 56 85 62" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : (
        <>
          <circle cx="78" cy="61" r="6" fill="#fff" />
          <circle cx="79.5" cy="59.5" r="2.4" fill="#150b2e" />
        </>
      )}
      <circle cx="42" cy="61" r="6" fill="#fff" />
      <circle cx="43.5" cy="59.5" r="2.4" fill="#150b2e" />
      <ellipse cx="60" cy="78" rx="6" ry="4" fill="#150b2e" />
      {mood === "think" ? (
        <path d="M52 92 H68" stroke="#150b2e" strokeWidth="3.5" strokeLinecap="round" />
      ) : (
        <path d="M50 88 Q60 100 70 88" stroke="#150b2e" strokeWidth="3.5" fill="#f472b6" strokeLinecap="round" />
      )}
      <path d="M10 66 Q10 14 60 12 Q110 14 110 66" stroke="#7c3aed" strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="2" y="56" width="16" height="26" rx="8" fill="#5b21b6" stroke="#a855f7" strokeWidth="2" />
      <rect x="102" y="56" width="16" height="26" rx="8" fill="#5b21b6" stroke="#a855f7" strokeWidth="2" />
    </svg>
  );
}
