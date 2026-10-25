import { PandaChat } from "@/components/PandaChat";
import { requireViewer } from "@/lib/session";

export const metadata = { title: "AI Panda" };

export default async function PandaPage() {
  const viewer = await requireViewer("/panda");
  return (
    <div className="max-w-[860px] mx-auto">
      <PandaChat firstName={viewer.profile!.display_name.split(" ")[0]} smart={Boolean(process.env.ANTHROPIC_API_KEY)} />
    </div>
  );
}
