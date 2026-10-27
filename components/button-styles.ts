/** Shared button shells from the handoff: 44px minimum hit target, 12px radius. */
const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg font-display text-sm transition-colors active:translate-y-px";

export const primaryButton = `${base} bg-accent px-6 font-semibold text-on-accent hover:bg-accent-hover`;

export const secondaryButton = `${base} bg-surface px-[22px] font-medium text-ink ring-1 ring-inset ring-line hover:bg-surface2`;

/** Square icon-only variant of the secondary button; always pair it with an aria-label. */
export const iconButton = `${base} size-11 bg-surface text-ink ring-1 ring-inset ring-line hover:bg-surface2`;
