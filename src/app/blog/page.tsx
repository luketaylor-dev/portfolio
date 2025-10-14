import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { allBlogPosts } from "contentlayer/generated";
import { Tag } from "lucide-react";
import { BlogCard } from "@/components/content";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = generateMetadata(
  "Blog - Luke Taylor | Unity Development Insights & Project Updates",
  "Read insights from Luke Taylor's Unity development projects, including EEG visualization, VR development, and game development experiences. Technical deep dives and project updates.",
  "/blog"
);

// Prefer static rendering with periodic ISR for predictable performance
export const revalidate = 3600; // 1 hour
export const dynamic = "force-static";

export default function BlogPage() {
  // Check if blog posts exist and sort them by date (newest first)
  const sortedPosts = allBlogPosts
    ? allBlogPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];
  const PAGE_SIZE = 9;
  const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
  const currentPage = 1;
  const pagePosts = sortedPosts.slice(0, PAGE_SIZE);

  return (
    <div className="space-y-16">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Blog" }]} className="mb-8" />

      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
          Project Insights & Updates
        </h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
          Deep dives into my Unity projects, development challenges, and the
          creative process behind building immersive experiences.
        </p>
      </section>

      {/* Blog Posts Grid */}
      <section className="space-y-12">
        {pagePosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pagePosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-6">
              <Tag className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No Blog Posts Yet
            </h3>
            <p className="text-neutral-400 max-w-md mx-auto">
              Your first blog post will appear here. Start writing about your
              projects and development experiences!
            </p>
          </div>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            className="flex items-center justify-center gap-2"
            aria-label="Blog pagination"
          >
            <a
              href="#"
              aria-disabled
              className="px-3 py-2 rounded-lg border border-purple-700/40 text-sm opacity-50 pointer-events-none"
            >
              Previous
            </a>
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const isActive = page === currentPage;
              return (
                <a
                  key={page}
                  href={page === 1 ? "/blog" : `/blog/page/${page}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-2 rounded-lg border border-purple-700/40 text-sm ${
                    isActive
                      ? "bg-purple-600/20 text-purple-200"
                      : "hover:bg-purple-600/10"
                  }`}
                >
                  {page}
                </a>
              );
            })}
            <a
              href={totalPages > 1 ? "/blog/page/2" : "#"}
              aria-disabled={totalPages <= 1}
              className={`px-3 py-2 rounded-lg border border-purple-700/40 text-sm ${
                totalPages <= 1
                  ? "opacity-50 pointer-events-none"
                  : "hover:bg-purple-600/10"
              }`}
            >
              Next
            </a>
          </nav>
        )}
      </section>
    </div>
  );
}
