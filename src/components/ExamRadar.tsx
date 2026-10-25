const YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

/** Bar strip showing how often a chapter appeared in each year's O/L paper. */
export function ExamRadar({ years, compact = false }: { years: Record<string, number>; compact?: boolean }) {
  const max = Math.max(1, ...Object.values(years));
  const asked = Object.keys(years).length;
  const total = Object.values(years).reduce((a, b) => a + b, 0);
  const verdict =
    asked >= 7 ? { t: "Very frequently asked", c: "text-pink" } : asked >= 4 ? { t: "Often asked", c: "text-gold" } : asked >= 1 ? { t: "Sometimes asked", c: "text-cyan" } : { t: "Not yet asked (2016–2025)", c: "text-muted" };
  return (
    <div className={`glass ${compact ? "p-4" : "p-6"}`}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-extrabold">📡 Exam radar</h3>
        <span className={`text-xs font-extrabold ${verdict.c}`}>{verdict.t}</span>
      </div>
      <div className={`flex items-end gap-1.5 ${compact ? "h-20" : "h-32"} mt-4`}>
        {YEARS.map((y) => {
          const n = years[String(y)] ?? 0;
          return (
            <div key={y} className="flex-1 flex flex-col items-center gap-1 h-full justify-end" title={`${y}: ${n} question${n === 1 ? "" : "s"}`}>
              <span className="text-[10px] font-bold text-gold">{n || ""}</span>
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-electric to-gold"
                style={{ height: `${n ? 15 + (n / max) * 85 : 5}%`, opacity: n ? 1 : 0.2 }}
              />
              <span className="text-[10px] text-muted">&apos;{String(y).slice(2)}</span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted mt-3">
        {total} question{total === 1 ? "" : "s"} across {asked} of 10 papers.
      </p>
    </div>
  );
}
