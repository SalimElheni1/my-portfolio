import type { ReactNode } from "react";

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{children}</h2>
  );
}
