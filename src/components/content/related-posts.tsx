import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getRelatedPosts, formatDate } from "@/lib/blog-utils";

interface RelatedPostsProps {
  currentPostSlug: string;
  allPosts: any[];
}

export default function RelatedPosts({
  currentPostSlug,
  allPosts,
}: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentPostSlug, allPosts, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Related Posts</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="group overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-primary-900/10 hover:border-primary-600/50 hover:bg-primary-900/20 transition-all duration-300 hover:scale-105 cursor-pointer">
              {/* Featured Image */}
              {post.image && (
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  {post.readingTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readingTime}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2">
                  {post.description}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-1 text-primary-400 group-hover:text-primary-300 transition-colors">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
