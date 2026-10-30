"use client";

import Link from "next/link";
import { primaryButton, secondaryButton } from "@/components/button-styles";

// The server logs the details; in production the browser only gets a digest
// that matches the server's log line, so show it for reference.
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  const digest = error instanceof Error && "digest" in error ? String(error.digest) : null;

  return (
    <div className="wrap py-20 sm:py-28">
      <div className="max-w-3xl">
        <p className="font-mono text-sm text-muted">500</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tighter text-heading sm:text-5xl">
          Something went wrong.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          This page hit an unexpected error. Trying again usually fixes it.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button type="button" onClick={() => retry()} className={primaryButton}>
            Try again
          </button>
          <Link href="/" className={secondaryButton}>
            Back to home
          </Link>
        </div>
        {digest && <p className="mt-8 font-mono text-xs text-muted">Reference: {digest}</p>}
      </div>
    </div>
  );
}
