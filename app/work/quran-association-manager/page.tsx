import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/project";
import { SectionHeading } from "@/components/section-heading";
import { TagList } from "@/components/tag-list";
import { ArchitectureDiagram } from "@/components/work/architecture-diagram";
import { pageMetadata } from "@/lib/site";

const project = projects[0];

export const metadata = pageMetadata({
  title: project.name,
  description: project.description,
  path: `/work/${project.slug}`,
});

const facts = [
  { label: "First commit", value: project.timeline.firstCommit },
  { label: "First release", value: project.timeline.firstRelease },
  { label: "In production", value: project.timeline.currentRelease },
  { label: "Platform", value: project.platform },
  { label: "Role", value: project.role },
  { label: "In daily use", value: project.usage },
];

const links = [
  { label: "View repository", href: project.repoUrl },
  { label: "Download for Windows", href: project.downloadUrl },
  { label: "Video tour (Arabic)", href: project.videoUrl },
];

const textLink =
  "border-b border-accent-dim pb-0.5 font-display text-sm font-medium text-accent-ink transition-colors hover:border-accent-bright hover:text-ink";
const label = "font-mono text-[11px] uppercase tracking-[0.1em] text-accent-ink";

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
        <p className="mt-6 text-lg leading-relaxed text-body sm:text-xl">{project.summary}</p>
        <TagList items={project.stack} className="mt-8" />
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer" className={textLink}>
                {link.label} →
              </a>
            </li>
          ))}
        </ul>

        <aside aria-labelledby="how-built-heading" className="mt-10 rounded-md bg-surface p-5 ring-1 ring-inset ring-line">
          <h2 id="how-built-heading" className={label}>
            How it was built
          </h2>
          <p className="mt-2 text-base leading-relaxed text-body">{project.howBuilt}</p>
        </aside>
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
        <section aria-labelledby="glance-heading">
          <SectionHeading id="glance-heading">At a glance</SectionHeading>
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
          <SectionHeading id="problem-heading">Context and constraints</SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-heading">{project.problem}</p>
        </section>

        <section aria-labelledby="decisions-heading" className="mt-16">
          <SectionHeading id="decisions-heading">Key decisions</SectionHeading>
          <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
            {project.decisions.map((item) => (
              <li key={item.decision} className="py-5">
                <h3 className="font-display text-base font-semibold text-heading">{item.decision}</h3>
                <dl className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-[6rem_1fr]">
                  <dt className="font-mono text-xs leading-6 text-muted">Why</dt>
                  <dd className="text-base leading-relaxed text-body">{item.why}</dd>
                  <dt className="font-mono text-xs leading-6 text-muted">Trade-off</dt>
                  <dd className="text-base leading-relaxed text-muted">{item.tradeoff}</dd>
                </dl>
              </li>
            ))}
          </ul>
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

      <section aria-labelledby="architecture-heading" className="mt-16">
        <SectionHeading id="architecture-heading">Architecture</SectionHeading>
        <div className="mt-6">
          <ArchitectureDiagram />
        </div>
        <ul className="mt-8 max-w-3xl divide-y divide-hairline border-y border-hairline">
          {project.architecture.map((point) => (
            <li key={point} className="py-3 text-base leading-relaxed text-muted">
              {point}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 max-w-3xl">
        <section aria-labelledby="hardest-heading">
          <SectionHeading id="hardest-heading">What was hardest</SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-heading">{project.hardest}</p>
        </section>

        <section aria-labelledby="mistake-heading" className="mt-16">
          <SectionHeading id="mistake-heading">What went wrong</SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-heading">{project.mistake}</p>
        </section>

        <section aria-labelledby="release-heading" className="mt-16">
          <SectionHeading id="release-heading">Testing and release</SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-heading">{project.release}</p>
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
