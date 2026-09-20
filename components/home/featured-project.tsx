import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/project";
import { SectionHeading } from "@/components/section-heading";
import { TagList } from "@/components/tag-list";

export function FeaturedProject() {
  const project = projects[0];
  const shot = project.screenshots[0];
  const facts = [
    { label: "First commit", value: project.timeline.firstCommit },
    { label: "First release", value: project.timeline.firstRelease },
    { label: "Current release", value: project.timeline.currentRelease },
  ];

  return (
    <section aria-labelledby="selected-work-heading" className="wrap py-14 sm:py-20">
      <SectionHeading id="selected-work-heading">Selected work</SectionHeading>
      <article className="mt-8 grid overflow-hidden rounded-lg border border-accent-dim bg-surface shadow-glow-accent lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]">
        <div className="flex flex-col p-7 sm:p-10">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono text-xs text-accent-ink">{project.status}</span>
          </div>
          <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{project.description}</p>
          <TagList items={project.stack} className="mt-6" />
          <dl className="mt-8 grid gap-3 border-t border-rule pt-6 text-sm">
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[8rem_1fr] gap-4">
                <dt className="text-muted">{fact.label}</dt>
                <dd className="font-mono text-xs text-heading">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <Link
            href={`/work/${project.slug}`}
            className="mt-8 inline-flex w-fit items-center border-b border-accent-dim pb-0.5 font-display text-base font-medium text-accent-ink transition-colors hover:border-accent-bright hover:text-accent-bright"
          >
            Read the case study →
          </Link>
        </div>
        <div className="flex items-center border-t border-rule bg-raised p-4 sm:p-6 lg:border-l lg:border-t-0">
          <div className="w-full overflow-hidden rounded-md border border-border-strong">
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 1024px) 620px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </article>
    </section>
  );
}
