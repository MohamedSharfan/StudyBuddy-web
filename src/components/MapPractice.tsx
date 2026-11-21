"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Check, Eye, MapPin, Minus, Plus, RotateCcw, Target, X } from "lucide-react";
import { LANKA_INDIA_PATH, LANKA_PATH } from "@/lib/maps/lanka-geometry";
import type { MapPoint, PreparedMap, PreparedPlace } from "@/lib/maps/prepare";

type Lang = "en" | "ta";

const KIND: Record<Lang, Record<string, string>> = {
  en: {
    city: "City / town",
    port: "Port",
    temple: "Temple",
    fort: "Fort",
    battle: "Battle",
    site: "Historic site",
    tank: "Tank",
    dam: "Reservoir / anicut",
    river: "River",
    area: "Area",
    island: "Island",
    country: "Country",
    sea: "Sea",
    mountain: "Mountains",
  },
  ta: {
    city: "நகரம்",
    port: "துறைமுகம்",
    temple: "வழிபாட்டுத் தலம்",
    fort: "கோட்டை",
    battle: "போர்",
    site: "வரலாற்று இடம்",
    tank: "குளம்",
    dam: "நீர்த்தேக்கம் / அணைக்கட்டு",
    river: "ஆறு",
    area: "பிரதேசம்",
    island: "தீவு",
    country: "நாடு",
    sea: "கடல்",
    mountain: "மலைத்தொடர்",
  },
};

const T = {
  en: {
    learn: "Learn",
    practice: "Practice",
    names: "Names on map",
    pick: "Tap a number on the map or a place in the list.",
    find: "Where is it? Tap the map.",
    findRiver: "Tap anywhere on the river.",
    findArea: "Tap anywhere in the area.",
    right: "Correct!",
    wrong: "Not quite",
    away: (km: number) => `${km} km from the right place`,
    onIt: "right on it",
    shown: "The right place is shown in gold.",
    showMe: "Show me",
    next: "Next",
    result: "See my score",
    score: (a: number, b: number) => `You marked ${a} of ${b} places correctly`,
    missed: "Practise the missed ones",
    again: "Start again",
    best: (a: number, b: number) => `Best ${a}/${b}`,
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    of: (a: number, b: number) => `${a} of ${b}`,
    perfect: "Perfect! Every place is right.",
    hint: "Drag to move around when zoomed in.",
  },
  ta: {
    learn: "கற்க",
    practice: "பயிற்சி",
    names: "படத்தில் பெயர்கள்",
    pick: "படத்திலுள்ள எண்ணையோ பட்டியலிலுள்ள இடத்தையோ தொடுங்கள்.",
    find: "இது எங்கே? படத்தில் தொடுங்கள்.",
    findRiver: "ஆற்றின் மீது எங்காவது தொடுங்கள்.",
    findArea: "அப்பிரதேசத்தினுள் எங்காவது தொடுங்கள்.",
    right: "சரி!",
    wrong: "சரியில்லை",
    away: (km: number) => `சரியான இடத்திலிருந்து ${km} கி.மீ.`,
    onIt: "மிகச் சரியான இடம்",
    shown: "சரியான இடம் தங்க நிறத்தில் காட்டப்பட்டுள்ளது.",
    showMe: "காட்டு",
    next: "அடுத்தது",
    result: "புள்ளிகளைப் பார்",
    score: (a: number, b: number) => `${b} இடங்களில் ${a} இடங்களைச் சரியாகக் குறித்தீர்கள்`,
    missed: "தவறியவற்றை மீண்டும் பயிற்சி செய்க",
    again: "மீண்டும் தொடங்கு",
    best: (a: number, b: number) => `சிறந்தது ${a}/${b}`,
    zoomIn: "பெரிதாக்கு",
    zoomOut: "சிறிதாக்கு",
    of: (a: number, b: number) => `${b} இல் ${a}`,
    perfect: "அருமை! எல்லா இடங்களும் சரி.",
    hint: "பெரிதாக்கியபின் இழுத்து நகர்த்தலாம்.",
  },
};

const ZOOMS = [1, 1.6, 2.5, 4];

function distToSegment(p: MapPoint, a: MapPoint, b: MapPoint) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  const t = len2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2)) : 0;
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

