import { skillTiers } from "@/content/skills";
import { SectionHeading } from "@/components/section-heading";
import { TagList } from "@/components/tag-list";

export function Skills() {
  return (
    <section aria-labelledby="engineering-heading" className="wrap py-14 sm:py-20">
      <SectionHeading id="engineering-heading">Engineering</SectionHeading>
      <dl className="mt-8 divide-y divide-hairline border-y border-hairline">
        {skillTiers.map((tier) => {
          const isShortList = tier.items.every((item) => item.length <= 28);
          return (
            <div key={tier.label} className="grid gap-3 py-5 md:grid-cols-[13rem_1fr] md:gap-10">
              <dt className="font-display text-base font-medium text-heading">{tier.label}</dt>
              <dd>
                {isShortList ? (
                  <TagList items={tier.items} />
                ) : (
                  <ul className="flex flex-col gap-1.5 text-base leading-snug text-muted">
                    {tier.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
