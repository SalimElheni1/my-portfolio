import { skillTiers } from "@/content/skills";
import { SectionHeading } from "@/components/section-heading";
import { TagList } from "@/components/tag-list";

export function Skills() {
  return (
    <section aria-labelledby="stack-heading" className="flex flex-col gap-6">
      <SectionHeading id="stack-heading" eyebrow="04 / Stack matrix" meta="Grouped by depth of use">
        Tools and technologies
      </SectionHeading>
      <div className="divide-y divide-line2 rounded-md bg-surface px-[26px] shadow-card ring-1 ring-inset ring-line">
        {skillTiers.map((tier, index) => {
          const isShortList = tier.items.every((item) => item.length <= 28);
          return (
            <div key={tier.label} className="flex flex-wrap gap-x-6 gap-y-3 py-[22px]">
              <h3 className="flex-[1_1_260px] font-display text-base font-semibold leading-6 text-ink">
                {tier.label}
              </h3>
              <div className="flex-[1_1_340px]">
                {isShortList ? (
                  <TagList items={tier.items} tone={index === 0 ? "accent" : "neutral"} />
                ) : (
                  <ul className="flex flex-col gap-1.5 text-sm leading-snug text-muted">
                    {tier.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
