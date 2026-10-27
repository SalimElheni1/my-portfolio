import { Hero } from "@/components/home/hero";
import { FeaturedProject } from "@/components/home/featured-project";
import { ClientWork } from "@/components/home/client-work";
import { Skills } from "@/components/home/skills";
import { Timeline } from "@/components/home/timeline";
import { Contact } from "@/components/home/contact";

export default function Home() {
  return (
    <div className="wrap flex flex-col gap-14 pb-16 pt-10">
      <Hero />
      <FeaturedProject />
      <ClientWork />
      <Skills />
      <Timeline />
      <Contact />
    </div>
  );
}
