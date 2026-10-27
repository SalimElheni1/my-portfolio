import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { experience, education } from "@/content/experience";
import { projects } from "@/content/project";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}, a ${profile.title.toLowerCase()} based in ${profile.location}.`,
};

const project = projects[0];
const linkClass = "text-heading transition-colors hover:text-accent-ink";

export default function AboutPage() {
  return (
    <div className="wrap py-14 sm:py-20">
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tighter text-heading sm:text-5xl">About</h1>
        <p className="mt-8 text-lg leading-relaxed text-body sm:text-xl">{profile.summary}</p>

        <section aria-labelledby="experience-heading" className="mt-20">
          <SectionHeading id="experience-heading">Experience</SectionHeading>
          <div className="mt-8 flex flex-col gap-12">
            {experience.map((item) => (
              <div key={`${item.role}-${item.organization}`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3
                    className={`font-display font-medium text-heading ${item.optional ? "text-base" : "text-lg"}`}
                  >
                    {item.role}, {item.organization}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-muted">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{item.location}</p>
                {item.summary && <p className="mt-3 text-base leading-relaxed text-muted">{item.summary}</p>}
                {item.highlights.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {item.highlights.map((point) => (
                      <li key={point} className="text-base leading-relaxed text-muted">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                {item.subEntries && (
                  <div className="mt-6 flex flex-col gap-8 border-l border-rule pl-6">
                    {item.subEntries.map((sub) => (
                      <div key={sub.name}>
                        <h4 className="font-display text-base font-medium text-heading">
                          {sub.url ? (
                            <a
                              href={sub.url}
                              target="_blank"
                              rel="noreferrer"
                              className="border-b border-muted pb-0.5 transition-colors hover:border-accent-ink hover:text-accent-ink"
                            >
                              {sub.name}
                            </a>
                          ) : (
                            sub.name
                          )}
                        </h4>
                        <p className="mt-1 text-sm text-muted">{sub.description}</p>
                        <ul className="mt-3 flex flex-col gap-2">
                          {sub.highlights.map((point) => (
                            <li key={point} className="text-sm leading-relaxed text-muted">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="project-heading" className="mt-20">
          <SectionHeading id="project-heading">Personal project</SectionHeading>
          <div className="mt-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-display text-lg font-medium text-heading">{project.name}</h3>
              <span className="shrink-0 font-mono text-xs text-muted">Aug 2025 – Present</span>
            </div>
            <p className="mt-3 text-base leading-relaxed text-muted">{project.description}</p>
            <Link
              href={`/work/${project.slug}`}
              className="mt-4 inline-flex border-b border-accent-dim pb-0.5 font-display text-sm font-medium text-accent-ink transition-colors hover:border-accent-bright hover:text-ink"
            >
              Read the case study →
            </Link>
          </div>
        </section>

        <section aria-labelledby="education-heading" className="mt-20">
          <SectionHeading id="education-heading">Education</SectionHeading>
          <ul className="mt-8 flex flex-col gap-5">
            {education.map((item) => (
              <li
                key={item.credential}
                className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="font-display text-base font-medium text-heading">{item.credential}</p>
                  <p className="text-sm text-muted">{item.institution}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted">{item.period}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="languages-heading" className="mt-20">
          <SectionHeading id="languages-heading">Languages</SectionHeading>
          <ul className="mt-8 flex flex-col gap-2 text-base text-muted">
            {profile.languages.map((lang) => (
              <li key={lang.name}>
                <span className="text-heading">{lang.name}</span>, {lang.level.toLowerCase()}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="about-contact-heading" className="mt-20">
          <SectionHeading id="about-contact-heading">Contact</SectionHeading>
          <div className="mt-8 flex flex-col gap-2 text-base">
            <a href={`mailto:${profile.email}`} className={linkClass}>
              {profile.email}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
