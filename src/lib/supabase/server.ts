import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./env";

export async function createClient() {
  // Reading cookies first also opts every caller into dynamic rendering.
  const cookieStore = await cookies();
  if (!isSupabaseConfigured) return null;
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component — middleware refreshes the session instead.
        }
      },
    },
  });
}

type Client = NonNullable<Awaited<ReturnType<typeof createClient>>>;

/**
 * Signed-in user id + email from the verified JWT. Verification happens locally against the
 * project's cached JWKS, so this is much faster than `auth.getUser()` (an Auth server round trip).
 */
export async function getAuthUser(supabase: Client): Promise<{ id: string; email: string | null } | null> {
  const { data } = await supabase.auth.getClaims();
  const sub = data?.claims?.sub;
  if (!sub) return null;
  return { id: sub, email: (data.claims.email as string | undefined) ?? null };
}
