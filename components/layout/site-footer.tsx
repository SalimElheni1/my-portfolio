import Link from "next/link";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-line2 bg-footer py-7">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-xs leading-[18px] text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <Link href="/about" className="transition-colors hover:text-ink">
            About
          </Link>
          <span>{profile.title}</span>
        </p>
      </div>
    </footer>
  );
}
