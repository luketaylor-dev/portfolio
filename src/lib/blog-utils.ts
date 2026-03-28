import type { BlogPost } from "@/lib/content";

// Calculate reading time based on word count
export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  if (readingTimeMinutes === 1) {
    return "1 min read";
  }
  return `${readingTimeMinutes} min read`;
};

// Format date for display
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

// Get related posts based on tags
export const getRelatedPosts = (
  currentPostSlug: string,
  allPosts: BlogPost[],
  maxPosts: number = 3
): BlogPost[] => {
  const currentPost = allPosts.find((post) => post.slug === currentPostSlug);
  if (!currentPost || !currentPost.tags) return [];

  const currentTags = currentPost.tags;

  const relatedPosts = allPosts
    .filter(
      (post) =>
        post.slug !== currentPostSlug &&
        post.tags &&
        post.tags.some((tag: string) => currentTags.includes(tag))
    )
    .sort((a, b) => {
      const aCommonTags = (a.tags ?? []).filter((tag: string) =>
        currentTags.includes(tag)
      ).length;
      const bCommonTags = (b.tags ?? []).filter((tag: string) =>
        currentTags.includes(tag)
      ).length;
      return bCommonTags - aCommonTags;
    })
    .slice(0, maxPosts);

  return relatedPosts;
};

// Social sharing URLs
export const socialShareUrls = {
  twitter: (url: string, title: string) =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`,
  linkedin: (url: string) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
  facebook: (url: string) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
};
