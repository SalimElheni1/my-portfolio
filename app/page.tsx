import { Hero } from "@/components/home/hero";
import { WhatIDo } from "@/components/home/what-i-do";
import { FeaturedProject } from "@/components/home/featured-project";
import { Skills } from "@/components/home/skills";
import { Timeline } from "@/components/home/timeline";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <FeaturedProject />
      <Skills />
      <Timeline />
    </>
  );
}
