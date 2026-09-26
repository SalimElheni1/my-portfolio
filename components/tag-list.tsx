type TagListProps = {
  items: string[];
  /** accent pills mark daily-production tools; neutral is the default */
  tone?: "neutral" | "accent";
  className?: string;
};

export function TagList({ items, tone = "neutral", className = "" }: TagListProps) {
  const toneClass = tone === "accent" ? "bg-apill-bg text-apill-ink" : "bg-pill-bg text-pill-ink";
  return (
    <ul className={`flex flex-wrap gap-[7px] ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-lg px-[11px] py-1 font-mono text-[11.5px] font-medium leading-4 tracking-[0.44px] ${toneClass}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
