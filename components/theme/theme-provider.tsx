"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/** Dark by default, applied as data-theme on <html> and persisted under se-theme. */
export function ThemeProvider({
  children,
  ...props
}: Omit<ComponentProps<typeof NextThemesProvider>, "attribute" | "storageKey" | "defaultTheme" | "enableSystem">) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      storageKey="se-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
