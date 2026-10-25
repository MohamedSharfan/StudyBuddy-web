/** Placeholder shown instantly while a page loads on the server. */
export function PageSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-5 animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-56 rounded-lg bg-white/[.06]" />
      <div className="h-4 w-80 max-w-full rounded bg-white/[.05]" />
      <div className="grid md:grid-cols-2 gap-4 pt-2">
        {Array.from({ length: rows * 2 }, (_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-white/[.045] border border-line" />
        ))}
      </div>
    </div>
  );
}

export function TabSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="h-6 w-2/3 rounded bg-white/[.06]" />
      <div className="h-4 w-full rounded bg-white/[.05]" />
      <div className="h-4 w-11/12 rounded bg-white/[.05]" />
      <div className="h-4 w-4/5 rounded bg-white/[.05]" />
      <div className="h-48 rounded-2xl bg-white/[.045] border border-line mt-6" />
    </div>
  );
}
