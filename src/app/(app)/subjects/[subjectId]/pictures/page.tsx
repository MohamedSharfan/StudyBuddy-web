import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, ChevronRight, Eye, Lightbulb } from "lucide-react";
import { chapterHref, getSubject, subjectVersions } from "@/lib/catalog";
import { loadPictureBook } from "@/lib/pictures";
import { isChapterOpen } from "@/lib/progress";
import { canonicalUrl } from "@/lib/seo";
import { canSeeSubject, getViewer, hasSubjectAccess } from "@/lib/session";

type Params = Promise<{ subjectId: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const s = getSubject((await params).subjectId);
  if (!s?.pictures) return { title: "Picture questions" };
  const title = `O/L ${s.name} Picture Questions · ${s.medium} Medium`;
  const description = `Practise the O/L ${s.name} picture question (Part II, Q1 (b)): every past-paper picture from ${s.pictures.years[0]}–${s.pictures.years.at(-1)} with answers, and the Grade 10 and 11 textbook pictures with the facts to remember.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/subjects/${s.id}/pictures`) },
    openGraph: { type: "website", siteName: "StudyBuddy", title, description, url: canonicalUrl(`/subjects/${s.id}/pictures`), images: ["/logo.jpg"] },
  };
}

export default async function PicturesHub({ params, searchParams }: { params: Params; searchParams: Promise<{ grade?: string }> }) {
  const { subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject?.pictures) notFound();
  const viewer = await getViewer();
  if (!canSeeSubject(viewer, subject)) redirect("/subjects");
  const access = hasSubjectAccess(viewer, subject.id);
  const en = subject.lang === "en";
  const requested = Number((await searchParams).grade);
  const grades = requested === 11 ? [11, 10] : [10, 11];
  const book = await loadPictureBook(subject.id);
  const versions = subjectVersions(subject).filter((v) => v.pictures);
  const years = [...new Set(book.papers.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div className="space-y-8 max-w-[900px]" lang={subject.lang}>
      <div className="flex items-center justify-between gap-3 text-sm">
        <Link href={`/subjects/${subject.id}`} className="flex items-center gap-1 text-muted hover:text-white font-semibold">
          <ChevronLeft size={16} /> {subject.name} · {subject.medium} medium
        </Link>
        {versions.length > 1 && (
          <div className="flex rounded-xl border border-line p-1" aria-label="Medium">
            {versions.map((v) => (
              <Link
                key={v.id}
                href={`/subjects/${v.id}/pictures`}
                aria-current={v.id === subject.id ? "page" : undefined}
                className={`px-3 py-1 rounded-lg font-semibold text-xs ${v.id === subject.id ? "bg-card-2 text-white" : "text-muted hover:text-white"}`}
              >
                {v.medium}
              </Link>
            ))}
          </div>
        )}
      </div>

      <header>
        <p className="eyebrow">O/L {subject.name} · {en ? "Part II, Question 1 (b)" : "பகுதி II, வினா 1 (ஆ)"}</p>
        <h1 className="display text-3xl font-bold mt-1">{en ? "Picture questions" : "படம் சார்ந்த வினாக்கள்"}</h1>
        <p className="text-muted mt-2">
          {en
            ? "Every O/L paper shows two pictures, A and B, with four short questions on each — 8 marks. The pictures come straight from your textbooks, so learn what each one shows and the facts around it."
            : "ஒவ்வொரு சா/த வினாத்தாளிலும் A, B என இரண்டு படங்கள் தரப்பட்டு, ஒவ்வொன்றுக்கும் நான்கு சிறு வினாக்கள் கேட்கப்படும் – 8 புள்ளிகள். படங்கள் பாடநூலிலிருந்தே எடுக்கப்படுகின்றன; எனவே ஒவ்வொரு படமும் காட்டுவதையும் அதனுடன் தொடர்புடைய தகவல்களையும் கற்றுக்கொள்ளுங்கள்."}
        </p>
        <p className="glass !border-gold/40 p-3.5 mt-4 text-sm flex gap-2.5">
          <Lightbulb size={18} className="text-gold flex-none mt-0.5" />
          <span>
            {en
              ? "The four questions usually ask: what is it, where is it, who made it or which king/period, and one fact about it."
              : "பொதுவாகக் கேட்கப்படுபவை: இது என்ன, எங்கு உள்ளது, யார் உருவாக்கினார் / எந்த மன்னன் அல்லது காலம், அது தொடர்பான ஒரு தகவல்."}
          </span>
        </p>
      </header>

      <section>
        <h2 className="font-bold text-lg">{en ? `Past papers ${years.at(-1)}–${years[0]}` : `கடந்தகால வினாத்தாள்கள் ${years.at(-1)}–${years[0]}`}</h2>
        <p className="text-sm text-muted mt-1">
          {en ? "The exact pictures and questions of each year, with the answers." : "ஒவ்வோர் ஆண்டும் கேட்கப்பட்ட அதே படங்களும் வினாக்களும் விடைகளுடன்."}
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-3">
          {years.map((y) => (
            <li key={y}>
              <Link href={`/subjects/${subject.id}/pictures/past/${y}`} className="glass glass-hover block p-2.5">
                <span className="grid grid-cols-2 gap-1.5">
                  {book.papers
                    .filter((p) => p.year === y)
                    .map((p) => (
                      <span key={p.part} className="relative grid place-items-center aspect-square rounded-lg bg-white overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                        <span className="absolute left-1 top-1 text-[10px] font-bold px-1.5 rounded bg-black/70 text-white">{p.label}</span>
                      </span>
                    ))}
                </span>
                <span className="flex items-center justify-between mt-2 px-0.5">
                  <span className="font-bold">{y}</span>
                  <ChevronRight size={16} className="text-muted" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {grades.map((g) => {
        const chapters = book.textbook[g] ?? [];
        if (!chapters.length) return null;
        const total = chapters.reduce((n, c) => n + c.pictures.length, 0);
        return (
          <section key={g}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-bold text-lg">{en ? `Grade ${g} textbook pictures` : `தரம் ${g} பாடநூல் படங்கள்`}</h2>
                <p className="text-sm text-muted mt-1">{en ? `${total} pictures with the facts to remember` : `${total} படங்கள் – நினைவில் கொள்ள வேண்டிய தகவல்களுடன்`}</p>
              </div>
              <Link href={`/subjects/${subject.id}/pictures/grade/${g}`} className="btn btn-gold btn-sm">
                <Eye size={15} /> {en ? `Test all Grade ${g}` : `தரம் ${g} முழுவதும் பரீட்சை`}
              </Link>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2.5 mt-3">
              {chapters.map((c) => {
                const summary = subject.grades.find((x) => x.grade === g)?.chapters.find((x) => x.number === c.number);
                const open = summary ? isChapterOpen(summary, access) : false;
                return (
                  <li key={c.number} className="min-w-0">
                    <Link href={chapterHref(subject.id, g, c.number, "pictures")} className="glass glass-hover flex items-center gap-3 p-3 min-w-0">
                      <span className="flex -space-x-3 flex-none">
                        {c.pictures.slice(0, 3).map((p) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={p.id} src={p.src} alt="" loading="lazy" decoding="async" className="w-11 h-11 rounded-lg object-cover border-2 border-card bg-card-2" />
                        ))}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-xs text-muted">
                          {en ? `Chapter ${c.number}` : `அலகு ${c.number}`} · {en ? `${c.pictures.length} pictures` : `${c.pictures.length} படங்கள்`}
                          {!open && " · 🔒"}
                        </span>
                        <span className="block font-semibold text-sm leading-snug truncate">{summary?.title ?? c.title}</span>
                      </span>
                      <ChevronRight size={18} className="text-muted flex-none" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
