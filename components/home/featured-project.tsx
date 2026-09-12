import Link from "next/link";
import { projects } from "@/content/project";
import { SectionHeading } from "@/components/section-heading";

export function FeaturedProject() {
  const project = projects[0];

  return (
    <section className="px-6 pb-24 sm:px-10 lg:px-16">
      <SectionHeading>Selected work</SectionHeading>
      <div className="mt-6 rounded-3xl bg-surface p-10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] sm:p-14">
        <div className="flex items-center gap-2.5">
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-xs uppercase tracking-wider text-accent">{project.status}</span>
        </div>
        <h3 className="mt-5 font-serif text-2xl font-medium text-foreground sm:text-3xl">{project.name}</h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{project.description}</p>
        <p className="mt-7 text-sm text-muted">{project.stack.join(" — ")}</p>
        <Link
          href={`/work/${project.slug}`}
          className="mt-9 inline-flex items-center border-b border-accent pb-0.5 text-base font-medium text-accent transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Read the case study →
        </Link>
      </div>
    </section>
  );
}
