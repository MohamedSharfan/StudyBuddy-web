"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, X } from "lucide-react";

const PRESETS = [
  { label: "Focus", minutes: 25 },
  { label: "Short", minutes: 15 },
  { label: "Break", minutes: 5 },
];
const KEY = "sb-lantern";

function chime() {
  try {
    const ctx = new AudioContext();
    [523.25, 659.25, 783.99].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = f;
      o.type = "sine";
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.18);
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + i * 0.18 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.18 + 0.9);
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.18);
      o.stop(ctx.currentTime + i * 0.18 + 1);
    });
  } catch {}
}

/** Floating fanoos-lantern pomodoro timer. The lantern glows brighter as the session runs. */
export function FocusLantern() {
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(25 * 60);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [left, setLeft] = useState(25 * 60);
  const [done, setDone] = useState(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved?.endAt && saved.endAt > Date.now()) {
        setDuration(saved.duration);
        setEndAt(saved.endAt);
      } else if (saved?.left) {
        setDuration(saved.duration);
        setLeft(saved.left);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (tick.current) clearInterval(tick.current);
    if (!endAt) return;
    const run = () => {
      const remaining = Math.max(0, Math.round((endAt - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining === 0) {
        setEndAt(null);
        setDone(true);
        setOpen(true);
        chime();
        try {
          localStorage.removeItem(KEY);
        } catch {}
      }
    };
    run();
    tick.current = setInterval(run, 1000);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [endAt]);

  const persist = (v: object | null) => {
    try {
      if (v) localStorage.setItem(KEY, JSON.stringify(v));
      else localStorage.removeItem(KEY);
    } catch {}
  };

  const start = () => {
    const e = Date.now() + left * 1000;
    setDone(false);
    setEndAt(e);
    persist({ endAt: e, duration });
  };
  const pause = () => {
    setEndAt(null);
    persist({ left, duration });
  };
  const reset = (mins = duration / 60) => {
    setEndAt(null);
    setDone(false);
    setDuration(mins * 60);
    setLeft(mins * 60);
    persist(null);
  };

  const running = endAt !== null;
  const progress = 1 - left / duration;
  const glow = running ? 0.35 + progress * 0.65 : done ? 1 : 0.18;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="fixed right-4 bottom-24 lg:bottom-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="glass w-[270px] p-4 pop shadow-[0_20px_60px_-20px_rgba(251,191,36,.45)]">
          <div className="flex items-center justify-between">
            <p className="eyebrow !text-gold">Focus lantern</p>
            <button onClick={() => setOpen(false)} className="text-muted hover:text-white" aria-label="Close timer">
              <X size={18} />
            </button>
          </div>
          <p className="display text-5xl font-bold text-center my-3 tabular-nums" aria-live="polite">
            {mm}:{ss}
          </p>
          {done && <p className="text-center text-sm text-gold font-bold mb-2">Session complete — take a breath 🌙</p>}
          <div className="flex gap-1.5 justify-center mb-3">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => reset(p.minutes)}
                className={`chip ${duration === p.minutes * 60 ? "chip-active" : ""}`}
              >
                {p.label} {p.minutes}m
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {running ? (
              <button className="btn btn-sm flex-1" onClick={pause}>
                <Pause size={16} /> Pause
              </button>
            ) : (
              <button className="btn btn-gold btn-sm flex-1" onClick={start} disabled={left === 0}>
                <Play size={16} /> {left < duration ? "Resume" : "Start"}
              </button>
            )}
            <button className="btn btn-ghost btn-sm" onClick={() => reset()} aria-label="Reset">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={running ? `Focus timer running, ${mm}:${ss} left` : "Open focus timer"}
        className="relative w-14 h-14 rounded-full glass grid place-items-center hover:scale-105 transition-transform"
        style={{ boxShadow: `0 0 ${18 + glow * 40}px ${glow * 8}px rgba(251,191,36,${glow * 0.45})` }}
      >
        <svg width="30" height="36" viewBox="0 0 30 36" aria-hidden>
          <path d="M15 1v4" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 7h12l-2 3H11z" fill="#a855f7" />
          <path d="M8 10h14q4 8 0 18H8q-4-10 0-18z" fill={`rgba(251,191,36,${0.25 + glow * 0.7})`} stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M15 10v18M10.5 11q-2 8 0 16M19.5 11q2 8 0 16" stroke="#7c2d12" strokeOpacity=".35" strokeWidth="1" fill="none" />
          <path d="M10 28h10l1 4H9z" fill="#a855f7" />
        </svg>
        {running && (
          <span className="absolute -top-1 -right-1 text-[10px] font-extrabold bg-gold text-bg rounded-full px-1.5 py-0.5 tabular-nums">{mm}</span>
        )}
      </button>
    </div>
  );
}
