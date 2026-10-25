import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProfileForm } from "@/components/ProfileForm";
import { requireViewer, getDb } from "@/lib/session";

export const metadata = { title: "Edit profile" };

export default async function EditProfile() {
  const viewer = await requireViewer("/profile/edit");
  const p = viewer.profile!;
  const supabase = await getDb();
  const { data: priv } = await supabase.from("student_private").select("phone").eq("user_id", viewer.userId).maybeSingle();
  return (
    <div className="max-w-[680px] mx-auto">
      <Link href="/profile" className="text-sm text-muted hover:text-white flex items-center gap-1 font-semibold">
        <ChevronLeft size={16} /> Profile
      </Link>
      <h1 className="display text-3xl font-bold mt-3 mb-5">Edit profile</h1>
      <div className="glass p-6 sm:p-8">
        <ProfileForm
          full
          submitLabel="Save changes"
          initial={{
            username: p.username,
            display_name: p.display_name,
            education_level: p.education_level,
            stream: p.stream,
            grade: p.grade,
            province: p.province,
            medium: p.medium,
            bio: p.bio,
            headline: p.headline,
            phone: priv?.phone ?? null,
          }}
        />
      </div>
    </div>
  );
}
