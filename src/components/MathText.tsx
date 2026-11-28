import katex from "katex";
import "katex/dist/katex.min.css";

// $$display$$ or $inline$ (the maths export also writes "$ x = 1 $" with spaces inside).
const MATH = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g;

function render(tex: string, displayMode: boolean) {
  return katex.renderToString(tex.trim(), { displayMode, throwOnError: false, strict: false, output: "html" });
}

/** Plain text with LaTeX in it (maths quizzes, flashcards, worked answers): the maths is typeset with KaTeX. */
export default function MathText({ text }: { text: string }) {
  return (
    <>
      {text.split(MATH).map((part, i) => {
        if (i % 2 === 0) return part;
        const display = part.startsWith("$$");
        const html = render(display ? part.slice(2, -2) : part.slice(1, -1), display);
        return display ? (
          <span key={i} className="block overflow-x-auto py-1" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
        );
      })}
    </>
  );
}
