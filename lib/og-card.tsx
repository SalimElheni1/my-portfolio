import { ImageResponse } from "next/og";

// Dark-theme tokens from app/globals.css; ImageResponse can't read CSS variables.
const colors = { bg: "#0f1419", ink: "#f3f4f6", body: "#cbd5e1", muted: "#94a3b8", accent: "#e8845f" };

type OgCard = {
  heading: string;
  subheading: string;
  body: string;
  footer: [left: string, right: string];
};

/** The link-preview image layout shared by every opengraph-image route. */
export function ogCard({ heading, subheading, body, footer }: OgCard, size: { width: number; height: number }) {
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
            {heading}
          </div>
          <div style={{ marginTop: 12, fontSize: 36, color: colors.accent }}>{subheading}</div>
          <div style={{ marginTop: 40, fontSize: 30, lineHeight: 1.4, color: colors.body, maxWidth: 940 }}>
            {body}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: colors.muted }}>
          <span>{footer[0]}</span>
          <span>{footer[1]}</span>
        </div>
      </div>
    ),
    size,
  );
}
