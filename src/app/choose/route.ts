import { NextResponse, type NextRequest } from "next/server";
import { subjectsFor } from "@/lib/catalog";
import { MEDIUM_COOKIE, mediumFromCode } from "@/lib/config";

/**
 * Saves the medium picked on the start screen and opens the student's subject.
 * /choose?medium=en            → Islam, English medium
 * /choose?medium=ta&grade=11   → Islam, Tamil medium, Grade 11 chapters
 */
export function GET(request: NextRequest) {
  const url = new URL(request.url);
  const medium = mediumFromCode(url.searchParams.get("medium"));
  if (!medium) return NextResponse.redirect(new URL("/", url));

  const [subject] = subjectsFor({ education_level: "O/L", medium: medium.name });
  const grade = url.searchParams.get("grade");
  const dest = new URL(subject ? `/subjects/${subject.id}` : "/subjects", url);
  if (grade === "10" || grade === "11") dest.searchParams.set("grade", grade);

  const res = NextResponse.redirect(dest);
  res.cookies.set(MEDIUM_COOKIE, medium.code, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return res;
}
