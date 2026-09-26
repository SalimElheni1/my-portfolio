import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/project";
import { SectionHeading } from "@/components/section-heading";
import { TagList } from "@/components/tag-list";

const project = projects[0];

export const metadata: Metadata = {
  title: project.name,
  description: project.description,
};

const facts = [
  { label: "First commit", value: project.timeline.firstCommit },
  { label: "First release", value: project.timeline.firstRelease },
  { label: "Current release", value: project.timeline.currentRelease },
];

export default function ProjectPage() {
  const [lead, ...rest] = project.screenshots;

  return (
    <div className="wrap py-12 sm:py-16">
      <Link href="/" className="inline-flex py-1 text-sm text-muted transition-colors hover:text-heading">
        ← Back to home
      </Link>

      <div className="mt-8 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-xs text-accent-ink">{project.status}</span>
        </div>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tighter text-heading sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-body sm:text-xl">{project.description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <TagList items={project.stack} />
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="border-b border-accent-dim pb-0.5 font-display text-sm font-medium text-accent-ink transition-colors hover:border-accent-bright hover:text-ink"
          >
            View repository →
          </a>
        </div>
      </div>

      <figure className="mt-12">
        <div className="overflow-hidden rounded-md border border-border-strong bg-raised">
          <Image
            src={lead.src}
            alt={lead.alt}
            width={lead.width}
            height={lead.height}
            sizes="(min-width: 1152px) 1072px, 100vw"
            className="h-auto w-full"
            priority
          />
        </div>
        <figcaption className="mt-3 text-sm text-muted">{lead.alt}</figcaption>
      </figure>

      <div className="mt-20 max-w-3xl">
        <section aria-labelledby="timeline-heading">
          <SectionHeading id="timeline-heading">Timeline</SectionHeading>
          <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
            {facts.map((fact) => (
              <div key={fact.label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="font-mono text-xs text-heading sm:text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-base leading-relaxed text-muted">{project.timeline.note}</p>
        </section>

        <section aria-labelledby="problem-heading" className="mt-16">
          <SectionHeading id="problem-heading">The problem</SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-heading">{project.problem}</p>
        </section>

        <section aria-labelledby="solution-heading" className="mt-16">
          <SectionHeading id="solution-heading">The solution</SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-heading">{project.solution}</p>
          <TagList items={project.modules} className="mt-6" />
        </section>
      </div>

      <div className="mt-10 grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
        {rest.map((shot) => (
          <figure key={shot.src}>
            <div className="overflow-hidden rounded-md border border-border-strong bg-raised">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(min-width: 1152px) 528px, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted">{shot.alt}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-16 max-w-3xl">
        <section aria-labelledby="architecture-heading">
          <SectionHeading id="architecture-heading">Architecture</SectionHeading>
          <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
            {project.architecture.map((point) => (
              <li key={point} className="py-3 text-base leading-relaxed text-muted">
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="hardest-heading" className="mt-16">
          <SectionHeading id="hardest-heading">What was hardest</SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-heading">{project.hardest}</p>
        </section>

        <section aria-labelledby="outcome-heading" className="mt-16">
          <SectionHeading id="outcome-heading">Outcome</SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-heading">{project.outcome}</p>
        </section>

        <div className="mt-20 border-t border-rule pt-10">
          <p className="text-base text-muted">
            Want to talk about this project, or something similar?{" "}
            <Link
              href="/#contact"
              className="border-b border-accent-dim pb-0.5 text-accent-ink transition-colors hover:border-accent-bright hover:text-ink"
            >
              Get in touch
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
