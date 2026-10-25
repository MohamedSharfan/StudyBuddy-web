"use client";

import { useTransition } from "react";
import { Loader2, X } from "lucide-react";
import { adminResolveRequest } from "@/app/actions";

export function DismissRequest({ id }: { id: number }) {
  const [pending, start] = useTransition();
  return (
    <button
      className="btn btn-ghost btn-sm"
      disabled={pending}
      onClick={() => {
        if (confirm("Dismiss this request without unlocking?")) start(() => adminResolveRequest(id, "dismissed").then(() => undefined));
      }}
      aria-label="Dismiss request"
    >
      {pending ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />} Dismiss
    </button>
  );
}
