import Link from "next/link";
import { allBlogPosts } from "contentlayer/generated";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

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
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-purple-900/10 hover:border-purple-600/50 hover:bg-purple-900/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                  {/* Featured Image */}
                  {post.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      {post.readingTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readingTime}</span>
                        </div>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-purple-600/20 text-purple-300 border border-purple-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-600/20 text-neutral-300 border border-neutral-500/30">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                      <span className="font-medium">Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
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
