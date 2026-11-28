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
const OUT_EXTRAS = path.join(ROOT, "generated", "extras");

const MATHS_DIR = "StudyBuddy_Mathematics_Complete/StudyBuddy_Mathematics";
const MATHS_PAPER_NOTE =
  "Exam questions from the 2018 and 2019 O/L papers and two MOE practice tests, sorted by chapter. Each one comes with a practice question of the same type and a full worked answer.";

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
    icon: "islam",
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
    icon: "islam",
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
    icon: "history",
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
    icon: "history",
    medium: "English",
    tagline: "Grade 10 & 11 · English medium",
    color: "#8B5CF6",
    freeChapters: 1,
    lang: "en",
    maps: true,
    pastPaperNote:
      "Past-paper questions are English renderings of the Sri Lankan O/L History papers from 2016–2025.",
    relatedHeading: "Related questions in other chapters",
  },
  // Mathematics comes as the StudyBuddy Mathematics export: one file per type for both grades (see readMaths()).
  {
    id: "maths-ol",
    dir: MATHS_DIR + "/Tamil_Medium",
    layout: "maths",
    name: "Mathematics",
    nameLocal: "கணிதம்",
    level: "O/L",
    streams: [],
    icon: "sigma",
    medium: "Tamil",
    tagline: "Grade 10 & 11 · Tamil medium",
    color: "#8B5CF6",
    freeChapters: 1,
    lang: "ta",
    pastPaperNote: MATHS_PAPER_NOTE,
    relatedHeading: "தொடர்புடைய பிற வினாக்கள்",
  },
  {
    id: "maths-ol-en",
    dir: MATHS_DIR + "/English_Medium",
    layout: "maths",
    name: "Mathematics",
    nameLocal: "",
    level: "O/L",
    streams: [],
    icon: "sigma",
    medium: "English",
    tagline: "Grade 10 & 11 · English medium",
    color: "#8B5CF6",
    freeChapters: 1,
    lang: "en",
    pastPaperNote: MATHS_PAPER_NOTE,
    relatedHeading: "Related questions in other chapters",
  },
  // Tamil language & literature: one file per type, split into topics (N00–N34), see readTamil().
  // The topics aren't split by grade, so they are all listed under grade 10, shown as "Grade 10 & 11".
  {
    id: "tamil-ol",
    dir: "tamil-ol",
    layout: "tamil",
    name: "Tamil",
    nameLocal: "தமிழ் மொழியும் இலக்கியமும்",
    level: "O/L",
    streams: [],
    icon: "languages",
    medium: "Tamil",
    tagline: "Grade 10 & 11 · Language and literature",
    color: "#8B5CF6",
    freeChapters: 1,
    lang: "ta",
    gradeLabels: { 10: "Grade 10 & 11" },
    pastPaperNote: "Past-paper questions are from the Sri Lankan O/L Tamil Language & Literature papers I, II and III (2016–2025).",
    relatedHeading: "தொடர்புடைய பிற வினாக்கள்",
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
const PAPER_UNIT = /^# (?:அலகு|Unit)\s+0*(\d+)\s*[–-]\s*(.+)$/gm;

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
    .replace(/^\*(?:மூலம்|Source):[^\n]*\*\s*$/gm, "")
    .replace(/^!\[[^\]]*\]\([^)]*\)\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Chapter-wise past papers (Tamil, or the English-medium file with the same layout):
// **【2016 • பகுதி I • வினா 1】**  **1.** prompt  - (1) option …  <details> **சரியான விடை:** (2) … **விளக்கம்:** … </details>
// **【2016 • Part I • Question 1】**  **1.** prompt  - (1) option …  <details> **Correct answer:** (2) … **Explanation:** … </details>
const PAPER_LABELS = {
  ta: { part1: "பகுதி I", part2: "பகுதி II", correct: "சரியான விடை", explanation: "விளக்கம்", difficulty: "கடினத்தன்மை", marks: "புள்ளிகள்" },
  en: { part1: "Part I", part2: "Part II", correct: "Correct answer", explanation: "Explanation", difficulty: "Difficulty", marks: "marks" },
};

