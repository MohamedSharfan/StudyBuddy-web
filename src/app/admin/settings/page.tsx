import { AddAdminForm, RemoveAdminButton, SettingsForm } from "@/components/admin/SettingsForms";
import { Avatar } from "@/components/ui/Avatar";
import { getViewer, getDb } from "@/lib/session";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "Settings" };

export default async function AdminSettings() {
  const supabase = await getDb();
  const [settings, viewer, { data: admins }] = await Promise.all([getSettings(), getViewer(), supabase.from("admin_users").select("user_id, created_at")]);
  const ids = (admins ?? []).map((a) => a.user_id);
  const [{ data: people }, { data: emails }] = ids.length
    ? await Promise.all([
        supabase.from("profiles").select("id, display_name, avatar_url").in("id", ids),
        supabase.from("student_private").select("user_id, email").in("user_id", ids),
      ])
    : [{ data: [] }, { data: [] }];
  const emailOf = new Map((emails ?? []).map((e) => [e.user_id, e.email]));

  return (
    <div className="space-y-6 max-w-[860px]">
      <div>
        <p className="eyebrow !text-gold">Admin</p>
        <h1 className="display text-4xl font-bold mt-1">Settings</h1>
      </div>

      <div className="glass p-5 sm:p-6">
        <p className="font-extrabold">Unlock contact & announcement</p>
        <p className="text-sm text-muted mt-1 mb-5">Students see the WhatsApp button on the Unlock page. The announcement shows as a banner across the app.</p>
        <SettingsForm settings={settings} />
      </div>

      <div className="glass p-5 sm:p-6">
        <p className="font-extrabold">Admins</p>
        <ul className="mt-4 divide-y divide-line">
          {(people ?? []).map((p) => (
            <li key={p.id} className="flex items-center gap-3 py-3">
              <Avatar name={p.display_name} url={p.avatar_url} size={36} />
              <span className="flex-1 min-w-0">
                <span className="block font-bold">{p.display_name}</span>
                <span className="block text-xs text-muted truncate">{emailOf.get(p.id)}</span>
              </span>
              {p.id !== viewer?.userId && <RemoveAdminButton userId={p.id} />}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <AddAdminForm />
        </div>
      </div>
    </div>
  );
}
