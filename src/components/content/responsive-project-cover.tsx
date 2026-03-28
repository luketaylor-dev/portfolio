"use client";

import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";

const MEDIA_MD_UP = "(min-width: 768px)";

/** Explicit shape so callers with partial project fields satisfy `exactOptionalPropertyTypes`. */
export type ProjectCoverFields = {
  title: string;
  /** Used to remount `<picture>` / `<img>` when the project changes (avoids stale art when filtering). */
  slug?: string;
  cover?: string;
  coverPortrait?: string;
  altText?: string;
};

export type ResponsiveProjectCoverProps = {
  project: ProjectCoverFields;
  /** `sizes` for the landscape asset (shown from `md` when `coverPortrait` exists; otherwise always). */
  sizesLandscape: string;
  /** `sizes` for the portrait asset on narrow viewports; defaults to `sizesLandscape`. */
  sizesPortrait?: string;
  /**
   * Home Selected Works **large** tile: use `coverPortrait` when set (single image, all viewports),
   * else `cover`. Skips the default viewport `<picture>` swap.
   */
  featuredLargeSlot?: boolean;
  className?: string;
  quality?: number;
};

/**
 * Default: `<picture>` art direction — `cover` from `md` up, `coverPortrait` below when both exist.
 * With `featuredLargeSlot`, the portrait asset is used alone for the Selected Works main tile.
 */
export function ResponsiveProjectCover({
  project,
  sizesLandscape,
  sizesPortrait,
  featuredLargeSlot = false,
  className,
  quality = 90,
}: ResponsiveProjectCoverProps) {
  const alt = project.altText ?? `${project.title} - project preview`;
  const landscape = project.cover;
  const portrait = project.coverPortrait;
  const mobileSizes = sizesPortrait ?? sizesLandscape;
  const mediaKey =
    project.slug ??
    ([landscape, portrait].filter(Boolean).join("::") || "cover");

  if (!landscape && !portrait) {
    return null;
  }

  if (featuredLargeSlot) {
    const src = portrait ?? landscape!;
    const { props } = getImageProps({
      src,
      alt,
      fill: true,
      quality,
      sizes: sizesLandscape,
      className,
    });
    return (
      <img
        key={mediaKey}
        {...props}
        className={cn(props.className, className)}
      />
    );
  }

  if (!portrait) {
    const { props } = getImageProps({
      src: landscape!,
      alt,
      fill: true,
      quality,
      sizes: sizesLandscape,
      className,
    });
    return (
      <img
        key={mediaKey}
        {...props}
        className={cn(props.className, className)}
      />
    );
  }

  if (!landscape) {
    const { props } = getImageProps({
      src: portrait,
      alt,
      fill: true,
      quality,
      sizes: mobileSizes,
      className,
    });
    return (
      <img
        key={mediaKey}
        {...props}
        className={cn(props.className, className)}
      />
    );
  }

  const { props: desktopProps } = getImageProps({
    src: landscape,
    alt,
    fill: true,
    quality,
    sizes: sizesLandscape,
  });

  const { props: mobileProps } = getImageProps({
    src: portrait,
    alt,
    fill: true,
    quality,
    sizes: mobileSizes,
    className,
  });

  const { srcSet: desktopSrcSet, sizes: desktopSizesAttr } = desktopProps;

  return (
    <picture key={mediaKey} className="absolute inset-0">
      {desktopSrcSet ? (
        <source
          key={`${mediaKey}-desktop`}
          media={MEDIA_MD_UP}
          srcSet={desktopSrcSet}
          sizes={desktopSizesAttr}
        />
      ) : null}
      <img {...mobileProps} className={cn(mobileProps.className, className)} />
    </picture>
  );
}
