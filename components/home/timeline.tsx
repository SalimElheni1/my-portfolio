import { SectionHeading } from "@/components/section-heading";
import { education, path } from "@/content/experience";
import { profile } from "@/content/profile";

const panel = "rounded-md bg-surface shadow-card ring-1 ring-inset ring-line";
const label = "font-mono text-[11px] font-medium uppercase leading-4 tracking-[0.12em] text-accent-ink";

// The bootcamp is already a row in the path above; only degrees are listed here.
const degrees = education.slice(1);

export function Timeline() {
  return (
    <section aria-labelledby="path-heading" className="flex flex-col gap-6">
      <SectionHeading id="path-heading" eyebrow="Path">
        Computer vision to production JavaScript
      </SectionHeading>

      <ol className={`${panel} divide-y divide-line2`}>
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

      <div className="flex flex-wrap gap-5">
        <div className={`${panel} flex flex-[1_1_300px] flex-col gap-4 p-6`}>
          <h3 className={label}>Education</h3>
          {degrees.map((item) => (
            <div key={item.credential}>
              <p className="font-display text-base font-semibold leading-[22px] text-ink">{item.credential}</p>
              <p className="font-mono text-xs leading-[18px] text-muted">
                {item.institution} · {item.period.replace(" – ", "–")}
              </p>
            </div>
          ))}
        </div>
        <div className={`${panel} flex flex-[1_1_300px] flex-col gap-4 p-6`}>
          <h3 className={label}>Languages</h3>
          {profile.languages.map((lang) => (
            <div key={lang.name} className="flex items-baseline justify-between gap-4">
              <p className="font-display text-base font-semibold leading-[22px] text-ink">{lang.name}</p>
              <p className="font-mono text-xs leading-[18px] text-muted">
                {lang.level.replace(" proficiency", "")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
