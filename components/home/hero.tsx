import Link from "next/link";
import { profile } from "@/content/profile";
import { formatYearsExperience } from "@/lib/date";
import { ArrowRightIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { primaryButton, secondaryButton } from "@/components/button-styles";

const stats = [
  { value: null, tone: "text-accent-ink", label: "Production JS" },
  { value: "Full-Stack", tone: "text-amber", label: "Data to Interface" },
  { value: "E2E", tone: "text-ink", label: "Automated Quality" },
  { value: "18 days", tone: "text-green", label: "Commit to Production" },
];

const disciplines = [
  {
    title: "Resilient Data Modeling",
    description: "Normalized schemas, offline-first reliability, and clean state boundaries.",
  },
  {
    title: "Critical Integrations",
    description: "Stripe, Chargebee, webhooks, and calendar provider sync.",
  },
  {
    title: "Deterministic Testing",
    description: "Cypress test coverage protecting revenue flows and core workflows.",
  },
];

export function Hero() {
  const experience = formatYearsExperience(profile.experienceStartDateISO);

  return (
    <section
      id="home"
      className="relative overflow-hidden rounded-md bg-(image:--hero) p-[clamp(22px,3vw,40px)] shadow-panel ring-1 ring-inset ring-line"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[95px] -top-[95px] size-96 rounded-full bg-glow-a blur-[40px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[95px] -right-[95px] size-96 rounded-full bg-glow-b blur-[40px]"
      />

      <div className="relative flex flex-wrap gap-x-10 gap-y-8">
        <div className="flex flex-[1_1_380px] flex-col items-start gap-5">
          <p className="flex items-center gap-2 rounded-lg bg-surface2 px-4 py-[5px] font-mono text-[11px] font-medium leading-4 tracking-[0.275px] text-accent-ink ring-1 ring-inset ring-line">
            <span aria-hidden="true" className="size-2 rounded-full bg-green" />
            Shipped to production • Open to full-time roles
          </p>
          <h1 className="font-display text-[clamp(28px,4.2vw,48px)] font-bold leading-[1.2] tracking-[-0.025em] text-ink">
            {profile.tagline}
          </h1>
          <p className="font-mono text-[clamp(11px,1.1vw,13px)] font-bold uppercase leading-[1.4] tracking-[0.1em] text-accent-ink">
            {profile.title}
          </p>
          <p className="max-w-[60ch] text-[clamp(15px,1.5vw,18px)] leading-[1.62] text-body">
            {experience} building production JavaScript: backend logic, payment and calendar integrations,
            front end, and automated end-to-end testing. Based in {profile.location}. Open to remote roles or
            relocation.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link href="/#work" className={primaryButton}>
              View the case study
              <ArrowRightIcon size={12} />
            </Link>
            <Link href="/#contact" className={secondaryButton}>
              <MailIcon size={14} />
              Get in touch
            </Link>
            <a href={profile.github.url} target="_blank" rel="noopener" className={secondaryButton}>
              <GithubIcon size={14} />
              GitHub
            </a>
            <a href={profile.linkedin.url} target="_blank" rel="noopener" className={secondaryButton}>
              <LinkedinIcon size={14} />
              LinkedIn
            </a>
          </div>
        </div>

        <aside
          aria-label="Engineering profile"
          className="flex flex-[1_1_380px] flex-col gap-4 self-start rounded-md bg-tile p-6 shadow-panel ring-1 ring-inset ring-line"
        >
          <div className="flex items-start justify-between gap-4 border-b border-line2 pb-3">
            <div>
              <p className="font-mono text-[11px] uppercase leading-[18px] tracking-[0.1em] text-accent-ink">
                Engineering profile
              </p>
              <p className="font-display text-[15px] font-semibold leading-5 text-ink">
                Full Lifecycle Delivery
              </p>
            </div>
            <span className="rounded-xs bg-surface2 px-[9px] py-[3px] font-mono text-[11px] font-medium leading-4 text-green ring-1 ring-inset ring-line3">
              Active
            </span>
          </div>

          <dl className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-sm bg-surface3 p-[11px] ring-1 ring-inset ring-line3">
                <dd className={`font-display text-[19px] font-bold leading-6 ${stat.tone}`}>
                  {stat.value ?? experience.replace("years", "yrs")}
                </dd>
                <dt className="font-mono text-[11px] leading-4 text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <ol className="flex flex-col gap-[11px] border-t border-line3 pt-3">
            {disciplines.map((item, index) => (
              <li key={item.title} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="w-[22px] shrink-0 rounded-lg bg-surface2 text-center font-mono text-[11px] leading-[18px] text-accent-ink ring-1 ring-inset ring-line2"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-[12.5px] font-medium leading-[17px] text-soft">{item.title}</p>
                  <p className="text-xs leading-4 text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
