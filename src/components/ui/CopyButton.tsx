"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text, label = "Copy", className = "" }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text.startsWith("/") ? window.location.origin + text : text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {}
      }}
      className={`btn btn-ghost btn-sm ${className}`}
    >
      {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />} {copied ? "Copied" : label}
    </button>
  );
}
