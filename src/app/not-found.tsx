import Link from "next/link";
import { Panda } from "@/components/ui/Panda";

export default function NotFound() {
  return (
    <div className="min-h-dvh grid place-items-center p-6 text-center">
      <div>
        <Panda size={96} mood="think" className="mx-auto" />
        <h1 className="display text-3xl font-bold mt-5">Page not found</h1>
        <p className="text-muted mt-2">This page doesn&apos;t exist or has moved.</p>
        <Link href="/home" className="btn btn-gold mt-6">
          Go to home
        </Link>
      </div>
    </div>
  );
}
