import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dark-theme tokens from app/globals.css; ImageResponse can't read CSS variables.
const colors = { bg: "#0f1419", ink: "#f3f4f6", body: "#cbd5e1", muted: "#94a3b8", accent: "#e8845f" };

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: colors.bg,
          borderTop: `12px solid ${colors.accent}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, color: colors.ink, letterSpacing: "-0.02em" }}>
            {profile.name}
          </div>
          <div style={{ marginTop: 12, fontSize: 36, color: colors.accent }}>{profile.title}</div>
          <div style={{ marginTop: 40, fontSize: 30, lineHeight: 1.4, color: colors.body, maxWidth: 940 }}>
            4+ years of production JavaScript: MeteorJS, Node.js, MongoDB, payment integrations, and Cypress testing.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: colors.muted }}>
          <span>{profile.location}</span>
          <span>{profile.availability}</span>
        </div>
      </div>
    ),
    size,
  );
}
