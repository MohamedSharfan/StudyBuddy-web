import Link from "next/link";
import { PandaChat } from "@/components/PandaChat";
import { subjectsFor } from "@/lib/catalog";
import { requireViewer } from "@/lib/session";

export const metadata = { title: "AI Panda" };

export default async function PandaPage() {
  const viewer = await requireViewer("/panda");
  const p = viewer.profile!;
  if (subjectsFor(p).length === 0)
    return (
      <div className="max-w-[640px] mx-auto glass p-6 sm:p-8">
        <h1 className="display text-2xl font-bold">AI Panda is coming to {p.education_level}</h1>
        <p className="text-muted mt-2">Panda answers from our notes, so it will be ready for your subjects as soon as they launch.</p>
        <Link href="/home" className="btn btn-ghost mt-5">
          Back to home
        </Link>
      </div>
    );
  return (
    <div className="max-w-[860px] mx-auto">
      <PandaChat firstName={p.display_name.split(" ")[0]} smart={Boolean(process.env.ANTHROPIC_API_KEY)} />
    </div>
  );
}
