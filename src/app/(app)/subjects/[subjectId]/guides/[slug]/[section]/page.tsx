import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AskTeacher } from "@/components/AskTeacher";
import { Markdown } from "@/components/Markdown";
import { getSubject } from "@/lib/catalog";
import { loadGuide } from "@/lib/extras";
import { canonicalUrl } from "@/lib/seo";
import { canSeeSubject, getViewer } from "@/lib/session";

type Params = Promise<{ subjectId: string; slug: string; section: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { subjectId, slug, section } = await params;
  const s = getSubject(subjectId);
  const g = s?.extras?.guides.find((x) => x.slug === slug);
  const name = g?.sections[Number(section) - 1];
  if (!s || !g || !name) return { title: "Study guide" };
  const title = `${name} · O/L ${s.name} ${g.title}`;
  const url = canonicalUrl(`/subjects/${s.id}/guides/${slug}/${section}`);
  const description = `${name} — from the O/L ${s.name} ${g.title} (${s.medium} medium), free on StudyBuddy.`;
  return { title, description, alternates: { canonical: url }, openGraph: { type: "article", siteName: "StudyBuddy", title, description, url, images: ["/logo.jpg"] } };
}

export default async function GuideSectionPage({ params }: { params: Params }) {
  const { subjectId, slug, section } = await params;
  const subject = getSubject(subjectId);
  const guide = subject && (await loadGuide(subject.id, slug));
  const at = guide ? guide.sections.findIndex((s) => s.slug === section) : -1;
  if (!subject || !guide || at < 0) notFound();
  const viewer = await getViewer();
  if (!canSeeSubject(viewer, subject)) redirect("/subjects");
  const s = guide.sections[at];
  const prev = guide.sections[at - 1];
  const next = guide.sections[at + 1];
  const base = `/subjects/${subject.id}/guides/${slug}`;

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start" lang={subject.lang}>
      <div className="min-w-0 space-y-5">
        <div className="flex items-center justify-between gap-3 text-sm">
          <Link href={base} className="flex items-center gap-1 text-muted hover:text-white font-semibold min-w-0">
            <ChevronLeft size={16} className="flex-none" /> <span className="truncate">{guide.title}</span>
          </Link>
          <span className="chip flex-none">
            {at + 1} / {guide.sections.length}
          </span>
        </div>
        <h1 className="display text-2xl sm:text-[1.75rem] font-bold leading-snug">{s.title}</h1>
        <article className="glass p-5 sm:p-8">
          <Markdown>{s.body}</Markdown>
        </article>
        <div className="flex justify-between gap-3">
          {prev ? (
            <Link href={`${base}/${prev.slug}`} className="btn btn-ghost btn-sm min-w-0">
              <ChevronLeft size={16} className="flex-none" /> <span className="truncate">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`${base}/${next.slug}`} className="btn btn-gold btn-sm min-w-0">
              <span className="truncate">{next.title}</span> <ChevronRight size={16} className="flex-none" />
            </Link>
          )}
        </div>
      </div>
      <aside className="lg:sticky lg:top-24">
        <AskTeacher context={`${subject.name} (${subject.medium} medium), ${guide.title}: ${s.title}`} />
      </aside>
    </div>
  );
}