function historyPastPapers(body, lang) {
  const L = PAPER_LABELS[lang] ?? PAPER_LABELS.ta;
  const part = (re) => {
    const m = body.match(re);
    return m ? m.index : -1;
  };
  const p1 = part(new RegExp(`^## ${L.part1}\\b.*$`, "m"));
  const p2 = part(new RegExp(`^## ${L.part2}\\b.*$`, "m"));
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
    const correct = reveal.match(new RegExp(`\\*\\*${L.correct}:\\*\\*\\s*\\((\\d)\\)\\s*([^\\n]*)`));
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
      explanation: field(L.explanation),
      status: "",
      alsoRelevant: "",
      verification: "",
      difficulty: field(L.difficulty) || "Medium",
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
    const marks = [...question.matchAll(new RegExp(`\\((\\d+)\\s*${L.marks}\\)`, "g"))].reduce((n, m) => n + Number(m[1]), 0);
    structured.push({
      heading: ref,
      year: yearOf(ref),
      question,
      reference: ref.replace(/^20\d\d\s*•\s*/, "").replace(/\s*•\s*/g, " · "),
      marks: marks ? `${marks} ${L.marks}` : "",
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
  const paperFile = [`Grade_${grade}_Chapter_Wise_Past_Papers.md`, `Grade_${grade}_Chapter_Wise_Past_Papers_English.md`]
    .map((f) => path.join(CONTENT, subject.dir, f))
    .find(exists);
  const papers = paperFile ? splitUnits(read(paperFile), PAPER_UNIT) : new Map();
  const pictureFile = path.join(CONTENT, subject.dir, "pictures", `Grade_${grade}_Picture_Notes.md`);
  const pictures = exists(pictureFile) ? parsePictureNotes(read(pictureFile), subject.lang, grade) : new Map();
  const paperPictures = paperFile ? parsePaperPictures(read(paperFile), grade) : [];

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
        ? historyPastPapers(papers.get(number).body, subject.lang)
        : { mcq: [], structured: [], related: "", pattern: "", years: {} },
      pictures: pictures.get(number) ?? [],
      paperPictures: paperPictures.filter((p) => p.chapter === number).length,
    };
  });
  return { chapters, mapGuide, paperPictures };
}

// ── Mathematics (StudyBuddy Mathematics export) ──
// <dir>/01_Maths_Concept_Notes.md … 09_Maths_Exam_Tricks_and_Strategies.md, one section per chapter: "## G10C01 · …" / "## G10C01 — …".
// Every item has a "<!-- meta {json} -->" comment, which the parser reads instead of the (Tamil or English) labels.
// Maths is LaTeX ($…$, $$…$$), rendered with KaTeX on the site. Diagrams are SVGs in Shared_Assets, copied to /public/maths.
const MATHS_ROOT = path.join(CONTENT, MATHS_DIR);
const MATHS_PUBLIC = path.join(ROOT, "public", "maths", "diagrams");
const EMPTY_PAPERS = () => ({ mcq: [], structured: [], related: "", pattern: "", years: {} });

const metaOf = (text) => {
  const m = text.match(/<!-- meta (\{[\s\S]*?\}) -->/);
  try {
    return m ? JSON.parse(m[1]) : {};
  } catch {
    return {};
  }
};

/** Copies the diagrams to /public once and returns id → { src, w, h, alt }. */
let mathsDiagrams = null;
function mathsDiagram(id) {
  if (!mathsDiagrams) {
    mathsDiagrams = new Map();
    const manifestFile = path.join(MATHS_ROOT, "Developer_Resources", "Asset_Manifest.json");
    const manifest = exists(manifestFile) ? JSON.parse(read(manifestFile)) : [];
    const desc = new Map(manifest.map((a) => [a.id, a.desc || ""]));
    const assets = path.join(MATHS_ROOT, "Shared_Assets");
    if (exists(assets)) {
      fs.mkdirSync(MATHS_PUBLIC, { recursive: true });
      for (const group of fs.readdirSync(assets)) {
        const dir = path.join(assets, group);
        if (!fs.statSync(dir).isDirectory()) continue;
        for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".svg"))) {
          const svg = read(path.join(dir, f));
          const box = svg.match(/viewBox="[\d.]+ [\d.]+ ([\d.]+) ([\d.]+)"/);
          const target = path.join(MATHS_PUBLIC, f);
          if (!exists(target) || read(target) !== svg) fs.writeFileSync(target, svg);
          const key = f.replace(/\.svg$/, "");
          mathsDiagrams.set(key, { src: `/maths/diagrams/${f}`, w: box ? Math.round(+box[1]) : 360, h: box ? Math.round(+box[2]) : 300, alt: desc.get(key) || key });
        }
      }
    }
  }
  return mathsDiagrams.get(id) ?? null;
}

const diagramMd = (id) => {
  const d = mathsDiagram(id);
  return d ? `![${d.alt.replace(/[[\]]/g, "")}](${d.src}#${d.w}x${d.h})` : "";
};

