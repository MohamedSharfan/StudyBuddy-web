"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronLeft, ChevronRight, Eye, GalleryHorizontalEnd, RotateCcw, Shuffle, Sparkles, Undo2, X } from "lucide-react";
import type { TextbookPicture } from "@/lib/pictures";

export type StudyPicture = TextbookPicture & { chapterLabel?: string };

function t(en: boolean) {
  return {
    learn: en ? "Learn" : "கற்க",
    test: en ? "Test yourself" : "சுய பரீட்சை",
    question: en ? "What does this picture show?" : "இந்தப் படம் காட்டுவது என்ன?",
    think: en ? "Say the answer in your head, then check." : "விடையை மனதில் சொல்லிவிட்டுச் சரிபாருங்கள்.",
    show: en ? "Show answer" : "விடையைக் காட்டு",
    remember: en ? "Facts to remember" : "நினைவில் கொள்ள வேண்டியவை",
    section: en ? "Section" : "பகுதி",
    again: en ? "Again" : "மீண்டும்",
    got: en ? "Got it" : "தெரியும்",
    known: en ? "known" : "தெரிந்தவை",
    left: (n: number) => (en ? `${n} left` : `இன்னும் ${n}`),
    round: (n: number) => (en ? `Round ${n}` : `சுற்று ${n}`),
    done: en ? "All pictures done!" : "எல்லாப் படங்களும் முடிந்தன!",
    doneSub: (n: number, r: number) =>
      en ? `You named all ${n} pictures in ${r} round${r > 1 ? "s" : ""}.` : `${n} படங்களையும் ${r} சுற்றில் அடையாளம் கண்டீர்கள்.`,
    goAgain: en ? "Go again" : "மீண்டும் செய்க",
    undo: en ? "Undo last" : "கடைசியை மாற்று",
    close: en ? "Close" : "மூடு",
    prev: en ? "Previous picture" : "முந்தைய படம்",
    next: en ? "Next picture" : "அடுத்த படம்",
    shuffle: en ? "Shuffle and restart" : "கலக்கி மீண்டும் தொடங்கு",
  };
}

/** fill: cover the (positioned) parent box, keeping the whole picture visible. */
function PictureImage({ p, className = "", eager = false, fill = false }: { p: StudyPicture; className?: string; eager?: boolean; fill?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={p.src}
      width={p.w}
      height={p.h}
      alt={p.title}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`${fill ? "absolute inset-0 w-full h-full object-contain" : "block w-auto max-w-full h-auto"} ${className}`}
    />
  );
}

