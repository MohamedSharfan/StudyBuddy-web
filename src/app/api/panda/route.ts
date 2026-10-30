import Anthropic from "@anthropic-ai/sdk";
import { getChapterSummary, parseChapterId, subjectsFor } from "@/lib/catalog";
import { retrieve } from "@/lib/panda";
import { getViewer, hasSubjectAccess } from "@/lib/session";

export const runtime = "nodejs";

const SYSTEM = `You are Panda, the friendly study buddy inside StudyBuddy — a learning app for Sri Lankan G.C.E. O/L students studying Islam (Grade 10 and 11 syllabus) in the Tamil or English medium.

How to answer:
- Answer in the language the student writes in (Tamil or English; Tanglish is fine to answer in simple Tamil).
- Ground every answer in the NOTES provided. If the notes don't cover the question, say so briefly and give a careful general answer, flagging that the student should check with their teacher.
- Keep it short and exam-focused: a direct answer first, then 2–5 bullet points of key facts. Show Arabic terms with their transliteration where the notes do.
- When useful, end with "📌 Revise: Grade X · Chapter Y" pointing to the chapter the answer came from, and optionally one quick practice question.
- Be warm and encouraging, like an older sibling. Never invent Quran verse numbers or hadith references that aren't in the notes.
- Use simple Markdown (bold, bullet lists). No headings.`;

type ChatTurn = { role: "user" | "assistant"; content: string };

const hits = new Map<string, { n: number; reset: number }>();
function rateLimited(id: string) {
  const now = Date.now();
  const h = hits.get(id);
  if (!h || h.reset < now) {
    hits.set(id, { n: 1, reset: now + 60 * 60 * 1000 });
    return false;
  }
  h.n++;
  return h.n > 40;
}

export async function POST(req: Request) {
  const viewer = await getViewer();
  if (!viewer) return new Response("Please sign in to chat with Panda.", { status: 401 });
  if (rateLimited(viewer.userId)) return new Response("Panda needs a short break — try again in a little while. 🐼", { status: 429 });

  let body: { messages?: ChatTurn[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  const history = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  const question = history.at(-1);
  if (!question || question.role !== "user") return new Response("Ask me something!", { status: 400 });

  // Only the student's own subjects (their level and medium), and only chapters they can open.
  const mySubjects = new Set(subjectsFor(viewer.profile).map((s) => s.id));
  const canRead = (chapterId: string) => {
    const p = parseChapterId(chapterId);
    if (!p || !mySubjects.has(p.subjectId)) return false;
    const s = p && getChapterSummary(p.subjectId, p.grade, p.number);
    return Boolean(s && (s.free || hasSubjectAccess(viewer, p.subjectId)));
  };
  const snippets = await retrieve(history.filter((m) => m.role === "user").slice(-2).map((m) => m.content).join(" "), canRead);
  const notes = snippets.length
    ? snippets.map((s) => `[Grade ${s.grade} · Chapter ${s.number}: ${s.title} — ${s.heading}]\n${s.text}`).join("\n\n---\n\n")
    : "(No matching notes found in the chapters this student can access.)";

  const encoder = new TextEncoder();

  if (!process.env.ANTHROPIC_API_KEY) {
    // Offline fallback: show the best matching notes, like the app's local Panda.
    const text = snippets.length
      ? `From your StudyBuddy notes:\n\n${snippets
          .slice(0, 3)
          .map((s) => `**Grade ${s.grade} · Ch ${s.number} — ${s.heading}**\n${s.text.split("\n").filter(Boolean).slice(1, 6).join("\n")}`)
          .join("\n\n")}\n\n📌 Revise: Grade ${snippets[0].grade} · Chapter ${snippets[0].number}`
      : "I couldn't find that in the chapters you can access yet. Try different keywords, or open the chapter notes. 🐼";
    return new Response(encoder.encode(text), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }

  const client = new Anthropic();
  const messages: Anthropic.Beta.BetaMessageParam[] = [
    ...history.slice(0, -1),
    { role: "user", content: `NOTES (from the student's StudyBuddy chapters):\n\n${notes}\n\n---\n\nSTUDENT QUESTION:\n${question.content}` },
  ];

  const stream = client.beta.messages.stream({
    model: "claude-opus-5-5",
    max_tokens: 4000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low" },
    system: SYSTEM,
    messages,
  });

  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") controller.enqueue(encoder.encode(event.delta.text));
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") controller.enqueue(encoder.encode("\n\nSorry, I can't help with that one. Let's get back to the syllabus! 🐼"));
        if (final.stop_reason === "max_tokens") controller.enqueue(encoder.encode("…"));
      } catch (error) {
        const msg =
          error instanceof Anthropic.RateLimitError
            ? "Panda is very busy right now — please try again in a minute."
            : error instanceof Anthropic.AuthenticationError
              ? "Panda isn't set up correctly (API key). Please tell the admin."
              : "Panda got confused — please try again.";
        controller.enqueue(encoder.encode(`\n\n${msg}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
