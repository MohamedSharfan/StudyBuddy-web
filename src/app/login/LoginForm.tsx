"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase/client";

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<"google" | "email" | null>(null);
  const [msg, setMsg] = useState<{ type: "error" | "info"; text: string } | null>(null);

  const redirectTo = () => `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

  const google = async () => {
    const supabase = getBrowserClient();
    if (!supabase) return;
    setBusy("google");
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: redirectTo() } });
    if (error) {
      setMsg({ type: "error", text: error.message });
      setBusy(null);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getBrowserClient();
    if (!supabase) return;
    setBusy("email");
    setMsg(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg({ type: "error", text: error.message });
      else {
        router.replace(next);
        router.refresh();
      }
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo() } });
      if (error) setMsg({ type: "error", text: error.message });
      else if (data.session) {
        router.replace(`/onboarding?next=${encodeURIComponent(next)}`);
        router.refresh();
      } else setMsg({ type: "info", text: "Check your email to confirm your account, then come back and sign in." });
    }
    setBusy(null);
  };

  return (
    <div>
      <button onClick={google} disabled={busy !== null} className="btn btn-ghost w-full !bg-white !text-[#1f1f1f] !border-0">
        {busy === "google" ? <Loader2 size={18} className="animate-spin" /> : <GoogleMark />} Continue with Google
      </button>
      <div className="flex items-center gap-3 my-5 text-xs text-faint">
        <span className="h-px flex-1 bg-line" /> or use email <span className="h-px flex-1 bg-line" />
      </div>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input id="email" type="email" required autoComplete="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {msg && (
          <p className={`text-sm rounded-xl px-3 py-2 ${msg.type === "error" ? "bg-red-500/15 border border-red-400/30" : "bg-green/10 border border-green/30"}`}>
            {msg.text}
          </p>
        )}
        <button className="btn w-full" disabled={busy !== null}>
          {busy === "email" ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
          {mode === "signin" ? "Sign in with email" : "Create account"}
        </button>
      </form>
      <p className="text-sm text-muted text-center mt-5">
        {mode === "signin" ? "No account yet? " : "Already have an account? "}
        <button type="button" className="text-lilac font-bold hover:underline" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
          {mode === "signin" ? "Create one" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
