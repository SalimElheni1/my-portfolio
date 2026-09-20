import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-20 sm:py-28">
      <div className="max-w-3xl">
        <p className="font-mono text-sm text-muted">404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tighter text-heading sm:text-5xl">
          Page not found.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist, or has moved.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-accent bg-accent px-6 py-3 font-display text-base font-medium text-on-accent transition-colors hover:border-accent-bright hover:bg-accent-bright active:translate-y-px"
          >
            Back to home
          </Link>
          <Link
            href="/work/quran-association-manager"
            className="inline-flex items-center rounded-md border border-border-strong px-6 py-3 font-display text-base font-medium text-heading transition-colors hover:border-accent-ink hover:text-accent-ink active:translate-y-px"
          >
            See the case study
          </Link>
        </div>
      </div>
    </div>
  );
}
