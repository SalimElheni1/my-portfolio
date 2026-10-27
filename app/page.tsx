import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedProject } from "@/components/home/featured-project";
import { ClientWork } from "@/components/home/client-work";
import { Skills } from "@/components/home/skills";
import { Timeline } from "@/components/home/timeline";
import { Contact } from "@/components/home/contact";
import { personJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="wrap flex flex-col gap-14 pb-16 pt-10">
      <script
        type="application/ld+json"
        // escaping "<" keeps the JSON from closing the script tag early
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <FeaturedProject />
      <ClientWork />
      <Skills />
      <Timeline />
      <Contact />
    </div>
  );
}
