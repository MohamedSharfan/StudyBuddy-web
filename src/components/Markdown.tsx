import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

type HastNode = { type: string; value?: string; children?: HastNode[] };

function textOf(node: HastNode | undefined): string {
  if (!node) return "";
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

const ARABIC = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/g;

function isMostlyArabic(text: string) {
  const letters = text.replace(/[\s\p{P}\d]/gu, "");
  if (letters.length < 6) return false;
  return (text.match(ARABIC)?.length ?? 0) / letters.length > 0.55;
}

function calloutClass(text: string) {
  const t = text.trim();
  if (t.startsWith("📌")) return "callout-remember";
  if (t.startsWith("📖")) return "callout-quran";
  if (t.startsWith("📝") || t.startsWith("🎓") || t.startsWith("⚠")) return "callout-exam";
  if (t.startsWith("💡") || t.startsWith("✨")) return "callout-tip";
  return "";
}

export function slugify(text: string) {
  return text
    .replace(/\*\*/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

const components: Components = {
  blockquote({ node, children }) {
    return <blockquote className={calloutClass(textOf(node as HastNode))}>{children}</blockquote>;
  },
  p({ node, children }) {
    const text = textOf(node as HastNode);
    if (isMostlyArabic(text))
      return (
        <p className="ar" dir="rtl" lang="ar">
          {children}
        </p>
      );
    return <p>{children}</p>;
  },
  h2({ node, children }) {
    return <h2 id={slugify(textOf(node as HastNode))}>{children}</h2>;
  },
  h3({ node, children }) {
    return <h3 id={slugify(textOf(node as HastNode))}>{children}</h3>;
  },
  table({ children }) {
    return (
      <div className="table-wrap">
        <table>{children}</table>
      </div>
    );
  },
  a({ href, children }) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="text-cyan underline underline-offset-4">
        {children}
      </a>
    );
  },
  img() {
    return null;
  },
};

export function Markdown({ children, className = "", size }: { children: string; className?: string; size?: number }) {
  return (
    <div className={`prose-sb ${className}`} lang="ta" style={size ? ({ "--fs": `${size}rem` } as React.CSSProperties) : undefined}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

function inline(line: string) {
  return line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
  );
}

/** Plain multi-line text (past paper answers) with Arabic lines shown right-to-left. */
export function RichText({ text, className = "" }: { text: string; className?: string }) {
  const lines = text.split("\n");
  return (
    <div className={`prose-sb !text-[0.98rem] !leading-[1.85] ${className}`} lang="ta">
      {lines.map((line, i) =>
        line.trim() === "" ? (
          <div key={i} className="h-2" />
        ) : isMostlyArabic(line) ? (
          <p key={i} className="ar !my-1" dir="rtl" lang="ar">
            {inline(line)}
          </p>
        ) : (
          <p key={i} className="!my-1">
            {inline(line)}
          </p>
        ),
      )}
    </div>
  );
}