/** Markdown from the export, cleaned for the site: no meta comments or internal ids, diagrams as images, no raw HTML. */
function mathsMarkdown(md) {
  return md
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^<sub>[\s\S]*?<\/sub>\s*$/gm, "")
    .replace(/^<br>\*\*[^*]+:\*\*[^\n]*$/gm, "") // "Accepted answer formats · Unit" (for the app's answer checker)
    .replace(/<br>/g, "  \n")
    .replace(/<\/?details>|<summary>[^<]*<\/summary>/g, "")
    // "**Diagram:** `GEO-SECTOR-01` → `Shared_Assets/…svg` (note)" and "![GEO-…](../Shared_Assets/…svg)" → images
    .replace(/^\*\*[^*\n]+:\*\*[^\n]*Shared_Assets\/[^\n]*$/gm, (line) =>
      [...line.matchAll(/Shared_Assets\/[\w/]+\/([\w-]+)\.svg/g)].map((m) => diagramMd(m[1])).filter(Boolean).join("\n\n"),
    )
    .replace(/^!\[[^\]]*\]\([^)]*Shared_Assets\/[\w/]+\/([\w-]+)\.svg\)\s*$/gm, (_, id) => diagramMd(id))
    // cross-references to other files and question ids
    .replace(/\s*→\s*`(?:MQ|QZ|PP)-[^`]+`(?:\s*\([^)]*\))?/g, "")
    .replace(/^- \*\*[^*\n]*(?:IDs?|அடையாள)[^*\n]*:\*\*[^\n]*$/gm, "")
    .replace(/^(#{2,4} [^\n]*?)\s+[—–-]\s+(?:MQ|QZ|PP)-[\w-]+\s*$/gm, "$1")
    .replace(/^(#{2,4}) (?:F|T|C|TR|VIS|P[12][AB])-[\w-]+\s+[—–-]\s+/gm, "$1 ")
    .replace(/`(?:F|T|C|MQ|QZ|PP|TR|VIS|GEO|GRA|STA|SET|PRO|TRI|SOL|CON|P[12][AB])-[\w-]+`,?[ \t]*/g, "")
    .replace(/[ \t]*·[ \t]*\*\*[^*\n]+:\*\*[ \t]*$/gm, "") // a label left empty by the id removal
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Splits an export file on its "## G10C01 …" headings: Map("G10C01" → { title, body }). */
function mathsChapters(md) {
  const out = new Map();
  const heads = [...md.matchAll(/^## (G1[01]C\d\d)\b[^\n]*?[—–]\s*(.+)$/gm)];
  heads.forEach((m, i) => {
    let body = md.slice(m.index + m[0].length, i + 1 < heads.length ? heads[i + 1].index : md.length);
    const end = body.search(/^## (?!G1[01]C)/m); // a closing "## Limitations …" section
    if (end >= 0) body = body.slice(0, end);
    out.set(m[1], { title: m[2].trim(), body: body.replace(/\n-{3,}\s*$/, "").trim() });
  });
  return out;
}

/** "### F-…" blocks of the formula bank, without their worked examples (those are in the notes). */
function mathsFormulas(body) {
  return body
    .split(/^(?=### )/m)
    .filter((b) => b.startsWith("### "))
    .map((b) => b.split(/^#### /m)[0].trim())
    .join("\n\n");
}

function mathsFlashcards(body) {
  const cards = [];
  for (const block of body.split(/^(?=### FC-)/m)) {
    const front = block.match(/^\*\*[^*\n]+:\*\*\s*([^\n]+)/m);
    const back = block.match(/<summary>[^<]*<\/summary>([\s\S]*?)<\/details>/);
    if (front && back) cards.push({ front: front[1].trim(), back: mathsMarkdown(back[1]).trim() });
  }
  return cards;
}

const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

function mathsQuiz(body) {
  const questions = [];
  for (const block of body.split(/^(?=#### QZ-)/m)) {
    if (!block.startsWith("#### QZ-")) continue;
    const meta = metaOf(block);
    const [qText, rest = ""] = block.split("<details>");
    const lines = qText.split("\n").slice(1).filter((l) => !/^<!--/.test(l));
    const options = [];
    const prompt = [];
    for (const line of lines) {
      const opt = line.match(/^-\s+\*\*([A-D])\.\*\*\s*(.*)$/);
      if (opt) options.push({ key: opt[1], text: opt[2].trim() });
      else if (!options.length && !/Shared_Assets\//.test(line)) prompt.push(line.replace(/^\*\*[^*\n]+:\*\*\s*/, ""));
    }
    const reveal = rest.split("</details>")[0].replace(/<summary>[^<]*<\/summary>/, "").trim();
    const answer = reveal.match(/^\*\*([A-D])\*\*/)?.[1];
    if (options.length < 2 || !answer) continue;
    questions.push({
      prompt: prompt.join("\n").trim(),
      options,
      answer,
      explanation: reveal
        .replace(/^\*\*[A-D]\*\*[^\n]*\n/, "")
        .replace(/^\d+\.\s+/gm, "")
        .replace(/\n{2,}/g, "\n")
        .trim(),
      difficulty: cap(meta.difficulty || "medium"),
    });
  }
  return questions;
}

const MATHS_LABELS = {
  en: { topic: "Exam topic", practice: "Practice question of the same type", final: "Final answer", mistake: "Common mistake", marks: "marks", paper: "Paper", part: "Part", formulas: "Formula bank" },
  ta: { topic: "தேர்வுத் தலைப்பு", practice: "அதே வகைப் பயிற்சி வினா", final: "இறுதி விடை", mistake: "பொதுவான தவறு", marks: "புள்ளிகள்", paper: "வினாத்தாள்", part: "பகுதி", formulas: "சூத்திரத் தொகுப்பு" },
};

/** Past-paper items of one chapter (File 06), each paired with its worked equivalent question from questions_<lang>.json. */
function mathsPastPapers(body, bank, lang) {
  const L = MATHS_LABELS[lang];
  const structured = [];
  for (const block of body.split(/^(?=### PP-)/m)) {
    if (!block.startsWith("### PP-")) continue;
    const meta = metaOf(block);
    const mqId = block.match(/^#### [^\n]*?(MQ-[\w-]+)\s*$/m)?.[1];
    const q = mqId && bank.get(mqId);
    if (!q) continue;
    const topic = block.match(/^- \*\*[^*\n]*StudyBuddy[^*\n]*:\*\*\s*(.+)$/m)?.[1].replace(/\s*\([^)]*\)\s*$/, "").trim() ?? "";
    const source = block.match(/^- \*\*[^*\n]+:\*\*\s*([^·\n]+)/m)?.[1].trim() ?? meta.source;
    const sourceLabel = meta.source_type === "OFFICIAL" ? `O/L ${meta.exam_year}` : source.replace(/\s*\(English medium\).*$/, "");
    const steps = q.steps.map((s) => `**${s.n}.** ${s.instruction}\n$$${s.working_latex}$$`).join("\n");
    const final = `**${L.final}:** $${q.final_answer_latex}$${q.unit ? ` ${q.unit}` : ""}`;
    const image = q.diagram_ref ? mathsDiagram(q.diagram_ref) : null;
    structured.push({
      heading: meta.id,
      year: meta.exam_year ? Number(meta.exam_year) : null,
      question: [topic && `**${L.topic}:** ${topic}`, `**${L.practice}:**`, q.question].filter(Boolean).join("\n"),
      reference: `${sourceLabel} · ${L.paper} ${meta.paper} · ${L.part} ${meta.part} · Q${meta.question}`,
      marks: meta.marks ? `${meta.marks} ${L.marks}` : "",
      answer: [steps, final, q.mistake && `⚠️ **${L.mistake}:** ${q.mistake}`].filter(Boolean).join("\n\n"),
      explanation: "",
      guidance: "",
      status: "",
      verification: "",
      alsoRelevant: "",
      ...(image ? { image: { src: image.src, w: image.w, h: image.h } } : {}),
    });
  }
  const years = {};
  for (const q of structured) if (q.year) years[q.year] = (years[q.year] || 0) + 1;
  return { ...EMPTY_PAPERS(), structured, years };
}

/** Subject-wide reading (pattern mastery, visual maths, exam tricks): one guide per file, one section per "## " heading. */
function guideFrom(slug, md, clean, skip = /^$/) {
  const title = (md.match(/^# (.+)$/m)?.[1] ?? slug).replace(/^.*?(?:·\s*\d+\s+|–\s*)/, "").trim();
  const heads = [...md.matchAll(/^## (.+)$/gm)];
  const intro = clean(md.slice(0, heads[0]?.index ?? md.length).replace(/^[\s\S]*?^# .+$/m, "").replace(/^meta:\n(?:- [^\n]*\n)*/m, ""))
    .replace(/^\*[^*\n]+\*\s*$/m, "")
    .replace(/^-{3,}\s*$/gm, "")
    .trim();
  const sections = [];
  heads.forEach((m, i) => {
    const heading = plain(m[1]).trim();
    if (skip.test(heading)) return;
    const body = clean(md.slice(m.index + m[0].length, i + 1 < heads.length ? heads[i + 1].index : md.length).replace(/\n-{3,}\s*$/, ""));
    if (body) sections.push({ slug: String(sections.length + 1), title: heading.replace(/^(?:VIS|P[12][AB]|ESS|WS|GR)-[\w-]+\s+[—–-]\s+/, ""), body });
  });
  return { slug, title, intro, sections };
}

function readMaths(subject, dir) {
  const file = (prefix) => {
    const f = fs.readdirSync(dir).find((n) => n.startsWith(prefix));
    return f ? read(path.join(dir, f)) : "";
  };
  const L = MATHS_LABELS[subject.lang];
  const notes = mathsChapters(file("01_"));
  const cards = mathsChapters(file("02_"));
  const formulas = mathsChapters(file("03_"));
  const quizMd = file("04_");
  const quiz = mathsChapters(quizMd.slice(Math.max(0, quizMd.indexOf("#### QZ-") - 2000)).replace(/^### (G1[01]C\d\d)/gm, "## $1"));
  const papers = mathsChapters(file("06_"));
  const bankFile = path.join(MATHS_ROOT, "Developer_Resources", `questions_${subject.lang}.json`);
  const bank = new Map((exists(bankFile) ? JSON.parse(read(bankFile)) : []).map((q) => [q.id, q]));

  const grades = new Map();
  for (const [code, n] of notes) {
    const grade = Number(code.slice(1, 3));
    const number = Number(code.slice(4));
    const formulaBody = formulas.has(code) ? mathsFormulas(formulas.get(code).body) : "";
    const body = mathsMarkdown(n.body + (formulaBody ? `\n\n---\n\n## ${L.formulas}\n\n${formulaBody}` : ""));
    const objectives = [];
    const ideas = body.match(/^### [^\n]+\n+((?:- [^\n]+\n?)+)/m);
    if (ideas) for (const l of ideas[1].trim().split("\n")) objectives.push(l.replace(/^- /, "").trim());
    const unit = {
      number,
      notes: { ...historyNotes(n.title, body), objectives },
      flashcards: cards.has(code) ? mathsFlashcards(cards.get(code).body) : [],
      quiz: quiz.has(code) ? mathsQuiz(quiz.get(code).body) : [],
      pastPapers: papers.has(code) ? mathsPastPapers(papers.get(code).body, bank, subject.lang) : EMPTY_PAPERS(),
    };
    if (!grades.has(grade)) grades.set(grade, []);
    grades.get(grade).push(unit);
  }
  const guides = ["07_", "08_", "09_"]
    .map((p, i) => [["patterns", "visual", "exam-tips"][i], file(p)])
    .filter(([, md]) => md)
    .map(([slug, md]) => guideFrom(slug, md, mathsMarkdown, /^(?:Limitations|வரையறை)/));
  return { grades, extras: { papers: [], guides } };
}

