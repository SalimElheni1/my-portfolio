export function TagList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-sm border border-hairline bg-raised px-2 py-1 font-mono text-2xs text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
