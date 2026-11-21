import { NextResponse, type NextRequest } from "next/server";
import { subjectsFor } from "@/lib/catalog";
import { MEDIUM_COOKIE, mediumFromCode } from "@/lib/config";

/**
 * Saves the medium picked on the start screen and opens the student's subjects.
 * /choose?medium=en                              → subject list, English medium
 * /choose?medium=ta&subject=History&grade=11     → History, Tamil medium, Grade 11 chapters (the medium switch)
 * With only one subject in the medium, it opens that subject directly.
 */
export function GET(request: NextRequest) {
  const url = new URL(request.url);
  const medium = mediumFromCode(url.searchParams.get("medium"));
  if (!medium) return NextResponse.redirect(new URL("/", url));

  const subjects = subjectsFor({ education_level: "O/L", medium: medium.name });
  const wanted = url.searchParams.get("subject");
  const subject = wanted ? subjects.find((s) => s.name === wanted) : subjects.length === 1 ? subjects[0] : undefined;
  const grade = url.searchParams.get("grade");
  const dest = new URL(subject ? `/subjects/${subject.id}` : "/subjects", url);
  if (subject && (grade === "10" || grade === "11")) dest.searchParams.set("grade", grade);

  const res = NextResponse.redirect(dest);
  res.cookies.set(MEDIUM_COOKIE, medium.code, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return res;
}
