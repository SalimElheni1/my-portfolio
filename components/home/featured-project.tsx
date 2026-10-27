import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/project";
import { SectionHeading } from "@/components/section-heading";
import { TagList } from "@/components/tag-list";
import { ArrowRightIcon } from "@/components/icons";

const chip =
  "inline-flex items-center gap-[7px] rounded-lg bg-surface2 px-3.5 py-[3px] font-mono text-[11px] font-medium leading-4 ring-1 ring-inset ring-line2";

export function FeaturedProject() {
  const project = projects[0];
  const shot = project.screenshots[0];
  const facts = [
    { label: "First commit", value: project.timeline.firstCommit },
    { label: "First production release", value: `${project.timeline.firstRelease} (17 days)` },
    { label: "Current release", value: project.timeline.currentRelease },
    { label: "Architecture", value: project.architectureSummary, accent: true },
  ];

  return (
    <section id="work" aria-labelledby="selected-work-heading" className="flex flex-col gap-6">
      <SectionHeading
        id="selected-work-heading"
        eyebrow="Selected work"
        meta="Desktop • In daily use"
      >
        Featured project
      </SectionHeading>

      <article className="flex flex-wrap overflow-hidden rounded-md bg-surface shadow-panel ring-1 ring-inset ring-line">
        <div className="flex flex-[1_1_380px] flex-col justify-between gap-5 p-[clamp(22px,2.6vw,36px)]">
          <div className="flex flex-wrap gap-2">
            <span className={`${chip} text-accent-ink`}>
              <span aria-hidden="true" className="size-[7px] rounded-full bg-accent" />
              Source available
            </span>
            <span className={`${chip} text-amber`}>In production</span>
          </div>

          <div>
            <h3 className="font-display text-[clamp(19px,2vw,21px)] font-semibold leading-[1.35] text-ink">
              {project.name}
            </h3>
            <p lang="ar" dir="rtl" className="mt-1 text-left font-arabic text-[13px] font-medium leading-[18px] text-accent-ink">
              برنامج إدارة الجمعية القرآنية
            </p>
          </div>

          <p className="text-[15.5px] leading-[1.6] text-body">
            {project.description} Students, teachers, classes, attendance, and finances in one local system,
            built and maintained with AI coding agents under my direction, and released continuously since August 2025.
          </p>

          <TagList items={project.stack} />

          <dl className="flex flex-col gap-[7px] rounded-sm bg-surface3 p-4 ring-1 ring-inset ring-line3">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-4 font-mono text-[11px] font-medium leading-4">
                <dt className="text-muted">{fact.label}</dt>
                <dd className={`text-right ${fact.accent ? "text-accent-ink" : "text-ink"}`}>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 font-display text-sm font-medium leading-5 text-accent-ink hover:underline"
            >
              Source on GitHub
              <ArrowRightIcon size={12} />
            </a>
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex min-h-11 items-center gap-2 font-display text-sm font-medium leading-5 text-accent-ink hover:underline"
            >
              Read the case study
              <ArrowRightIcon size={12} />
            </Link>
          </div>
        </div>

        <div className="flex flex-[1_1_440px] items-center border-l border-line2 bg-mockbody p-[clamp(18px,2vw,24px)]">
          <div className="w-full overflow-hidden rounded-sm bg-mock ring-1 ring-inset ring-line">
            <div className="flex items-center gap-2 border-b border-line2 bg-mockbar px-3.5 py-[9px]">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#b8501f]" />
                <span className="size-2.5 rounded-full bg-[#f0a92a]" />
                <span className="size-2.5 rounded-full bg-[#4edea3]" />
              </span>
              <span className="flex-1 pr-[54px] text-center font-mono text-[11px] leading-4 text-muted">
                {project.name} — {project.timeline.currentRelease.split(" ")[0]}
              </span>
            </div>
            <div className="relative w-full" style={{ aspectRatio: `${shot.width} / ${shot.height}` }}>
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
