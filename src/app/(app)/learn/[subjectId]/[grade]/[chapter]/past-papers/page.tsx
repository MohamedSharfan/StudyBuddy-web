import { ExamRadar } from "@/components/ExamRadar";
import { ExamVault } from "@/components/ExamVault";
import { LockedPanel } from "@/components/LockedPanel";
import { Markdown } from "@/components/Markdown";
import { resolveChapter, type ChapterParams } from "@/lib/chapter";

export default async function PastPapersPage({ params }: { params: ChapterParams }) {
  const { subject, summary: c, viewer, open, content, steps } = await resolveChapter(params, true);
  if (!open || !content) return <LockedPanel chapter={c} viewer={viewer} />;
  const pp = content.pastPapers;
  const pattern = [pp.pattern, pp.related ? `## தொடர்புடைய பிற வினாக்கள்\n\n${pp.related}` : ""].filter(Boolean).join("\n\n---\n\n");

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[1fr_360px] gap-5 items-start">
        <div className="glass p-5 sm:p-6 bg-gradient-to-br from-gold/15 to-transparent">
          <p className="eyebrow !text-gold">Exam vault</p>
          <h2 className="display text-2xl font-bold mt-1">Real O/L questions for this chapter</h2>
          <p className="text-sm text-muted mt-2">
            From Islam I &amp; II papers 2016–2025 (Tamil medium). Answers are textbook-based suggestions — official marking schemes weren&apos;t
            available, so check flagged items with your teacher. Score 80% in MCQ practice to light the fourth door.
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
