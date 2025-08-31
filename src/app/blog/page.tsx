import { allBlogPosts } from "contentlayer/generated";
import { Tag } from "lucide-react";
import { BlogCard } from "@/components/content";

export default function BlogPage() {
  // Check if blog posts exist and sort them by date (newest first)
  const sortedPosts = allBlogPosts
    ? allBlogPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];

  return (
    <div className="space-y-16">
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
        {sortedPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sortedPosts.map((post) => (
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
      </section>
    </div>
  );
}
