// Arabic letters (and harakat) — a run of Arabic words, possibly with spaces between them.
export const ARABIC_RUN = /([\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF](?:[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\s]*[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF])?)/;

/** Wraps Arabic words in <span class="ar-i" lang="ar"> (Arabic font, readable size), for plain strings rendered outside markdown (flashcards, quiz, past papers). */
export function withArabic(text: string): React.ReactNode {
  if (!ARABIC_RUN.test(text)) return text;
  return text.split(ARABIC_RUN).map((part, i) =>
    i % 2 ? (
      <span key={i} className="ar-i" lang="ar">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

const ARABIC = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/g;

/** True when a line is mostly Arabic (shown right-to-left in the Arabic font). */
export function isMostlyArabic(text: string) {
  const letters = text.replace(/[\s\p{P}\d]/gu, "");
  if (letters.length < 6) return false;
  return (text.match(ARABIC)?.length ?? 0) / letters.length > 0.55;
}
