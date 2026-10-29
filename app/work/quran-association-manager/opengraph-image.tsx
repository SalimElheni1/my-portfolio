import { profile } from "@/content/profile";
import { projects } from "@/content/project";
import { ogCard } from "@/lib/og-card";

const project = projects[0];

export const alt = `${project.name}, a case study by ${profile.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard(
    {
      heading: project.name,
      subheading: `Case study · ${profile.name}`,
      body: project.summary,
      footer: [project.stack.join(" · "), project.status],
    },
    size,
  );
}
