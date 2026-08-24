"use client";

/**
 * Renders remote CMS/CDN images without next/image host allowlisting.
 * Local paths can still go through next/image callers if needed.
 */
export default function RemoteImage({
  src,
  alt = "",
  className = "",
  fill = false,
  width,
  height,
  onError,
}) {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={fill ? `absolute inset-0 h-full w-full ${className}` : className}
      onError={onError}
    />
  );
}
