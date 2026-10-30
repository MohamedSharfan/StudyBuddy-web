import Link from "next/link";
import { CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { UnlockRequestForm } from "@/components/UnlockRequestForm";
import { CopyButton } from "@/components/ui/CopyButton";
import { subjectTotals, subjectsFor } from "@/lib/catalog";
import { requireViewer, getDb } from "@/lib/session";
import { getSettings, whatsappLink } from "@/lib/settings";

export const metadata = { title: "Unlock" };

export default async function UnlockPage() {
  const viewer = await requireViewer("/unlock");
  const p = viewer.profile!;
  const settings = await getSettings();
  const supabase = await getDb();
  const [{ data: requests }, { data: priv }] = await Promise.all([
    supabase.from("unlock_requests").select("id, subject_id, status, created_at").eq("user_id", viewer.userId).order("created_at", { ascending: false }),
    supabase.from("student_private").select("phone").eq("user_id", viewer.userId).maybeSingle(),
  ]);
  const wa = whatsappLink(settings, p.student_code);
  const subjects = subjectsFor(p);

  if (subjects.length === 0)
    return (
      <div className="max-w-[640px] mx-auto glass p-6 sm:p-8">
        <h1 className="display text-2xl font-bold">Nothing to unlock yet</h1>
        <p className="text-muted mt-2">
          Subjects for {p.education_level} students are coming soon. We&apos;ll open them here as soon as they&apos;re ready.
        </p>
        <Link href="/home" className="btn btn-ghost mt-5">
          Back to home
        </Link>
      </div>
    );

  return (
    <div className="max-w-[900px] mx-auto space-y-6">
      <div>
        <h1 className="display text-3xl font-bold">Unlock a subject</h1>
        <p className="text-muted mt-2 max-w-[560px]">
          Chapter 1 of each grade is free. Unlock a subject to open every chapter, flashcard, quiz and past paper.
        </p>
      </div>

      {subjects.map((s) => {
        const t = subjectTotals(s.id);
        const unlocked = viewer.isAdmin || viewer.unlocked.includes(s.id);
        const pending = requests?.find((r) => r.subject_id === s.id && r.status === "pending");
        return (
          <div key={s.id} className="glass p-6 sm:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="eyebrow">{s.level} · {s.medium} medium</p>
              <h2 className="text-2xl font-bold mt-1">
                {s.name} <span className="text-muted text-xl">{s.nameLocal || `· ${s.medium} medium`}</span>
              </h2>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="chip">{t.chapters} chapters</span>
                <span className="chip">{t.flashcards} flashcards</span>
                <span className="chip">{t.quiz} quiz Qs</span>
                <span className="chip">{t.mcq + t.structured} past-paper Qs</span>
              </div>
            </div>
            {unlocked ? (
              <span className="chip !text-green !border-green/40 !text-base !py-2 !px-4">
                <CheckCircle2 size={18} /> Unlocked
              </span>
            ) : pending ? (
              <span className="chip !text-gold !border-gold/40 !py-2 !px-4">
                <Clock size={16} /> Request received
              </span>
            ) : null}
          </div>
        );
      })}

      {!subjects.every((s) => viewer.unlocked.includes(s.id)) && !viewer.isAdmin && (
        <div className="grid md:grid-cols-2 gap-5">
          <div className="glass p-6">
            <p className="font-bold text-lg">1. Contact us</p>
            <p className="text-sm text-muted mt-1">Tell us your student code. We&apos;ll share the payment details and unlock your subject.</p>
            <div className="mt-4 rounded-xl border border-line bg-bg-2 p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted">Your student code</p>
                <p className="text-2xl font-bold tracking-wider text-gold font-mono">{p.student_code}</p>
              </div>
              <CopyButton text={p.student_code} />
            </div>
            {wa ? (
              <a href={wa} target="_blank" rel="noreferrer" className="btn btn-green w-full mt-4">
                <MessageCircle size={18} /> Message us on WhatsApp
              </a>
            ) : (
              <p className="text-sm text-muted mt-4">Our WhatsApp number will appear here soon. Until then, send a request using the form.</p>
            )}
          </div>
          <div className="glass p-6">
            <p className="font-bold text-lg">2. Or send a request</p>
            <p className="text-sm text-muted mt-1 mb-4">An admin will see it in the panel and contact you.</p>
            <UnlockRequestForm subjectId={subjects.find((s) => !viewer.unlocked.includes(s.id))?.id ?? subjects[0].id} phone={priv?.phone ?? ""} />
          </div>
        </div>
      )}

      <p className="text-center text-sm text-muted">
        Already paid? Unlocks usually happen the same day. Questions? Ask on WhatsApp or{" "}
        <Link href="/home" className="text-lilac underline">
          keep studying the free chapter
        </Link>
        .
      </p>
    </div>
  );
}
