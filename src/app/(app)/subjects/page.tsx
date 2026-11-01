import Link from "next/link";
import { Lock } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { subjectTotals, subjectsFor, subjectsForLevel } from "@/lib/catalog";
import { LOGIN_ENABLED, MEDIUMS } from "@/lib/config";
import { AL_STREAMS, OL_UPCOMING, getStream, levelLabel } from "@/lib/levels";
import { getMedium } from "@/lib/prefs";
import { subjectProgress } from "@/lib/progress";
import { completionSet, getViewer, hasSubjectAccess } from "@/lib/session";

export const metadata = { title: "Subjects" };

export default async function Subjects() {
  const [viewer, medium] = await Promise.all([getViewer(), getMedium()]);
  // Free launch: no accounts, so use the medium picked on the start screen.
  const p = LOGIN_ENABLED ? viewer?.profile : { education_level: "O/L", stream: null, medium: medium?.name, grade: 10 };
  const done = completionSet(viewer);
  const subjects = subjectsFor(p);
  const otherMediums = subjectsForLevel(p).filter((s) => !subjects.includes(s));
  const isAL = p?.education_level === "A/L";
  const comingSoon = isAL ? (getStream(p?.stream)?.subjects ?? []) : OL_UPCOMING;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="display text-3xl font-bold">Subjects</h1>
        <p className="text-muted mt-1">
          {LOGIN_ENABLED && viewer?.profile ? levelLabel(viewer.profile) : `O/L · Grade 10 & 11${medium ? ` · ${medium.name} medium` : ""}`}
        </p>
      </div>

      {subjects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {subjects.map((s) => {
            const t = subjectTotals(s.id);
            const prog = subjectProgress(s, done);
            const access = hasSubjectAccess(viewer, s.id);
            return (
              <Link key={s.id} href={`/subjects/${s.id}`} className="glass glass-hover p-5">
                <div className="flex items-start gap-4">
                  <ProgressRing value={prog.percent} size={72}>
                    <Icon name={s.icon ?? "book-open"} size={26} className="text-lilac" />
                  </ProgressRing>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold">
                      {s.name} {s.nameLocal && <span className="text-muted font-normal text-base">{s.nameLocal}</span>}
                    </h2>
                    <p className="text-sm text-muted">{s.tagline}</p>
                    <p className="text-sm text-muted mt-2">
                      {t.chapters} chapters · {t.quiz} quiz questions · {t.mcq + t.structured} past-paper questions
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  {LOGIN_ENABLED ? (
                    <span>
                      <b>{prog.percent}%</b> <span className="text-muted">complete</span>
                    </span>
                  ) : (
                    <span className="font-semibold text-gold">Start studying →</span>
                  )}
                  {!LOGIN_ENABLED ? (
                    <span className="chip !text-green !border-green/40">Free</span>
                  ) : access ? (
                    <span className="chip !text-green !border-green/40">Unlocked</span>
                  ) : (
                    <span className="chip !text-gold !border-gold/40">
                      <Lock size={12} /> Chapter 1 free
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="glass p-6">
          <p className="font-bold">Your subjects are coming soon</p>
          <p className="text-sm text-muted mt-1">We&apos;re launching O/L first. These will open here as soon as they&apos;re ready.</p>
        </div>
      )}

      {otherMediums.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-muted mb-3">Also available in another medium</h2>
          <div className="flex flex-wrap gap-2">
            {otherMediums.map((s) => (
              <a
                key={s.id}
                href={LOGIN_ENABLED ? `/subjects/${s.id}` : `/choose?medium=${MEDIUMS.find((m) => m.name === s.medium)?.code ?? ""}`}
                className="chip hover:!text-white"
              >
                <Icon name={s.icon ?? "book-open"} size={13} /> {s.name} · {s.medium} medium
              </a>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold text-muted mb-3">Coming soon</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {comingSoon.map((s) => (
            <div key={s.name} className="rounded-xl border border-line p-4">
              <Icon name={s.icon} size={20} className="text-muted" />
              <p className="font-semibold mt-2">{s.name}</p>
            </div>
          ))}
        </div>
      </div>

      {!isAL && (
        <div>
          <h2 className="text-sm font-semibold text-muted mb-3">A/L · Grade 12 &amp; 13 · coming soon</h2>
          <div className="glass divide-y divide-line">
            {AL_STREAMS.map((st) => (
              <div key={st.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span className="font-semibold">{st.name}</span>
                <Lock size={14} className="text-faint" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
