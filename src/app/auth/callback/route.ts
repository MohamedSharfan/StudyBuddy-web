import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/home";
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/home";

  const supabase = await createClient();
  if (code && supabase) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: profile } = user ? await supabase.from("profiles").select("onboarded").eq("id", user.id).maybeSingle() : { data: null };
      const dest = profile && !profile.onboarded ? `/onboarding?next=${encodeURIComponent(next)}` : next;
      return NextResponse.redirect(`${origin}${dest}`);
    }
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
  }
  return NextResponse.redirect(`${origin}/login?error=missing_code`);
}