function Facts({ p, en, limit }: { p: StudyPicture; en: boolean; limit?: number }) {
  const s = t(en);
  const notes = limit ? p.notes.slice(0, limit) : p.notes;
  return (
    <>
      {p.section && (
        <p className="text-xs text-muted mt-1">
          {s.section}: {p.section}
        </p>
      )}
      {notes.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold text-gold uppercase tracking-wide">{s.remember}</p>
          <ul className="mt-2 space-y-1.5 text-[0.95rem] leading-relaxed">
            {notes.map((n, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="text-neon flex-none">•</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

/** Full-screen view of one picture with its notes; ← → to move, Esc to close. */
function Viewer({ pictures, index, onMove, onClose, en }: { pictures: StudyPicture[]; index: number; onMove: (i: number) => void; onClose: () => void; en: boolean }) {
  const s = t(en);
  const p = pictures[index];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && index < pictures.length - 1) onMove(index + 1);
      else if (e.key === "ArrowLeft" && index > 0) onMove(index - 1);
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [index, pictures.length, onMove, onClose]);

  // portal: the page wrapper animates with a transform, which would trap a fixed overlay inside it
  return createPortal(
    <div className="fixed inset-0 z-[70] bg-bg/95 backdrop-blur-sm overflow-y-auto" role="dialog" aria-modal="true" aria-label={p.title} onClick={onClose}>
      <div className="max-w-[860px] mx-auto px-4 py-4 sm:py-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-sm text-muted font-semibold">
            {index + 1} / {pictures.length}
            {p.chapterLabel && ` · ${p.chapterLabel}`}
          </span>
          <div className="flex gap-1.5">
            <button type="button" onClick={() => onMove(index - 1)} disabled={index === 0} className="btn btn-ghost btn-sm disabled:opacity-40" aria-label={s.prev}>
              <ChevronLeft size={17} />
            </button>
            <button type="button" onClick={() => onMove(index + 1)} disabled={index === pictures.length - 1} className="btn btn-ghost btn-sm disabled:opacity-40" aria-label={s.next}>
              <ChevronRight size={17} />
            </button>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm" aria-label={s.close}>
              <X size={17} />
            </button>
          </div>
        </div>
        <div className="rounded-2xl bg-card-2 border border-line p-2 sm:p-3">
          <PictureImage p={p} eager className="mx-auto max-h-[58vh] rounded-xl" />
        </div>
        <div className="glass p-5 mt-3">
          {p.fig && <p className="eyebrow">{p.fig}</p>}
          <h2 className="font-bold text-lg leading-snug mt-0.5">{p.title}</h2>
          <Facts p={p} en={en} />
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Gallery({ pictures, en }: { pictures: StudyPicture[]; en: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  // keep the chapter headings when the gallery spans several chapters
  const groups = useMemo(() => {
    const out: { label?: string; items: { p: StudyPicture; i: number }[] }[] = [];
    pictures.forEach((p, i) => {
      const last = out[out.length - 1];
      if (last && last.label === p.chapterLabel) last.items.push({ p, i });
      else out.push({ label: p.chapterLabel, items: [{ p, i }] });
    });
    return out;
  }, [pictures]);

  return (
    <>
      <div className="space-y-6">
        {groups.map((g, k) => (
          <section key={k}>
            {g.label && <h3 className="font-bold mb-2.5">{g.label}</h3>}
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {g.items.map(({ p, i }) => (
                <li key={p.id} className="min-w-0">
                  <button type="button" onClick={() => setOpen(i)} className="glass glass-hover w-full h-full text-left overflow-hidden flex flex-col">
                    <span className="relative block aspect-[4/3] bg-card-2">
                      <PictureImage p={p} fill className="p-1.5 rounded-xl" />
                    </span>
                    <span className="p-2.5 flex-1">
                      {p.fig && <span className="block text-[11px] font-bold text-gold">{p.fig}</span>}
                      <span className="block text-[13px] font-semibold leading-snug line-clamp-3">{p.title}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {open !== null && <Viewer pictures={pictures} index={open} onMove={setOpen} onClose={close} en={en} />}
    </>
  );
}

function Test({ pictures, en }: { pictures: StudyPicture[]; en: boolean }) {
  const s = t(en);
  const initial = useMemo(() => pictures.map((_, i) => i), [pictures]);
  const [queue, setQueue] = useState<number[]>(initial);
  const [known, setKnown] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [rounds, setRounds] = useState(1);
  const current = queue[0];
  const finished = queue.length === 0;
  const p = current === undefined ? null : pictures[current];

  const answer = useCallback(
    (gotIt: boolean) => {
      if (current === undefined) return;
      setQueue((q) => (gotIt ? q.slice(1) : [...q.slice(1), q[0]]));
      if (gotIt) setKnown((k) => [...k, current]);
      else if (queue.length === 1) setRounds((r) => r + 1);
      setRevealed(false);
    },
    [current, queue.length],
  );

  const restart = (shuffle: boolean) => {
    const order = [...initial];
    if (shuffle)
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
    setQueue(order);
    setKnown([]);
    setRevealed(false);
    setRounds(1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest("input,textarea")) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && e.key === "ArrowRight") answer(true);
      else if (revealed && e.key === "ArrowLeft") answer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answer, revealed]);

  // preload the next picture so it appears at once
  const nextSrc = queue[1] !== undefined ? pictures[queue[1]].src : null;
  useEffect(() => {
    if (nextSrc) new window.Image().src = nextSrc;
  }, [nextSrc]);

  const pct = Math.round((known.length / Math.max(1, pictures.length)) * 100);

  if (finished)
    return (
      <div className="glass p-10 text-center pop">
        <Sparkles size={48} className="mx-auto text-gold" />
        <h2 className="display text-3xl font-bold mt-3">{s.done}</h2>
        <p className="text-muted mt-2">{s.doneSub(pictures.length, rounds)}</p>
        <button type="button" onClick={() => restart(true)} className="btn btn-gold mt-6">
          <RotateCcw size={16} /> {s.goAgain}
        </button>
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold text-muted mb-1.5">
            <span>
              {known.length}/{pictures.length} {s.known}
            </span>
            <span>{s.round(rounds)}</span>
          </div>
          <div className="bar">
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
        <button type="button" onClick={() => restart(true)} className="btn btn-ghost btn-sm" aria-label={s.shuffle}>
          <Shuffle size={15} />
        </button>
      </div>

      {p && (
        <div className="glass p-3 sm:p-5" key={p.id}>
          <p className="eyebrow px-1">
            {s.left(queue.length)}
            {p.chapterLabel && ` · ${p.chapterLabel}`}
          </p>
          <div className="mt-2 rounded-2xl bg-card-2 border border-line p-2 grid place-items-center min-h-[220px]">
            <PictureImage p={p} eager className="max-h-[48vh] rounded-xl" />
          </div>
          {revealed ? (
            <div className="mt-4 px-1 pop">
              {p.fig && <p className="text-xs font-bold text-gold">{p.fig}</p>}
              <p className="font-bold text-lg leading-snug">{p.title}</p>
              <Facts p={p} en={en} limit={4} />
            </div>
          ) : (
            <div className="mt-4 px-1 text-center">
              <p className="font-bold text-lg">{s.question}</p>
              <p className="text-sm text-muted mt-1">{s.think}</p>
            </div>
          )}
        </div>
      )}

      {revealed ? (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button type="button" onClick={() => answer(false)} className="btn btn-ghost !min-h-[56px] !border-lilac hover:!bg-card-2">
            <X size={18} className="text-lilac" /> {s.again} <kbd className="hidden sm:inline text-[10px] text-faint">←</kbd>
          </button>
          <button type="button" onClick={() => answer(true)} className="btn btn-gold !min-h-[56px]">
            <Check size={18} /> {s.got} <kbd className="hidden sm:inline text-[10px] opacity-70">→</kbd>
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => setRevealed(true)} className="btn w-full !min-h-[56px] mt-4">
          <Eye size={18} /> {s.show}
        </button>
      )}
      {known.length > 0 && (
        <button
          type="button"
          onClick={() => {
            const last = known[known.length - 1];
            setKnown((k) => k.slice(0, -1));
            setQueue((q) => [last, ...q]);
            setRevealed(false);
          }}
          className="mx-auto mt-4 flex items-center gap-1.5 text-xs text-muted hover:text-white"
        >
          <Undo2 size={13} /> {s.undo}
        </button>
      )}
    </div>
  );
}

/** Textbook pictures: a gallery to learn them (tap for the notes) and a "name the picture" test. */
export function PictureStudy({ pictures, lang, startWith = "learn" }: { pictures: StudyPicture[]; lang: string; startWith?: "learn" | "test" }) {
  const en = lang === "en";
  const s = t(en);
  const [mode, setMode] = useState<"learn" | "test">(startWith);
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-5 max-w-[420px]" role="tablist">
        {(["learn", "test"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm border ${mode === m ? "bg-electric border-electric text-white" : "border-line text-muted hover:text-white"}`}
          >
            {m === "learn" ? <GalleryHorizontalEnd size={16} /> : <Eye size={16} />}
            {m === "learn" ? s.learn : s.test}
          </button>
        ))}
      </div>
      {mode === "learn" ? <Gallery pictures={pictures} en={en} /> : <Test pictures={pictures} en={en} />}
    </div>
  );
}
