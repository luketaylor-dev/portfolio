"use client";
import { useState, useMemo, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui";

import { Project } from "@/lib/content";

const FILTER_TAGS = ["EEG", "Game Development", "VR", "Web & Mobile"] as const;

interface ProjectFilterProps {
  projects: Project[];
  onFilteredProjects: (projects: Project[]) => void;
  initialTags?: string[];
  initialSearch?: string;
}

export default function ProjectFilter({
  projects,
  onFilteredProjects,
  initialTags = [],
  initialSearch = "",
}: ProjectFilterProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

  // Only show whitelisted tags that exist in at least one project
  const allTags = useMemo(() => {
    const projectTags = new Set<string>();
    projects.forEach((project) => {
      project.tags?.forEach((tag) => projectTags.add(tag));
    });
    return FILTER_TAGS.filter((tag) => projectTags.has(tag));
  }, [projects]);

  // Filter projects based on search term and selected tags
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => project.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [projects, searchTerm, selectedTags]);

  // Update parent component with filtered projects
  useEffect(() => {
    onFilteredProjects(filteredProjects);
  }, [filteredProjects, onFilteredProjects]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-neutral-900/50 border border-primary-800/50 rounded-xl text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
        />
      </div>

      {/* Tags Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary-400" />
          <h3 className="font-semibold text-white">Filter by Tags</h3>
          {(searchTerm || selectedTags.length > 0) && (
            <button
              onClick={clearFilters}
              className="ml-auto flex items-center gap-1 px-3 py-1 text-sm text-neutral-400 hover:text-primary-300 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="transition-all duration-200"
            >
              <Badge
                variant={selectedTags.includes(tag) ? "primary" : "secondary"}
                className="cursor-pointer hover:scale-105"
              >
                {tag}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-neutral-400">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>
    </div>
  );
}
