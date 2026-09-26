import { Hero } from "@/components/home/hero";
import { WhatIDo } from "@/components/home/what-i-do";
import { FeaturedProject } from "@/components/home/featured-project";
import { Skills } from "@/components/home/skills";
import { Timeline } from "@/components/home/timeline";
import { Contact } from "@/components/home/contact";

export default function Home() {
  return (
    <div className="wrap flex flex-col gap-14 pb-16 pt-10">
      <Hero />
      <WhatIDo />
      <FeaturedProject />
      <Skills />
      <Timeline />
      <Contact />
    </div>
  );
}
