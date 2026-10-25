import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Markdown } from "@/components/Markdown";
import { catalog, chapterHref, subjectTotals } from "@/lib/catalog";

export const metadata = { title: "Content" };

async function readVerifyList(subjectId: string) {
  try {
    return await fs.readFile(path.join(process.cwd(), "content", subjectId, "Questions_To_Verify.md"), "utf8");
  } catch {
    return null;
  }
}

export default async function AdminContent() {
  const subject = catalog.subjects[0];
  const totals = subjectTotals(subject.id);
  const verify = await readVerifyList(subject.id);

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow !text-gold">Admin</p>
        <h1 className="display text-4xl font-bold mt-1">Content</h1>
        <p className="text-sm text-muted mt-1">
          Built from the markdown in <code>content/{subject.id}/</code> · last built {new Date(catalog.generatedAt).toLocaleString("en-GB")}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          ["Chapters", totals.chapters],
          ["Flashcards", totals.flashcards],
          ["Quiz Qs", totals.quiz],
          ["Past MCQs", totals.mcq],
          ["Structured", totals.structured],
        ].map(([l, n]) => (
          <div key={l} className="glass p-4">
            <p className="display text-3xl font-bold">{n}</p>
            <p className="text-xs text-muted font-bold">{String(l).toUpperCase()}</p>
          </div>
        ))}
      </div>

      <div className="glass p-5 sm:p-6 text-sm space-y-2">
        <p className="font-extrabold">How to update content</p>
        <ol className="list-decimal pl-5 space-y-1 text-muted">
          <li>
            Edit or replace the files in <code>content/{subject.id}/grade-XX/chapter-YY/</code> — <code>Notes.md</code>, <code>Flashcards.md</code>,{" "}
            <code>Quiz.md</code>, <code>PastPaper_Questions.md</code> (same format as today).
          </li>
          <li>
            Commit and push to GitHub. The build runs <code>npm run content</code> automatically and the site updates on the next deploy.
          </li>
          <li>To add a new subject, add its folder and an entry in <code>scripts/build-content.mjs</code> (and a row in the <code>subjects</code> table).</li>
        </ol>
      </div>

      {subject.grades.map((g) => (
        <div key={g.grade} className="glass overflow-x-auto">
          <p className="font-extrabold px-5 pt-5">Grade {g.grade}</p>
          <table className="w-full text-sm min-w-[720px] mt-3">
            <thead>
              <tr className="text-left text-xs text-muted border-b border-line">
                <th className="px-5 py-2">#</th>
                <th className="px-5 py-2">Chapter</th>
                <th className="px-3 py-2 text-right">Cards</th>
                <th className="px-3 py-2 text-right">Quiz</th>
                <th className="px-3 py-2 text-right">MCQ</th>
                <th className="px-3 py-2 text-right">Struct.</th>
                <th className="px-3 py-2 text-right">Years</th>
                <th className="px-5 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {g.chapters.map((c) => (
                <tr key={c.id}>
                  <td className="px-5 py-2 text-muted">{c.number}</td>
                  <td className="px-5 py-2" lang="ta">
                    {c.title} {c.free && <span className="chip !py-0 !text-green ml-1">free</span>}
                  </td>
                  <td className="px-3 py-2 text-right">{c.counts.flashcards}</td>
                  <td className="px-3 py-2 text-right">{c.counts.quiz}</td>
                  <td className="px-3 py-2 text-right">{c.counts.mcq}</td>
                  <td className="px-3 py-2 text-right">{c.counts.structured}</td>
                  <td className="px-3 py-2 text-right">{Object.keys(c.years).length}</td>
                  <td className="px-5 py-2 text-right">
                    <Link href={chapterHref(subject.id, c.grade, c.number)} className="text-lilac hover:text-white" aria-label="Open chapter">
                      <ExternalLink size={14} className="inline" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {verify && (
        <details className="glass p-5 sm:p-6">
          <summary className="font-extrabold cursor-pointer">Questions to verify with a teacher (from the past-paper analysis)</summary>
          <div className="mt-4">
            <Markdown>{verify.replace(/^#\s.*\n/, "")}</Markdown>
          </div>
        </details>
      )}
    </div>
  );
}
