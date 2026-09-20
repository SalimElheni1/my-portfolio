"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work/quran-association-manager", label: "Work" },
  { href: "/about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas">
      <div className="wrap flex items-center justify-between py-4">
        <Link href="/" aria-label="Salim Elhani, home" className="flex shrink-0 items-center gap-2.5">
          <Logo className="h-7 w-7 shrink-0" />
          <span className="hidden font-display text-base font-semibold text-heading sm:inline">
            Salim Elhani
          </span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 sm:gap-9">
          {navLinks.map((link) => {
            const isActive = link.href.startsWith("/") && pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "border-b-2 py-1 font-display text-sm transition-colors hover:text-heading",
                  isActive ? "border-accent font-medium text-heading" : "border-transparent text-muted",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
