import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ARABIC_RUN, isMostlyArabic } from "./ArabicText";

type HastNode = { type: string; tagName?: string; value?: string; properties?: Record<string, unknown>; children?: HastNode[] };

function textOf(node: HastNode | undefined): string {
  if (!node) return "";
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
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

function findAll(node: HastNode, tag: string, out: HastNode[] = []) {
  if (node.tagName === tag) out.push(node);
  for (const c of node.children ?? []) findAll(c, tag, out);
  return out;
}
const cellsOf = (row: HastNode) => (row.children ?? []).filter((c) => c.tagName === "td" || c.tagName === "th");

/**
 * Tables: each body cell gets its column heading as data-label, and tables with 3+ columns
 * get data-stack. On phones the CSS turns those rows into cards ("heading: value"), which
 * reads far better than squeezing many columns into a narrow screen.
 */
function rehypeTableLabels() {
  return (tree: HastNode) => {
    for (const table of findAll(tree, "table")) {
      const rows = findAll(table, "tr");
      if (!rows.length) continue;
      const labels = cellsOf(rows[0]).map((c) => textOf(c).trim());
      // A cell can't be narrower than its longest word. If the longest words of all columns add up to
      // more than about 24 characters they can't sit side by side on a phone, so stack those too.
      const longestWords = labels.map((_, i) =>
        Math.max(0, ...rows.map((r) => Math.max(0, ...textOf(cellsOf(r)[i] ?? { type: "text" }).split(/\s+/).map((w) => w.length)))),
      );
      if (labels.length >= 3 || longestWords.reduce((a, b) => a + b, 0) > 24) table.properties = { ...table.properties, dataStack: "" };
      for (const row of rows.slice(1))
        cellsOf(row).forEach((cell, i) => {
          if (labels[i]) cell.properties = { ...cell.properties, dataLabel: labels[i] };
        });
    }
  };
}

/** Wraps Arabic words in <span class="ar-i" lang="ar"> so they use the Arabic font at a readable size. */
function rehypeArabicSpans() {
  const visit = (node: HastNode) => {
    if (node.tagName === "code" || node.tagName === "pre" || !node.children) return;
    const out: HastNode[] = [];
    for (const child of node.children) {
      if (child.type === "text" && child.value && ARABIC_RUN.test(child.value)) {
        child.value.split(ARABIC_RUN).forEach((part, i) => {
          if (!part) return;
          out.push(
            i % 2
              ? { type: "element", tagName: "span", properties: { className: ["ar-i"], lang: "ar" }, children: [{ type: "text", value: part }] }
              : { type: "text", value: part },
          );
        });
      } else {
        visit(child);
        out.push(child);
      }
    }
    node.children = out;
  };
  return (tree: HastNode) => visit(tree);
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
  table({ node, children }) {
    const stack = (node as HastNode | undefined)?.properties?.dataStack !== undefined;
    return (
      <div className="table-wrap">
        <table data-stack={stack ? "" : undefined}>{children}</table>
      </div>
    );
  },
  a({ href, children }) {
    if (href?.startsWith("/"))
      return (
        <Link href={href} className="text-cyan underline underline-offset-4">
          {children}
        </Link>
      );
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
    <div className={`prose-sb ${className}`} style={size ? ({ "--fs": `${size}rem` } as React.CSSProperties) : undefined}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeTableLabels, rehypeArabicSpans]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
