"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Eye, EyeOff, FileText, ListChecks, Target } from "lucide-react";
import type { PastMcq, PastStructured } from "@/lib/content";
import { RichText } from "@/components/Markdown";
import { QuizRunner } from "@/components/QuizRunner";

type Tab = "practice" | "structured" | "browse" | "pattern";

function StatusNote({ status, verification }: { status: string; verification: string }) {
  if (!status && !verification) return null;
  return (
    <div className="mt-3 text-[11px] text-faint space-y-1">
      {status && <p>ⓘ {status}</p>}
      {verification && <p>⚠ {verification}</p>}
    </div>
  );
}

function StructuredCard({ q, index }: { q: PastStructured; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="glass p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="chip !text-gold !border-gold/40">📜 {q.year ?? "—"}</span>
        <span className="chip">{q.reference}</span>
        {q.marks && <span className="chip hidden sm:inline-flex max-w-full truncate">🎯 {q.marks}</span>}
      </div>
      <p className="text-xs font-bold text-muted mb-1">Q{index + 1}</p>
      <RichText text={q.question} className="font-semibold !text-white" />
      <button onClick={() => setOpen((o) => !o)} className={`btn btn-sm mt-4 ${open ? "btn-ghost" : ""}`} aria-expanded={open}>
        {open ? <EyeOff size={15} /> : <Eye size={15} />} {open ? "Hide model answer" : "Reveal model answer"}
      </button>
      {open && (
        <div className="mt-4 space-y-4">
          <div className="rounded-2xl p-4 bg-green/10 border border-green/30">
            <p className="text-xs font-bold text-green mb-1">Model answer</p>
            <RichText text={q.answer} />
          </div>
          {q.explanation && (
            <div className="rounded-2xl p-4 bg-electric/10 border border-electric/30">
              <p className="text-xs font-bold text-lilac mb-1">Why</p>
              <RichText text={q.explanation} />
            </div>
          )}
          {q.guidance && (
            <div className="rounded-2xl p-4 bg-gold/10 border border-gold/30">
              <p className="text-xs font-bold text-gold mb-1">Marking guide (suggested)</p>
              <RichText text={q.guidance} />
            </div>
          )}
          <StatusNote status={q.status} verification={q.verification} />
        </div>
      )}
    </li>
  );
}

function BrowseMcq({ q }: { q: PastMcq }) {
  const [show, setShow] = useState(false);
  return (
    <li className="glass p-5">
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="chip !text-gold !border-gold/40">📜 {q.yearLabel || q.year}</span>
        <span className="chip">{q.reference}</span>
      </div>
      <p className="font-bold whitespace-pre-wrap">{q.prompt}</p>
      <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
        {q.options.map((o) => (
          <li key={o.key} className={`rounded-xl px-3 py-2 border ${show && o.key === q.answer ? "border-green bg-green/15" : "border-line"}`}>
            <b className="text-lilac">{o.key}.</b> {o.text}
          </li>
        ))}
      </ul>
      <button onClick={() => setShow((s) => !s)} className="mt-3 text-sm font-bold text-lilac hover:text-white flex items-center gap-1.5">
        {show ? <EyeOff size={14} /> : <Eye size={14} />} {show ? "Hide answer" : "Show answer"}
      </button>
      {show && (
        <div className="mt-2 text-sm text-muted">
          <p>
            <b className="text-green">✓ {q.answer}</b> — {q.explanation}
          </p>
          <StatusNote status={q.status} verification={q.verification} />
        </div>
      )}
    </li>
  );
}

export function ExamVault({
  mcq,
  structured,
  itemId,
  done,
  nextHref,
  pattern,
}: {
  mcq: PastMcq[];
  structured: PastStructured[];
  itemId: string;
  done: boolean;
  nextHref: string;
  pattern: React.ReactNode;
}) {
  const [tab, setTab] = useState<Tab>(mcq.length ? "practice" : "structured");
  const years = useMemo(() => {
    const s = new Set<number>();
    [...mcq, ...structured].forEach((q) => q.year && s.add(q.year));
    return [...s].sort((a, b) => b - a);
  }, [mcq, structured]);
  const [year, setYear] = useState<number | null>(null);

  const tabs: { id: Tab; label: string; icon: typeof Target; count?: number }[] = [
    { id: "practice", label: "MCQ practice", icon: Target, count: mcq.length },
    { id: "structured", label: "Structured", icon: FileText, count: structured.length },
    { id: "browse", label: "By year", icon: ListChecks },
    { id: "pattern", label: "Exam pattern", icon: ChevronDown },
  ];

  return (
    <div lang="ta">
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6" role="tablist">
        {tabs.map(({ id, label, icon: I, count }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`chip !py-2 !px-4 !text-sm ${tab === id ? "chip-active" : "hover:!text-white"}`}
            lang="en"
          >
            <I size={15} /> {label}
            {count !== undefined && <span className="opacity-70">{count}</span>}
          </button>
        ))}
      </div>

      {tab === "practice" &&
        (mcq.length ? (
          <QuizRunner
            kind="pastpaper"
            itemId={itemId}
            done={done}
            title="Past paper Q"
            nextHref={nextHref}
            nextLabel="Back to chapters"
            questions={mcq.map((q) => ({
              prompt: q.prompt,
              options: q.options,
              answer: q.answer,
              explanation: q.explanation,
              meta: [`📜 ${q.yearLabel || q.year}`, q.reference],
              note: [q.status, q.verification].filter(Boolean).join(" · "),
            }))}
          />
        ) : (
          <p className="glass p-6 text-muted">No MCQs from past papers for this chapter — check the structured questions.</p>
        ))}

      {tab === "structured" &&
        (structured.length ? (
          <ol className="space-y-4 max-w-[860px]">
            {structured.map((q, i) => (
              <StructuredCard key={i} q={q} index={i} />
            ))}
          </ol>
        ) : (
          <p className="glass p-6 text-muted" lang="en">
            No structured questions from 2016–2025 papers map to this chapter.
          </p>
        ))}

      {tab === "browse" && (
        <div className="max-w-[860px]">
          <div className="flex flex-wrap gap-2 mb-5" lang="en">
            <button onClick={() => setYear(null)} className={`chip ${year === null ? "chip-active" : ""}`}>
              All years
            </button>
            {years.map((y) => (
              <button key={y} onClick={() => setYear(y)} className={`chip ${year === y ? "chip-active" : ""}`}>
                {y}
              </button>
            ))}
          </div>
          <ol className="space-y-4">
            {mcq
              .filter((q) => year === null || q.year === year)
              .map((q, i) => (
                <BrowseMcq key={`m${i}`} q={q} />
              ))}
            {structured
              .map((q, i) => ({ q, i }))
              .filter(({ q }) => year === null || q.year === year)
              .map(({ q, i }) => (
                <StructuredCard key={`s${i}`} q={q} index={i} />
              ))}
          </ol>
        </div>
      )}

      {tab === "pattern" && <div className="glass p-5 sm:p-8 max-w-[860px]">{pattern}</div>}
    </div>
  );
}
