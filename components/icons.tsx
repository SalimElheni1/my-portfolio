import type { SVGProps } from "react";

/** Inline icons copied from the design handoff. All are decorative. */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size, ...props }: IconProps, box: number, defaults: SVGProps<SVGSVGElement>) {
  return {
    width: size ?? box,
    height: size ?? box,
    viewBox: `0 0 ${box} ${box}`,
    "aria-hidden": true as const,
    focusable: false as const,
    className: "shrink-0",
    ...defaults,
    ...props,
  };
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props, 12, { fill: "currentColor" })}>
      <path d="M9.131 6.75H0v-1.5h9.131L4.931 1.05 6 0l6 6-6 6-1.069-1.05 4.2-4.2z" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base(props, 12, { fill: "currentColor" })}>
      <path d="M5.25 0v9.131L1.05 4.931 0 6l6 6 6-6-1.05-1.069-4.2 4.2V0h-1.5z" />
    </svg>
  );
}

export function DownloadTrayIcon(props: IconProps) {
  return (
    <svg
      {...base(props, 16, { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" })}
    >
      <path d="M8 1.8v8.4M4.6 7.1 8 10.4l3.4-3.3M2 13.2h12" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props, 16, { fill: "none", stroke: "currentColor", strokeWidth: 1.4 })}>
      <rect x="1.3" y="3" width="13.4" height="10" rx="1.6" />
      <path d="M1.7 4 8 8.7 14.3 4" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg {...base(props, 16, { fill: "currentColor" })}>
      <path d="M8 0a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.88.51-1.08-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 014 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 008 0z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base(props, 16, { fill: "currentColor" })}>
      <path d="M3.6 1.4a1.6 1.6 0 110 3.2 1.6 1.6 0 010-3.2zM2.2 5.9h2.8v8.3H2.2V5.9zm4.6 0h2.7v1.13h.04c.38-.68 1.3-1.4 2.67-1.4 2.85 0 3.38 1.79 3.38 4.12v4.45h-2.82v-3.95c0-.94-.02-2.15-1.35-2.15-1.35 0-1.56 1.03-1.56 2.09v4.01H6.8V5.9z" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base(props, 16, { fill: "currentColor" })}>
      <path d="M8 11a3 3 0 100-6 3 3 0 000 6zm0 1.5A4.5 4.5 0 118 3.5a4.5 4.5 0 010 9zM7.25 0h1.5v2.25h-1.5V0zm0 13.75h1.5V16h-1.5v-2.25zM0 7.25h2.25v1.5H0v-1.5zm13.75 0H16v1.5h-2.25v-1.5zM2.4 3.46l1.06-1.06 1.6 1.59-1.07 1.06L2.4 3.46zm9.54 9.54l1.06-1.06 1.6 1.59-1.07 1.06-1.59-1.59zM3.46 13.6l-1.06-1.06 1.59-1.6 1.06 1.07-1.59 1.59zM13 4.06 11.94 3l1.59-1.6 1.06 1.07L13 4.06z" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base(props, 24, { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" })}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <svg {...base(props, 18, { fill: "currentColor" })}>
      <path d="M6.4 13.6 1.8 9l4.6-4.6 1.1 1.1L4 9l3.5 3.5-1.1 1.1zm5.2 0-1.1-1.1L14 9l-3.5-3.5 1.1-1.1L16.2 9l-4.6 4.6z" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...base(props, 18, { fill: "currentColor", viewBox: "0 0 17 18" })}>
      <path d="M8.5 0 16 2.6v6.2c0 4-3.2 7.6-7.5 9.2C4.2 16.4 1 12.8 1 8.8V2.6L8.5 0zm0 1.6L2.5 3.7v5.1c0 3.2 2.5 6.2 6 7.6 3.5-1.4 6-4.4 6-7.6V3.7L8.5 1.6zm3.3 4.2 1.1 1.1-4.9 4.9L5.1 9.9 6.2 8.8l1.8 1.8 3.8-3.8z" />
    </svg>
  );
}

export function FocusIcon(props: IconProps) {
  return (
    <svg {...base(props, 18, { fill: "currentColor" })}>
      <path d="M2 2h6v1.5H3.5V8H2V2zm8 0h6v6h-1.5V3.5H10V2zM2 10h1.5v4.5H8V16H2v-6zm12.5 0H16v6h-6v-1.5h4.5V10zM9 6.75A2.25 2.25 0 1 1 9 11.25 2.25 2.25 0 0 1 9 6.75z" />
    </svg>
  );
}
