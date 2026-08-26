"use client";

import Image from "next/image";
import { useTheme } from "../../contexts/ThemeContext";
import {
  NEWTONBOTICS_LOGO,
  NEWTONBOTICS_LOGO_WIDTH,
  NEWTONBOTICS_LOGO_HEIGHT,
} from "@/lib/branding";

/**
 * Theme-aware logo: dark mode uses the full white-logo asset.
 * Light mode keeps the cyan "botics" block (no invert) and only inverts
 * the "newton" portion so text reads black on white backgrounds.
 */
export default function SiteLogo({
  className = "w-44 sm:w-52 h-auto object-contain",
  priority = false,
  sizes = "(max-width: 640px) 11rem, 13rem",
}) {
  const { theme, ready } = useTheme();
  const isLight =
    ready
      ? theme === "light"
      : typeof document !== "undefined" &&
        document.documentElement.classList.contains("theme-light");

  if (isLight) {
    return (
      <span className="nb-site-logo nb-site-logo--light relative inline-block leading-none">
        <Image
          src={NEWTONBOTICS_LOGO}
          alt="NewtonBotics"
          width={NEWTONBOTICS_LOGO_WIDTH}
          height={NEWTONBOTICS_LOGO_HEIGHT}
          className={`${className} nb-site-logo__newton block max-w-none`}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          unoptimized
          sizes={sizes}
        />
        <Image
          src={NEWTONBOTICS_LOGO}
          alt=""
          width={NEWTONBOTICS_LOGO_WIDTH}
          height={NEWTONBOTICS_LOGO_HEIGHT}
          className={`${className} nb-site-logo__botics absolute left-0 top-0 max-w-none`}
          priority={priority}
          unoptimized
          sizes={sizes}
          aria-hidden
        />
      </span>
    );
  }

  return (
    <Image
      src={NEWTONBOTICS_LOGO}
      alt="NewtonBotics"
      width={NEWTONBOTICS_LOGO_WIDTH}
      height={NEWTONBOTICS_LOGO_HEIGHT}
      className={className}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      unoptimized
      sizes={sizes}
    />
  );
}
