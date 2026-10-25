/* eslint-disable @next/next/no-img-element */
const TINTS = ["#7c3aed", "#ec4899", "#0ea5e9", "#10b981", "#f59e0b", "#6366f1", "#d946ef"];

export function Avatar({ name, url, size = 40, ring = false }: { name: string; url?: string | null; size?: number; ring?: boolean }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  const tint = TINTS[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % TINTS.length];
  return (
    <span
      className={`relative inline-grid place-items-center rounded-full overflow-hidden flex-none font-extrabold text-white ${ring ? "ring-2 ring-gold ring-offset-2 ring-offset-bg" : ""}`}
      style={{ width: size, height: size, fontSize: size * 0.38, background: `linear-gradient(135deg, ${tint}, #2d1b4e)` }}
    >
      {url ? <img src={url} alt="" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" /> : initials || "S"}
    </span>
  );
}
