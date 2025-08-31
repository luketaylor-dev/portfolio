"use client";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-800/50", className)}
      style={{
        width: width || "100%",
        height: height || "1rem",
      }}
    />
  );
}

interface ProjectCardSkeletonProps {
  className?: string;
}

export function ProjectCardSkeleton({ className }: ProjectCardSkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Image skeleton */}
      <div className="aspect-video rounded-2xl bg-neutral-800/50 animate-pulse" />

      {/* Content skeleton */}
      <div className="space-y-3">
        {/* Title skeleton */}
        <Skeleton height="1.5rem" width="80%" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton height="1rem" width="100%" />
          <Skeleton height="1rem" width="90%" />
          <Skeleton height="1rem" width="70%" />
        </div>

        {/* Meta skeleton */}
        <div className="flex items-center gap-4 pt-2">
          <Skeleton height="1rem" width="6rem" />
          <Skeleton height="1rem" width="4rem" />
        </div>
      </div>
    </div>
  );
}

interface BlogCardSkeletonProps {
  className?: string;
}

export function BlogCardSkeleton({ className }: BlogCardSkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Image skeleton */}
      <div className="aspect-video rounded-2xl bg-neutral-800/50 animate-pulse" />

      {/* Content skeleton */}
      <div className="space-y-3">
        {/* Title skeleton */}
        <Skeleton height="1.5rem" width="85%" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton height="1rem" width="100%" />
          <Skeleton height="1rem" width="85%" />
        </div>

        {/* Meta skeleton */}
        <div className="flex items-center gap-4 pt-2">
          <Skeleton height="1rem" width="5rem" />
          <Skeleton height="1rem" width="3rem" />
        </div>
      </div>
    </div>
  );
}

interface PageSkeletonProps {
  className?: string;
}

export function PageSkeleton({ className }: PageSkeletonProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Hero section skeleton */}
      <div className="space-y-6 text-center">
        <Skeleton height="4rem" width="60%" className="mx-auto" />
        <Skeleton height="1.5rem" width="80%" className="mx-auto" />
        <Skeleton height="1rem" width="70%" className="mx-auto" />
      </div>

      {/* Content grid skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
