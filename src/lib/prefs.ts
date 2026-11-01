import "server-only";
import { cookies } from "next/headers";
import { subjectsFor, type SubjectSummary } from "./catalog";
import { MEDIUM_COOKIE, mediumFromCode } from "./config";

/** The medium the student picked on the start screen (remembered in a cookie), or null. */
export async function getMedium() {
  const store = await cookies();
  return mediumFromCode(store.get(MEDIUM_COOKIE)?.value);
}

/** O/L subjects in the chosen medium (every medium if none chosen yet). */
export async function studySubjects(): Promise<SubjectSummary[]> {
  const medium = await getMedium();
  return subjectsFor({ education_level: "O/L", medium: medium?.name });
}

/** Where "study" goes: the first live subject in the student's medium. */
export async function studyHref() {
  const medium = await getMedium();
  if (!medium) return "/";
  const [subject] = await studySubjects();
  return subject ? `/subjects/${subject.id}` : "/subjects";
}
