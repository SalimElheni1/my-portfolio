import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/project";

function resolveSiteUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.NODE_ENV === "production") {
    throw new Error("SITE_URL is not set — set it to the site's public address (e.g. https://example.com) wherever the site is built and run.");
  }
  return "http://localhost:3000";
}

/** Public address of the site, used for canonical links, the sitemap, and social previews. */
export const siteUrl = resolveSiteUrl();

/** Every public page, for the sitemap. */
export const sitePaths = ["/", "/about", ...projects.map((project) => `/work/${project.slug}`)];

/** Link-preview fields every page shares. A page that sets openGraph replaces the layout's whole object, so pages spread these back in. */
export const openGraphDefaults = { type: "website", siteName: profile.name } as const;

/** A page's title, description, and canonical address, reused for its link preview (Open Graph and X). */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraphDefaults, title, description, url: path },
  };
}

/** schema.org Person data for the home page, so searches for the name find this site. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: siteUrl,
  sameAs: [profile.github.url, profile.linkedin.url],
  address: { "@type": "PostalAddress", addressCountry: "TN" },
  worksFor: { "@type": "Organization", name: "PerfectSoft" },
  knowsAbout: [...profile.headlineStack.daily, ...profile.headlineStack.shipped],
};
