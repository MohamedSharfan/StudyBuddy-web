import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getViewer } from "@/lib/session";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next = "/home", error } = await searchParams;
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/home";
  const viewer = await getViewer();
  if (viewer) redirect(safeNext);

  return (
    <div className="min-h-dvh grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-10 border-r border-line bg-bg-2">
        <Logo />
        <div>
          <h1 className="display text-4xl font-bold leading-tight">Study smarter for your O/L and A/L exams.</h1>
          <ul className="text-muted mt-6 space-y-2.5">
            <li>Notes, flashcards and quizzes for every chapter</li>
            <li>10 years of past-paper questions, sorted by chapter</li>
            <li>Coins, streaks and ranks to keep you going</li>
          </ul>
        </div>
        <p className="text-sm text-muted">Play · Learn · Level up</p>
      </div>
      <div className="flex items-center justify-center p-5">
        <div className="w-full max-w-[420px]">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo />
          </div>
          <div className="glass p-6 sm:p-8">
            <h2 className="display text-2xl font-bold">Sign in</h2>
            <p className="text-sm text-muted mt-1 mb-6">New here? Signing in creates your free account.</p>
            {error && <p className="mb-4 rounded-xl bg-red-500/15 border border-red-400/30 px-3 py-2 text-sm">Sign-in failed: {error}</p>}
            {isSupabaseConfigured ? (
              <LoginForm next={safeNext} />
            ) : (
              <p className="text-sm rounded-xl bg-gold/10 border border-gold/30 p-3">
                Supabase isn&apos;t configured yet. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
                <code>.env.local</code>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
