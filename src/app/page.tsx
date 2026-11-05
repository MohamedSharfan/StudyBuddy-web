import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Check, ChevronLeft, MessageCircle } from "lucide-react";
import { FreeOffer } from "@/components/FreeOffer";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { FREE_OFFER, MEDIUMS, teacherWhatsAppLink } from "@/lib/config";
import { OL_UPCOMING } from "@/lib/levels";
import { getMedium, studyHref } from "@/lib/prefs";
import { canonicalUrl } from "@/lib/seo";

const SHARE_TEXT = `Free Sri Lankan O/L Islam past papers, notes, flashcards and quizzes for Grade 10 and 11 in Tamil and English medium. ${FREE_OFFER}`;

// Also used for link previews when the site is shared on WhatsApp / Facebook.
export const metadata = {
  title: { absolute: "O/L Islam Past Papers, Notes & Quizzes in Sri Lanka | StudyBuddy" },
  description: SHARE_TEXT,
  alternates: { canonical: canonicalUrl("/") },
  openGraph: { type: "website", siteName: "StudyBuddy", title: "O/L Islam Past Papers, Notes & Quizzes | StudyBuddy", description: SHARE_TEXT, url: canonicalUrl("/"), locale: "en_LK", images: ["/logo.jpg"] },
  twitter: { card: "summary_large_image", title: "O/L Islam Past Papers, Notes & Quizzes | StudyBuddy", description: SHARE_TEXT, images: ["/logo.jpg"] },
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
        <a href={teacherWhatsAppLink()} target="_blank" rel="noreferrer" className="btn btn-tutor btn-sm">
          <MessageCircle size={16} /> Ask a tutor
        </a>
      </header>

      <main className="flex-1 px-4 pb-10 max-w-[640px] w-full mx-auto">
        <div className="mt-4 sm:mt-10">
          <FreeOffer />
          <h1 className="display text-[1.9rem] sm:text-4xl font-bold leading-tight mt-5">
            {pickMedium ? "Choose your medium for O/L Islam past papers" : "Free O/L Islam past papers, notes and quizzes"}
          </h1>
          <p className="text-muted mt-2">
            {pickMedium
              ? "Choose Tamil or English medium for Grade 10 and 11 notes, flashcards, quizzes and Sri Lankan past papers."
              : "Study Sri Lankan Grade 10 and 11 Islam with chapter-wise notes, flashcards, quizzes and past-paper questions from 2016–2025."}
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
                {medium?.code === m.code && <Check size={20} className="text-gold" />}
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
            <div className="rounded-xl border border-gold p-3">
              <Icon name="book-open" size={18} className="text-gold" />
              <p className="font-semibold text-sm mt-1.5">Islam</p>
              <p className="text-xs text-gold">Available</p>
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

        <section className="mt-10 glass p-5 sm:p-6">
          <h2 className="display text-xl font-bold">Browse O/L Islam past papers by grade and medium</h2>
          <p className="text-sm text-muted mt-2" lang="ta">
            தரம் 10 மற்றும் 11 இஸ்லாம் கடந்தகால வினாத்தாள்கள், குறிப்புகள், வினாடி வினாக்கள் — தமிழ் மற்றும் ஆங்கில மொழிமூலங்களில்.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[10, 11].flatMap((grade) => [
              { id: "islam-ol", medium: "Tamil" },
              { id: "islam-ol-en", medium: "English" },
            ].map((item) => (
              <Link key={`${grade}-${item.id}`} href={`/subjects/${item.id}?grade=${grade}`} className="chip justify-center hover:!text-white">
                Grade {grade} · {item.medium} medium
              </Link>
            )))}
          </div>
        </section>
      </main>
    </div>
  );
}
