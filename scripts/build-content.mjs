// Parses the markdown in /content into structured JSON the site renders.
//   content/<subject>/grade-XX/chapter-YY/{Notes,Flashcards,Quiz,PastPaper_Questions}.md
// Output:
//   src/generated/catalog.json        – lightweight index (titles, counts) safe for the client
//   generated/chapters/<id>.json      – full chapter payloads, read server-side only
//
// To update content: replace the markdown files and run `npm run content` (dev/build do it automatically).

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");
const OUT_CHAPTERS = path.join(ROOT, "generated", "chapters");
const OUT_CATALOG = path.join(ROOT, "src", "generated", "catalog.json");

// Subjects the site knows about. Add a new folder in /content and an entry here.
const SUBJECTS = [
  {
    id: "islam-ol",
    name: "Islam",
    nameLocal: "இஸ்லாம்",
    level: "O/L",
    medium: "Tamil",
    tagline: "Grade 10 & 11 · Tamil medium",
    color: "#8B5CF6",
    freeChapters: 1, // chapters 1..N of each grade are open without unlocking
  },
];

const read = (p) => fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n").replace(/^﻿/, "");
const exists = (p) => fs.existsSync(p);

function splitBlocks(md) {
  return md.split(/\n-{3,}\n/).map((b) => b.trim()).filter(Boolean);
}

function chapterTitleFrom(h1) {
  // "# தரம் 10 – அத்தியாயம் 1: அகீதா (நம்பிக்கைக் கோட்பாடு)" -> "அகீதா (நம்பிக்கைக் கோட்பாடு)"
  const line = h1.replace(/^#\s*/, "").trim();
  const idx = line.indexOf(":");
  let title = idx >= 0 ? line.slice(idx + 1).trim() : line;
  title = title.replace(/\s+–\s+(மீட்டல் அட்டைகள்|வினாடி வினா)\s*$/, "").trim();
  return title;
}

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
      if (m) objectives.push(m[1].replace(/\*\*/g, "").trim());
    }
  }

  const headings = [];
  for (const l of lines) {
    const m = l.match(/^(##|###)\s+(.*)/);
    if (m) headings.push({ depth: m[1].length, text: m[2].replace(/\*\*/g, "").trim() });
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
    if (front && back) cards.push({ front: front[1].trim(), back: back[1].trim() });
  }
  return cards;
}

const KEY_RE = /^(Year and Question Reference|Year|Question Reference|Marks|Correct Answer|Answer Text|Explanation|Difficulty|Answer Status|Also Relevant To|Verification Note|Original Question|Suggested Answer|Answer Explanation|Marking Guidance[^:]*)\s*:\s*(.*)$/;

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

function parsePastPapers(md) {
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
      answer: fields["Suggested Answer"] || "",
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

function build() {
  fs.mkdirSync(OUT_CHAPTERS, { recursive: true });
  fs.mkdirSync(path.dirname(OUT_CATALOG), { recursive: true });
  for (const f of fs.readdirSync(OUT_CHAPTERS)) fs.unlinkSync(path.join(OUT_CHAPTERS, f));

  const catalog = { generatedAt: new Date().toISOString(), subjects: [] };
  const totals = { chapters: 0, quiz: 0, flashcards: 0, mcq: 0, structured: 0 };

  for (const subject of SUBJECTS) {
    const dir = path.join(CONTENT, subject.id);
    if (!exists(dir)) continue;
    const grades = fs
      .readdirSync(dir)
      .filter((d) => /^grade-\d+$/.test(d))
      .sort();
    const subjectEntry = { ...subject, grades: [] };

    for (const g of grades) {
      const grade = Number(g.split("-")[1]);
      const chapters = [];
      const chapterDirs = fs
        .readdirSync(path.join(dir, g))
        .filter((d) => /^chapter-\d+$/.test(d))
        .sort();
      for (const c of chapterDirs) {
        const number = Number(c.split("-")[1]);
        const base = path.join(dir, g, c);
        const notes = exists(path.join(base, "Notes.md")) ? parseNotes(read(path.join(base, "Notes.md"))) : null;
        const flashcards = exists(path.join(base, "Flashcards.md")) ? parseFlashcards(read(path.join(base, "Flashcards.md"))) : [];
        const quiz = exists(path.join(base, "Quiz.md")) ? parseQuiz(read(path.join(base, "Quiz.md"))) : [];
        const pastPapers = exists(path.join(base, "PastPaper_Questions.md"))
          ? parsePastPapers(read(path.join(base, "PastPaper_Questions.md")))
          : { mcq: [], structured: [], related: "", pattern: "", years: {} };

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
  }

  fs.writeFileSync(OUT_CATALOG, JSON.stringify(catalog, null, 1));
  console.log(
    `content: ${totals.chapters} chapters · ${totals.quiz} quiz · ${totals.flashcards} flashcards · ${totals.mcq} past MCQ · ${totals.structured} structured`,
  );
}

build();
