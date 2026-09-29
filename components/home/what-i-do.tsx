import { SectionHeading } from "@/components/section-heading";
import { CodeIcon, FocusIcon, ShieldCheckIcon } from "@/components/icons";

const items = [
  {
    title: "Build",
    description:
      "Full-stack web applications and an offline-first desktop app, from the data layer through to the interface.",
    Icon: CodeIcon,
  },
  {
    title: "Integrate and test",
    description:
      "Payment and subscription systems, calendar synchronization, and automated end-to-end coverage with Cypress.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Maintain and modernize",
    description:
      "Maintaining live MeteorJS and Blaze products, and helping migrate a legacy PHP platform to MeteorJS/React and Next.js.",
    Icon: FocusIcon,
  },
];

export function WhatIDo() {
  return (
    <section id="about" aria-labelledby="what-i-do-heading" className="flex flex-col gap-6">
      <SectionHeading
        id="what-i-do-heading"
        eyebrow="Focus"
      >
        What I do
      </SectionHeading>
      <div className="flex flex-wrap gap-5">
        {items.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="flex flex-[1_1_300px] flex-col gap-4 rounded-md bg-surface p-6 shadow-card ring-1 ring-inset ring-line"
          >
            <span className="flex size-[46px] items-center justify-center rounded-sm bg-apill-bg text-accent-ink ring-1 ring-inset ring-line2">
              <Icon size={18} />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold leading-[26px] text-ink">{title}</h3>
              <p className="mt-1.5 text-[15.5px] leading-[1.6] text-body">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
