import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BookMarked, ChevronRight, FileText, Images, Lock, MapPinned } from "lucide-react";
import { AskTeacher } from "@/components/AskTeacher";
import { ChapterList } from "@/components/ChapterList";
import { FreeOffer } from "@/components/FreeOffer";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { getSubject, gradeName, subjectTotals, subjectVersions } from "@/lib/catalog";
import { LOGIN_ENABLED, MEDIUMS } from "@/lib/config";
import { PAST_MAP_SETS, TEXTBOOK_MAP_SETS } from "@/lib/maps/sets";
import { starItems, subjectProgress } from "@/lib/progress";
import { canonicalUrl, subjectSeo } from "@/lib/seo";
import { canSeeSubject, completionSet, getViewer, hasSubjectAccess } from "@/lib/session";

export async function generateMetadata({ params, searchParams }: { params: Promise<{ subjectId: string }>; searchParams: Promise<{ grade?: string }> }) {
  const s = getSubject((await params).subjectId);
  if (!s) return { title: "Subject" };
  const { grade: rawGrade } = await searchParams;
  const seo = subjectSeo(s.id, Number(rawGrade) || s.grades[0]?.grade || 10);
  if (!seo) return { title: "Subject" };
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: canonicalUrl(seo.path), languages: seo.languages },
    openGraph: { type: "website", siteName: "StudyBuddy", title: seo.title, description: seo.description, url: canonicalUrl(seo.path), images: ["/logo.jpg"] },
  };
}

