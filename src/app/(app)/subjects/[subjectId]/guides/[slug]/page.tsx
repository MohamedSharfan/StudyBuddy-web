import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AskTeacher } from "@/components/AskTeacher";
import { Markdown } from "@/components/Markdown";
import { getSubject } from "@/lib/catalog";
import { loadGuide } from "@/lib/extras";
import { canonicalUrl } from "@/lib/seo";
import { canSeeSubject, getViewer } from "@/lib/session";

type Params = Promise<{ subjectId: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { subjectId, slug } = await params;
  const s = getSubject(subjectId);
  const g = s?.extras?.guides.find((x) => x.slug === slug);
  if (!s || !g) return { title: "Study guide" };
  const title = `O/L ${s.name} · ${g.title} · ${s.medium} Medium`;
  const description = `${g.title}: ${g.sections.slice(0, 6).join(", ")}${g.sections.length > 6 ? " and more" : ""}. Free O/L ${s.name} study guide on StudyBuddy.`;
  const url = canonicalUrl(`/subjects/${s.id}/guides/${slug}`);
  return { title, description, alternates: { canonical: url }, openGraph: { type: "article", siteName: "StudyBuddy", title, description, url, images: ["/logo.jpg"] } };
}

/** A subject-wide guide (essay bank, grammar, exam tricks, …): its introduction and the list of its sections. */
export default async function GuidePage({ params }: { params: Params }) {
  const { subjectId, slug } = await params;
  const subject = getSubject(subjectId);
  const guide = subject && (await loadGuide(subject.id, slug));
  if (!subject || !guide) notFound();
  const viewer = await getViewer();
  if (!canSeeSubject(viewer, subject)) redirect("/subjects");

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start" lang={subject.lang}>
      <div className="min-w-0 space-y-5">
        <Link href={`/subjects/${subject.id}#guides`} className="flex items-center gap-1 text-sm text-muted hover:text-white font-semibold">
          <ChevronLeft size={16} /> {subject.name}
        </Link>
        <header>
          <p className="eyebrow">O/L {subject.name} · {subject.medium} medium</p>
          <h1 className="display text-2xl sm:text-[1.75rem] font-bold leading-snug mt-1">{guide.title}</h1>
        </header>
        {guide.intro && (
          <div className="glass p-5 sm:p-6">
            <Markdown>{guide.intro}</Markdown>
          </div>
        )}
        <ol className="grid sm:grid-cols-2 gap-3">
          {guide.sections.map((s, i) => (
            <li key={s.slug}>
              <Link href={`/subjects/${subject.id}/guides/${slug}/${s.slug}`} className="glass glass-hover flex items-center gap-3 p-4 h-full">
                <span className="grid place-items-center w-9 h-9 rounded-xl flex-none bg-electric font-extrabold text-sm">{i + 1}</span>
                <span className="flex-1 min-w-0 font-semibold leading-snug">{s.title}</span>
                <ChevronRight size={18} className="text-gold flex-none" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <aside className="lg:sticky lg:top-24">
        <AskTeacher context={`${subject.name} (${subject.medium} medium), ${guide.title}`} />
      </aside>
    </div>
  );
}
