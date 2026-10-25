import Image from "next/image";
import Link from "next/link";

export function Logo({ href = "/", size = 40, wordmark = true }: { href?: string; size?: number; wordmark?: boolean }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 group" aria-label="StudyBuddy home">
      <span
        className="relative rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-[0_6px_20px_-6px_rgba(124,58,237,.8)] transition-transform group-hover:-rotate-6"
        style={{ width: size, height: size }}
      >
        <Image src="/logo.jpg" alt="" fill sizes={`${size}px`} className="object-cover scale-[1.35] translate-y-[6%]" priority />
      </span>
      {wordmark && (
        <span className="display text-[1.35rem] font-bold leading-none">
          Study<span className="text-neon">Buddy</span>
        </span>
      )}
    </Link>
  );
}
