import Image from "next/image";
import { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Rss } from "lucide-react";

import {
  MdxContent,
  SocialShare,
  RelatedPosts,
  ReadingProgressBar,
  BlogToc,
} from "@/components/content";
import { Text } from "@/components/atoms";
import { InteractiveButton, Badge, Breadcrumbs } from "@/components/ui";
import { formatDate, calculateReadingTime } from "@/lib/blog-utils";
import { extractHeadings } from "@/lib/headings";
import { siteUrl } from "@/lib/site";

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

  const tocItems = extractHeadings(post.body.raw);

  return (
    <div className="space-y-8 -mt-4">
      <ReadingProgressBar />
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
              ? [`${siteUrl}${post.image}`]
              : undefined,
            datePublished: post.date,
            dateModified: post.date,
            url: `${siteUrl}/blog/${post.slug}`,
            author: { "@type": "Person", name: "Luke Taylor" },
            publisher: {
              "@type": "Organization",
              name: "Luke Taylor - Portfolio",
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/icons/favicon.png`,
              },
            },
          }),
        }}
        suppressHydrationWarning={true}
      />
      {/* Breadcrumbs + Back to Blog */}
      <div className="max-w-6xl mx-auto flex gap-12">
        <div className="min-w-0 flex-1 max-w-4xl space-y-3">
          <Breadcrumbs
            items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
            className="mb-0"
          />
          <InteractiveButton href="/blog" variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </InteractiveButton>
        </div>
        {tocItems.length > 0 && (
          <div className="hidden lg:block w-56 flex-shrink-0" aria-hidden />
        )}
      </div>

      {/* Article + TOC */}
      <div className="max-w-6xl mx-auto flex gap-12">
        <article className="min-w-0 flex-1 max-w-4xl space-y-8">
        {/* Title & Meta */}
        <header className="space-y-6">
          <Text variant="heading1" as="h1" className="md:text-5xl leading-tight">
            {post.title}
          </Text>

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
            <Text variant="paragraph" as="p" color="muted" className="text-xl leading-relaxed">
              {post.description}
            </Text>
          )}
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="w-full max-h-[400px] flex items-center justify-center overflow-hidden rounded-2xl bg-neutral-900/50">
            <Image
              src={post.image || ""}
              alt={post.title}
              width={1200}
              height={400}
              sizes="(max-width: 896px) 100vw, 896px"
              className="w-full max-h-[400px] object-contain"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert prose-primary max-w-none">
          <MdxContent source={post.body.raw} />
        </div>

        {/* Social Sharing */}
        <div className="pt-8 border-t border-neutral-800">
          <SocialShare
            url={`${siteUrl}/blog/${post.slug}`}
            title={post.title}
          />
        </div>
        </article>
        {tocItems.length > 0 && (
          <aside className="hidden lg:block flex-shrink-0 w-56">
            <div className="sticky top-24 space-y-6">
              <BlogToc items={tocItems} />
              <Link
                href="/feed.xml"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-primary-300 hover:text-primary-200 hover:bg-primary-500/10 border border-primary-500/30 hover:border-primary-400/50 transition-colors w-fit"
                aria-label="Subscribe to blog RSS feed"
              >
                <Rss className="w-4 h-4" />
                RSS
              </Link>
            </div>
          </aside>
        )}
      </div>

      {/* Related Posts */}
      <RelatedPosts currentPostSlug={post.slug} allPosts={getAllBlogPosts()} />

      {/* Navigation */}
      <div className="max-w-6xl mx-auto flex gap-12 pt-4 border-t border-neutral-800">
        <div className="min-w-0 flex-1 max-w-4xl">
          <InteractiveButton href="/blog" variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </InteractiveButton>
        </div>
        {tocItems.length > 0 && (
          <div className="hidden lg:block w-56 flex-shrink-0" aria-hidden />
        )}
      </div>
    </div>
  );
}
