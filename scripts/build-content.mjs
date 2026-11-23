// Parses the markdown in /content into structured JSON the site renders.
//   content/<subject>/grade-XX/chapter-YY/{Notes,Flashcards,Quiz,PastPaper_Questions}.md
//   or, for layout "grade-files" (History), one file per grade and type — see readGradeFiles().
// Past papers come in two layouts: the Tamil "Q1. … Correct Answer: B" layout and the
// English "### A1. … **Correct answer:** B – …" layout. The parser detects which one a file uses.
// Output:
//   src/generated/catalog.json        – lightweight index (titles, counts) safe for the client
//   generated/chapters/<id>.json      – full chapter payloads, read server-side only
//   generated/map-guides/<id>.json    – History map-learning guides per grade (markdown)
//   generated/pictures/<id>.json      – History picture study: textbook pictures per chapter + past-paper picture questions
//
// To update content: replace the markdown files and run `npm run content` (dev/build do it automatically).

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");
const OUT_CHAPTERS = path.join(ROOT, "generated", "chapters");
const OUT_CATALOG = path.join(ROOT, "src", "generated", "catalog.json");
const OUT_GUIDES = path.join(ROOT, "generated", "map-guides");
const OUT_PICTURES = path.join(ROOT, "generated", "pictures");

// Subjects the site knows about. Add a new folder in /content and an entry here.
// level is "O/L" or "A/L". For A/L subjects, `streams` limits who sees it
// (physical, biology, commerce, arts, technology); leave it empty for every stream.
const SUBJECTS = [
  {
    id: "islam-ol",
    name: "Islam",
    nameLocal: "இஸ்லாம்",
    level: "O/L",
    streams: [],
    icon: "book-open",
    medium: "Tamil",
    tagline: "Grade 10 & 11 · Tamil medium",
    color: "#8B5CF6",
    freeChapters: 1, // chapters 1..N of each grade are open without unlocking
    lang: "ta",
    pastPaperNote:
      "Past-paper questions are from the Sri Lankan O/L Islam I & II papers from 2016–2025 (Tamil medium).",
    relatedHeading: "தொடர்புடைய பிற வினாக்கள்",
  },
  {
    id: "islam-ol-en",
    name: "Islam",
    nameLocal: "",
    level: "O/L",
    streams: [],
    icon: "book-open",
    medium: "English",
    tagline: "Grade 10 & 11 · English medium",
    color: "#8B5CF6",
    freeChapters: 1,
    lang: "en",
    pastPaperNote:
      "English-medium study questions use English renderings of Sri Lankan O/L Islam I & II papers from 2016–2025.",
    relatedHeading: "Related questions in other chapters",
  },
  // History comes as one file per grade and type ("grade 10/Notes grade 10.md", …), split into units here.
  {
    id: "history-ol",
    dir: "history-ol",
    layout: "grade-files",
    name: "History",
    nameLocal: "வரலாறு",
    level: "O/L",
    streams: [],
    icon: "landmark",
    medium: "Tamil",
    tagline: "Grade 10 & 11 · Tamil medium",
    color: "#8B5CF6",
    freeChapters: 1,
    lang: "ta",
    maps: true,
    pastPaperNote:
      "Past-paper questions are from the Sri Lankan O/L History papers from 2016–2025 (Tamil medium).",
    relatedHeading: "தொடர்புடைய பிற வினாக்கள்",
  },
  {
    id: "history-ol-en",
    dir: "history-ol-english",
    layout: "grade-files",
    name: "History",
    nameLocal: "",
    level: "O/L",
    streams: [],
    icon: "landmark",
    medium: "English",
    tagline: "Grade 10 & 11 · English medium",
    color: "#8B5CF6",
    freeChapters: 1,
    lang: "en",
    maps: true,
    pastPaperNote: "",
    relatedHeading: "Related questions in other chapters",
  },
];

