"use client";
import { useState, useCallback, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Project } from "@/lib/content";
import ProjectFilter from "@/components/content/project-filter";
import { ProjectCard } from "@/components/content";

function ProjectsGridInner({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const tagParam = searchParams.get("tags");
  const initialTags = tagParam ? [tagParam] : [];

  const initialFiltered = useMemo(() => {
    if (initialTags.length === 0) return projects;
    return projects.filter((p) =>
      initialTags.some((tag) => p.tags?.includes(tag))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(initialFiltered);

  const handleFilteredProjects = useCallback((filtered: Project[]) => {
    setFilteredProjects(filtered);
  }, []);

  return (
    <div className="space-y-8">
      <ProjectFilter
        projects={projects}
        onFilteredProjects={handleFilteredProjects}
        initialTags={initialTags}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      {filteredProjects.length === 0 && (
        <p className="text-center text-neutral-400 py-12">
          No projects found matching your filters.
        </p>
      )}
    </div>
  );
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <Suspense
      fallback={
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
