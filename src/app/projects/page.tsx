import Link from "next/link";
import { allProjects } from "contentlayer/generated";
import { ArrowRight, Play, ExternalLink, Calendar, Tag } from "lucide-react";

export default function ProjectsPage() {
  const projects = allProjects.sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
          My Projects
        </h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
          A collection of my work in Unity development, from EEG visualizations
          and VR experiences to engaging free-to-play games. Each project
          represents a unique challenge and learning opportunity.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="group relative overflow-hidden rounded-2xl border border-purple-800/50 bg-gradient-to-br from-neutral-900 to-purple-900/20 hover:border-purple-600/50 hover:bg-purple-900/30 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10"
            >
              {/* Project Image/Video Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-purple-800/30 to-neutral-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                      <Play className="w-10 h-10 text-purple-400" />
                    </div>
                    <p className="text-sm text-purple-300 font-medium">
                      Project Preview
                    </p>
                    <p className="text-xs text-purple-400">
                      Image/Video Coming Soon
                    </p>
                  </div>
                </div>

                {/* Hover overlay with play button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-purple-600 border-4 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Project Header */}
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    <Link
                      href={p.url}
                      className="hover:underline flex items-center gap-2"
                    >
                      {p.title}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </h2>
                  <p className="text-neutral-300 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Project Meta */}
                <div className="space-y-3">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(p.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Tags */}
                  {p.tags && p.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-neutral-400" />
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* View Project Button */}
                <div className="pt-2">
                  <Link
                    href={p.url}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200"
                  >
                    View Project Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </article>
          ))}

          {projects.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-6">
                <Play className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Projects Yet
              </h3>
              <p className="text-neutral-400 mb-6">
                Add some MDX files under{" "}
                <code className="bg-purple-900/30 px-2 py-1 rounded text-purple-300">
                  /content/projects
                </code>{" "}
                to see them here.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
              >
                Start Your First Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-16 rounded-3xl bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-purple-900/30 border border-purple-800/50">
        <h2 className="text-3xl font-bold text-white">
          Have a Project in Mind?
        </h2>
        <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
          Whether it's a VR experience, EEG visualization, or game development
          project, I'd love to help bring your vision to life. Let's create
          something amazing together.
        </p>
        <Link
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
          href="/contact"
        >
          Let's Discuss Your Project
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
