"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, Loader2, RotateCcw } from "lucide-react";
import { Panda } from "@/components/ui/Panda";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "ஈமானின் ஆறு அடிப்படைகள் எவை?",
  "அகீதாவின் நான்கு பிரிவுகளை விளக்குக",
  "Explain Tawheed simply for my exam",
  "Give me 3 quick questions on Chapter 1",
];
const KEY = "sb-panda-chat";

export function PandaChat({ firstName, smart }: { firstName: string; smart: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) setMessages(saved.slice(-20));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(messages.slice(-20)));
    } catch {}
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/panda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.body) throw new Error(await res.text());
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
      if (!acc) setMessages([...next, { role: "assistant", content: res.ok ? "…" : `Sorry — ${res.status}` }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "I couldn't reach the server. Check your connection and try again." }]);
    } finally {
      setBusy(false);
      taRef.current?.focus();
    }
  };

  return (
    <div className="glass flex flex-col h-[calc(100dvh-210px)] lg:h-[calc(100dvh-150px)] min-h-[460px] overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-line">
        <Panda size={40} mood={busy ? "think" : "happy"} />
        <div className="flex-1">
          <p className="font-extrabold leading-tight">AI Panda</p>
          <p className="text-xs text-muted">{busy ? "thinking…" : smart ? "Answers from your StudyBuddy notes" : "Notes search mode"}</p>
        </div>
        {messages.length > 0 && (
          <button onClick={() => setMessages([])} className="btn btn-ghost btn-sm" aria-label="New chat">
            <RotateCcw size={14} /> New
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4" aria-live="polite">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <Panda size={110} mood="wink" className="float" />
            <h2 className="display text-2xl font-bold mt-4">Hi {firstName}! What are we revising?</h2>
            <p className="text-sm text-muted mt-1 max-w-[420px]">Ask in Tamil or English. I&apos;ll answer from your chapters and tell you what to revise.</p>
            <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-[560px]" lang="ta">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="chip hover:!text-white hover:!border-neon !py-2">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[85%] rounded-3xl rounded-br-md bg-electric px-4 py-2.5 whitespace-pre-wrap" lang="ta">
                {m.content}
              </p>
            </div>
          ) : (
            <div key={i} className="flex gap-3 items-start">
              <Panda size={30} className="flex-none mt-1" />
              <div className="max-w-[88%] rounded-3xl rounded-tl-md bg-white/[.05] border border-line px-4 py-3 prose-sb !text-[0.97rem] !leading-[1.8]" lang="ta">
                {m.content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                ) : (
                  <span className="flex gap-1 py-1.5" aria-label="Panda is typing">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="w-2 h-2 rounded-full bg-lilac animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </span>
                )}
              </div>
            </div>
          ),
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="p-3 border-t border-line flex gap-2 items-end"
      >
        <textarea
          ref={taRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          maxLength={2000}
          placeholder="Ask Panda anything from your syllabus…"
          className="input !min-h-[48px] max-h-36 resize-none"
          aria-label="Message Panda"
          lang="ta"
        />
        <button className="btn !w-12 !h-12 !p-0 flex-none" disabled={busy || !input.trim()} aria-label="Send">
          {busy ? <Loader2 size={18} className="animate-spin" /> : <ArrowUp size={20} />}
        </button>
      </form>
    </div>
  );
}
