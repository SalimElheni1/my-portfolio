import { profile } from "@/content/profile";
import { ContactForm } from "@/components/home/contact-form";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="px-6 py-16 sm:px-10 lg:px-16">
      <div className="border-t border-border pt-12">
        <h2 className="font-serif text-3xl italic font-normal text-foreground sm:text-4xl">
          Let&apos;s build something useful.
        </h2>
        <p className="mt-4 max-w-md text-muted">
          Open to Full-Stack JavaScript opportunities · Interesting products · Collaboration
        </p>

        <div className="mt-10">
          <ContactForm />
        </div>

        <p className="mt-10 text-sm text-muted">Or reach me directly:</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="border-b border-muted pb-0.5 text-foreground transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {profile.email}
          </a>
          <a
            href={profile.github.url}
            target="_blank"
            rel="noreferrer"
            className="border-b border-muted pb-0.5 text-foreground transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="border-b border-muted pb-0.5 text-foreground transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            LinkedIn
          </a>
        </div>
        <p className="mt-14 font-mono text-xs uppercase tracking-wider text-muted">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  );
}
