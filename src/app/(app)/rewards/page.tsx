import { Icon } from "@/components/ui/Icon";
import { Panda } from "@/components/ui/Panda";
import { REWARD_SHOP, REWARDS } from "@/lib/gamification";
import { requireViewer } from "@/lib/session";

export const metadata = { title: "Reward shop" };

export default async function Rewards() {
  const viewer = await requireViewer("/rewards");
  const coins = viewer.profile!.coins;
  return (
    <div className="max-w-[900px] mx-auto space-y-6">
      <div className="glass p-6 sm:p-8 flex flex-wrap items-center gap-6">
        <Panda size={72} mood="wink" />
        <div className="flex-1">
          <p className="eyebrow">Reward shop</p>
          <p className="text-4xl font-bold flex items-center gap-3 mt-1">
            <span className="coin" /> {coins.toLocaleString()}
          </p>
          <p className="text-muted text-sm mt-1">Spend coins on profile looks.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {REWARD_SHOP.map((r) => {
          const can = coins >= r.cost;
          return (
            <div key={r.title} className="glass p-5 flex items-center gap-4">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-card-2">
                <Icon name={r.icon} size={24} />
              </span>
              <div className="flex-1">
                <p className="font-extrabold">{r.title}</p>
                <p className="text-sm text-muted">{r.description}</p>
                <div className="bar mt-2">
                  <span style={{ width: `${Math.min(100, (coins / r.cost) * 100)}%` }} />
                </div>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-gold flex items-center gap-1 justify-end">
                  <span className="coin" /> {r.cost}
                </p>
                <p className="text-[11px] text-muted mt-1">{can ? "Opening soon" : `${r.cost - coins} to go`}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass p-6">
        <p className="font-extrabold">How to earn coins</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center">
          {[
            ["📖", "Read notes", REWARDS.lesson],
            ["🃏", "Clear flashcards", REWARDS.flashcards],
            ["🧠", "Pass a quiz (80%)", REWARDS.quiz],
            ["📜", "Pass past papers (80%)", REWARDS.pastpaper],
          ].map(([e, l, n]) => (
            <div key={l} className="rounded-2xl border border-line p-4">
              <p className="text-2xl">{e}</p>
              <p className="text-sm font-bold mt-1">{l}</p>
              <p className="text-gold font-extrabold mt-1">+{n}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted mt-4">Each chapter activity pays once. Study every day to grow your 🔥 streak.</p>
      </div>
    </div>
  );
}
