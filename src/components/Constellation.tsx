import Link from "next/link";
import { Lock } from "lucide-react";
import type { ChapterSummary } from "@/lib/catalog";

export type StarState = "done" | "progress" | "open" | "locked";

export type StarItem = {
  chapter: ChapterSummary;
  href: string;
  state: StarState;
  steps: boolean[]; // read, recall, quiz, exam
  next?: boolean;
};

const ROW = 112;

function StarShape({ state, next, n }: { state: StarState; next?: boolean; n: number }) {
  const fill =
    state === "done" ? "url(#gStarGold)" : state === "progress" ? "url(#gStarViolet)" : state === "open" ? "rgba(45,27,78,.95)" : "rgba(26,11,46,.9)";
  const stroke = state === "done" ? "#fde68a" : state === "locked" ? "rgba(196,181,253,.25)" : "#c4b5fd";
  return (
    <span
      className={`relative grid place-items-center w-[62px] h-[62px] transition-transform group-hover:scale-110 group-hover:rotate-12 ${next ? "animate-[pulse-ring_1.8s_ease-out_infinite] rounded-full" : ""}`}
      style={state === "done" ? { filter: "drop-shadow(0 0 14px rgba(251,191,36,.65))" } : undefined}
    >
      <svg viewBox="0 0 62 62" className="absolute inset-0" aria-hidden>
        <g transform="translate(31 31)">
          <rect x="-19" y="-19" width="38" height="38" rx="5" fill={fill} stroke={stroke} strokeWidth="1.6" />
          <rect x="-19" y="-19" width="38" height="38" rx="5" fill={fill} stroke={stroke} strokeWidth="1.6" transform="rotate(45)" />
          <circle r="14" fill="none" stroke={stroke} strokeOpacity=".35" />
        </g>
      </svg>
      <span className={`relative display font-bold text-lg ${state === "done" ? "text-[#1a0b2e]" : state === "locked" ? "text-faint" : "text-white"}`}>
        {state === "locked" ? <Lock size={17} /> : n}
      </span>
    </span>
  );
}

export function StarDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <linearGradient id="gStarGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset=".55" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="gStarViolet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a855f7" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** A winding "constellation" of chapters — each star lights up gold as the student completes it. */
export function Constellation({ items, compact = false }: { items: StarItem[]; compact?: boolean }) {
  const row = compact ? 92 : ROW;
  const height = items.length * row + 20;
  const pts = items.map((_, i) => ({ x: i % 2 === 0 ? 22 : 78, y: i * row + row / 2 }));
  const pathTo = (end: number) =>
    pts
      .slice(0, end + 1)
      .map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = pts[i - 1];
        return `C ${prev.x} ${prev.y + row * 0.55} ${p.x} ${p.y - row * 0.55} ${p.x} ${p.y}`;
      })
      .join(" ");
  let lastLit = -1;
  items.forEach((it, i) => {
    if (it.state === "done" || it.state === "progress") lastLit = i;
  });

  return (
    <div className="relative w-full" style={{ height }}>
      <StarDefs />
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" aria-hidden>
        <path d={pathTo(items.length - 1)} fill="none" stroke="rgba(196,181,253,.28)" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        {lastLit > 0 && (
          <path
            d={pathTo(lastLit)}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ filter: "drop-shadow(0 0 4px rgba(251,191,36,.8))" }}
          />
        )}
      </svg>
      <ol>
        {items.map((it, i) => {
          const p = pts[i];
          const left = p.x < 50;
          const c = it.chapter;
          return (
            <li key={c.id} className="absolute" style={{ top: p.y, left: 0, right: 0 }}>
              <Link
                href={it.href}
                className="group absolute -translate-y-1/2 flex items-center gap-3"
                style={left ? { left: `calc(${p.x}% - 31px)`, right: "2%" } : { right: `calc(${100 - p.x}% - 31px)`, left: "2%", flexDirection: "row-reverse" }}
                aria-label={`Chapter ${c.number}: ${c.title}${it.state === "locked" ? " (locked)" : ""}`}
              >
                <StarShape state={it.state} next={it.next} n={c.number} />
                <span
                  className={`glass !rounded-2xl px-3.5 py-2.5 min-w-0 flex-1 max-w-[340px] transition-colors group-hover:border-lilac/50 ${
                    it.state === "locked" ? "opacity-60" : ""
                  } ${left ? "" : "text-right"}`}
                >
                  <span className={`flex items-center gap-1.5 text-[11px] font-bold text-muted ${left ? "" : "justify-end"}`}>
                    CH {c.number}
                    {c.free && <span className="text-green">· FREE</span>}
                    {it.next && <span className="text-gold">· NEXT</span>}
                  </span>
                  <span lang="ta" className="block font-bold text-[0.92rem] leading-snug text-white truncate">
                    {c.title}
                  </span>
                  {!compact && (
                    <span className={`flex gap-1 mt-1.5 ${left ? "" : "justify-end"}`} aria-hidden>
                      {it.steps.map((s, k) => (
                        <span key={k} className={`h-1.5 w-6 rounded-full ${s ? "bg-gold" : "bg-white/10"}`} />
                      ))}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
