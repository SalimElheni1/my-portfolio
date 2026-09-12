import Link from "next/link";
import { profile } from "@/content/profile";
import { formatYearsExperience } from "@/lib/date";
import { SystemMap } from "@/components/home/system-map";

export function Hero() {
  const experience = formatYearsExperience(profile.experienceStartDateISO);

  return (
    <section className="flex flex-col items-center gap-6 px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24 lg:flex-row lg:items-center lg:px-16 lg:pb-24 lg:pt-24">
      <div className="lg:flex-[0_0_56%]">
        <h1 className="max-w-3xl font-serif text-4xl italic leading-tight text-foreground sm:text-5xl">
          {profile.tagline}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{profile.supportingText}</p>
        <p className="mt-11 font-mono text-xs uppercase tracking-widest text-muted">
          {profile.location} &nbsp;/&nbsp; {profile.title} &nbsp;/&nbsp; {experience}
        </p>
        <div className="mt-11 flex flex-wrap items-center gap-7">
          <Link
            href="/work/quran-association-manager"
            className="inline-flex items-center rounded-full bg-accent px-8 py-4 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            View the case study
          </Link>
          <a
            href={profile.github.url}
            target="_blank"
            rel="noreferrer"
            className="border-b border-muted pb-0.5 text-sm font-medium text-foreground transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="flex justify-center lg:flex-1">
        <SystemMap />
      </div>
    </section>
  );
}
