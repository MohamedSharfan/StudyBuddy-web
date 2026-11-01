import { AppShell } from "@/components/shell/AppShell";
import { getMedium, studyHref } from "@/lib/prefs";
import { getViewer } from "@/lib/session";
import { getSettings } from "@/lib/settings";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const [viewer, settings, medium, href] = await Promise.all([getViewer(), getSettings(), getMedium(), studyHref()]);
  return (
    <AppShell viewer={viewer} settings={settings} studyHref={href} mediumName={medium?.name ?? null}>
      {children}
    </AppShell>
  );
}
