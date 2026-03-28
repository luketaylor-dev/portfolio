"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Project } from "@/lib/content";
import { ProjectCard } from "@/components/content";

type WorkTab = "all" | "game" | "web";

const WORK_TABS: { id: WorkTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "game", label: "Game Dev" },
  { id: "web", label: "Web & Mobile" },
];

const TAB_ACTIVE_CLASS: Record<WorkTab, string> = {
  all: "bg-neutral-600 text-white",
  game: "bg-primary-500 text-white",
  web: "bg-primary-500 text-white",
};

function ProjectsGridInner({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const workTypeParam = searchParams.get("workType") as WorkTab | null;
  const initialTab: WorkTab =
    workTypeParam && ["game", "web"].includes(workTypeParam)
      ? workTypeParam
      : "all";

  const [activeTab, setActiveTab] = useState<WorkTab>(initialTab);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesTab = activeTab === "all" || p.workType === activeTab;
      const matchesSearch =
        searchTerm === "" ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [projects, activeTab, searchTerm]);

  return (
    <div className="space-y-8">
      {/* Work category tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl border border-neutral-800 bg-[#1a1a1a] p-1 gap-1">
          {WORK_TABS.map((tab) => (
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

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/30 transition-colors text-sm"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-neutral-500 text-center">
        {filtered.length} of {projects.length} projects
      </p>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-neutral-500 py-12">
          No projects match your filters.
        </p>
      )}
    </div>
  );
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <Suspense
      fallback={
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      }
    >
      <ProjectsGridInner projects={projects} />
    </Suspense>
  );
}