// ── Tamil language & literature ──
// 01_Tamil_Notes.md "## N01 – பேதைமை" · 02 flashcards (tables) · 03 quizzes ("**Q-N01-01** | grade: 10 | unit: N01 …")
// 04 past papers by year and paper ("## பகுதி 1 – வினாத்தாள் I … – 2019") · 05–08 guides (grammar, essays, writing, literature).
const TAMIL_GUIDES = [
  ["05_", "grammar"],
  ["06_", "essays"],
  ["07_", "writing"],
  ["08_", "literature"],
];
// Quiz units named after the grammar guide (GR-xx) belong to these topics.
const TAMIL_GR_TOPIC = { "GR-01": 3, "GR-02": 4, "GR-03": 5, "GR-05": 6, "GR-06": 9, "GR-08": 10, "GR-09": 28, "GR-10": 29, "GR-11": 30, "GR-12": 31, "GR-13": 32, "GR-14": 33 };
const TAMIL_FILES = {
  "05_Tamil_Grammar_Mastery.md": "இலக்கணப் பயிற்சி",
  "06_Tamil_Essay_Bank.md": "கட்டுரைத் தொகுப்பு",
  "07_Tamil_Writing_Skills.md": "எழுத்துத் திறன்",
  "08_Tamil_Literature_Mastery.md": "இலக்கியப் பயிற்சி",
  "01_Tamil_Notes.md": "பாடக் குறிப்புகள்",
  "04_Tamil_Chapterwise_Past_Papers.md": "கடந்தகால வினாக்கள்",
};

