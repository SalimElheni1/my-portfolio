import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { experience, education } from "@/content/experience";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}, a ${profile.title.toLowerCase()} based in ${profile.location}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
      <h1 className="font-serif text-4xl italic text-foreground sm:text-5xl">About</h1>
      <p className="mt-8 text-lg leading-relaxed text-muted sm:text-xl">{profile.summary}</p>

      <section className="mt-20">
        <SectionHeading>Experience</SectionHeading>
        <div className="mt-6 flex flex-col gap-12">
          {experience
            .filter((item) => !item.optional)
            .map((item) => (
              <div key={`${item.role}-${item.organization}`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-medium text-foreground">
                    {item.role} — {item.organization}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">{item.period}</span>
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
                  <div className="mt-6 flex flex-col gap-8 border-l border-border pl-6">
                    {item.subEntries.map((sub) => (
                      <div key={sub.name}>
                        <h4 className="text-base font-medium text-foreground">
                          {sub.url ? (
                            <a
                              href={sub.url}
                              target="_blank"
                              rel="noreferrer"
                              className="border-b border-muted pb-0.5 hover:opacity-70"
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

          {experience
            .filter((item) => item.optional)
            .map((item) => (
              <div key={`${item.role}-${item.organization}`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-base font-medium text-foreground">
                    {item.role} — {item.organization}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">{item.period}</span>
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {item.highlights.map((point) => (
                    <li key={point} className="text-sm leading-relaxed text-muted">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading>Education</SectionHeading>
        <div className="mt-6 flex flex-col gap-4">
          {education.map((item) => (
            <div key={item.credential} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-base font-medium text-foreground">{item.credential}</p>
                <p className="text-sm text-muted">{item.institution}</p>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">{item.period}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading>Languages</SectionHeading>
        <p className="mt-6 text-base text-muted">
          {profile.languages.map((lang) => `${lang.name} (${lang.level})`).join(" · ")}
        </p>
      </section>

      <section className="mt-20">
        <SectionHeading>Contact</SectionHeading>
        <div className="mt-6 flex flex-col gap-2 text-base">
          <a href={`mailto:${profile.email}`} className="text-foreground hover:opacity-70">
            {profile.email}
          </a>
          <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="text-foreground hover:opacity-70">
            {profile.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
