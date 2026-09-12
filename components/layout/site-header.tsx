"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work/quran-association-manager", label: "Work" },
  { href: "/about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-6 pt-8 sm:px-10 lg:px-16">
      <Link
        href="/"
        className="font-serif text-lg italic font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Salim Elhani
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-8 sm:gap-10">
        {navLinks.map((link) => {
          const isActive = link.href.startsWith("/") && pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "text-sm transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                isActive ? "font-medium text-foreground opacity-100" : "text-foreground opacity-90",
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}