/** Cleans authoring notes ("File 08 பகுதி B", "id: N01 | grade: 10 …") for students. */
const tamilClean = (t) =>
  t
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^id: [^\n]*\|[^\n]*$/gm, "")
    .replace(/\bSUGGESTED\b/g, "பரிந்துரை விடை")
    .replace(/\bOFFICIAL_(?:REPORT|KEY)\b/g, "அதிகாரபூர்வ விடை")
    .replace(/\b0[1-8]_Tamil_[A-Za-z_]+\.md\b/g, (f) => TAMIL_FILES[f] ?? f)
    .replace(/\bFile 0([1-8])\b/g, (_, n) => Object.values(TAMIL_FILES)[["5", "6", "7", "8", "1", "4"].indexOf(n)] ?? `File 0${n}`)
    .replace(/\n{3,}/g, "\n\n")
    .trim();

/** "**ID** | key: value | key: value" or "**ID** – prompt" → { id, fields, first }. */
function tamilHead(line) {
  const m = line.match(/^\*\*([A-Z][A-Z0-9]*-[^\s*]+)([^*]*)\*\*\s*(.*)$/);
  if (!m) return null;
  const fields = {};
  let first = m[2].replace(/^\s*[–-]\s*/, "").trim();
  if (m[3].startsWith("|")) {
    for (const part of m[3].split("|").map((s) => s.trim()).filter(Boolean)) {
      const kv = part.match(/^([\w_]+):\s*(.*)$/);
      if (kv) fields[kv[1]] = kv[2].trim();
    }
  } else first = [first, m[3].replace(/^[–-]\s*/, "").trim()].filter(Boolean).join(" ");
  return { id: m[1].trim(), fields, first };
}