/** Distance (map units) from a tap to a place: to the nearest point of a river, otherwise to its location. */
function distance(p: MapPoint, place: PreparedPlace) {
  if (place.line && place.line.length > 1) {
    let d = Infinity;
    for (let i = 1; i < place.line.length; i++) d = Math.min(d, distToSegment(p, place.line[i - 1], place.line[i]));
    return d;
  }
  return Math.hypot(p[0] - place.at[0], p[1] - place.at[1]);
}

const isWide = (kind: string) => ["country", "sea", "area", "island", "mountain"].includes(kind);

function shuffle<T>(items: T[]) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Answer = { id: string; tap: MapPoint | null; km: number; ok: boolean };

export function MapPractice({ map, setId, lang: rawLang }: { map: PreparedMap; setId: string; lang: string }) {
  const lang: Lang = rawLang === "en" ? "en" : "ta";
  const t = T[lang];
  const kinds = KIND[lang];
  const [mode, setMode] = useState<"learn" | "practice">("learn");
  const [selected, setSelected] = useState<string | null>(null);
  const [names, setNames] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [world, setWorld] = useState<{ land: string; borders: string } | null>(null);

  // practice state
  const [queue, setQueue] = useState<string[]>([]);
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [best, setBest] = useState<number | null>(null);

  const byId = useMemo(() => new Map(map.places.map((p, i) => [p.id, { ...p, n: i + 1 }])), [map.places]);
  const bestKey = `sb-map-best:${setId}`;

  useEffect(() => {
    try {
      const v = localStorage.getItem(bestKey);
      if (v) setBest(Number(v));
    } catch {}
  }, [bestKey]);

  useEffect(() => {
    if (map.base !== "world") return;
    let live = true;
    import("@/lib/maps/world-geometry").then((g) => live && setWorld({ land: g.WORLD_LAND_PATH, borders: g.WORLD_BORDER_PATH }));
    return () => {
      live = false;
    };
  }, [map.base]);

  // ── sizing: the map fits the box at zoom 1; zooming makes it larger inside a scrollable box ──
  const boxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBox({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setBox({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);
  const z = ZOOMS[zoom];
  // map units per screen pixel, so markers keep the same on-screen size at every zoom
  const fit = box.w && box.h ? Math.min(box.w / map.width, box.h / map.height) * z : 0.35;
  const px = 1 / fit;

  const changeZoom = useCallback(
    (next: number) => {
      const el = boxRef.current;
      const clamped = Math.max(0, Math.min(ZOOMS.length - 1, next));
      if (!el || clamped === zoom) return setZoom(clamped);
      // keep the middle of the view in the middle
      const cx = (el.scrollLeft + el.clientWidth / 2) / el.scrollWidth;
      const cy = (el.scrollTop + el.clientHeight / 2) / el.scrollHeight;
      setZoom(clamped);
      requestAnimationFrame(() => {
        el.scrollLeft = cx * el.scrollWidth - el.clientWidth / 2;
        el.scrollTop = cy * el.scrollHeight - el.clientHeight / 2;
      });
    },
    [zoom],
  );

  const focus = useCallback((pt: MapPoint) => {
    const el = boxRef.current;
    const svg = svgRef.current;
    if (!el || !svg || el.scrollWidth <= el.clientWidth) return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const p = svg.createSVGPoint();
    p.x = pt[0];
    p.y = pt[1];
    const s = p.matrixTransform(ctm);
    const r = el.getBoundingClientRect();
    el.scrollTo({ left: el.scrollLeft + s.x - r.left - el.clientWidth / 2, top: el.scrollTop + s.y - r.top - el.clientHeight / 2, behavior: "smooth" });
  }, []);

  // ── practice ──
  const start = useCallback(
    (ids: string[]) => {
      setQueue(shuffle(ids));
      setPos(0);
      setAnswers([]);
      setSelected(null);
      setMode("practice");
    },
    [],
  );
  const current = mode === "practice" && pos < queue.length ? byId.get(queue[pos]) : undefined;
  const answered = current ? answers.find((a) => a.id === current.id) : undefined;
  const finished = mode === "practice" && queue.length > 0 && pos >= queue.length;
  const score = answers.filter((a) => a.ok).length;

  useEffect(() => {
    if (!finished || queue.length !== map.places.length) return;
    if (best === null || score > best) {
      setBest(score);
      try {
        localStorage.setItem(bestKey, String(score));
      } catch {}
    }
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  const record = (tap: MapPoint | null) => {
    if (!current || answered) return;
    const d = tap ? distance(tap, current) : Infinity;
    const ok = d <= current.r;
    setAnswers((a) => [...a, { id: current.id, tap, km: tap ? Math.round(d / map.unitsPerKm) : -1, ok }]);
    if (!ok) focus(current.at);
  };

  const onMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return;
    const p = svg.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    const m = p.matrixTransform(ctm.inverse());
    if (mode === "practice") record([m.x, m.y]);
    else setSelected(null);
  };

  const sel = selected ? byId.get(selected) : undefined;
  const r = 9 * px; // marker radius ≈ 9px on screen

  // What to draw on the map
  const visible: { place: PreparedPlace & { n: number }; tone: "plain" | "gold" | "dim" }[] = [];
  if (mode === "learn") {
    for (const p of byId.values()) visible.push({ place: p, tone: p.id === selected ? "gold" : "plain" });
  } else if (finished) {
    for (const a of answers) {
      const p = byId.get(a.id);
      if (p) visible.push({ place: p, tone: a.ok ? "gold" : "dim" });
    }
  } else {
    for (const a of answers) {
      const p = byId.get(a.id);
      if (p && p.id !== current?.id) visible.push({ place: p, tone: "dim" });
    }
    if (current && answered) visible.push({ place: current, tone: "gold" });
  }

  const tapNow = answered?.tap;

  return (
    <div className="space-y-4" lang={lang}>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl border border-line p-1" role="tablist">
          {(["learn", "practice"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => (m === "learn" ? (setMode("learn"), setQueue([])) : start(map.places.map((p) => p.id)))}
              className={`px-4 py-1.5 rounded-lg font-semibold text-sm flex items-center gap-1.5 ${mode === m ? "bg-card-2 text-white" : "text-muted hover:text-white"}`}
            >
              {m === "learn" ? <MapPin size={15} /> : <Target size={15} />} {m === "learn" ? t.learn : t.practice}
            </button>
          ))}
        </div>
        {best !== null && <span className="chip !text-gold !border-gold/40">{t.best(best, map.places.length)}</span>}
        {mode === "learn" && (
          <label className="chip cursor-pointer select-none ml-auto">
            <input type="checkbox" className="accent-[var(--gold)]" checked={names} onChange={(e) => setNames(e.target.checked)} /> {t.names}
          </label>
        )}
      </div>

      {mode === "practice" && !finished && current && (
        <div className={`glass p-4 ${answered ? (answered.ok ? "!border-gold" : "!border-lilac") : ""}`} aria-live="polite">
          <div className="flex items-center justify-between gap-3 text-xs text-muted">
            <span>{t.of(pos + 1, queue.length)}</span>
            <span className="flex gap-1" aria-hidden>
              {queue.map((id, i) => {
                const a = answers.find((x) => x.id === id);
                return <span key={id} className={`h-1.5 w-3 rounded-full ${a ? (a.ok ? "bg-gold" : "bg-lilac") : i === pos ? "bg-white" : "bg-line"}`} />;
              })}
            </span>
          </div>
          <p className="mt-2 text-xl font-bold leading-snug">{current.name}</p>
          <p className="text-sm text-muted">{kinds[current.kind] ?? ""}</p>
          {!answered ? (
            <div className="flex items-center justify-between gap-3 mt-3">
              <p className="text-sm font-semibold text-gold">
                {current.kind === "river" ? t.findRiver : isWide(current.kind) ? t.findArea : t.find}
              </p>
              <button onClick={() => record(null)} className="btn btn-ghost btn-sm flex-none">
                <Eye size={15} /> {t.showMe}
              </button>
            </div>
          ) : (
            <div className="mt-3 space-y-3">
              <p className="font-bold flex items-center gap-2">
                {answered.ok ? <Check size={18} className="text-gold" strokeWidth={3} /> : <X size={18} className="text-lilac" strokeWidth={3} />}
                {answered.ok ? t.right : t.wrong}
                {answered.km >= 0 && <span className="font-normal text-sm text-muted">· {answered.km === 0 ? t.onIt : t.away(answered.km)}</span>}
              </p>
              {!answered.ok && <p className="text-sm text-muted">{t.shown}</p>}
              {current.note && <p className="text-sm">{current.note}</p>}
              <button onClick={() => setPos((p) => p + 1)} className="btn btn-gold btn-sm w-full sm:w-auto">
                {pos + 1 < queue.length ? t.next : t.result}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="relative">
        <div
          ref={boxRef}
          className="rounded-2xl border border-line overflow-auto no-scrollbar bg-[#0d0720] touch-pan-x touch-pan-y"
          style={{ aspectRatio: `${map.width} / ${map.height}`, maxHeight: "72vh", width: "100%" }}
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${map.width} ${map.height}`}
            preserveAspectRatio="xMidYMid meet"
            onClick={onMapClick}
            style={box.w ? { width: box.w * z, height: box.h * z, display: "block" } : { width: "100%", height: "100%", display: "block" }}
            className={mode === "practice" && current && !answered ? "cursor-crosshair" : "cursor-default"}
            role="img"
            aria-label={map.base === "lanka" ? "Map of Sri Lanka" : "World map"}
          >
            {map.base === "lanka" ? (
              <>
                <path d={LANKA_INDIA_PATH} fill="#241a40" stroke="#4c3d78" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                <path d={LANKA_PATH} fill="#2d2152" stroke="#c4b5fd" strokeWidth={1.4} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
              </>
            ) : world ? (
              <>
                <path d={world.land} fill="#2d2152" stroke="#c4b5fd" strokeWidth={0.9} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                <path d={world.borders} fill="none" stroke="#6d5ba8" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
              </>
            ) : null}

            {visible.map(({ place, tone }) => {
              const color = tone === "gold" ? "var(--gold)" : tone === "dim" ? "#8b7fb3" : "#e9e3ff";
              const label = names || tone === "gold" || (mode === "practice" && !finished);
              return (
                <g
                  key={place.id}
                  onClick={(e) => {
                    if (mode !== "learn") return;
                    e.stopPropagation();
                    setSelected(place.id === selected ? null : place.id);
                  }}
                  className={mode === "learn" ? "cursor-pointer" : ""}
                >
                  {place.line && (
                    <polyline
                      points={place.line.map((p) => p.join(",")).join(" ")}
                      fill="none"
                      stroke={tone === "plain" ? "#a5b4fc" : color}
                      strokeWidth={tone === "gold" ? 3.5 : 2.5}
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {isWide(place.kind) && tone === "gold" && (
                    <circle cx={place.at[0]} cy={place.at[1]} r={place.r} fill="var(--gold)" fillOpacity={0.12} stroke="var(--gold)" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                  )}
                  {/* bigger invisible target for fingers */}
                  {mode === "learn" && <circle cx={place.at[0]} cy={place.at[1]} r={r * 2} fill="transparent" />}
                  <circle cx={place.at[0]} cy={place.at[1]} r={r} fill={color} stroke="#120a26" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                  {mode === "learn" || finished ? (
                    <text x={place.at[0]} y={place.at[1]} dy="0.35em" textAnchor="middle" fontSize={10.5 * px} fontWeight={800} fill="#120a26" style={{ pointerEvents: "none" }}>
                      {place.n}
                    </text>
                  ) : null}
                  {label && tone !== "plain" && (
                    <text
                      x={place.at[0] + r * 1.5}
                      y={place.at[1]}
                      dy="0.35em"
                      fontSize={12.5 * px}
                      fontWeight={700}
                      fill={color}
                      stroke="#0d0720"
                      strokeWidth={3 * px}
                      paintOrder="stroke"
                      style={{ pointerEvents: "none" }}
                    >
                      {place.name}
                    </text>
                  )}
                  {label && tone === "plain" && (
                    <text x={place.at[0] + r * 1.5} y={place.at[1]} dy="0.35em" fontSize={11.5 * px} fontWeight={600} fill="#e9e3ff" stroke="#0d0720" strokeWidth={3 * px} paintOrder="stroke" style={{ pointerEvents: "none" }}>
                      {place.name}
                    </text>
                  )}
                </g>
              );
            })}

            {current && answered && tapNow && (
              <g style={{ pointerEvents: "none" }}>
                {!answered.ok && (
                  <line x1={tapNow[0]} y1={tapNow[1]} x2={current.at[0]} y2={current.at[1]} stroke="#c4b5fd" strokeDasharray="5 5" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                )}
                <circle cx={tapNow[0]} cy={tapNow[1]} r={r * 0.75} fill="none" stroke={answered.ok ? "var(--gold)" : "#c4b5fd"} strokeWidth={3} vectorEffect="non-scaling-stroke" />
                <circle cx={tapNow[0]} cy={tapNow[1]} r={r * 0.2} fill={answered.ok ? "var(--gold)" : "#c4b5fd"} />
              </g>
            )}
          </svg>
        </div>

        <div className="absolute right-2 bottom-2 flex flex-col gap-1.5">
          <button onClick={() => changeZoom(zoom + 1)} disabled={zoom === ZOOMS.length - 1} className="grid place-items-center w-10 h-10 rounded-xl bg-card-2 border border-line disabled:opacity-40" aria-label={t.zoomIn}>
            <Plus size={18} />
          </button>
          <button onClick={() => changeZoom(zoom - 1)} disabled={zoom === 0} className="grid place-items-center w-10 h-10 rounded-xl bg-card-2 border border-line disabled:opacity-40" aria-label={t.zoomOut}>
            <Minus size={18} />
          </button>
        </div>
      </div>
      {zoom > 0 && <p className="text-xs text-muted -mt-2">{t.hint}</p>}

      {mode === "learn" && (
        <>
          <div className={`glass p-4 min-h-[64px] ${sel ? "!border-gold" : ""}`} aria-live="polite">
            {sel ? (
              <>
                <p className="font-bold">
                  <span className="text-gold">{sel.n}.</span> {sel.name}
                </p>
                <p className="text-sm text-muted">{kinds[sel.kind] ?? ""}</p>
                {sel.note && <p className="text-sm mt-1.5">{sel.note}</p>}
              </>
            ) : (
              <p className="text-sm text-muted">{t.pick}</p>
            )}
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[...byId.values()].map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => {
                    setSelected(p.id);
                    focus(p.at);
                  }}
                  className={`w-full text-left rounded-xl border px-3 py-2.5 flex items-center gap-3 ${p.id === selected ? "border-gold bg-card-2" : "border-line hover:border-lilac/50"}`}
                >
                  <span className={`grid place-items-center w-7 h-7 rounded-full text-xs font-extrabold flex-none ${p.id === selected ? "bg-gold text-bg" : "bg-card-2"}`}>{p.n}</span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-sm leading-snug">{p.name}</span>
                    <span className="block text-xs text-muted">{kinds[p.kind] ?? ""}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <button onClick={() => start(map.places.map((p) => p.id))} className="btn btn-gold w-full sm:w-auto">
            <Target size={17} /> {t.practice}
          </button>
        </>
      )}

      {finished && (
        <div className="glass p-5 space-y-4" aria-live="polite">
          <p className="text-2xl font-bold">
            <span className="text-gold">{score}</span>/{answers.length}
          </p>
          <p className="font-semibold">{score === answers.length ? t.perfect : t.score(score, answers.length)}</p>
          <ul className="space-y-1.5 text-sm">
            {answers.map((a) => {
              const p = byId.get(a.id)!;
              return (
                <li key={a.id} className="flex items-start gap-2">
                  {a.ok ? <Check size={16} className="text-gold flex-none mt-0.5" strokeWidth={3} /> : <X size={16} className="text-lilac flex-none mt-0.5" strokeWidth={3} />}
                  <span>
                    <span className="text-muted">{p.n}.</span> {p.name}
                    {a.km > 0 && !a.ok && <span className="text-muted"> · {t.away(a.km)}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap gap-2">
            {score < answers.length && (
              <button onClick={() => start(answers.filter((a) => !a.ok).map((a) => a.id))} className="btn btn-gold btn-sm">
                <Target size={15} /> {t.missed}
              </button>
            )}
            <button onClick={() => start(map.places.map((p) => p.id))} className="btn btn-sm">
              <RotateCcw size={15} /> {t.again}
            </button>
            <button onClick={() => (setMode("learn"), setQueue([]))} className="btn btn-ghost btn-sm">
              <MapPin size={15} /> {t.learn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
