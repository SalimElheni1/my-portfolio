import { SectionHeading } from "@/components/section-heading";
import { timeline } from "@/content/experience";

export function Timeline() {
  return (
    <section aria-labelledby="timeline-heading" className="wrap py-14 sm:py-20">
      <SectionHeading id="timeline-heading">Timeline</SectionHeading>
      <ol className="mt-8 divide-y divide-hairline border-y border-hairline">
        {timeline.map((item) => (
          <li key={item.period} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-8">
            <span className="font-mono text-xs text-muted sm:pt-1">{item.period}</span>
            <span className="text-base text-heading">{item.label}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
