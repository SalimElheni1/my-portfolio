import { profile } from "@/content/profile";
import { ContactForm } from "@/components/home/contact-form";

const directLinks = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: profile.github.label, href: profile.github.url, external: true },
  { label: "LinkedIn", value: profile.linkedin.label, href: profile.linkedin.url, external: true },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" aria-labelledby="contact-heading" className="wrap pb-10 pt-16 sm:pt-20">
      <div className="tick-rule" aria-hidden="true" />
      <div className="grid gap-12 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-20">
        <div>
          <h2
            id="contact-heading"
            className="font-display text-3xl font-semibold tracking-tight text-heading sm:text-4xl"
          >
            Let&apos;s build something useful.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Open to Full-Stack JavaScript roles, interesting products, and collaboration: remote, hybrid, or
            relocation-friendly.
          </p>
          <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
            {directLinks.map((link) => (
              <li key={link.label} className="grid gap-1 py-4 sm:grid-cols-[6rem_1fr] sm:gap-6">
                <span className="text-sm text-muted">{link.label}</span>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="w-fit break-all text-base text-heading transition-colors hover:text-accent-ink"
                >
                  {link.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
      <div className="mt-16 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-mono text-xs text-muted">
          © {year} {profile.name}
        </p>
        <p className="font-arabic text-sm text-muted" dir="rtl" lang="ar">
          سليم الهاني
        </p>
      </div>
    </footer>
  );
}
