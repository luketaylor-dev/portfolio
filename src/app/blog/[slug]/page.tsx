import Image from "next/image";
import { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

import { MdxContent, SocialShare, RelatedPosts } from "@/components/content";
import { InteractiveButton, Badge, Breadcrumbs } from "@/components/ui";
import { formatDate, calculateReadingTime } from "@/lib/blog-utils";

export async function generateStaticParams() {
  try {
    const allBlogPosts = getAllBlogPosts();
    return allBlogPosts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for blog:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return generatePageMetadata(
    `${post.title} | Luke Taylor Blog`,
    post.description ||
      `Read about ${post.title} - insights from Luke Taylor's Unity development experience.`,
    `/blog/${post.slug}`,
    post.image
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Note: Using direct paths for images from public folder
  const staticImg = undefined; // Removed static imports - using direct paths instead

  return (
    <div className="space-y-16">
      {/* Structured Data: BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description:
              post.description ||
              `Insights from Luke Taylor's Unity development: ${post.title}`,
            image: post.image
              ? [`https://www.dibza.co.uk${post.image}`]
              : undefined,
            datePublished: post.date,
            dateModified: post.date,
            url: `https://www.dibza.co.uk/blog/${post.slug}`,
            author: { "@type": "Person", name: "Luke Taylor" },
            publisher: {
              "@type": "Organization",
              name: "Luke Taylor — Portfolio",
              logo: {
                "@type": "ImageObject",
                url: "https://www.dibza.co.uk/icons/favicon.png",
              },
            },
          }),
        }}
        suppressHydrationWarning={true}
      />
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs
          items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
          className="mb-8"
        />
      </div>

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto">
        <InteractiveButton href="/blog" variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </InteractiveButton>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto space-y-8">
        {/* Title & Meta */}
        <header className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-neutral-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {post.readingTime || calculateReadingTime(post.body.raw)}
              </span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="primary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Description */}
          {post.description && (
            <p className="text-xl text-neutral-300 leading-relaxed">
              {post.description}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="aspect-video overflow-hidden rounded-2xl">
            <Image
              src={post.image || ""}
              alt={post.title}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert prose-purple max-w-none">
          <MdxContent source={post.body.raw} />
        </div>

        {/* Social Sharing */}
        <div className="pt-8 border-t border-neutral-800">
          <SocialShare
            url={`https://www.dibza.co.uk/blog/${post.slug}`}
            title={post.title}
          />
        </div>
      </article>

      {/* Related Posts */}
      <RelatedPosts currentPostSlug={post.slug} allPosts={getAllBlogPosts()} />

      {/* Navigation */}
      <div className="max-w-4xl mx-auto pt-8 border-t border-neutral-800">
        <InteractiveButton href="/blog" variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </InteractiveButton>
      </div>
    </div>
  );
}
