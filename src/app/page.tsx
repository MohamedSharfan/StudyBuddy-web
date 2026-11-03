import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Check, ChevronLeft, MessageCircle } from "lucide-react";
import { FreeOffer } from "@/components/FreeOffer";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { FREE_OFFER, MEDIUMS, teacherWhatsAppLink } from "@/lib/config";
import { OL_UPCOMING } from "@/lib/levels";
import { getMedium, studyHref } from "@/lib/prefs";

const SHARE_TEXT = `${FREE_OFFER} O/L Islam in Tamil and English medium: notes, flashcards, quizzes and past papers.`;

// Also used for link previews when the site is shared on WhatsApp / Facebook.
export const metadata = {
  title: { absolute: "StudyBuddy — O/L Islam, free" },
  description: SHARE_TEXT,
  openGraph: { title: "StudyBuddy — O/L Islam", description: SHARE_TEXT, images: ["/logo.jpg"] },
};

/**
 * Start screen. Step 1: O/L. Step 2: Tamil or English medium.
 * Returning students who already picked a medium go straight to their subject.
 */
export default async function Start({ searchParams }: { searchParams: Promise<{ step?: string; change?: string }> }) {
  const { step, change } = await searchParams;
  const medium = await getMedium();
  if (medium && !change && !step) redirect(await studyHref());

  const pickMedium = step === "medium";

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="flex items-center justify-between gap-3 px-4 h-16 max-w-[640px] w-full mx-auto">
        <Logo href="/?change=1" size={36} />
        <a href={teacherWhatsAppLink()} target="_blank" rel="noreferrer" className="btn btn-green btn-sm">
          <MessageCircle size={16} /> Ask a tutor
        </a>
      </header>

      <main className="flex-1 px-4 pb-10 max-w-[640px] w-full mx-auto">
        <div className="mt-4 sm:mt-10">
          <FreeOffer />
          <h1 className="display text-[1.9rem] sm:text-4xl font-bold leading-tight mt-5">
            {pickMedium ? "Which medium do you study in?" : "What are you studying for?"}
          </h1>
          <p className="text-muted mt-2">
            {pickMedium ? "We'll show your notes, quizzes and past papers in this medium." : "Notes, flashcards, quizzes and past papers, chapter by chapter."}
          </p>
        </div>

        {pickMedium ? (
          <div className="mt-7 space-y-3">
            {MEDIUMS.map((m) => (
              // A plain link (not <Link>): /choose sets a cookie and redirects, which needs a full page request.
              <a key={m.code} href={`/choose?medium=${m.code}`} className="glass glass-hover flex items-center gap-4 p-5 min-h-[76px]">
                <span className="flex-1">
                  <span className="block text-lg font-bold">{m.name} medium</span>
                  <span className="block text-sm text-muted" lang={m.code}>
                    {m.label}
                  </span>
                </span>
                {medium?.code === m.code && <Check size={20} className="text-green" />}
                <ArrowRight size={20} className="text-muted" />
              </a>
            ))}
            <Link href="/?change=1" className="inline-flex items-center gap-1 text-sm text-muted hover:text-white pt-2">
              <ChevronLeft size={16} /> Back
            </Link>
          </div>
        ) : (
          <div className="mt-7 space-y-3">
            <Link href="/?step=medium" className="glass glass-hover flex items-center gap-4 p-5 min-h-[76px]">
              <span className="flex-1">
                <span className="block text-lg font-bold">O/L</span>
                <span className="block text-sm text-muted">Grade 10 &amp; 11</span>
              </span>
              <ArrowRight size={20} className="text-muted" />
            </Link>
          </div>
        )}

        <section className="mt-10">
          <h2 className="text-sm font-semibold text-muted">O/L subjects</h2>
          <div className="grid grid-cols-3 gap-2.5 mt-3">
            <div className="rounded-xl border border-green/40 p-3">
              <Icon name="book-open" size={18} className="text-green" />
              <p className="font-semibold text-sm mt-1.5">Islam</p>
              <p className="text-xs text-green">Available</p>
            </div>
            {OL_UPCOMING.map((s) => (
              <div key={s.name} className="rounded-xl border border-line p-3">
                <Icon name={s.icon} size={18} className="text-muted" />
                <p className="font-semibold text-sm mt-1.5">{s.name}</p>
                <p className="text-xs text-muted">Coming soon</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
