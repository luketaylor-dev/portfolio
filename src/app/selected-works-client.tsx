"use client";

import { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/content";
import { ResponsiveProjectCover } from "@/components/content/responsive-project-cover";
import { Text } from "@/components/atoms";

type Tab = "all" | "game" | "web";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "game", label: "Unity" },
  { id: "web", label: "Web" },
];

const HIGHLIGHT_TAGS = ["VR", "Mobile", "F2P", "EEG", "Tools", "VFX", "Full-Stack", "SaaS", "Portfolio"];

/** Featured projects (positive number) sorted ascending; remaining projects fall back to date desc. */
function sortForSelectedWorks(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const aNum = typeof a.featured === "number" && a.featured > 0 ? a.featured : null;
    const bNum = typeof b.featured === "number" && b.featured > 0 ? b.featured : null;

    if (aNum !== null && bNum !== null) return aNum - bNum;
    if (aNum !== null) return -1;
    if (bNum !== null) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

function getCategoryLabel(project: Project): string {
  const primary = project.workType === "game" ? "UNITY" : "WEB";
  const secondary = project.tags.find((t) =>
    HIGHLIGHT_TAGS.some((h) => t.toLowerCase() === h.toLowerCase())
  );
  return secondary ? `${primary} / ${secondary.toUpperCase()}` : primary;
}

type CardSize = "large" | "medium" | "small";

/**
 * `sizes` drives which width Next/Image requests; too small vs CSS layout = soft detail (hero uses ~100vw by default).
 * Large/medium slots are generous so object-cover crops still have enough source pixels; small matches ~¼ row on desktop.
 */
function curatedImageSizes(cardSize: CardSize): string {
  switch (cardSize) {
    case "large":
      return "(max-width: 768px) 100vw, (max-width: 1536px) 75vw, 720px";
    case "medium":
      return "(max-width: 768px) 100vw, (max-width: 1536px) 75vw, 720px";
    case "small":
      return "(max-width: 768px) 50vw, (max-width: 1536px) 38vw, 360px";
  }
}

function CuratedCard({ project, size }: { project: Project; size: CardSize }) {
  const label = getCategoryLabel(project);

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full group" prefetch={true}>
      <div className="relative h-full overflow-hidden rounded-2xl">
        {project.cover || project.coverPortrait ? (
          <ResponsiveProjectCover
            project={project}
            featuredLargeSlot={size === "large"}
            sizesLandscape={curatedImageSizes(size)}
            sizesPortrait={curatedImageSizes("small")}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-800" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Text overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 space-y-1 ${
            size === "large" ? "p-6 md:p-8" : size === "medium" ? "p-4 md:p-5" : "p-3 md:p-4"
          }`}
        >
          <p className="text-xs font-medium tracking-widest uppercase text-neutral-400">
            {label}
          </p>
          <h3
            className={`font-bold text-white leading-tight ${
              size === "large"
                ? "text-xl md:text-2xl"
                : size === "medium"
                  ? "text-base md:text-lg"
                  : "text-sm md:text-base"
            }`}
          >
            {project.title}
          </h3>
          {size === "large" && (
            <p className="text-sm text-neutral-300 line-clamp-2 pt-0.5">{project.description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

interface SelectedWorksClientProps {
  projects: Project[];
}

export default function SelectedWorksClient({ projects }: SelectedWorksClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filtered = sortForSelectedWorks(
    projects.filter((p) => activeTab === "all" || p.workType === activeTab)
  ).slice(0, 4);

  const [p0, p1, p2, p3] = filtered;

  return (
    <div className="space-y-8">
      {/* Header row: title + subtitle left, filter tabs right */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <Text
            variant="heading2"
            as="h2"
            id="works-heading"
            className="md:text-4xl uppercase tracking-wider"
          >
            Selected Works
          </Text>
          <Text variant="paragraph" as="p" color="secondary">
            Unity games, full-stack web, and experimental work I&apos;m especially proud of.
          </Text>
        </div>

        <div className="inline-flex shrink-0 rounded-xl border border-neutral-800 bg-[#1a1a1a] p-1 gap-1 mt-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-neutral-600 text-white"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-neutral-500 py-16">
          No projects in this category yet.
        </p>
      ) : (
        <>
          {/* Mobile: simple 2-column grid */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {filtered.map((p) => (
              <div key={p.slug} className="h-[180px]">
                <CuratedCard key={`${activeTab}-${p.slug}`} project={p} size="small" />
              </div>
            ))}
          </div>

          {/* Desktop: bento layout */}
          <div className="hidden md:flex gap-4 h-[560px]">
            {/* Large card — left half */}
            {p0 && (
              <div className="flex-1">
                <CuratedCard key={`${activeTab}-${p0.slug}`} project={p0} size="large" />
              </div>
            )}

            {/* Right column */}
            {(p1 ?? p2 ?? p3) && (
              <div className="flex-1 flex flex-col gap-4">
                {/* Medium card */}
                {p1 && (
                  <div className="flex-[3]">
                    <CuratedCard key={`${activeTab}-${p1.slug}`} project={p1} size="medium" />
                  </div>
                )}

                {/* Two small cards */}
                {(p2 ?? p3) && (
                  <div className="flex gap-4 flex-[2]">
                    {p2 && (
                      <div className="flex-1">
                        <CuratedCard key={`${activeTab}-${p2.slug}`} project={p2} size="small" />
                      </div>
                    )}
                    {p3 && (
                      <div className="flex-1">
                        <CuratedCard key={`${activeTab}-${p3.slug}`} project={p3} size="small" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
