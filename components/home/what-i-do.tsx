import { SectionHeading } from "@/components/section-heading";

const items = [
  {
    title: "Build",
    description: "Full-stack web applications and backend systems, from data modelling to the interface.",
  },
  {
    title: "Integrate and test",
    description:
      "Payment and billing integrations, calendar workflows, and automated end-to-end test coverage.",
  },
  {
    title: "Maintain and improve",
    description: "Legacy modernization, performance, and long-term production support.",
  },
];

export function WhatIDo() {
  return (
    <section aria-labelledby="what-i-do-heading" className="wrap py-14 sm:py-20">
      <SectionHeading id="what-i-do-heading">What I do</SectionHeading>
      <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-10">
        {items.map((item) => (
          <div key={item.title} className="border-t border-rule pt-5">
            <h3 className="font-display text-xl font-medium text-heading">{item.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
