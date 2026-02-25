"use client";

import { usePathname } from "next/navigation";

const gradientByPath: Record<string, string> = {
  "/": "bg-gradient-to-br from-primary-950/25 via-neutral-950 to-primary-900/25",
  "/about": "bg-gradient-to-bl from-primary-900/20 via-neutral-950 to-primary-950/25",
  "/projects": "bg-gradient-to-tr from-primary-950/20 via-neutral-950 to-primary-900/20",
  "/blog": "bg-gradient-to-t from-primary-950/15 via-neutral-950 to-primary-900/20",
  "/contact": "bg-neutral-950",
  "/inquire": "bg-gradient-to-tl from-primary-900/20 via-neutral-950 to-primary-950/20",
  "/manchester-services":
    "bg-gradient-to-r from-primary-950/20 via-neutral-950 to-primary-900/25",
  "/web-development":
    "bg-gradient-to-t from-primary-950/20 via-neutral-950 to-primary-900/20",
};

const defaultGradient =
  "bg-gradient-to-br from-primary-950/20 via-neutral-950 to-primary-900/20";

export function PageGradient() {
  const pathname = usePathname();

  const basePath =
    pathname === "/"
      ? "/"
      : pathname.startsWith("/projects")
        ? "/projects"
        : pathname.startsWith("/blog")
          ? "/blog"
          : pathname;

  const gradient = gradientByPath[basePath] ?? defaultGradient;

  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-10 ${gradient}`}
      aria-hidden
    />
  );
}
