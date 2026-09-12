/**
 * Decorative only: an abstract flowing path connecting four labeled nodes.
 * Static (no animation) so prefers-reduced-motion never has anything to disable.
 */
export function SystemMap() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 320 440"
      className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-sm"
    >
      <path
        d="M50,50 C170,50 170,150 250,150 C330,150 10,260 90,260 C170,260 290,360 220,360"
        stroke="currentColor"
        className="text-muted"
        strokeWidth="1"
        strokeDasharray="3 5"
        fill="none"
      />
      <circle cx="50" cy="50" r="7" className="fill-background stroke-accent" strokeWidth="2" />
      <circle cx="250" cy="150" r="7" className="fill-background stroke-accent" strokeWidth="2" />
      <circle cx="90" cy="260" r="7" className="fill-background stroke-accent" strokeWidth="2" />
      <circle cx="220" cy="360" r="9" className="fill-accent" />
      <text x="66" y="46" className="fill-muted font-mono" fontSize="11" letterSpacing="1">
        UNDERSTAND
      </text>
      <text x="266" y="146" className="fill-muted font-mono" fontSize="11" letterSpacing="1">
        BUILD
      </text>
      <text x="10" y="285" className="fill-muted font-mono" fontSize="11" letterSpacing="1">
        SHIP
      </text>
      <text x="236" y="356" className="fill-accent font-mono" fontSize="11" letterSpacing="1">
        IMPROVE
      </text>
    </svg>
  );
}
