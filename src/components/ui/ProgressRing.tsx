export function ProgressRing({ value, size = 72, stroke = 7, children }: { value: number; size?: number; stroke?: number; children?: React.ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <span className="relative inline-grid place-items-center flex-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 absolute inset-0" aria-hidden>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a855f7" />
            <stop offset="1" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          style={{ transition: "stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1)" }}
        />
      </svg>
      <span className="relative" role="img" aria-label={`${pct}% complete`}>
        {children}
      </span>
    </span>
  );
}
