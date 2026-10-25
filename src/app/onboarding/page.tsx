import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/ProfileForm";
import { Logo } from "@/components/ui/Logo";
import { Panda } from "@/components/ui/Panda";
import { getViewer } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Welcome" };

export default async function Onboarding({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next = "/home" } = await searchParams;
  const viewer = await getViewer();
  if (!viewer) redirect("/login");
  const p = viewer.profile;
  const supabase = await createClient();
  const { data: priv } = (await supabase?.from("student_private").select("phone").eq("user_id", viewer.userId).maybeSingle()) ?? { data: null };

  const suggested =
    p?.username ??
    (p?.display_name ?? "student")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "")
      .slice(0, 14) + Math.floor(100 + Math.random() * 900);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-5">
      <Logo />
      <div className="glass w-full max-w-[620px] p-6 sm:p-9 mt-8 rise">
        <div className="flex items-center gap-4 mb-6">
          <Panda size={70} mood="wink" />
          <div>
            <p className="eyebrow">Step 1 of 1</p>
            <h1 className="display text-3xl font-bold">Let&apos;s set up your study sky</h1>
          </div>
        </div>
        <ProfileForm
          next={next.startsWith("/") ? next : "/home"}
          submitLabel="Start learning →"
          initial={{
            username: suggested.length >= 3 ? suggested : null,
            display_name: p?.display_name ?? "Student",
            grade: p?.grade ?? 10,
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
