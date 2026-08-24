/**
 * NewtonBotics branded lazy loader.
 * Variants: "page" (full viewport), "section" (block), "inline" (compact).
 */
import { CardSkeletonGrid } from "@/components/PageSkeletons";

export default function LazyLoader({
  variant = "section",
  label = "Loading",
  className = "",
}) {
  if (variant === "inline") {
    return (
      <div
        className={`inline-flex items-center gap-2 text-white/70 ${className}`}
        role="status"
        aria-live="polite"
        aria-label={label}
      >
        <span className="nb-loader-ring nb-loader-ring--sm" aria-hidden />
        <span className="text-sm font-medium tracking-wide">{label}…</span>
      </div>
    );
  }

  if (variant === "page") {
    return (
      <div
        className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm ${className}`}
        role="status"
        aria-live="polite"
        aria-label={label}
      >
        <div className="flex flex-col items-center gap-5">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <span className="nb-loader-ring" aria-hidden />
            <span className="nb-loader-core" aria-hidden />
          </div>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-white/80">
            {label}
          </p>
          <div className="nb-loader-bar" aria-hidden />
        </div>
      </div>
    );
  }

  // section (default)
  return (
    <div
      className={`flex min-h-[220px] w-full items-center justify-center py-12 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-12 w-12 items-center justify-center">
          <span className="nb-loader-ring" aria-hidden />
          <span className="nb-loader-core" aria-hidden />
        </div>
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/60">
          {label}
        </p>
      </div>
    </div>
  );
}

/** Skeleton placeholders for card grids while lazy chunks load */
export function LazySkeleton({
  cards = 3,
  variant = "media",
  cols,
  gap,
  className = "",
}) {
  return (
    <div className={`container mx-auto px-4 sm:px-6 py-12 ${className}`}>
      <div className="mb-8 mx-auto h-8 w-48 max-w-full nb-skeleton rounded-lg" />
      <CardSkeletonGrid
        count={cards}
        variant={variant}
        {...(cols ? { cols } : {})}
        {...(gap ? { gap } : {})}
      />
    </div>
  );
}