export default async function SubjectPage({ params, searchParams }: { params: Promise<{ subjectId: string }>; searchParams: Promise<{ grade?: string }> }) {
  const { subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject) notFound();
  const viewer = await getViewer();
  if (!canSeeSubject(viewer, subject)) redirect("/subjects");
  const done = completionSet(viewer);
  const access = hasSubjectAccess(viewer, subject.id);
  const grades = subject.grades.map((g) => g.grade);
  const requested = Number((await searchParams).grade);
  const grade = grades.includes(requested) ? requested : grades.includes(viewer?.profile?.grade ?? 0) ? viewer!.profile!.grade : grades[0];
  const items = starItems(subject, grade, done, access);
  const prog = subjectProgress(subject, done);
  const totals = subjectTotals(subject.id);
  const gradeDone = items.filter((i) => i.state === "done").length;

  // The same subject in the other medium(s), for the Tamil / English switch.
  const versions = subjectVersions(subject);
  const en = subject.lang === "en";
  const gradeMaps = TEXTBOOK_MAP_SETS.filter((m) => m.grade === grade).length;

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
      <div className="min-w-0" lang={subject.lang}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">
              {subject.level} · Grade 10 &amp; 11 · {subject.medium} medium
            </p>
            <h1 className="display text-3xl font-bold mt-1">
              {subject.name} {subject.nameLocal && <span className="text-muted text-xl font-semibold">{subject.nameLocal}</span>}
            </h1>
          </div>
          {versions.length > 1 && (
            <div className="flex rounded-xl border border-line p-1" aria-label="Medium">
              {versions.map((v) => {
                const code = MEDIUMS.find((m) => m.name === v.medium)?.code;
                const current = v.id === subject.id;
                const cls = `px-4 py-1.5 rounded-lg font-semibold text-sm ${current ? "bg-card-2 text-white" : "text-muted hover:text-white"}`;
                // Free launch: switching medium goes through /choose (remembers it), so use a plain link.
                return LOGIN_ENABLED || !code ? (
                  <Link key={v.id} href={`/subjects/${v.id}?grade=${grade}`} aria-current={current ? "page" : undefined} className={cls}>
                    {v.medium}
                  </Link>
                ) : (
                  <a key={v.id} href={`/choose?medium=${code}&subject=${encodeURIComponent(v.name)}&grade=${grade}`} aria-current={current ? "page" : undefined} className={cls}>
                    {v.medium}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {grades.length > 1 && <div className="grid grid-cols-2 gap-2 mt-5" role="tablist" aria-label="Grade">
          {grades.map((g) => (
            <Link
              key={g}
              href={`/subjects/${subject.id}?grade=${g}`}
              role="tab"
              aria-selected={g === grade}
              className={`text-center py-3 rounded-xl font-bold border ${g === grade ? "bg-electric border-electric text-white" : "border-line text-muted hover:text-white"}`}
            >
              {gradeName(subject, g)}
            </Link>
          ))}
        </div>}

        <FreeOffer className="mt-4" />

        {subject.maps && (
          <Link href={`/subjects/${subject.id}/maps?grade=${grade}`} className="glass glass-hover !border-gold/60 flex items-center gap-3.5 p-4 mt-4">
            <span className="grid place-items-center w-11 h-11 rounded-xl flex-none bg-gold text-bg">
              <MapPinned size={22} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-bold">{en ? "Map marking practice" : "தேசப்படம் குறித்தல் பயிற்சி"}</span>
              <span className="block text-sm text-muted">
                {en
                  ? `Tap the places on a real map · ${PAST_MAP_SETS.length / 2} past papers (2016–2025) · ${gradeMaps} Grade ${grade} maps`
                  : `உண்மையான தேசப்படத்தில் இடங்களைத் தொட்டுக் குறியுங்கள் · ${PAST_MAP_SETS.length / 2} கடந்தகால வினாத்தாள்கள் (2016–2025) · தரம் ${grade} – ${gradeMaps} படங்கள்`}
              </span>
            </span>
            <ChevronRight size={20} className="text-gold flex-none" />
          </Link>
        )}

        {subject.pictures && (
          <Link href={`/subjects/${subject.id}/pictures?grade=${grade}`} className="glass glass-hover !border-gold/60 flex items-center gap-3.5 p-4 mt-3">
            <span className="grid place-items-center w-11 h-11 rounded-xl flex-none bg-gold text-bg">
              <Images size={22} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-bold">{en ? "Picture questions" : "படம் சார்ந்த வினாக்கள்"}</span>
              <span className="block text-sm text-muted">
                {en
                  ? `Name the picture · ${subject.pictures.papers} past-paper pictures (2016–2025) · ${subject.pictures.textbook[grade] ?? 0} Grade ${grade} textbook pictures`
                  : `படத்தை அடையாளம் காணுங்கள் · ${subject.pictures.papers} கடந்தகாலப் படங்கள் (2016–2025) · தரம் ${grade} – ${subject.pictures.textbook[grade] ?? 0} பாடநூல் படங்கள்`}
              </span>
            </span>
            <ChevronRight size={20} className="text-gold flex-none" />
          </Link>
        )}

        {subject.extras && subject.extras.papers.length > 0 && (
          <section id="papers" className="mt-5 scroll-mt-24">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <FileText size={18} className="text-gold" /> {en ? "Past papers by year" : "ஆண்டுவாரியான கடந்தகால வினாத்தாள்கள்"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-2 mt-3">
              {subject.extras.papers.map((p) => (
                <Link key={p.slug} href={`/subjects/${subject.id}/papers/${p.slug}`} className="glass glass-hover flex items-center gap-3 p-3.5">
                  <span className="chip !text-gold !border-gold/40 flex-none">{p.yearLabel}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-sm leading-snug">{p.title.replace(/\s*[–-]\s*20\d\d.*$/, "")}</span>
                    <span className="block text-xs text-muted">{p.mcq ? `${p.mcq} MCQs` : `${p.structured} questions`}</span>
                  </span>
                  <ChevronRight size={18} className="text-gold flex-none" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {subject.extras && subject.extras.guides.length > 0 && (
          <section id="guides" className="mt-5 scroll-mt-24">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <BookMarked size={18} className="text-gold" /> {en ? "Study guides" : "கற்றல் வழிகாட்டிகள்"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-2 mt-3">
              {subject.extras.guides.map((g) => (
                <Link key={g.slug} href={`/subjects/${subject.id}/guides/${g.slug}`} className="glass glass-hover flex items-center gap-3 p-3.5">
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold leading-snug">{g.title}</span>
                    <span className="block text-xs text-muted">{g.sections.length} {en ? "sections" : "பகுதிகள்"}</span>
                  </span>
                  <ChevronRight size={18} className="text-gold flex-none" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="text-muted mt-4 mb-3 text-sm">
          {LOGIN_ENABLED ? `${gradeDone} of ${items.length} chapters done` : `${items.length} chapters · tap a chapter to start`}
        </p>
        <ChapterList items={items} showProgress={LOGIN_ENABLED} />
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24">
        <AskTeacher context={`${subject.name} (${subject.medium} medium), ${gradeName(subject, grade)}`} />
        {LOGIN_ENABLED && (
          <div className="glass p-5 flex items-center gap-4">
            <ProgressRing value={prog.percent} size={70}>
              <span className="font-bold">{prog.percent}%</span>
            </ProgressRing>
            <div>
              <p className="font-bold">Whole subject</p>
              <p className="text-sm text-muted">
                {prog.completedChapters}/{prog.chapterCount} chapters done
              </p>
            </div>
          </div>
        )}
        {!access && (
          <div className="glass p-5 !border-gold/40">
            <p className="font-bold flex items-center gap-2">
              <Lock size={16} className="text-gold" /> Free preview
            </p>
            <p className="text-sm text-muted mt-2">
              Chapter 1 of each grade is open. Unlock all {totals.chapters} chapters, {totals.quiz} quiz questions and every past paper.
            </p>
            <Link href={viewer ? "/unlock" : "/login?next=/unlock"} className="btn btn-gold btn-sm w-full mt-4">
              How to unlock
            </Link>
          </div>
        )}
        <div className="glass p-5 text-sm space-y-2">
          <p className="font-bold mb-1">In this subject</p>
          {[
            ["Chapters", totals.chapters],
            ["Flashcards", totals.flashcards],
            ["Quiz questions", totals.quiz],
            ["Past-paper MCQs", totals.mcq],
            ["Structured questions", totals.structured],
          ]
            .filter(([, n]) => n)
            .map(([l, n]) => (
            <div key={l} className="flex justify-between">
              <span className="text-muted">{l}</span>
              <b>{n}</b>
            </div>
          ))}
        </div>
        {LOGIN_ENABLED && !viewer && (
          <div className="glass p-5 text-sm">
            <p className="font-bold">Save your progress</p>
            <p className="text-muted mt-1 mb-3">Sign in to track the chapters you finish.</p>
            <Link href={`/login?next=/subjects/${subject.id}`} className="btn btn-sm w-full">
              Sign in
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
