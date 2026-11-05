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
  const title = `O/L Islam Grade ${availableGrade} · ${subject.medium} Medium`;
  const description = `Study Sri Lankan O/L Islam Grade ${availableGrade} in ${subject.medium}. Free chapter-wise notes, flashcards, quizzes and past-paper questions for Tamil and English medium students.`;
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
  const title = suffix === "/past-papers"
    ? `O/L Islam Past Papers Grade ${grade}, Chapter ${chapter} · ${lang}`
    : suffix === "/notes"
      ? `O/L Islam Notes Grade ${grade}, Chapter ${chapter} · ${lang}`
      : suffix === "/quiz"
        ? `O/L Islam Quiz Grade ${grade}, Chapter ${chapter} · ${lang}`
        : suffix === "/flashcards"
          ? `O/L Islam Flashcards Grade ${grade}, Chapter ${chapter} · ${lang}`
          : `O/L Islam Grade ${grade}, Chapter ${chapter}: ${summary.title}`;
  const section = suffix === "/past-papers"
    ? `Practice chapter-wise MCQs and structured questions from Sri Lankan O/L Islam past papers (2016–2025).`
    : suffix === "/notes"
      ? `Read chapter-wise ${lang} medium notes for Sri Lankan O/L Islam.`
      : suffix === "/quiz"
        ? `Test your knowledge with a free chapter-wise ${lang} medium O/L Islam quiz.`
        : suffix === "/flashcards"
          ? `Revise O/L Islam Grade ${grade}, Chapter ${chapter} with free ${lang} medium flashcards.`
          : `Free O/L Islam Grade ${grade} ${lang} medium study resources for Chapter ${chapter}: ${summary.title}.`;
  return {
    title,
    description: `${section} StudyBuddy has free notes, flashcards, quizzes and past-paper practice for Grade 10 and 11 students.`,
    path,
    languages: languageAlternates(subjectId, grade, `/learn/{subjectId}/{grade}/${chapter}${suffix}`),
  };
}
