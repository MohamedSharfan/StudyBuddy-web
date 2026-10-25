import { AppShell } from "@/components/shell/AppShell";
import { getViewer } from "@/lib/session";
import { getSettings } from "@/lib/settings";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const [viewer, settings] = await Promise.all([getViewer(), getSettings()]);
  return (
    <AppShell viewer={viewer} settings={settings}>
      {children}
    </AppShell>
  );
}
