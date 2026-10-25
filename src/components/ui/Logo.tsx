import Image from "next/image";
import Link from "next/link";

export function Logo({ href = "/", size = 40, wordmark = true }: { href?: string; size?: number; wordmark?: boolean }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label="StudyBuddy home">
      <span
        className="relative rounded-xl overflow-hidden"
        style={{ width: size, height: size }}
      >
        <Image src="/logo.jpg" alt="" fill sizes={`${size}px`} className="object-cover scale-[1.35] translate-y-[6%]" priority />
      </span>
      {wordmark && (
        <span className="display text-[1.3rem] font-bold leading-none">
          Study<span className="text-gold">Buddy</span>
        </span>
      )}
    </Link>
  );
}
