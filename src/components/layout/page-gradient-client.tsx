"use client";

import dynamic from "next/dynamic";

const PageGradient = dynamic(
  () =>
    import("./page-gradient").then((mod) => ({
      default: mod.PageGradient,
    })),
  { ssr: false }
);

export function PageGradientClient() {
  return <PageGradient />;
}
