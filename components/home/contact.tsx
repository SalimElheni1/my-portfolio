import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/home/contact-form";
import { DownloadTrayIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

const rowBase =
  "flex min-h-[52px] items-center justify-between gap-4 rounded-md px-[18px] ring-1 ring-inset ring-line transition-colors hover:bg-surface2";

const links = [
  { Icon: MailIcon, value: profile.email, category: "Email", href: `mailto:${profile.email}` },
  { Icon: GithubIcon, value: profile.github.label, category: "Code", href: profile.github.url, external: true },
  { Icon: LinkedinIcon, value: profile.linkedin.label, category: "Network", href: profile.linkedin.url, external: true },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="flex flex-col gap-6">
      <SectionHeading id="contact-heading" eyebrow="06 / Contact">
        Let&apos;s build something useful.
      </SectionHeading>

      <div className="flex flex-wrap gap-x-10 gap-y-8">
        <div className="flex flex-[1_1_320px] flex-col gap-[18px]">
          <p className="max-w-[46ch] text-[17px] leading-[1.6] text-body">
            Open to full-stack JavaScript roles — remote, hybrid, or relocation. Email is the fastest way to
            reach me.
          </p>
          <ul className="flex flex-col gap-2.5">
            {links.map(({ Icon, value, category, href, external }) => (
              <li key={category}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener" } : {})}
                  className={`${rowBase} bg-surface`}
                >
                  <span className="flex min-w-0 items-center gap-[11px] font-mono text-sm font-medium leading-5 text-ink">
                    <Icon size={16} className="shrink-0 text-accent-ink" />
                    <span className="break-all">{value}</span>
                  </span>
                  <span className="font-mono text-[11px] leading-4 text-muted">{category}</span>
                </a>
              </li>
            ))}
            <li>
              <a href="/Salim_Elhani_CV.pdf" download className={rowBase}>
                <span className="flex min-w-0 items-center gap-[11px] font-mono text-sm font-medium leading-5 text-body">
                  <DownloadTrayIcon size={16} className="shrink-0 text-muted" />
                  Salim_Elhani_CV.pdf
                </span>
                <span className="font-mono text-[11px] leading-4 text-muted">Download</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-[1_1_380px] flex-col gap-4 self-start rounded-md bg-surface p-[26px] shadow-card ring-1 ring-inset ring-line">
          <div>
            <h3 className="font-display text-[19px] font-semibold leading-[26px] text-ink">Send a message</h3>
            <p className="text-sm leading-5 text-muted">Goes straight to my inbox.</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