// Also drops the authoring note ("> Source: `…` (Tamil). English rendering.") under some titles.
const read = (p) =>
  fs
    .readFileSync(p, "utf8")
    .replace(/\r\n/g, "\n")
    .replace(/^\ufeff/, "")
    .replace(/^> Source: `[^\n]*\n(\n)?/m, "");
const exists = (p) => fs.existsSync(p);

function splitBlocks(md) {
  return md.split(/\n-{3,}\n/).map((b) => b.trim()).filter(Boolean);
}

function chapterTitleFrom(h1) {
  // "# தரம் 10 – அத்தியாயம் 1: அகீதா (நம்பிக்கைக் கோட்பாடு)" -> "அகீதா (நம்பிக்கைக் கோட்பாடு)"
  const line = h1.replace(/^#\s*/, "").trim();
  const idx = line.indexOf(":");
  let title = idx >= 0 ? line.slice(idx + 1).trim() : line;
  title = title.replace(/\s+–\s+(மீட்டல் அட்டைகள்|வினாடி வினா|Flashcards|Quiz)\s*$/, "").trim();
  return title;
}

/** Markdown emphasis (**bold**, *italic*, _italic_) removed, for titles and lists shown as plain text. */
const plain = (t) =>
  t
    .replace(/\*\*/g, "")
    .replace(/(^|[^\w*])\*([^*\n]+)\*(?!\w)/g, "$1$2")
    .replace(/(^|\W)_([^_\n]+)_(?!\w)/g, "$1$2")
    .trim();

function parseNotes(md) {
  const lines = md.split("\n");
  const h1 = lines.find((l) => l.startsWith("# ")) ?? "";
  const title = chapterTitleFrom(h1);
  const body = lines.filter((l) => l !== h1).join("\n").trim();

  const objectives = [];
  const objStart = lines.findIndex((l) => /^##\s*🎯/.test(l));
  if (objStart >= 0) {
    for (let i = objStart + 1; i < lines.length; i++) {
      const l = lines[i];
      if (/^#{1,3}\s/.test(l) || /^-{3,}$/.test(l.trim())) break;
      const m = l.match(/^\s*[-*]\s+(.*)/);
      if (m) objectives.push(plain(m[1]));
    }
  }

  const headings = [];
  for (const l of lines) {
    const m = l.match(/^(##|###)\s+(.*)/);
    if (m) headings.push({ depth: m[1].length, text: plain(m[2]) });
  }

  const words = body.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.round(words / 110));
  return { title, body, objectives, headings, minutes };
}

function parseFlashcards(md) {
  const cards = [];
  for (const block of splitBlocks(md)) {
    const front = block.match(/^Front:\s*([\s\S]*?)(?=\n\s*Back:)/m);
    const back = block.match(/^Back:\s*([\s\S]*)$/m);
    // English cards end with a "Grade: 10 | Chapter: 1 | Topic: …" line, which isn't part of the answer.
    if (front && back) cards.push({ front: front[1].trim(), back: back[1].replace(/\n\s*Grade:\s*\d+\s*\|[^\n]*\s*$/, "").trim() });
  }
  return cards;
}

const KEY_RE = /^(Year and Question Reference|Year|Question Reference|Marks|Correct Answer|Answer Text|Answer Explanation|Answer|Explanation|Difficulty|Answer Status|Also Relevant To|Verification Note|Original Question|Suggested Answer|Marking Guidance[^:]*)\s*:\s*(.*)$/;

// Generic "Key: value" block parser that also collects A–D options and the free-text prompt.
function parseFieldBlock(block) {
  const lines = block.split("\n");
  const fields = {};
  const options = [];
  const prompt = [];
  let current = null;
  for (const raw of lines) {
    const line = raw.trimEnd();
    const key = line.match(KEY_RE);
    if (key) {
      current = key[1].startsWith("Marking Guidance") ? "Marking Guidance" : key[1];
      fields[current] = key[2].trim();
      continue;
    }
    const opt = line.match(/^([A-D])\.\s+(.*)$/);
    if (opt && !fields["Correct Answer"]) {
      options.push({ key: opt[1], text: opt[2].trim() });
      current = null;
      continue;
    }
    if (current) {
      fields[current] = (fields[current] ? fields[current] + "\n" : "") + line;
    } else if (!options.length) {
      prompt.push(line);
    }
  }
  for (const k of Object.keys(fields)) fields[k] = fields[k].trim();
  return { fields, options, prompt: prompt.join("\n").trim() };
}

function parseQuiz(md) {
  const questions = [];
  for (const block of splitBlocks(md)) {
    if (!/^Q\d+\./.test(block)) continue;
    const { fields, options, prompt } = parseFieldBlock(block.replace(/^Q\d+\.\s*/, ""));
    const answer = (fields["Correct Answer"] || "").trim().charAt(0).toUpperCase();
    if (options.length < 2 || !answer) continue;
    questions.push({
      prompt,
      options,
      answer,
      explanation: fields["Explanation"] || "",
      difficulty: fields["Difficulty"] || "Medium",
    });
  }
  return questions;
}

function yearOf(text) {
  const m = (text || "").match(/(20\d\d)/);
  return m ? Number(m[1]) : null;
}

// ── English layout ──
// ### A1. 2016 – Islam I, Q24
// Year: 2016 / Paper and question: Islam I, Q24 / Marks: … / Source: …
// <prompt>
// - **A.** option …
// **Correct answer:** B – text *(option (2) on the original paper)*
// **Explanation:** …  **Answer status:** …  **Also relevant to:** [Grade 11, Chapter 1: …](…)
// Structured items use **Question:**, **Suggested answer:**, **Answer explanation:**, **Marking guidance (…):**.
const EN_FIELDS = {
  "correct answer": "correct",
  explanation: "explanation",
  "answer status": "status",
  "also relevant to": "alsoRelevant",
  "verification note": "verification",
  question: "question",
  answer: "answer",
  "suggested answer": "answer",
  "answer explanation": "answerExplanation",
  "marking guidance": "guidance",
};
const EN_META = /^(Question ID|Year|Paper and question|Marks|Source):\s*(.*?)\s*$/;

/** Turns "[Grade 11, Chapter 1: Aqeedah](../../Grade_11/…/Chapter_01.md)" into a link on this site (or plain text). */
function siteLinks(text, subjectId, plain = false) {
  return text.replace(/\[([^\]]+)\]\(([^)]*Grade_(\d+)[^)]*Chapter_(\d+)\.md)\)/g, (_, label, _href, g, c) =>
    plain ? label : `[${label}](/learn/${subjectId}/${Number(g)}/${Number(c)}/past-papers)`,
  );
}

function parseEnglishItem(body, subjectId) {
  const meta = {};
  const fields = {};
  const options = [];
  const prompt = [];
  let current = null;
  for (const raw of body.split("\n")) {
    const line = raw.replace(/\s+$/, "");
    const m = !current && !options.length && !prompt.some(Boolean) ? line.match(EN_META) : null;
    if (m) {
      meta[m[1]] = m[2];
      continue;
    }
    const f = line.match(/^\*\*([^*(]+?)(?:\s*\([^)]*\))?:\*\*\s*(.*)$/);
    const key = f && EN_FIELDS[f[1].trim().toLowerCase()];
    if (key) {
      current = key;
      fields[key] = f[2];
      continue;
    }
    const opt = line.match(/^-\s+\*\*([A-D])\.\*\*\s*(.*)$/);
    if (opt && !current) {
      options.push({ key: opt[1], text: opt[2].trim() });
      continue;
    }
    if (current) fields[current] = (fields[current] ? fields[current] + "\n" : "") + line;
    else if (!options.length) prompt.push(line);
  }
  for (const k of Object.keys(fields)) fields[k] = fields[k].trim();
  const correct = fields.correct || "";
  return {
    meta,
    fields,
    options,
    prompt: prompt.join("\n").trim(),
    answer: correct.trim().charAt(0).toUpperCase(),
    answerText: correct
      .replace(/^[A-D]\s*[–-]\s*/, "")
      .replace(/\s*\*\(option .*\)\*\s*$/, "")
      .trim(),
    alsoRelevant: siteLinks(fields.alsoRelevant || "", subjectId, true),
  };
}

function parseEnglishPastPapers(md, subjectId) {
  const section = (re) => {
    const m = md.match(re);
    return m ? m.index : -1;
  };
  const aStart = section(/^## Part A.*$/m);
  const bStart = section(/^## Part B.*$/m);
  const relStart = section(/^## Related.*$/m);
  const cut = (start, ...ends) => {
    if (start < 0) return "";
    const end = ends.filter((e) => e > start).sort((a, b) => a - b)[0] ?? md.length;
    return md.slice(start, end).replace(/^## .*\n/, "").trim();
  };
  const items = (text) =>
    text
      .split(/^### /m)
      .map((s) => s.trim())
      .filter((s) => /^[AB]\d+\./.test(s))
      .map((s) => {
        const nl = s.indexOf("\n");
        return { heading: s.slice(0, nl).replace(/^[AB]\d+\.\s*/, "").trim(), body: s.slice(nl + 1).replace(/\n-{3,}\s*$/, "") };
      });

  const mcq = [];
  for (const { heading, body } of items(cut(aStart, bStart, relStart))) {
    const q = parseEnglishItem(body, subjectId);
    if (!q.options.length) continue;
    mcq.push({
      prompt: q.prompt,
      options: q.options,
      answer: q.answer,
      year: yearOf(q.meta.Year || heading),
      yearLabel: q.meta.Year || "",
      reference: q.meta["Paper and question"] || heading,
      answerText: q.answerText,
      explanation: q.fields.explanation || "",
      status: q.fields.status || "",
      alsoRelevant: q.alsoRelevant,
      verification: q.fields.verification || "",
    });
  }

  const structured = [];
  for (const { heading, body } of items(cut(bStart, relStart))) {
    const q = parseEnglishItem(body, subjectId);
    if (!q.fields.question) continue;
    structured.push({
      heading,
      year: yearOf(q.meta.Year || heading),
      question: q.fields.question,
      reference: heading,
      marks: q.meta.Marks || "",
      answer: q.fields.answer || "",
      explanation: q.fields.answerExplanation || "",
      guidance: q.fields.guidance || "",
      status: q.fields.status || "",
      verification: q.fields.verification || "",
      alsoRelevant: q.alsoRelevant,
    });
  }

  const years = {};
  for (const q of [...mcq, ...structured]) if (q.year) years[q.year] = (years[q.year] || 0) + 1;
  return { mcq, structured, related: siteLinks(cut(relStart), subjectId), pattern: "", years };
}

function parsePastPapers(md, subjectId) {
  if (/^\*\*(Correct answer|Question):\*\*/m.test(md)) return parseEnglishPastPapers(md, subjectId);
  const sectionAt = (re) => {
    const m = md.match(re);
    return m ? m.index : -1;
  };
  const aStart = sectionAt(/^## Part A.*$/m);
  const bStart = sectionAt(/^## Part B.*$/m);
  const relStart = sectionAt(/^## தொடர்புடைய.*$/m);
  const patStart = sectionAt(/^## Exam Pattern.*$/m);
  const cut = (start, ...ends) => {
    if (start < 0) return "";
    const end = ends.filter((e) => e > start).sort((a, b) => a - b)[0] ?? md.length;
    return md.slice(start, end).replace(/^## .*\n/, "").trim();
  };

  const mcq = [];
  for (const block of splitBlocks(cut(aStart, bStart, relStart, patStart))) {
    if (!/^Q\d+\./.test(block)) continue;
    const { fields, options, prompt } = parseFieldBlock(block.replace(/^Q\d+\.\s*/, ""));
    const answer = (fields["Correct Answer"] || "").trim().charAt(0).toUpperCase();
    if (!options.length) continue;
    mcq.push({
      prompt,
      options,
      answer,
      year: yearOf(fields["Year"]),
      yearLabel: fields["Year"] || "",
      reference: fields["Question Reference"] || "",
      answerText: fields["Answer Text"] || "",
      explanation: fields["Explanation"] || "",
      status: fields["Answer Status"] || "",
      alsoRelevant: fields["Also Relevant To"] || "",
      verification: fields["Verification Note"] || "",
    });
  }

  const structured = [];
  const bText = cut(bStart, relStart, patStart);
  const parts = bText.split(/^### /m).map((s) => s.trim()).filter(Boolean);
  for (const part of parts) {
    const nl = part.indexOf("\n");
    const heading = (nl >= 0 ? part.slice(0, nl) : part).replace(/^B\d+\.\s*/, "").trim();
    const rest = (nl >= 0 ? part.slice(nl + 1) : "").replace(/\n-{3,}\s*$/, "");
    const { fields } = parseFieldBlock(rest);
    if (!fields["Original Question"]) continue; // "no structured question for this chapter" placeholders
    structured.push({
      heading,
      year: yearOf(heading),
      question: fields["Original Question"] || "",
      reference: fields["Year and Question Reference"] || heading,
      marks: fields["Marks"] || "",
      answer: fields["Answer"] || fields["Suggested Answer"] || "",
      explanation: fields["Answer Explanation"] || "",
      guidance: fields["Marking Guidance"] || "",
      status: fields["Answer Status"] || "",
      verification: fields["Verification Note"] || "",
      alsoRelevant: fields["Also Relevant To"] || "",
    });
  }

  const years = {};
  for (const q of [...mcq, ...structured]) if (q.year) years[q.year] = (years[q.year] || 0) + 1;

  return {
    mcq,
    structured,
    related: cut(relStart, patStart),
    pattern: cut(patStart),
    years,
  };
}

// ── Grade-file layout (History) ──
// content/<dir>/grade 10/{Notes,Flashcards,Quizzes} grade 10.md and content/<dir>/Grade_10_Chapter_Wise_Past_Papers.md.
// Each file holds every unit of the grade; units start with "# அலகு 01 – …", "# Unit 1 – …" or "# Chapter 03 – …"
// (notes, past papers) or "## Chapter 01 – …" (flashcards, quizzes).

/** Splits a file into { number → { title, body } } on headings matched by `re` (group 1 = number, group 2 = title). */
function splitUnits(md, re) {
  const units = new Map();
  const heads = [...md.matchAll(re)];
  heads.forEach((m, i) => {
    const end = i + 1 < heads.length ? heads[i + 1].index : md.length;
    let body = md.slice(m.index + m[0].length, end);
    // a unit ends where the next top-level heading starts (appendices, map guides)
    const nextTop = body.search(/^# /m);
    if (nextTop >= 0) body = body.slice(0, nextTop);
    units.set(Number(m[1]), { title: plain(m[2]).trim(), body: body.replace(/\n-{3,}\s*$/, "").trim() });
  });
  return units;
}

const NOTES_UNIT = /^# (?:அலகு|Unit|Chapter)\s+0*(\d+)\s*[–-]\s*(.+)$/gm;
const SECTION_UNIT = /^## Chapter\s+0*(\d+)\s*[–-]\s*(.+)$/gm;
const PAPER_UNIT = /^# அலகு\s+0*(\d+)\s*[–-]\s*(.+)$/gm;

/** Drops "verify / unclear" authoring notes, which aren't meant for students. */
const dropDoubts = (t) =>
  t
    // an answer the author couldn't confirm: point the student to the tutor instead of leaving a gap
    .replace(/\*சரிபார்க்க(?:\s*\([^)]*\))?\*/g, "*ஆசிரியரிடம் கேளுங்கள்*")
    .replace(/\s*\*\([^()*]*சரிபார்க்க[^()*]*\)\*/g, "")
    .replace(/\s*\([^()]*சரிபார்க்க[^()]*\)/g, "")
    .replace(/^> \*\*(?:குறிப்பு \(தெளிவின்மை\)|எழுத்து\/ஆண்டு தொடர்பான குறிப்பு):\*\*[^\n]*\n?/gm, "")
    .replace(/^> \*\*குறிப்பு:\*\*[^\n]*தெளிவ[^\n]*\n?/gm, "");

// ── History pictures ──
// Images are extracted to /public by scripts/extract-history-pictures.py, which also writes their sizes here.
const PICTURE_SIZES_FILE = path.join(CONTENT, "history-pictures.json");
const PICTURE_SIZES = exists(PICTURE_SIZES_FILE) ? JSON.parse(read(PICTURE_SIZES_FILE)) : {};

/** { src, w, h } for an image under /public, or null when it hasn't been extracted. */
function publicImage(rel) {
  const size = PICTURE_SIZES[rel];
  return size ? { src: `/${rel}`, w: size[0], h: size[1] } : null;
}
const textbookImage = (lang, grade, id) => publicImage(`history/pictures/${lang}/${grade}/${id}.webp`);

/** A few source notes stop mid-quote ('… எழுத்தில், "பிர'): drop the cut-off fragment. */
function endCleanly(note) {
  if ((note.match(/"/g) || []).length % 2 === 0) return note;
  const cut = note.lastIndexOf('"');
  return note.length - cut < 20 ? note.slice(0, cut).replace(/[\s,;:–-]+$/, "") : note;
}

const PICTURE_FIELDS = {
  "What it shows": "shows",
  "படம் காட்டுவது": "shows",
  Section: "section",
  பகுதி: "section",
  "Info notes": "notes",
  குறிப்புகள்: "notes",
};

/**
 * content/<dir>/pictures/Grade_<g>_Picture_Notes.md: units ("# Unit 1 – …" / "# அலகு 01 – …") of
 *   ### 1. Chapter_01_Figure_01  (Figure)
 *   ![Fig 1.1 – caption](Assets/Chapter_01_Figure_01.png)
 *   **What it shows:** …   **Section:** …   **Info notes:** - bullet …
 * Returns Map(unit number → pictures). Textbook maps are left out: they have the interactive map.
 */
function parsePictureNotes(md, lang, grade) {
  const out = new Map();
  for (const [number, unit] of splitUnits(md, NOTES_UNIT)) {
    const pictures = [];
    for (const entry of unit.body.split(/^(?=### \d+\.)/m)) {
      const head = entry.match(/^### \d+\.\s+(\S+)\s+\(([^)]+)\)/);
      if (!head || head[2] === "Map") continue;
      const image = textbookImage(lang, grade, head[1]);
      if (!image) continue;
      const alt = (entry.match(/^!\[([^\]]*)\]/m)?.[1] ?? "").trim();
      const fig = alt.match(/^((?:Fig|உரு)\.?\s*[\d.]*)\s*[–-]\s*/);
      const fields = {};
      let current = null;
      for (const line of entry.split("\n")) {
        const f = line.match(/^\*\*([^*]+):\*\*\s*(.*)$/);
        if (f && PICTURE_FIELDS[f[1].trim()]) {
          current = PICTURE_FIELDS[f[1].trim()];
          fields[current] = current === "notes" ? [] : f[2].trim();
          continue;
        }
        if (/^\*(File|கோப்பு):/.test(line)) current = null;
        const bullet = current === "notes" && line.match(/^\s*[-*]\s+(.+)$/);
        if (bullet) fields.notes.push(endCleanly(plain(bullet[1])));
      }
      pictures.push({
        id: head[1],
        type: head[2],
        fig: fig ? fig[1].trim() : "",
        title: plain(fields.shows || (fig ? alt.slice(fig[0].length) : alt)),
        section: plain(fields.section || ""),
        notes: fields.notes || [],
        ...image,
      });
    }
    if (pictures.length) out.set(number, pictures);
  }
  return out;
}

const PAPER_PICTURE = /^\*\*【(20\d\d) • [^•】]+ • (?:Question|வினா) 1 \((?:b|ஆ)\)\((ii|iii)\) – [^】]*?([AB])】\*\*/;

/**
 * Past-paper picture questions (Part II, Q1 (b)(ii) and (iii)): a picture and four short questions.
 * Read from the chapter-wise past papers of either medium; `chapter` is null for the old-syllabus appendix.
 */
function parsePaperPictures(md, grade) {
  const out = [];
  const tops = [...md.matchAll(/^# (.+)$/gm)];
  tops.forEach((top, i) => {
    const unit = top[1].match(/^(?:அலகு|Unit)\s+0*(\d+)\s*[–-]/);
    if (!unit && !/(பிற்சேர்க்கை|Old-syllabus)/.test(top[1])) return; // skips the title and the map appendix
    const text = md.slice(top.index, i + 1 < tops.length ? tops[i + 1].index : md.length);
    // the first item of a part comes right after its "## Part II …" heading
    for (const item of text.split(/\n-{3,}\n/).map((s) => s.slice(Math.max(0, s.indexOf("**【"))).trim())) {
      const head = item.match(PAPER_PICTURE);
      if (!head) continue;
      const [qText, rest = ""] = item.replace(PAPER_PICTURE, "").split("<details>");
      const file = qText.match(/!\[[^\]]*\]\(Assets\/Original\/(\d{4})\/([^)]+)\.png\)/);
      const image = file && publicImage(`history/past-papers/${file[1]}/${file[2]}.webp`);
      if (!image) continue;
      const questions = [...qText.matchAll(/^\d\.\s+(.+)$/gm)].map((m) => m[1].trim());
      const line = dropDoubts(rest).match(/^\*\*\((?:b|ஆ)\)\((?:ii|iii)\)[^*]*\*\*\s*[–-]\s*(.+)$/m);
      const answers = line
        ? line[1]
            .replace(/\s*\*\([^()*]*verify[^()*]*\)\*/gi, "") // authoring notes, not for students
            .replace(/\s*\(0?1\s*[×x]\s*4\s*=\s*0?4\)\s*\.?\s*$/, "")
            .split(/;\s*(?=\d\.\s)/)
            .map((a) => a.replace(/^\d\.\s*/, "").replace(/\.\s*$/, "").trim())
        : [];
      out.push({
        year: Number(head[1]),
        part: head[2],
        label: head[3],
        grade,
        chapter: unit ? Number(unit[1]) : null,
        intro: (qText.match(/^●\s*(.+)$/m)?.[1] ?? "").trim(),
        questions,
        answers: answers.length === questions.length ? answers : [],
        answerText: answers.length === questions.length ? "" : revealOf(`<details>${rest}`),
        marks: Number(qText.match(/\((\d+)\s*(?:marks|புள்ளிகள்)\)/)?.[1] ?? 4),
        ...image,
      });
    }
  });
  return out;
}

/** Notes body: textbook map images become a link to the interactive map; other pictures are shown from /public. */
function historyNotesBody(body, subjectId, grade, number) {
  const lang = subjectId.endsWith("-en") ? "en" : "ta";
  return dropDoubts(body)
    .replace(/^!\[([^\]]*)\]\(Assets\/[^)]*_Map_\d+\.png\)\s*$/gm, (_, alt) =>
      lang === "en"
        ? `> 🗺️ **${alt.trim()}** — practise it on the [interactive map](/learn/${subjectId}/${grade}/${number}/map).`
        : `> 🗺️ **${alt.trim()}** — [ஊடாடும் தேசப்படத்தில்](/learn/${subjectId}/${grade}/${number}/map) பயிற்சி செய்யுங்கள்.`,
    )
    .replace(/^!\[([^\]]*)\]\(Assets\/([^)/]+)\.png\)\s*$/gm, (all, alt, id) => {
      const image = textbookImage(lang, grade, id);
      return image ? `![${alt.replace(/[[\]]/g, "")}](${image.src}#${image.w}x${image.h})` : "";
    })
    .replace(/^!\[[^\]]*\]\((?!\/history\/)[^)]*\)\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function historyNotes(title, body) {
  const objectives = [];
  // "> **Textbook pages:** 1 – 9 | **Lessons:** 1.1 A · 1.2 B" / "**உப தலைப்புகள்:** 1.1 A · 1.2 B"
  const lessons = body.match(/\*\*(?:Lessons|உப தலைப்புகள்):\*\*\s*([^\n]+)/);
  if (lessons) for (const l of lessons[1].split(/\s+·\s+/)) objectives.push(plain(l.replace(/^\d+\.\d+\s*/, "")));
  const headings = [];
  for (const l of body.split("\n")) {
    const m = l.match(/^(##|###)\s+(.*)/);
    if (m) headings.push({ depth: m[1].length, text: plain(m[2]) });
  }
  if (!objectives.length)
    for (const h of headings) if (h.depth === 2 && /^\d+\.[1-9]/.test(h.text)) objectives.push(h.text.replace(/^\d+\.\d+\s*/, ""));
  const words = body.split(/\s+/).filter(Boolean).length;
  return { title, body, objectives, headings, minutes: Math.max(3, Math.round(words / 110)) };
}

function historyFlashcards(body) {
  const cards = [];
  for (const m of body.matchAll(/\*\*Front:\*\*\s*([\s\S]*?)\n\*\*Back:\*\*\s*([\s\S]*?)(?=\n\s*\*\*Card\b|\n-{3,}|\n#|$)/g))
    cards.push({ front: m[1].trim(), back: m[2].trim() });
  return cards;
}

function historyQuiz(body) {
  const questions = [];
  for (const block of body.split(/^\*\*Question\s+\d+:\*\*\s*$/m).slice(1)) {
    const lines = block.trim().split("\n");
    const prompt = [];
    const options = [];
    const fields = {};
    let current = null;
    for (const raw of lines) {
      const line = raw.trimEnd();
      const f = line.match(/^\*\*(Correct Answer|Explanation|Difficulty):\*\*\s*(.*)$/);
      if (f) {
        current = f[1];
        fields[current] = f[2];
        continue;
      }
      const opt = !current && line.match(/^([A-D])\.\s+(.*)$/);
      if (opt) {
        options.push({ key: opt[1], text: opt[2].trim() });
        continue;
      }
      if (current) fields[current] += "\n" + line;
      else if (!options.length) prompt.push(line);
    }
    const answer = (fields["Correct Answer"] || "").trim().charAt(0).toUpperCase();
    if (options.length < 2 || !answer) continue;
    questions.push({
      prompt: prompt.join("\n").trim(),
      options,
      answer,
      explanation: dropDoubts((fields.Explanation || "").trim()),
      difficulty: (fields.Difficulty || "Medium").trim(),
    });
  }
  return questions;
}

/** The answer part of a past-paper item: what's inside <details>, without the summary, source notes and images. */
function revealOf(item) {
  const m = item.match(/<details>([\s\S]*?)<\/details>/);
  if (!m) return "";
  return dropDoubts(m[1])
    .replace(/<summary>[\s\S]*?<\/summary>/, "")
    .replace(/^\*மூலம்:[^\n]*\*\s*$/gm, "")
    .replace(/^!\[[^\]]*\]\([^)]*\)\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Tamil chapter-wise past papers:
// **【2016 • பகுதி I • வினா 1】**  **1.** prompt  - (1) option …  <details> **சரியான விடை:** (2) … **விளக்கம்:** … </details>
function historyPastPapers(body) {
  const part = (re) => {
    const m = body.match(re);
    return m ? m.index : -1;
  };
  const p1 = part(/^## பகுதி I\b.*$/m);
  const p2 = part(/^## பகுதி II\b.*$/m);
  const cut = (a, b) => (a < 0 ? "" : body.slice(a, b > a ? b : body.length).replace(/^## .*\n/, ""));
  const items = (text) =>
    text
      .split(/\n-{3,}\n/)
      .map((s) => s.trim())
      .filter((s) => s.startsWith("**【"));
  const head = (item) => {
    const m = item.match(/^\*\*【([^】]+)】\*\*/);
    return m ? m[1].trim() : "";
  };

  const mcq = [];
  for (const item of items(cut(p1, p2))) {
    const ref = head(item);
    const qText = item.replace(/^\*\*【[^】]+】\*\*\s*/, "").split("<details>")[0];
    const options = [...qText.matchAll(/^-\s+\((\d)\)\s+(.*)$/gm)].map((o) => ({ key: o[1], text: o[2].trim() }));
    const prompt = qText
      .split(/^-\s+\(\d\)\s+/m)[0]
      .replace(/^\*\*\d+\.\*\*\s*/, "")
      .replace(/^!\[[^\]]*\]\([^)]*\)\s*$/gm, "")
      .trim();
    const reveal = revealOf(item);
    const correct = reveal.match(/\*\*சரியான விடை:\*\*\s*\((\d)\)\s*([^\n]*)/);
    if (options.length < 2 || !correct) continue;
    const field = (label) => {
      const m = reveal.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\s*\\*\\*[^*\\n]+:\\*\\*|$)`));
      return m ? m[1].trim() : "";
    };
    mcq.push({
      prompt,
      options,
      answer: correct[1],
      year: yearOf(ref),
      yearLabel: String(yearOf(ref) ?? ""),
      reference: ref.replace(/^20\d\d\s*•\s*/, "").replace(/\s*•\s*/g, " · "),
      answerText: correct[2].trim(),
      explanation: field("விளக்கம்"),
      status: "",
      alsoRelevant: "",
      verification: "",
      difficulty: field("கடினத்தன்மை") || "Medium",
    });
  }

  const structured = [];
  for (const item of items(cut(p2, -1))) {
    const ref = head(item);
    const question = item
      .replace(/^\*\*【[^】]+】\*\*\s*/, "")
      .split("<details>")[0]
      .replace(/^!\[[^\]]*\]\([^)]*\)\s*$/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    const answer = revealOf(item);
    if (!question || !answer) continue;
    const pic = item.split("<details>")[0].match(/!\[[^\]]*\]\(Assets\/Original\/(\d{4})\/(Q1_b_[^)]+)\.png\)/);
    const marks = [...question.matchAll(/\((\d+)\s*புள்ளிகள்\)/g)].reduce((n, m) => n + Number(m[1]), 0);
    structured.push({
      heading: ref,
      year: yearOf(ref),
      question,
      reference: ref.replace(/^20\d\d\s*•\s*/, "").replace(/\s*•\s*/g, " · "),
      marks: marks ? `${marks} புள்ளிகள்` : "",
      answer,
      explanation: "",
      guidance: "",
      status: "",
      verification: "",
      alsoRelevant: "",
      image: (pic && publicImage(`history/past-papers/${pic[1]}/${pic[2]}.webp`)) || undefined,
    });
  }

  const years = {};
  for (const q of [...mcq, ...structured]) if (q.year) years[q.year] = (years[q.year] || 0) + 1;
  return { mcq, structured, related: "", pattern: "", years };
}

/** Reads one History grade: { chapters: [{ number, title, notes, flashcards, quiz, pastPapers, pictures }], mapGuide, paperPictures }. */
function readGradeFiles(subject, gradeDir, grade) {
  const dir = path.join(CONTENT, subject.dir, gradeDir);
  const file = (re) => fs.readdirSync(dir).find((f) => re.test(f));
  const load = (re) => {
    const f = file(re);
    return f ? read(path.join(dir, f)) : "";
  };
  const notesMd = load(/^notes/i);
  const notes = splitUnits(notesMd, NOTES_UNIT);
  const cards = splitUnits(load(/^flashcards/i), SECTION_UNIT);
  const quiz = splitUnits(load(/^quiz/i), SECTION_UNIT);
  const paperFile = path.join(CONTENT, subject.dir, `Grade_${grade}_Chapter_Wise_Past_Papers.md`);
  const papers = exists(paperFile) ? splitUnits(read(paperFile), PAPER_UNIT) : new Map();
  const pictureFile = path.join(CONTENT, subject.dir, "pictures", `Grade_${grade}_Picture_Notes.md`);
  const pictures = exists(pictureFile) ? parsePictureNotes(read(pictureFile), subject.lang, grade) : new Map();
  // English-medium past papers are only used for their picture questions so far.
  const pictureSource = [paperFile, path.join(CONTENT, subject.dir, `Grade_${grade}_Chapter_Wise_Past_Papers_English.md`)].find(exists);
  const paperPictures = pictureSource ? parsePaperPictures(read(pictureSource), grade) : [];

  const guide = notesMd.match(/^# (?:இணைப்பு – தேசப்படம்|🗺️ Map-Learning Guide)[^\n]*\n([\s\S]*?)(?=^# |\n-{3,}\s*\n+\*முற்றும்|(?![\s\S]))/m);
  const mapGuide = guide
    ? dropDoubts(guide[1])
        .replace(/[^\n]*`Assets\/`[^\n]*\n?/g, "")
        .replace(/\s*–\s*(?:see\s+)?`Chapter_[^`]+`(?:\s*(?:,|to|and)\s*`[^`]+`)*/g, "")
        .replace(/\n-{3,}\s*$/, "")
        .trim()
    : "";

  const chapters = [...notes.keys()].sort((a, b) => a - b).map((number) => {
    const n = notes.get(number);
    return {
      number,
      title: n.title,
      notes: historyNotes(n.title, historyNotesBody(n.body, subject.id, grade, number)),
      flashcards: cards.has(number) ? historyFlashcards(cards.get(number).body) : [],
      quiz: quiz.has(number) ? historyQuiz(quiz.get(number).body) : [],
      pastPapers: papers.has(number)
        ? historyPastPapers(papers.get(number).body)
        : { mcq: [], structured: [], related: "", pattern: "", years: {} },
      pictures: pictures.get(number) ?? [],
      paperPictures: paperPictures.filter((p) => p.chapter === number).length,
    };
  });
  return { chapters, mapGuide, paperPictures };
}

function build() {
  fs.mkdirSync(OUT_CHAPTERS, { recursive: true });
  fs.mkdirSync(path.dirname(OUT_CATALOG), { recursive: true });
  for (const f of fs.readdirSync(OUT_CHAPTERS)) fs.unlinkSync(path.join(OUT_CHAPTERS, f));

  const catalog = { generatedAt: new Date().toISOString(), subjects: [] };
  const totals = { chapters: 0, quiz: 0, flashcards: 0, mcq: 0, structured: 0 };

  fs.mkdirSync(OUT_GUIDES, { recursive: true });
  fs.mkdirSync(OUT_PICTURES, { recursive: true });

  for (const subject of SUBJECTS) {
    const { dir: dirName = subject.id, layout, ...meta } = subject;
    const dir = path.join(CONTENT, dirName);
    if (!exists(dir)) continue;
    const gradeFiles = layout === "grade-files";
    const grades = fs
      .readdirSync(dir)
      .filter((d) => (gradeFiles ? /^grade[ _-]?\d+$/i : /^grade-\d+$/).test(d))
      .sort();
    const subjectEntry = { ...meta, grades: [] };
    const guides = {};
    const pictureBook = { textbook: {}, papers: [] };

    for (const g of grades) {
      const grade = Number(g.match(/\d+/)[0]);
      const chapters = [];
      let units;
      if (gradeFiles) {
        const parsed = readGradeFiles({ ...subject, dir: dirName }, g, grade);
        units = parsed.chapters;
        if (parsed.mapGuide) guides[grade] = parsed.mapGuide;
        pictureBook.papers.push(...parsed.paperPictures);
        const withPictures = units.filter((u) => u.pictures.length);
        if (withPictures.length)
          pictureBook.textbook[grade] = withPictures.map((u) => ({ number: u.number, title: u.notes?.title || "", pictures: u.pictures }));
      } else {
        units = fs
          .readdirSync(path.join(dir, g))
          .filter((d) => /^chapter-\d+$/.test(d))
          .sort()
          .map((c) => {
            const base = path.join(dir, g, c);
            return {
              number: Number(c.split("-")[1]),
              notes: exists(path.join(base, "Notes.md")) ? parseNotes(read(path.join(base, "Notes.md"))) : null,
              flashcards: exists(path.join(base, "Flashcards.md")) ? parseFlashcards(read(path.join(base, "Flashcards.md"))) : [],
              quiz: exists(path.join(base, "Quiz.md")) ? parseQuiz(read(path.join(base, "Quiz.md"))) : [],
              pastPapers: exists(path.join(base, "PastPaper_Questions.md"))
                ? parsePastPapers(read(path.join(base, "PastPaper_Questions.md")), subject.id)
                : { mcq: [], structured: [], related: "", pattern: "", years: {} },
            };
          });
      }
      for (const { number, notes, flashcards, quiz, pastPapers, pictures = [], paperPictures = 0 } of units) {
        const id = `${subject.id}-${grade}-${String(number).padStart(2, "0")}`;
        const title = notes?.title || `Chapter ${number}`;
        const payload = { id, subjectId: subject.id, grade, number, title, notes, flashcards, quiz, pastPapers };
        fs.writeFileSync(path.join(OUT_CHAPTERS, `${id}.json`), JSON.stringify(payload));

        chapters.push({
          id,
          grade,
          number,
          title,
          objectives: notes?.objectives?.slice(0, 6) ?? [],
          minutes: notes?.minutes ?? 0,
          counts: {
            flashcards: flashcards.length,
            quiz: quiz.length,
            mcq: pastPapers.mcq.length,
            structured: pastPapers.structured.length,
            pictures: pictures.length,
            paperPictures,
          },
          years: pastPapers.years,
          free: number <= subject.freeChapters,
        });
        totals.chapters++;
        totals.quiz += quiz.length;
        totals.flashcards += flashcards.length;
        totals.mcq += pastPapers.mcq.length;
        totals.structured += pastPapers.structured.length;
      }
      subjectEntry.grades.push({ grade, chapters });
    }
    catalog.subjects.push(subjectEntry);
    if (Object.keys(guides).length) fs.writeFileSync(path.join(OUT_GUIDES, `${subject.id}.json`), JSON.stringify(guides));
    if (pictureBook.papers.length || Object.keys(pictureBook.textbook).length) {
      pictureBook.papers.sort((a, b) => a.year - b.year || a.part.localeCompare(b.part));
      fs.writeFileSync(path.join(OUT_PICTURES, `${subject.id}.json`), JSON.stringify(pictureBook));
      subjectEntry.pictures = {
        papers: pictureBook.papers.length,
        years: [...new Set(pictureBook.papers.map((p) => p.year))],
        textbook: Object.fromEntries(Object.entries(pictureBook.textbook).map(([g, cs]) => [g, cs.reduce((n, c) => n + c.pictures.length, 0)])),
      };
    }
    const all = subjectEntry.grades.flatMap((g) => g.chapters);
    const sum = (k) => all.reduce((n, c) => n + c.counts[k], 0);
    console.log(
      `  ${subject.id}: ${all.length} chapters · ${sum("quiz")} quiz · ${sum("flashcards")} flashcards · ${sum("mcq")} past MCQ · ${sum("structured")} structured` +
        (subjectEntry.pictures ? ` · ${sum("pictures")} pictures · ${subjectEntry.pictures.papers} past-paper pictures` : ""),
    );
  }

  fs.writeFileSync(OUT_CATALOG, JSON.stringify(catalog, null, 1));
  console.log(
    `content: ${totals.chapters} chapters · ${totals.quiz} quiz · ${totals.flashcards} flashcards · ${totals.mcq} past MCQ · ${totals.structured} structured`,
  );
}

build();
