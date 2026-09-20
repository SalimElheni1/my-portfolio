import Link from "next/link";
import { profile } from "@/content/profile";
import { formatYearsExperience } from "@/lib/date";
import { SystemMap } from "@/components/home/system-map";

export function Hero() {
  const experience = formatYearsExperience(profile.experienceStartDateISO);

  return (
    <section className="wrap pb-16 pt-12 sm:pb-24 sm:pt-20 lg:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <p className="flex items-baseline gap-3 sm:hidden">
            <span className="font-display text-lg font-medium text-heading">{profile.name}</span>
            <span lang="ar" dir="rtl" className="font-arabic text-lg text-muted">
              سليم الهاني
            </span>
          </p>
          <h1 className="mt-6 max-w-[15ch] font-display text-[clamp(2.6rem,6.4vw,4.75rem)] font-semibold leading-[1.02] tracking-tighter text-heading sm:mt-0">
            {profile.tagline}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-body">{profile.supportingText}</p>
          <p className="mt-4 max-w-xl text-base text-muted">
            Based in {profile.location}, {experience} shipping production JavaScript. Open to remote or
            relocation.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/work/quran-association-manager"
              className="inline-flex items-center rounded-md border border-accent bg-accent px-6 py-3 font-display text-base font-medium text-on-accent transition-colors hover:border-accent-bright hover:bg-accent-bright active:translate-y-px"
            >
              View the case study
            </Link>
            <a
              href={profile.github.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md border border-border-strong px-6 py-3 font-display text-base font-medium text-heading transition-colors hover:border-accent-ink hover:text-accent-ink active:translate-y-px"
            >
              GitHub
            </a>
          </div>
        </div>
        <SystemMap />
      </div>
    </section>
  );
}
