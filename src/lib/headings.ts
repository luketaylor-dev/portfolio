/** Generate slug matching rehype-slug (lowercase, hyphenated) */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export interface TocItem {
  title: string;
  slug: string;
  depth: number; // 2 for ##, 3 for ###
}

/** Extract headings (h2, h3) from markdown for table of contents */
export function extractHeadings(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const headings: TocItem[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match?.[1]) {
      const title = h2Match[1].replace(/#+$/, "").trim();
      headings.push({ title, slug: slugify(title), depth: 2 });
    } else if (h3Match?.[1]) {
      const title = h3Match[1].replace(/#+$/, "").trim();
      headings.push({ title, slug: slugify(title), depth: 3 });
    }
  }

  return headings;
}
