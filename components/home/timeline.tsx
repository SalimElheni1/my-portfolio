import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { path } from "@/content/experience";
import { ArrowRightIcon } from "@/components/icons";

// Education and languages live on the About page only, so the home page stays on the work.
export function Timeline() {
  return (
    <section aria-labelledby="path-heading" className="flex flex-col gap-6">
      <SectionHeading id="path-heading" eyebrow="Path">
        Computer vision to production JavaScript
      </SectionHeading>

      <ol className="divide-y divide-line2 rounded-md bg-surface shadow-card ring-1 ring-inset ring-line">
        {path.map((item) => (
          <li key={item.title} className="flex flex-wrap gap-x-7 gap-y-2 px-[26px] py-[22px]">
            <time
              className={`flex-[0_1_170px] font-mono text-[12.5px] font-medium leading-5 ${item.current ? "text-accent-ink" : "text-muted"}`}
            >
              {item.period}
            </time>
            <div className="flex-[1_1_320px]">
              <h3 className="font-display text-[17px] font-semibold leading-6 text-ink">{item.title}</h3>
              <p className="mt-1 text-[15.5px] leading-[1.6] text-body">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <Link
        href="/about"
        className="inline-flex min-h-11 items-center gap-2 self-start font-display text-sm font-medium leading-5 text-accent-ink hover:underline"
      >
        Education, languages, and full experience
        <ArrowRightIcon size={12} />
      </Link>
    </section>
  );
}
