/**
 * Launch settings. Safe to import from client and server code.
 *
 * Free launch (first month): no student sign-in, every chapter open, only O/L Islam live.
 * To bring back accounts, coins, ranks and paid unlocks later, set LOGIN_ENABLED = true and
 * FREE_ACCESS = false. Admins can still sign in at /login and use /admin while these are off.
 */
export const LOGIN_ENABLED = false;
export const FREE_ACCESS = true;
export const AL_ENABLED = false;

/** Teacher on WhatsApp Business, for students' subject doubts. */
export const TEACHER_PHONE = "+94 76 739 3761";
const TEACHER_WHATSAPP = "94767393761";

export function teacherWhatsAppLink(context?: string) {
  const text = context ? `Hi StudyBuddy teacher, I have a doubt in ${context}:\n` : "Hi StudyBuddy teacher, I have a doubt:\n";
  return `https://wa.me/${TEACHER_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

/** Cookie that remembers the student's medium choice ("en" or "ta"). */
export const MEDIUM_COOKIE = "sb_medium";
export const MEDIUMS = [
  { code: "ta", name: "Tamil", label: "தமிழ் மொழி மூலம்" },
  { code: "en", name: "English", label: "English medium" },
] as const;

export function mediumFromCode(code: string | undefined | null) {
  return MEDIUMS.find((m) => m.code === code) ?? null;
}
