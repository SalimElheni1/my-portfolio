import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const navLinks = [
  { href: "/work/quran-association-manager", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 pt-8 sm:px-10 lg:px-16">
      <Link
        href="/"
        className="font-serif text-lg italic font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Salim Elhani
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-8 sm:gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-foreground opacity-90 transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
