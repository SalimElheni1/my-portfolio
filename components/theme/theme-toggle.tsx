"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";

const subscribeNoop = () => () => {};

/** True only after client hydration, without setState-in-effect. */
function useHasMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();

  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label="Toggle colour theme"
      aria-pressed={isLight}
      className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-surface text-ink ring-1 ring-inset ring-line2 transition-colors hover:bg-surface2"
    >
      {mounted && (isLight ? <MoonIcon size={15} /> : <SunIcon size={15} />)}
    </button>
  );
}
