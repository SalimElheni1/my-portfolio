const steps = [
  { label: "Understand", note: "A Quranic association branch, run entirely on paper" },
  { label: "Build", note: "Offline-first desktop app: Electron, React, SQLite" },
  { label: "Ship", note: "v1.0.0 in production 18 days after the first commit" },
  { label: "Improve", note: "20+ releases since, in daily use" },
];

/** One project, start to release. Plain HTML so it stays legible at every width. */
export function SystemMap() {
  return (
    <figure className="rounded-lg border border-rule bg-surface p-7 shadow-elev-1 sm:p-9">
      <figcaption className="font-display text-base font-medium text-heading">
        How the Quran Association Manager got built
      </figcaption>
      <ol className="mt-7 flex flex-col">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li
              key={step.label}
              className="step-in relative pb-8 pl-9 last:pb-0"
              style={{ animationDelay: `${index * 140 + 150}ms` }}
            >
              {!isLast && (
                <span aria-hidden="true" className="absolute left-[6px] top-5 h-full w-px bg-rule" />
              )}
              <span
                aria-hidden="true"
                className={
                  isLast
                    ? "absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-accent shadow-glow-accent"
                    : "absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent-dim bg-surface"
                }
              />
              <p className="font-display text-lg font-medium leading-snug text-heading">{step.label}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{step.note}</p>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
