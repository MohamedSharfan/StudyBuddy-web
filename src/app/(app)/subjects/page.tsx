import Link from "next/link";
import { Lock } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { catalog, subjectTotals, upcomingSubjects } from "@/lib/catalog";
import { subjectProgress } from "@/lib/progress";
import { completionSet, getViewer, hasSubjectAccess } from "@/lib/session";

export const metadata = { title: "Subjects" };

export default async function Subjects() {
  const viewer = await getViewer();
  const done = completionSet(viewer);
  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">O/L · Tamil medium</p>
        <h1 className="display text-4xl font-bold mt-1">Subjects</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {catalog.subjects.map((s) => {
          const t = subjectTotals(s.id);
          const prog = subjectProgress(s, done);
          const access = hasSubjectAccess(viewer, s.id);
          return (
            <Link key={s.id} href={`/subjects/${s.id}`} className="glass glass-hover p-6 relative overflow-hidden bg-gradient-to-br from-electric/40 to-transparent">
              <div className="flex items-start gap-5">
                <ProgressRing value={prog.percent} size={92}>
                  <span className="text-3xl">☪️</span>
                </ProgressRing>
                <div className="flex-1">
                  <h2 className="display text-3xl font-bold">{s.name}</h2>
                  <p lang="ta" className="text-muted">
                    {s.nameLocal} · {s.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="chip">{t.chapters} chapters</span>
                    <span className="chip">{t.quiz} quiz Qs</span>
                    <span className="chip">{t.mcq + t.structured} past-paper Qs</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm">
                  <b className="text-gold">{prog.percent}%</b> complete
                </span>
                {access ? (
                  <span className="chip !text-green !border-green/30">Unlocked</span>
                ) : (
                  <span className="chip !text-gold !border-gold/30">
                    <Lock size={12} /> Chapter 1 free
                  </span>
                )}
              </div>
            </Link>
          );
        })}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 content-start">
          {upcomingSubjects.map((s) => (
            <div key={s.name} className="glass p-4 opacity-55">
              <Icon name={s.icon} size={24} className="text-lilac" />
              <p className="font-bold mt-2">{s.name}</p>
              <p className="text-xs text-muted">Coming soon</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
