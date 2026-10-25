/** Exam levels, A/L streams and the subjects planned for each. Client-safe. */

export type Level = "O/L" | "A/L";

export const LEVELS: { id: Level; name: string; grades: number[]; blurb: string }[] = [
  { id: "O/L", name: "O/L", grades: [10, 11], blurb: "Grade 10 & 11" },
  { id: "A/L", name: "A/L", grades: [12, 13], blurb: "Grade 12 & 13" },
];

export type UpcomingSubject = { name: string; icon: string };

export const AL_STREAMS: { id: string; name: string; subjects: UpcomingSubject[] }[] = [
  {
    id: "physical",
    name: "Physical Science (Maths)",
    subjects: [
      { name: "Combined Maths", icon: "sigma" },
      { name: "Physics", icon: "atom" },
      { name: "Chemistry", icon: "flask" },
      { name: "ICT", icon: "monitor" },
    ],
  },
  {
    id: "biology",
    name: "Biological Science",
    subjects: [
      { name: "Biology", icon: "leaf" },
      { name: "Chemistry", icon: "flask" },
      { name: "Physics", icon: "atom" },
      { name: "Agriculture", icon: "sprout" },
    ],
  },
  {
    id: "commerce",
    name: "Commerce",
    subjects: [
      { name: "Accounting", icon: "calculator" },
      { name: "Business Studies", icon: "briefcase" },
      { name: "Economics", icon: "chart" },
      { name: "ICT", icon: "monitor" },
    ],
  },
  {
    id: "arts",
    name: "Arts",
    subjects: [
      { name: "Political Science", icon: "landmark" },
      { name: "Geography", icon: "globe" },
      { name: "History", icon: "scroll-text" },
      { name: "Tamil", icon: "languages" },
    ],
  },
  {
    id: "technology",
    name: "Technology",
    subjects: [
      { name: "Engineering Tech", icon: "wrench" },
      { name: "Science for Tech", icon: "atom" },
      { name: "Bio-systems Tech", icon: "sprout" },
      { name: "ICT", icon: "monitor" },
    ],
  },
];

/** O/L subjects that are not live yet. */
export const OL_UPCOMING: UpcomingSubject[] = [
  { name: "Mathematics", icon: "sigma" },
  { name: "Science", icon: "atom" },
  { name: "English", icon: "book-a" },
  { name: "Tamil", icon: "languages" },
  { name: "History", icon: "landmark" },
];

export function isLevel(v: unknown): v is Level {
  return v === "O/L" || v === "A/L";
}

export function gradesFor(level: Level) {
  return LEVELS.find((l) => l.id === level)!.grades;
}

export function getStream(id: string | null | undefined) {
  return AL_STREAMS.find((s) => s.id === id) ?? null;
}

/** "O/L · Grade 10" or "A/L · Commerce · Grade 12" */
export function levelLabel(p: { education_level: string; stream?: string | null; grade: number }) {
  const stream = p.education_level === "A/L" ? getStream(p.stream)?.name : null;
  return [p.education_level, stream, `Grade ${p.grade}`].filter(Boolean).join(" · ");
}
