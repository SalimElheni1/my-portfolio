import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">404</p>
      <h1 className="mt-4 font-serif text-4xl italic text-foreground sm:text-5xl">Page not found.</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center rounded-full bg-accent px-8 py-4 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Back to home
      </Link>
    </div>
  );
}
