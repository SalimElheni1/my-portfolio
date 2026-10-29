import { profile } from "@/content/profile";
import { formatYearsExperience } from "@/lib/date";
import { ogCard } from "@/lib/og-card";

export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Regenerated at most once a day, like the pages, so the years stay current.
export const revalidate = 86400;

export default function Image() {
  return ogCard(
    {
      heading: profile.name,
      subheading: profile.title,
      body: `${formatYearsExperience(profile.experienceStartDateISO)} of production JavaScript: MeteorJS, Node.js, MongoDB, payment integrations, and Cypress testing.`,
      footer: [profile.location, profile.availability],
    },
    size,
  );
}
