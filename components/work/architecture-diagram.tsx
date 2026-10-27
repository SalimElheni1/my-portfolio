const steps = [
  { title: "Interface", detail: "React, Arabic right-to-left" },
  { title: "Permission check", detail: "Session and role, on every call" },
  { title: "Business rules", detail: "Validation, fees, reports" },
  { title: "Encrypted database", detail: "SQLite, on this computer" },
];

const background = ["Automatic backups, protected by the association's key", "Monthly fee billing"];

const box = "rounded-md bg-surface px-4 py-3 ring-1 ring-inset ring-line";

/** Simplified picture of how a request moves through the desktop app. */
export function ArchitectureDiagram() {
  return (
    <figure className="flex flex-col gap-4">
      <ol aria-label="How a request moves through the app" className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-2 lg:flex-1 lg:flex-row lg:items-center">
            {index > 0 && (
              <span aria-hidden="true" className="self-center font-mono text-sm text-muted lg:rotate-0 rotate-90">
                →
              </span>
            )}
            <div className={`${box} flex-1`}>
              <p className="font-display text-sm font-semibold text-heading">{step.title}</p>
              <p className="mt-0.5 font-mono text-xs text-muted">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="rounded-md border border-dashed border-line2 px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent-ink">Running in the background</p>
        <ul className="mt-2 flex flex-col gap-1 text-sm text-muted sm:flex-row sm:gap-6">
          {background.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <figcaption className="text-sm text-muted">
        Everything runs on one computer, with no server and no internet connection.
      </figcaption>
    </figure>
  );
}
