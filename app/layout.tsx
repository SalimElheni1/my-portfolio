import type { Metadata } from "next";
import { Epilogue, Hanken_Grotesk, JetBrains_Mono, Reem_Kufi } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { profile } from "@/content/profile";
import { formatYearsExperience } from "@/lib/date";
import { openGraphDefaults, siteUrl } from "@/lib/site";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["arabic"],
  weight: ["500"],
});

// Every page is rebuilt at most once a day, so dates worked out while
// rendering (years of experience, the footer year) stay current without a
// redeploy.
export const revalidate = 86400;

const title = {
  default: "Salim Elhani — Full-Stack JavaScript Developer",
  template: "%s · Salim Elhani",
};

export function generateMetadata(): Metadata {
  const years = formatYearsExperience(profile.experienceStartDateISO);
  return {
    metadataBase: new URL(siteUrl),
    title,
    description: `Full-stack JavaScript developer in ${profile.location}. ${years} of production work across backend logic, payment and calendar integrations, front end, and automated end-to-end testing.`,
    openGraph: {
      ...openGraphDefaults,
      // the same template, so each page's link preview gets the "· Salim Elhani" suffix too
      title,
      description: `${years} of production JavaScript. Creator of Quran Association Manager, an offline-first desktop system in daily use.`,
      url: "/",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${epilogue.variable} ${hanken.variable} ${jetbrainsMono.variable} ${reemKufi.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-body text-[15.5px] leading-[1.6]">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-display focus:font-semibold focus:text-on-accent"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
