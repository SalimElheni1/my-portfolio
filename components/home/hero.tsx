import Link from "next/link";
import { profile } from "@/content/profile";
import { formatYearsExperience } from "@/lib/date";
import { ArrowRightIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { primaryButton, secondaryButton } from "@/components/button-styles";

const stats = [
  { value: null, tone: "text-accent-ink", label: "Production JavaScript" },
  { value: "2", tone: "text-amber", label: "Client products at PerfectSoft" },
  { value: "20+", tone: "text-ink", label: "Releases of my desktop app" },
  { value: "18 days", tone: "text-green", label: "First commit to production" },
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
            {profile.availability}
          </p>
          <h1 className="font-display text-[clamp(28px,4.2vw,48px)] font-bold leading-[1.2] tracking-[-0.025em] text-balance text-ink">
            {profile.tagline}
          </h1>
          <p className="font-mono text-[clamp(11px,1.1vw,13px)] font-bold uppercase leading-[1.4] tracking-[0.1em] text-accent-ink">
            {profile.title}
          </p>
          <p className="max-w-[60ch] text-[clamp(15px,1.5vw,18px)] leading-[1.62] text-body">
            {experience} building production JavaScript: backend logic, payment and calendar integrations,
            front end, and automated end-to-end testing. Based in {profile.location}.
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
          aria-label="At a glance"
          className="flex flex-[1_1_380px] flex-col gap-4 self-start rounded-md bg-tile p-6 shadow-panel ring-1 ring-inset ring-line"
        >
          <p className="border-b border-line2 pb-3 font-mono text-[11px] uppercase leading-[18px] tracking-[0.1em] text-accent-ink">
            At a glance
          </p>

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
        </aside>
      </div>
    </section>
  );
}
