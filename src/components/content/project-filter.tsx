"use client";
import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui";

import { Project } from "@/lib/content";

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

  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => {
      project.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
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
  useMemo(() => {
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
          className="w-full pl-12 pr-4 py-3 bg-neutral-900/50 border border-purple-800/50 rounded-xl text-white placeholder-neutral-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
        />
      </div>

      {/* Tags Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-400" />
          <h3 className="font-semibold text-white">Filter by Tags</h3>
          {(searchTerm || selectedTags.length > 0) && (
            <button
              onClick={clearFilters}
              className="ml-auto flex items-center gap-1 px-3 py-1 text-sm text-neutral-400 hover:text-purple-300 transition-colors"
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
