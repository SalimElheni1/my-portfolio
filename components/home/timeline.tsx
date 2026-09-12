import { SectionHeading } from "@/components/section-heading";

const timeline = [
  { period: "2014 – 2021", label: "Scientific research in computer vision and image processing, Monastir" },
  { period: "2016 – 2020", label: "University teaching — electronics, image processing, VHDL" },
  { period: "2021", label: "Full Stack JS Web Developer Bootcamp" },
  { period: "2022 – Present", label: "Full-Stack JavaScript Developer, PerfectSoft" },
];

export function Timeline() {
  return (
    <section className="px-6 pb-24 sm:px-10 lg:px-16">
      <SectionHeading>Timeline</SectionHeading>
      <ol className="mt-6 flex flex-col gap-5">
        {timeline.map((item) => (
          <li key={item.period} className="flex flex-col gap-1 sm:flex-row sm:gap-8">
            <span className="font-mono text-xs uppercase tracking-wider text-muted sm:w-40 sm:shrink-0">
              {item.period}
            </span>
            <span className="text-base text-foreground">{item.label}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
