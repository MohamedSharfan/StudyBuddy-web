"use client";

import { useTransition } from "react";
import { Loader2, UserCheck, UserPlus, X } from "lucide-react";
import { connect, disconnect } from "@/app/actions";

export function ConnectButton({ targetId, status }: { targetId: string; status: "none" | "outgoing" | "incoming" | "connected" }) {
  const [pending, start] = useTransition();
  if (status === "connected")
    return (
      <button className="btn btn-ghost btn-sm" disabled={pending} onClick={() => start(() => disconnect(targetId))}>
        {pending ? <Loader2 size={14} className="animate-spin" /> : <UserCheck size={14} className="text-green" />} Connected
      </button>
    );
  if (status === "outgoing")
    return (
      <button className="btn btn-ghost btn-sm" disabled={pending} onClick={() => start(() => disconnect(targetId))}>
        {pending ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />} Cancel request
      </button>
    );
  return (
    <button className="btn btn-sm" disabled={pending} onClick={() => start(() => connect(targetId))}>
      {pending ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />} {status === "incoming" ? "Accept" : "Connect"}
    </button>
  );
}
