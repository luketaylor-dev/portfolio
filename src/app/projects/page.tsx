"use client";

import { allProjects } from "contentlayer/generated";
import { ArrowRight, Play } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectFilter, ProjectCard } from "@/components/content";
import { ProjectCardSkeleton, InteractiveButton, Card } from "@/components/ui";

function ProjectsContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [allProjectsSorted, setAllProjectsSorted] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const searchParams = useSearchParams();

  // Get initial filters from URL parameters
  const initialTags =
    searchParams.get("tags")?.split(",").filter(Boolean) || [];
  const initialSearch = searchParams.get("search") || "";

  // Simulate loading time for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      const sorted = allProjects
        ? allProjects.sort((a, b) => +new Date(b.date) - +new Date(a.date))
        : [];
      setAllProjectsSorted(sorted);
      setFilteredProjects(sorted);
      setIsLoading(false);
    }, 800); // 800ms loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={<div className="space-y-16">Loading...</div>}>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            A collection of my work in Unity development, from EEG
            visualizations and VR experiences to engaging free-to-play games.
            Each project represents a unique challenge and learning opportunity.
          </p>
        </section>

        {/* Filter Section */}
        <section className="space-y-8">
          <ProjectFilter
            projects={allProjectsSorted}
            onFilteredProjects={(projects) => setFilteredProjects(projects)}
            initialTags={initialTags}
            initialSearch={initialSearch}
          />
        </section>

        {/* Projects Grid */}
        <section className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? // Show skeleton loading
                Array.from({ length: 6 }).map((_, i) => (
                  <ProjectCardSkeleton key={i} />
                ))
              : filteredProjects.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}

            {!isLoading && filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-16">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-6">
                  <Play className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Projects Found
                </h3>
                <p className="text-neutral-400 mb-6">
                  No projects match your current filters. Try adjusting your
                  search or clearing the filters.
                </p>
                <InteractiveButton
                  onClick={() => (window.location.href = "/projects")}
                  variant="primary"
                  size="md"
                >
                  View All Projects
                  <ArrowRight className="w-5 h-5" />
                </InteractiveButton>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 py-16">
          <Card variant="default" className="rounded-3xl">
            <h2 className="text-3xl font-bold text-white">
              Have a Project in Mind?
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Whether it's a VR experience, EEG visualization, or game
              development project, I'd love to help bring your vision to life.
              Let's create something amazing together.
            </p>
            <InteractiveButton href="/contact" variant="primary" size="lg">
              Let's Discuss Your Project
              <ArrowRight className="w-5 h-5" />
            </InteractiveButton>
          </Card>
        </section>
      </div>
    </Suspense>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="space-y-16">Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