const TAMIL_KEY = /^(question|answer|explanation|marking_guidance|tip|note|status|source|answer_status)(?:\s*\([^)]*\))?:\s*(.*)$/;

/** A "| உப | வினா | … விடை … |" table: one structured question per row. */
function tamilTableRows(lines) {
  const rows = lines.filter((l) => l.trim().startsWith("|")).map((l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
  if (rows.length < 3 || !/^:?-{2,}/.test(rows[1][0] ?? "")) return [];
  const head = rows[0];
  const ans = head.findIndex((h) => /விடை/.test(h));
  const q = head.findIndex((h, i) => i !== ans && /வினா/.test(h));
  if (ans < 0 || q < 0) return [];
  return rows.slice(2).map((r) => ({
    label: q > 0 ? r[0] : "",
    question: r[q] ?? "",
    answer: r[ans] ?? "",
    note: r.filter((_, i) => i !== ans && i !== q && i !== 0 && r[i]).join(" · "),
  }));
}

/** One item's lines → { prompt, options, fields }. "answer: 3 | status: OFFICIAL_KEY" lines carry several fields. */
function tamilItem(lines) {
  const fields = {};
  const prompt = [];
  let current = null;
  for (const raw of lines) {
    const line = raw.trimEnd();
    const key = line.match(TAMIL_KEY);
    if (key) {
      const [first, ...more] = key[2].split(/\s+\|\s+(?=[\w_]+:)/);
      current = key[1];
      fields[current] = first.trim();
      for (const m of more) {
        const kv = m.match(/^([\w_]+):\s*(.*)$/);
        if (kv) fields[kv[1]] = kv[2].trim();
      }
      continue;
    }
    if (current && current !== "question") fields[current] += "\n" + line;
    else prompt.push(line);
  }
  for (const k of Object.keys(fields)) fields[k] = fields[k].trim();
  let text = [fields.question, prompt.join("\n")].filter(Boolean).join("\n").trim();
  const options = [];
  const at = text.search(/\(1\)\s/);
  if (at >= 0 && /\(2\)\s/.test(text.slice(at))) {
    for (const o of text.slice(at).matchAll(/\((\d)\)\s*([\s\S]*?)(?=\s*\(\d\)\s|$)/g)) options.push({ key: o[1], text: o[2].replace(/\s+/g, " ").trim() });
    text = text.slice(0, at).trim();
  }
  return { prompt: text, options, fields };
}

/** Splits a block of Tamil items on their "**ID** | …" heads. Also yields "### heading" chunks (questions described in a heading). */
function tamilItems(text) {
  const out = [];
  let cur = null;
  for (const line of text.split("\n")) {
    const head = tamilHead(line);
    if (head || /^#{3,4} /.test(line) || /^-{3,}\s*$/.test(line)) {
      if (cur) out.push(cur);
      cur = head
        ? { ...head, lines: head.first ? [head.first] : [] }
        : /^#{3,4} /.test(line)
          ? { id: "", heading: line.replace(/^#+\s*/, ""), fields: {}, lines: [] }
          : null;
      continue;
    }
    if (cur) cur.lines.push(line);
  }
  if (cur) out.push(cur);
  return out;
}

function tamilQuiz(md) {
  const byUnit = new Map();
  for (const item of tamilItems(md)) {
    if (!item.id.startsWith("Q-")) continue;
    const unit = (item.fields.unit || "").match(/^(N(\d+)|GR-\d+)/);
    const number = unit ? (unit[2] !== undefined ? Number(unit[2]) : TAMIL_GR_TOPIC[unit[1]]) : undefined;
    if (number === undefined) continue;
    const { prompt, options, fields } = tamilItem(item.lines);
    const answer = (fields.answer || "").match(/\d/)?.[0];
    if (options.length < 2 || !answer) continue;
    if (!byUnit.has(number)) byUnit.set(number, []);
    byUnit.get(number).push({ prompt, options, answer, explanation: fields.explanation || "", difficulty: cap(item.fields.difficulty || "medium") });
  }
  return byUnit;
}

function tamilFlashcards(md) {
  const byUnit = new Map();
  for (const row of md.matchAll(/^\|\s*FC-[^|]+\|[^|]*\|\s*N(\d+)\s*\|([^|]*)\|([^|]*)\|([^|]*)\|\s*$/gm)) {
    const [, n, front, back, note] = row;
    const number = Number(n);
    if (!byUnit.has(number)) byUnit.set(number, []);
    byUnit.get(number).push({ front: front.trim(), back: [back.trim(), note.trim() && `(${note.trim()})`].filter(Boolean).join("\n") });
  }
  return byUnit;
}

/** One paper (a "## பகுதி" section) → { mcq, structured }, each item tagged with its literature work when given. */
function tamilPaper(body, yearLabel) {
  const year = yearOf(yearLabel);
  const mcq = [];
  const structured = [];
  for (const item of tamilItems(body)) {
    const rows = tamilTableRows(item.lines);
    if (rows.length) {
      for (const r of rows)
        structured.push({
          heading: item.heading || item.id,
          year,
          question: tamilClean(`${r.label ? `**${r.label}** ` : ""}${r.question}`),
          reference: [item.heading || item.id, r.label].filter(Boolean).join(" · "),
          marks: "",
          answer: tamilClean([r.answer, r.note && `(${r.note})`].filter(Boolean).join("\n")),
          explanation: "",
          guidance: "",
          status: "",
          verification: "",
          alsoRelevant: "",
          work: /^(மூலம்|பாடப்பகுதி)/.test(r.note) ? "" : r.note.split(/[(:·]/)[0].trim(),
        });
      continue;
    }
    const { prompt, options, fields } = tamilItem(item.lines);
    const f = { ...item.fields, ...fields };
    const reference = [f.paper && `வினாத்தாள் ${f.paper}`, f.official_q_no ? `வினா ${f.official_q_no}` : item.id, f.topic].filter(Boolean).join(" · ");
    const answer = tamilClean(f.answer || "");
    if (options.length >= 2 && /^\d/.test(answer)) {
      const key = answer.match(/^\d/)[0];
      mcq.push({
        prompt,
        options,
        answer: key,
        year,
        yearLabel,
        reference,
        answerText: options.find((o) => o.key === key)?.text ?? "",
        explanation: tamilClean(f.explanation || ""),
        status: "",
        alsoRelevant: "",
        verification: "",
        work: f.work || "",
      });
    } else if (answer && (prompt || item.heading)) {
      structured.push({
        heading: item.id || item.heading,
        year,
        question: tamilClean([item.heading && `**${item.heading}**`, prompt].filter(Boolean).join("\n")),
        reference: item.id ? reference : `${yearLabel}`,
        marks: f.marks ? `${f.marks} புள்ளிகள்` : "",
        answer: [answer, f.note && `குறிப்பு: ${f.note}`].filter(Boolean).join("\n"),
        explanation: tamilClean(f.explanation || ""),
        guidance: tamilClean([f.marking_guidance, f.tip && `உதவிக்குறிப்பு: ${f.tip}`].filter(Boolean).join("\n")),
        status: "",
        verification: "",
        alsoRelevant: "",
        work: f.work || "",
      });
    }
  }
  return { mcq, structured };
}

function readTamil(subject, dir) {
  const file = (prefix) => {
    const f = fs.readdirSync(dir).find((n) => n.startsWith(prefix) && n.endsWith(".md"));
    return f ? read(path.join(dir, f)) : "";
  };
  const notes = new Map();
  const notesMd = file("01_");
  const heads = [...notesMd.matchAll(/^## N(\d+)\s*[–-]\s*(.+)$/gm)];
  heads.forEach((m, i) => {
    let body = notesMd.slice(m.index + m[0].length, i + 1 < heads.length ? heads[i + 1].index : notesMd.length);
    const end = body.search(/^## (?!N\d)/m);
    if (end >= 0) body = body.slice(0, end);
    notes.set(Number(m[1]), { title: plain(m[2]).trim(), body: tamilClean(body.replace(/\n-{3,}\s*$/, "")) });
  });
  const cards = tamilFlashcards(file("02_"));
  const quiz = tamilQuiz(file("03_"));

  // Past papers, one per "## பகுதி N – … – <year>" section.
  const papersMd = file("04_");
  const papers = [];
  const parts = [...papersMd.matchAll(/^## பகுதி (\d+)\s*[–-]\s*(.+)$/gm)];
  parts.forEach((m, i) => {
    const body = papersMd.slice(m.index + m[0].length, i + 1 < parts.length ? parts[i + 1].index : papersMd.length);
    const title = m[2].trim();
    const yearLabel = title.match(/20\d\d(?:\(20\d\d\))?/)?.[0] ?? "";
    const paper = tamilPaper(body.split(/^## /m)[0], yearLabel);
    if (paper.mcq.length + paper.structured.length)
      papers.push({ slug: `p${m[1].padStart(2, "0")}`, title: title.replace(/\s+\((?!20\d\d\))[^)]*\)\s*$/, ""), yearLabel, year: yearOf(yearLabel), ...paper });
  });
  papers.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.slug.localeCompare(b.slug));

  // Literature questions also go to their topic's past-paper tab ("work: குற்றாலக் குறவஞ்சி").
  const core = (t) => t.replace(/\s*\([^)]*\)/g, "").replace(/[“”"…]/g, "").trim();
  const topicOf = (work) => {
    if (!work) return null;
    const w = core(work);
    for (const [number, n] of notes) if (number && (core(n.title).startsWith(w) || w.startsWith(core(n.title)))) return number;
    return null;
  };
  const topicPapers = new Map();
  for (const p of papers)
    for (const kind of ["mcq", "structured"])
      for (const q of p[kind]) {
        const number = topicOf(q.work);
        if (!number) continue;
        if (!topicPapers.has(number)) topicPapers.set(number, EMPTY_PAPERS());
        topicPapers.get(number)[kind].push(q);
      }

  const units = [...notes.keys()].sort((a, b) => a - b).map((n, i) => {
    const note = notes.get(n);
    const pp = topicPapers.get(n) ?? EMPTY_PAPERS();
    for (const q of [...pp.mcq, ...pp.structured]) if (q.year) pp.years[q.year] = (pp.years[q.year] || 0) + 1;
    // "What you'll learn": the "### முக்கியக் கருத்துகள்" (key ideas) list of the topic.
    const ideas = note.body.match(/^###[^\n]*முக்கிய[^\n]*\n+((?:(?:\d+\.|-)\s[^\n]+\n?)+)/m);
    const objectives = ideas ? ideas[1].trim().split("\n").map((l) => plain(l.replace(/^(?:\d+\.|-)\s+/, ""))) : [];
    return {
      number: i + 1,
      notes: { ...historyNotes(note.title, note.body), objectives },
      flashcards: cards.get(n) ?? [],
      quiz: quiz.get(n) ?? [],
      pastPapers: pp,
    };
  });
  const guides = TAMIL_GUIDES.map(([prefix, slug]) => [slug, file(prefix)])
    .filter(([, md]) => md)
    .map(([slug, md]) => guideFrom(slug, md, tamilClean, /^வரையறை/));
  return { grades: new Map([[10, units]]), extras: { papers, guides } };
}

function build() {
  fs.mkdirSync(OUT_CHAPTERS, { recursive: true });
  fs.mkdirSync(path.dirname(OUT_CATALOG), { recursive: true });
  for (const f of fs.readdirSync(OUT_CHAPTERS)) fs.unlinkSync(path.join(OUT_CHAPTERS, f));

  const catalog = { generatedAt: new Date().toISOString(), subjects: [] };
  const totals = { chapters: 0, quiz: 0, flashcards: 0, mcq: 0, structured: 0 };

  fs.mkdirSync(OUT_GUIDES, { recursive: true });
  fs.mkdirSync(OUT_PICTURES, { recursive: true });
  fs.mkdirSync(OUT_EXTRAS, { recursive: true });

  for (const subject of SUBJECTS) {
    const { dir: dirName = subject.id, layout, ...meta } = subject;
    const dir = path.join(CONTENT, dirName);
    if (!exists(dir)) continue;
    const gradeFiles = layout === "grade-files";
    // Maths and Tamil come as one file per type for the whole subject; their readers return every grade at once.
    const whole = layout === "maths" ? readMaths(meta, dir) : layout === "tamil" ? readTamil(meta, dir) : null;
    const grades = whole
      ? [...whole.grades.keys()].sort((a, b) => a - b).map(String)
      : fs
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
      if (whole) {
        units = whole.grades.get(grade).sort((a, b) => a.number - b.number);
      } else if (gradeFiles) {
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
    if (whole && (whole.extras.papers.length || whole.extras.guides.length)) {
      // Year-by-year papers and reading guides: full text in generated/extras, a light index in the catalog.
      fs.writeFileSync(path.join(OUT_EXTRAS, `${subject.id}.json`), JSON.stringify(whole.extras));
      subjectEntry.extras = {
        papers: whole.extras.papers.map((p) => ({ slug: p.slug, title: p.title, yearLabel: p.yearLabel, mcq: p.mcq.length, structured: p.structured.length })),
        guides: whole.extras.guides.map((g) => ({ slug: g.slug, title: g.title, sections: g.sections.map((s) => s.title) })),
      };
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
