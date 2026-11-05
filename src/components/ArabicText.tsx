import React from "react";
import { Apple, ArrowLeftRight, ArrowRight, BookOpen, Bookmark, Brain, Circle, CircleCheck, CircleX, ClipboardList, Dumbbell, Eye, Gift, GraduationCap, HandHeart, Handshake, Hammer, Heart, Hourglass, Landmark, Library, Lightbulb, ListOrdered, Map, Moon, School, ScrollText, Scale, Shield, ShoppingCart, Sparkles, Sprout, Star, Swords, Target, TriangleAlert, UserRound, Users, Waves, Wheat } from "lucide-react";

// Arabic letters (and harakat) — a run of Arabic words, possibly with spaces between them.
export const ARABIC_RUN = /([\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF](?:[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\s]*[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF])?)/;

export const MARKERS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "📌": Bookmark,
  "📖": BookOpen,
  "📝": ClipboardList,
  "🎓": GraduationCap,
  "⚠": TriangleAlert,
  "⚠️": TriangleAlert,
  "💡": Lightbulb,
  "✨": Sparkles,
  "🎯": Target,
  "👉": ArrowRight,
  "🔸": Circle,
  "📚": Library,
  "🤲": HandHeart,
  "🎁": Gift,
  "🤝": Handshake,
  "👁": Eye,
  "👁️": Eye,
  "🗺": Map,
  "🗺️": Map,
  "👥": Users,
  "🕋": Landmark,
  "👨": UserRound,
  "👩": UserRound,
  "👧": UserRound,
  "🌾": Wheat,
  "🔨": Hammer,
  "🛒": ShoppingCart,
  "🏫": School,
  "👮": Shield,
  "💪": Dumbbell,
  "🍎": Apple,
  "🏊": Waves,
  "🚿": Waves,
  "😴": Moon,
  "🧠": Brain,
  "🌵": Sprout,
  "📜": ScrollText,
  "🔟": ListOrdered,
  "👨‍👩‍👧": Users,
  "👨‍🏫": School,
  "⭐": Star,
  "✅": CircleCheck,
  "❌": CircleX,
  "⚖️": Scale,
  "❤️": Heart,
  "↔": ArrowLeftRight,
  "⚔️": Swords,
  "⏳": Hourglass,
};

const MARKER_PATTERN = new RegExp(Object.keys(MARKERS).sort((a, b) => b.length - a.length).join("|"), "gu");

function arabicText(text: string): React.ReactNode {
  if (!ARABIC_RUN.test(text)) return text;
  return text.split(ARABIC_RUN).map((part, i) =>
    i % 2 ? <span key={i} className="ar-i" lang="ar">{part}</span> : part,
  );
}

/** Replace content emojis anywhere in a string with matching outline icons. */
export function withMarker(text: string): React.ReactNode | null {
  const matches = [...text.matchAll(MARKER_PATTERN)];
  if (!matches.length) return null;
  const parts: React.ReactNode[] = [];
  let last = 0;
  matches.forEach((match, i) => {
    const index = match.index ?? 0;
    if (index > last) parts.push(arabicText(text.slice(last, index)));
    const MarkerIcon = MARKERS[match[0]] ?? MARKERS[match[0].replace(/\ufe0f/g, "")];
    if (MarkerIcon) parts.push(<MarkerIcon key={`marker-${i}`} size={17} className="content-marker" />);
    else parts.push(match[0]);
    last = index + match[0].length;
  });
  if (last < text.length) parts.push(arabicText(text.slice(last)));
  return <>{parts}</>;
}

/** Wraps Arabic words in <span class="ar-i" lang="ar"> (Arabic font, readable size), for plain strings rendered outside markdown (flashcards, quiz, past papers). */
export function withArabic(text: string): React.ReactNode {
  return withMarker(text) ?? arabicText(text);
}

const ARABIC = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/g;

/** True when a line is mostly Arabic (shown right-to-left in the Arabic font). */
export function isMostlyArabic(text: string) {
  const letters = text.replace(/[\s\p{P}\d]/gu, "");
  if (letters.length < 6) return false;
  return (text.match(ARABIC)?.length ?? 0) / letters.length > 0.55;
}
