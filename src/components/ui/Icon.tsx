import {
  Atom,
  BookA,
  Briefcase,
  Calculator,
  ChartLine,
  FlaskConical,
  Globe,
  Leaf,
  Monitor,
  Sprout,
  Wrench,
  BookOpen,
  CircleHelp,
  Coins,
  Crown,
  Flame,
  Frame,
  Landmark,
  Languages,
  Layers,
  Library,
  Palette,
  ScrollText,
  Shirt,
  Sigma,
  Sticker,
  Trophy,
  type LucideProps,
} from "lucide-react";

const MAP = {
  atom: Atom,
  "book-a": BookA,
  briefcase: Briefcase,
  calculator: Calculator,
  chart: ChartLine,
  flask: FlaskConical,
  globe: Globe,
  leaf: Leaf,
  monitor: Monitor,
  sprout: Sprout,
  wrench: Wrench,
  "book-open": BookOpen,
  "circle-help": CircleHelp,
  coins: Coins,
  crown: Crown,
  flame: Flame,
  frame: Frame,
  landmark: Landmark,
  languages: Languages,
  layers: Layers,
  library: Library,
  palette: Palette,
  "scroll-text": ScrollText,
  shirt: Shirt,
  sigma: Sigma,
  sticker: Sticker,
  trophy: Trophy,
} as const;

// Subject icons that are pictures rather than Lucide line icons (files in /public/subjects).
const IMAGES: Record<string, string> = {
  islam: "/subjects/islam.png",
  history: "/subjects/history.png",
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const src = IMAGES[name];
  if (src) {
    const size = props.size ?? 24;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        aria-hidden
        width={Number(size)}
        height={Number(size)}
        className={`${props.className ?? ""} inline-block shrink-0 rounded-md object-contain`}
        style={{ width: size, height: size }}
      />
    );
  }
  const C = MAP[name as keyof typeof MAP] ?? BookOpen;
  return <C {...props} />;
}
