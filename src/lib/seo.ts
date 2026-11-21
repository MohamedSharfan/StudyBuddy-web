import { catalog, getChapterSummary, getSubject } from "@/lib/catalog";

/** Use the working apex host as canonical; the www hostname currently redirects here. */
export const SITE_URL = "https://studybuddy.com.lk";

export function canonicalUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function languageAlternates(subjectId: string, grade: number, suffix: string) {
  const subject = getSubject(subjectId);
  if (!subject) return {};
  const siblings = catalog.subjects.filter((s) => s.name === subject.name && s.level === subject.level);
  const languages: Record<string, string> = {};
  for (const sibling of siblings) {
    const locale = sibling.lang === "ta" ? "ta-LK" : sibling.lang === "en" ? "en-LK" : null;
    if (locale) languages[locale] = canonicalUrl(`${suffix.replace("{subjectId}", sibling.id).replace("{grade}", String(grade))}`);
  }
  return languages;
}

export function subjectSeo(subjectId: string, grade: number) {
  const subject = getSubject(subjectId);
  if (!subject) return null;
  const availableGrade = subject.grades.some((g) => g.grade === grade) ? grade : subject.grades[0]?.grade ?? 10;
  const path = `/subjects/${subjectId}?grade=${availableGrade}`;
  const title = `O/L ${subject.name} Grade ${availableGrade} · ${subject.medium} Medium`;
  const description = `Study Sri Lankan O/L ${subject.name} Grade ${availableGrade} in ${subject.medium}. Free chapter-wise notes, flashcards, quizzes${subject.grades.some((g) => g.chapters.some((c) => c.counts.mcq + c.counts.structured)) ? " and past-paper questions" : ""}${subject.maps ? ", plus map-marking practice" : ""}.`;
  return {
    title,
    description,
    path,
    languages: languageAlternates(subjectId, availableGrade, "/subjects/{subjectId}?grade={grade}"),
  };
}

export function chapterSeo(subjectId: string, grade: number, chapter: number, suffix = "") {
  const subject = getSubject(subjectId);
  const summary = getChapterSummary(subjectId, grade, chapter);
  if (!subject || !summary) return null;
  const path = `/learn/${subjectId}/${grade}/${chapter}${suffix}`;
  const lang = subject.medium === "Tamil" ? "Tamil" : "English";
  const s = `O/L ${subject.name}`;
  const title = suffix === "/past-papers"
    ? `${s} Past Papers Grade ${grade}, Chapter ${chapter} · ${lang}`
    : suffix === "/notes"
      ? `${s} Notes Grade ${grade}, Chapter ${chapter} · ${lang}`
      : suffix === "/quiz"
        ? `${s} Quiz Grade ${grade}, Chapter ${chapter} · ${lang}`
        : suffix === "/flashcards"
          ? `${s} Flashcards Grade ${grade}, Chapter ${chapter} · ${lang}`
          : suffix === "/map"
            ? `${s} Map Practice Grade ${grade}, Chapter ${chapter} · ${lang}`
            : `${s} Grade ${grade}, Chapter ${chapter}: ${summary.title}`;
  const section = suffix === "/past-papers"
    ? `Practice chapter-wise MCQs and structured questions from Sri Lankan ${s} past papers (2016–2025).`
    : suffix === "/notes"
      ? `Read chapter-wise ${lang} medium notes for Sri Lankan ${s}.`
      : suffix === "/quiz"
        ? `Test your knowledge with a free chapter-wise ${lang} medium ${s} quiz.`
        : suffix === "/flashcards"
          ? `Revise ${s} Grade ${grade}, Chapter ${chapter} with free ${lang} medium flashcards.`
          : suffix === "/map"
            ? `Practise marking the places of ${s} Grade ${grade}, Chapter ${chapter} on an interactive map.`
            : `Free ${s} Grade ${grade} ${lang} medium study resources for Chapter ${chapter}: ${summary.title}.`;
  return {
    title,
    description: `${section} StudyBuddy has free notes, flashcards, quizzes and past-paper practice for Grade 10 and 11 students.`,
    path,
    languages: languageAlternates(subjectId, grade, `/learn/{subjectId}/{grade}/${chapter}${suffix}`),
  };
}
