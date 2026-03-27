"use client";

import { useState } from "react";
import { Project } from "@/lib/content";
import { ProjectCard } from "@/components/content";

type Tab = "all" | "game" | "web";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "game", label: "Game Dev" },
  { id: "web", label: "Web Dev" },
];

const TAB_ACTIVE_CLASS: Record<Tab, string> = {
  all: "bg-neutral-600 text-white",
  game: "bg-primary-500 text-white",
  web: "bg-primary-500 text-white",
};

interface SelectedWorksClientProps {
  projects: Project[];
}

export default function SelectedWorksClient({ projects }: SelectedWorksClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filtered = projects.filter((p) => {
    if (activeTab === "all") return true;
    return p.workType === activeTab;
  });

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl border border-neutral-800 bg-[#1a1a1a] p-1 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? TAB_ACTIVE_CLASS[tab.id]
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} variant="compact" />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-neutral-500 py-8">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
