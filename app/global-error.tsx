"use client";

// Replaces the root layout when that fails, so it can't rely on globals.css,
// the fonts, or the theme: inline styles in the dark theme's colors.
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0f1419",
          color: "#f3f4f6",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <title>Something went wrong · Salim Elhani</title>
        <main style={{ padding: 24, maxWidth: 560 }}>
          <h1 style={{ fontSize: 32, margin: 0 }}>Something went wrong.</h1>
          <p style={{ color: "#94a3b8", lineHeight: 1.6 }}>
            The site hit an unexpected error. Trying again usually fixes it.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              minHeight: 44,
              padding: "0 24px",
              border: 0,
              borderRadius: 8,
              background: "#b8501f",
              color: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
