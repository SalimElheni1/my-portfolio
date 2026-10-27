import Link from "next/link";
import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/section-heading";
import { ArrowRightIcon } from "@/components/icons";

const role = experience[0];
const clients = role.subEntries ?? [];

// The first highlights of each client are the strongest; the full list lives on the About page.
const HIGHLIGHTS_SHOWN = 3;

export function ClientWork() {
  return (
    <section id="experience" aria-labelledby="client-work-heading" className="flex flex-col gap-6">
      <SectionHeading id="client-work-heading" eyebrow="Experience" meta={`${role.organization} • ${role.period}`}>
        Selected work at {role.organization}
      </SectionHeading>

      <p className="max-w-[70ch] text-[15.5px] leading-[1.6] text-body">
        {role.summary} Client code is private, so this describes the work instead of linking to it.
      </p>

      <div className="flex flex-wrap gap-5">
        {clients.map((client) => (
          <article
            key={client.name}
            className="flex flex-[1_1_380px] flex-col gap-4 rounded-md bg-surface p-6 shadow-card ring-1 ring-inset ring-line"
          >
            <div>
              <h3 className="font-display text-lg font-semibold leading-[26px] text-ink">
                {client.url ? (
                  <a href={client.url} target="_blank" rel="noopener" className="hover:underline">
                    {client.name}
                  </a>
                ) : (
                  client.name
                )}
              </h3>
              <p className="mt-1 text-sm leading-5 text-muted">{client.description}</p>
            </div>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-[15.5px] leading-[1.6] text-body marker:text-accent-ink">
              {client.highlights.slice(0, HIGHLIGHTS_SHOWN).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <Link
        href="/about"
        className="inline-flex min-h-11 items-center gap-2 self-start font-display text-sm font-medium leading-5 text-accent-ink hover:underline"
      >
        Full experience
        <ArrowRightIcon size={12} />
      </Link>
    </section>
  );
}
