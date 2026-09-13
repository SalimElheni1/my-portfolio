import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/project";
import { SectionHeading } from "@/components/section-heading";

const project = projects[0];

export const metadata: Metadata = {
  title: project.name,
  description: project.description,
};

export default function ProjectPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
      <Link
        href="/"
        className="text-sm text-muted transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        ← Back to home
      </Link>

      <div className="mt-8 flex items-center gap-2.5">
        <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
        <span className="font-mono text-xs uppercase tracking-wider text-accent">{project.status}</span>
      </div>
      <h1 className="mt-5 font-serif text-4xl italic text-foreground sm:text-5xl">{project.name}</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{project.description}</p>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <p className="text-sm text-muted">{project.stack.join(" — ")}</p>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="border-b border-accent pb-0.5 text-sm font-medium text-accent transition-opacity hover:opacity-70"
        >
          View repository →
        </a>
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-border">
        <Image
          src={project.screenshots[0].src}
          alt={project.screenshots[0].alt}
          width={project.screenshots[0].width}
          height={project.screenshots[0].height}
          className="w-full"
          priority
        />
      </div>

      <section className="mt-20">
        <SectionHeading>Timeline</SectionHeading>
        <p className="mt-6 text-base leading-relaxed text-muted">
          First commit {project.timeline.firstCommit} · First release {project.timeline.firstRelease} · Current
          release {project.timeline.currentRelease}
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted">{project.timeline.note}</p>
      </section>

      <section className="mt-16">
        <SectionHeading>The problem</SectionHeading>
        <p className="mt-6 text-lg leading-relaxed text-foreground">{project.problem}</p>
      </section>

      <section className="mt-16">
        <SectionHeading>The solution</SectionHeading>
        <p className="mt-6 text-lg leading-relaxed text-foreground">{project.solution}</p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {project.modules.map((module) => (
            <li
              key={module}
              className="rounded-full border border-border px-4 py-1.5 text-sm text-muted"
            >
              {module}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.screenshots.slice(1).map((shot) => (
            <div key={shot.src} className="overflow-hidden rounded-2xl border border-border">
              <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} className="w-full" />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading>Architecture</SectionHeading>
        <ul className="mt-6 flex flex-col gap-3">
          {project.architecture.map((point) => (
            <li key={point} className="text-base leading-relaxed text-muted">
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <SectionHeading>Outcome</SectionHeading>
        <p className="mt-6 text-lg leading-relaxed text-foreground">{project.outcome}</p>
      </section>

      <div className="mt-24 border-t border-border pt-10">
        <p className="text-base text-muted">
          Want to talk about this project, or something similar?{" "}
          <Link href="/about" className="border-b border-accent pb-0.5 text-accent hover:opacity-70">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
