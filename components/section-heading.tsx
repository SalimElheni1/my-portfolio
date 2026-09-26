import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** e.g. "02 / Engineering disciplines" */
  eyebrow?: string;
  id?: string;
  meta?: string;
  children: ReactNode;
};

/** Header pattern repeated on sections 02 to 06: eyebrow and H2 left, mono meta right, rule below. */
export function SectionHeading({ eyebrow, id, meta, children }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line2 pb-3.5">
      <div>
        {eyebrow && (
          <p className="font-mono text-[11px] font-medium uppercase leading-4 tracking-[0.1em] text-accent-ink">
            {eyebrow}
          </p>
        )}
        <h2
          id={id}
          className="mt-1 font-display text-[clamp(23px,2.5vw,28px)] font-semibold leading-[1.28] tracking-[-0.02em] text-ink"
        >
          {children}
        </h2>
      </div>
      {meta && (
        <p className="font-mono text-[11px] font-medium leading-4 tracking-[0.44px] text-muted">{meta}</p>
      )}
    </div>
  );
}
