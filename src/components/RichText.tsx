import dynamic from "next/dynamic";
import { isMostlyArabic, withArabic } from "./ArabicText";

// Tables are rare in past-paper text, so the markdown renderer is only loaded when one appears.
const Markdown = dynamic(() => import("./Markdown").then((m) => m.Markdown));

function inline(line: string) {
  return line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{withArabic(part.slice(2, -2))}</strong> : <span key={i}>{withArabic(part)}</span>,
  );
}

const TABLE_SEPARATOR = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

type Block = { kind: "line"; text: string } | { kind: "table"; markdown: string };

/** Splits plain text into lines and markdown tables ("| a | b |" + "|---|---|" + rows). */
function splitTables(text: string): Block[] {
  const lines = text.split("\n");
  const out: Block[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const at = line.indexOf("|");
    if (at >= 0 && i + 1 < lines.length && TABLE_SEPARATOR.test(lines[i + 1])) {
      // Some answers start a table on the same line as a label, e.g. "(i) | Zuhd | Rahbaniyya |".
      const prefix = line.slice(0, at).trim();
      if (prefix) out.push({ kind: "line", text: prefix });
      const rows = [line.slice(at), lines[i + 1]];
      let j = i + 2;
      while (j < lines.length && lines[j].trim().startsWith("|")) rows.push(lines[j++]);
      out.push({ kind: "table", markdown: rows.join("\n") });
      i = j - 1;
    } else out.push({ kind: "line", text: line });
  }
  return out;
}

/** Plain multi-line text (past paper questions and answers): keeps line breaks, shows Arabic right-to-left and renders tables. */
export function RichText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`prose-sb !text-[0.98rem] !leading-[1.85] ${className}`}>
      {splitTables(text).map((b, i) =>
        b.kind === "table" ? (
          <Markdown key={i}>{b.markdown}</Markdown>
        ) : b.text.trim() === "" ? (
          <div key={i} className="h-2" />
        ) : isMostlyArabic(b.text) ? (
          <p key={i} className="ar !my-1" dir="rtl" lang="ar">
            {inline(b.text)}
          </p>
        ) : (
          <p key={i} className="!my-1">
            {inline(b.text)}
          </p>
        ),
      )}
    </div>
  );
}
