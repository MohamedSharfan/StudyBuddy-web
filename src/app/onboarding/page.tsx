import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/ProfileForm";
import { Logo } from "@/components/ui/Logo";
import { getDb, getViewer } from "@/lib/session";

export const metadata = { title: "Welcome" };

export default async function Onboarding({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next = "/home" } = await searchParams;
  const viewer = await getViewer();
  if (!viewer) redirect("/login");
  const p = viewer.profile;
  const supabase = await getDb();
  const { data: priv } = await supabase.from("student_private").select("phone").eq("user_id", viewer.userId).maybeSingle();

  const suggested =
    p?.username ??
    (p?.display_name ?? "student")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "")
      .slice(0, 14) + Math.floor(100 + Math.random() * 900);

  return (
    <div className="min-h-dvh flex flex-col items-center px-4 py-10 sm:py-16">
      <Logo />
      <div className="glass w-full max-w-[620px] p-5 sm:p-8 mt-8">
        <h1 className="display text-2xl sm:text-3xl font-bold">Welcome to StudyBuddy</h1>
        <p className="text-muted mt-1 mb-6">Tell us what you&apos;re studying so we show you the right subjects.</p>
        <ProfileForm
          next={next.startsWith("/") ? next : "/home"}
          submitLabel="Start learning"
          initial={{
            username: suggested.length >= 3 ? suggested : null,
            display_name: p?.display_name ?? "Student",
            // Ask every new student, even though the database defaults to O/L.
            education_level: p?.onboarded ? p.education_level : null,
            stream: p?.stream ?? null,
            grade: p?.onboarded ? p.grade : null,
            province: p?.province ?? null,
            medium: p?.medium ?? "Tamil",
            bio: p?.bio ?? "",
            headline: p?.headline ?? "",
            phone: priv?.phone ?? null,
          }}
        />
      </div>
    </div>
  );
}
