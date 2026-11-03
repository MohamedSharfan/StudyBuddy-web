import { MessageCircle } from "lucide-react";
import { TEACHER_PHONE, teacherWhatsAppLink } from "@/lib/config";

/** "Have a doubt? Ask a tutor" — opens WhatsApp with the subject/chapter already filled in. */
export function AskTeacher({ context, compact = false }: { context?: string; compact?: boolean }) {
  const href = teacherWhatsAppLink(context);
  if (compact)
    return (
      <a href={href} target="_blank" rel="noreferrer" className="btn btn-tutor btn-sm">
        <MessageCircle size={15} /> Ask a tutor
      </a>
    );
  return (
    <div className="glass p-4 flex items-center gap-4 !border-green/35">
      <span className="grid place-items-center w-11 h-11 rounded-xl bg-green/15 text-green flex-none">
        <MessageCircle size={21} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-bold">Have a doubt?</p>
        <p className="text-sm text-muted">Ask our tutor on WhatsApp · {TEACHER_PHONE}</p>
      </div>
      <a href={href} target="_blank" rel="noreferrer" className="btn btn-tutor btn-sm flex-none">
        Ask
      </a>
    </div>
  );
}
