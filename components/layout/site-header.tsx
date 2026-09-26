"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Logo } from "@/components/logo";
import { DownloadIcon } from "@/components/icons";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "What I do" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof navLinks)[number]["id"];

/** A section becomes active once it crosses the vertical middle of the viewport. */
function useScrollSpy(enabled: boolean) {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    for (const { id } of navLinks) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return [active, setActive] as const;
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useScrollSpy(isHome);

  return (
    <header className="sticky top-0 z-50 border-b border-line2 bg-header backdrop-blur-[24px]">
      <div className="wrap flex flex-wrap items-center justify-between gap-3.5 py-3">
        <Link href="/" aria-label="Salim Elhani, home" className="flex items-center gap-3.5">
          <Logo className="h-[38px] w-[21px] shrink-0" />
          <span className="flex flex-col">
            <span className="font-display text-base font-medium leading-[22px] tracking-[-0.4px] text-ink">
              {profile.name}
            </span>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic text-[11px] font-medium leading-4 tracking-[0.275px] text-muted"
            >
              سليم الهاني
            </span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <nav
            aria-label="Primary"
            className="flex gap-1 rounded-lg bg-surface p-1 ring-1 ring-inset ring-line2"
          >
            {navLinks.map((link) => {
              const isActive = isHome && active === link.id;
              return (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={() => setActive(link.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-10 items-center rounded-lg px-4 font-mono text-[13px] font-medium leading-[18px] tracking-[0.26px] transition-colors hover:text-ink",
                    isActive
                      ? "bg-surface2 text-accent-ink ring-1 ring-inset ring-line"
                      : "text-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {profile.showAvailability && (
            <p className="hidden items-center gap-2 rounded-lg bg-surface px-4 py-[5px] font-mono text-[11px] font-medium leading-4 tracking-[0.44px] text-muted ring-1 ring-inset ring-line2 sm:flex">
              <span aria-hidden="true" className="size-2 animate-se-pulse rounded-full bg-green" />
              Available for roles
            </p>
          )}

          <ThemeToggle />

          <a
            href="/Salim_Elhani_CV.pdf"
            download
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-[18px] font-mono text-xs font-semibold leading-4 text-on-accent transition-colors hover:bg-accent-hover"
          >
            <DownloadIcon size={11} />
            CV
          </a>
        </div>
      </div>
    </header>
  );
}
