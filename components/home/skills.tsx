import { skillTiers } from "@/content/skills";
import { SectionHeading } from "@/components/section-heading";

export function Skills() {
  return (
    <section className="px-6 pb-24 sm:px-10 lg:px-16">
      <SectionHeading>Engineering</SectionHeading>
      <div className="mt-6 flex flex-col gap-5">
        {skillTiers.map((tier) => (
          <p key={tier.label} className="max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
            <span className="font-medium text-foreground">{tier.label} — </span>
            {tier.items.join(", ")}.
          </p>
        ))}
      </div>
    </section>
  );
}
