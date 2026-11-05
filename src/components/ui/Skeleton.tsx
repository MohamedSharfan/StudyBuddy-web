/** Placeholder shown instantly while a page loads on the server. */
export function PageSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Loading">
      <div className="loading-shimmer h-8 w-56 rounded-lg" />
      <div className="loading-shimmer h-4 w-80 max-w-full rounded" />
      <div className="grid md:grid-cols-2 gap-4 pt-2">
        {Array.from({ length: rows * 2 }, (_, i) => (
          <div key={i} className="loading-shimmer h-28 rounded-2xl border border-line" />
        ))}
      </div>
    </div>
  );
}

export function TabSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading">
      <div className="loading-shimmer h-6 w-2/3 rounded" />
      <div className="loading-shimmer h-4 w-full rounded" />
      <div className="loading-shimmer h-4 w-11/12 rounded" />
      <div className="loading-shimmer h-4 w-4/5 rounded" />
      <div className="loading-shimmer h-48 rounded-2xl border border-line mt-6" />
    </div>
  );
}
