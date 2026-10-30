import { ExamRadar } from "@/components/ExamRadar";
import { ExamVault } from "@/components/ExamVault";
import { LockedPanel } from "@/components/LockedPanel";
import { Markdown } from "@/components/Markdown";
import { resolveChapter, type ChapterParams } from "@/lib/chapter";

export default async function PastPapersPage({ params }: { params: ChapterParams }) {
  const { subject, summary: c, viewer, open, content, steps } = await resolveChapter(params, true);
  if (!open || !content) return <LockedPanel chapter={c} viewer={viewer} />;
  const pp = content.pastPapers;
  const pattern = [pp.pattern, pp.related ? `## ${subject.relatedHeading}\n\n${pp.related}` : ""].filter(Boolean).join("\n\n---\n\n");

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[1fr_360px] gap-5 items-start">
        <div className="glass p-5 sm:p-6">
          <h2 className="display text-xl font-bold">Past-paper questions for this chapter</h2>
          <p className="text-sm text-muted mt-2">
            {subject.pastPaperNote} Score 80% in the MCQ practice to complete this step.
          </p>
        </div>
        <ExamRadar years={c.years} compact />
      </div>
      <ExamVault
        mcq={pp.mcq}
        structured={pp.structured}
        itemId={c.id}
        done={steps[3]}
        nextHref={`/subjects/${subject.id}?grade=${c.grade}`}
        pattern={pattern ? <Markdown>{pattern}</Markdown> : <p className="text-muted">No exam pattern notes yet.</p>}
      />
    </div>
  );
}
