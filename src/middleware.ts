import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { LOGIN_ENABLED } from "@/lib/config";

// Student pages that need an account. While sign-in is off they lead back to the start screen.
const ACCOUNT_PAGES = /^\/(home|leaderboard|profile|rewards|unlock|panda|onboarding|u)(\/|$)/;

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!LOGIN_ENABLED && ACCOUNT_PAGES.test(request.nextUrl.pathname)) return NextResponse.redirect(new URL("/", request.url));

  let response = NextResponse.next({ request });
  if (!url || !key) return response;
  // Visitors without a Supabase session cookie have nothing to refresh.
  if (!request.cookies.getAll().some((c) => c.name.startsWith("sb-"))) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Refreshes an expired token, then verifies it locally against the cached JWKS (no Auth round trip).
  await supabase.auth.getClaims();
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.jpg|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?)$).*)"],
};
