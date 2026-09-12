const items = [
  {
    number: "01",
    title: "Build",
    description: "Full-stack web applications and backend systems, from data modelling to the interface.",
  },
  {
    number: "02",
    title: "Integrate & test",
    description:
      "Payment and billing integrations, calendar workflows, and automated end-to-end test coverage.",
  },
  {
    number: "03",
    title: "Maintain & improve",
    description: "Legacy modernization, performance, and long-term production support.",
  },
];

export function WhatIDo() {
  return (
    <section className="px-6 pb-20 sm:px-10 lg:px-16">
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
        {items.map((item) => (
          <div key={item.number}>
            <p className="font-mono text-xs text-muted">{item.number}</p>
            <h3 className="mt-3 text-lg font-medium text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
