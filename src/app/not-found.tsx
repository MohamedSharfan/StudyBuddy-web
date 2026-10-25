import Link from "next/link";
import { Panda } from "@/components/ui/Panda";

export default function NotFound() {
  return (
    <div className="min-h-dvh grid place-items-center p-6 text-center">
      <div>
        <Panda size={120} mood="think" className="mx-auto float" />
        <h1 className="display text-5xl font-bold mt-6">Lost in space</h1>
        <p className="text-muted mt-2">This star isn&apos;t on our map.</p>
        <Link href="/home" className="btn btn-gold mt-6">
          Back to my sky
        </Link>
      </div>
    </div>
  );
}
