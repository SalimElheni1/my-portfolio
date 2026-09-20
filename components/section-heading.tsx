import type { ReactNode } from "react";

export function SectionHeading({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="font-display text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
      {children}
    </h2>
  );
}
