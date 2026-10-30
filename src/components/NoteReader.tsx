"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, Eye, EyeOff, ListTree, Loader2, Minus, Plus } from "lucide-react";
import { RewardModal, useAward } from "@/components/Reward";

type Heading = { depth: number; text: string; id: string };

export function NoteReader({
  itemId,
  headings,
  done,
  nextHref,
  children,
}: {
  itemId: string;
  headings: Heading[];
  done: boolean;
  nextHref: string;
  children: React.ReactNode;
}) {
  const [size, setSize] = useState(1.06);
  const [focus, setFocus] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { result, pending, claim, clear } = useAward("lesson", itemId);
  const [claimed, setClaimed] = useState(done);

  useEffect(() => {
    try {
      const s = Number(localStorage.getItem("sb-font"));
      if (s >= 0.9 && s <= 1.5) setSize(s);
    } catch {}
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight * 0.6;
      setProgress(Math.max(0, Math.min(1, -rect.top / Math.max(1, total))));
      let current: string | null = null;
      for (const h of headings) {
        const node = document.getElementById(h.id);
        if (node && node.getBoundingClientRect().top < 140) current = h.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  useEffect(() => {
    document.documentElement.classList.toggle("focus-mode", focus);
    return () => document.documentElement.classList.remove("focus-mode");
  }, [focus]);

  const changeSize = (d: number) => {
    const s = Math.round(Math.max(0.9, Math.min(1.5, size + d)) * 100) / 100;
    setSize(s);
    try {
      localStorage.setItem("sb-font", String(s));
    } catch {}
  };

  const finish = async () => {
    const r = await claim();
    if (r.ok) setClaimed(true);
  };

  const toc = headings.filter((h) => h.depth === 2);

  return (
    <>
      <div className="fixed top-0 inset-x-0 h-1 z-50 pointer-events-none">
        <div className="h-full bg-gold" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className={`grid gap-8 ${focus ? "" : "xl:grid-cols-[1fr_250px]"}`}>
        <article ref={ref} className={`glass p-5 sm:p-10 ${focus ? "max-w-[780px] mx-auto w-full" : ""}`}>
          <div className="flex items-center justify-end gap-2 -mt-1 mb-2 sticky top-[72px] z-10">
            <div className="glass !rounded-full flex items-center p-1 shadow-lg">
              <button onClick={() => changeSize(-0.06)} className="w-8 h-8 grid place-items-center rounded-full hover:bg-white/10" aria-label="Smaller text">
                <Minus size={15} />
              </button>
              <span className="text-xs font-bold w-9 text-center">{Math.round(size * 100 / 1.06)}%</span>
              <button onClick={() => changeSize(0.06)} className="w-8 h-8 grid place-items-center rounded-full hover:bg-white/10" aria-label="Larger text">
                <Plus size={15} />
              </button>
              <span className="w-px h-5 bg-line mx-1" />
              <button
                onClick={() => setFocus((f) => !f)}
                className={`h-8 px-3 rounded-full flex items-center gap-1.5 text-xs font-bold ${focus ? "bg-gold text-bg" : "hover:bg-white/10"}`}
                aria-pressed={focus}
              >
                {focus ? <EyeOff size={14} /> : <Eye size={14} />} Focus
              </button>
              <button onClick={() => setTocOpen((o) => !o)} className="xl:hidden w-8 h-8 grid place-items-center rounded-full hover:bg-white/10" aria-label="Contents">
                <ListTree size={15} />
              </button>
            </div>
          </div>
          {tocOpen && (
            <nav className="xl:hidden glass !rounded-2xl p-3 mb-4 text-sm">
              {toc.map((h) => (
                <a key={h.id} href={`#${h.id}`} onClick={() => setTocOpen(false)} className="block py-1.5 px-2 rounded-lg hover:bg-white/5 text-muted">
                  {h.text}
                </a>
              ))}
            </nav>
          )}

          <div style={{ fontSize: `${size}rem` }} className="[&_.prose-sb]:!text-[1em]">
            {children}
          </div>

          <div className="mt-12 rounded-2xl p-6 text-center border border-line bg-card">
            {claimed ? (
              <>
                <p className="display text-2xl font-bold flex items-center justify-center gap-2">
                  <Check className="text-gold" /> Notes done
                </p>
                <p className="text-sm text-muted mt-1">Next door: test your memory with flashcards.</p>
                <Link href={nextHref} className="btn btn-gold mt-4">
                  Go to flashcards →
                </Link>
              </>
            ) : (
              <>
                <p className="display text-2xl font-bold">Finished reading?</p>
                <p className="text-sm text-muted mt-1">Mark it as read to complete step 1 of this chapter.</p>
                <button onClick={finish} disabled={pending} className="btn btn-gold mt-4">
                  {pending ? <Loader2 size={16} className="animate-spin" /> : <span className="coin" />} Mark as read · +1
                </button>
              </>
            )}
          </div>
        </article>

        {!focus && (
          <aside className="hidden xl:block">
            <nav className="sticky top-24 glass p-4 max-h-[calc(100dvh-120px)] overflow-y-auto" aria-label="Contents">
              <p className="eyebrow mb-3">Contents</p>
              {toc.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className={`block text-[13px] leading-snug py-1.5 pl-3 border-l-2 transition-colors ${
                    active === h.id ? "border-gold text-white font-bold" : "border-line text-muted hover:text-white"
                  }`}
                >
                  {h.text}
                </a>
              ))}
              <div className="mt-4">
                <div className="bar">
                  <span style={{ width: `${progress * 100}%` }} />
                </div>
                <p className="text-[11px] text-muted mt-1.5">{Math.round(progress * 100)}% read</p>
              </div>
            </nav>
          </aside>
        )}
      </div>

      <RewardModal kind="lesson" result={result} onClose={clear} nextHref={nextHref} nextLabel="Next door: Flashcards →" />
    </>
  );
}
