/**
 * MDX content pipeline integration test.
 *
 * next-mdx-remote/rsc uses React Server Components which cannot be rendered
 * in jsdom. We mock MDXRemote and verify the integration between gray-matter
 * content parsing and the MdxContent rendering component.
 */

// Mock RSC module before any imports
jest.mock("next-mdx-remote/rsc", () => ({
  MDXRemote: ({ source }: { source: string }) => (
    <div data-testid="mdx-rendered">{source}</div>
  ),
}));

jest.mock("next/image", () => {
  const MockImage = ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

jest.mock("react-syntax-highlighter", () => ({
  Prism: ({ children }: { children: React.ReactNode }) => <pre>{children}</pre>,
}));

jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
  tomorrow: {},
}));

jest.mock("rehype-slug", () => () => {});
jest.mock("rehype-autolink-headings", () => () => {});

import React from "react";
import matter from "gray-matter";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MDXContent } from "@/components/content/mdx-content";

const MDX_FIXTURE = `---
title: Test Project
description: A test MDX document
date: "2024-06-01"
featured: true
tags: ["unity", "c#"]
---

# Main Heading

A paragraph with **bold text** and _italic text_.

## Sub Heading

More content here.
`;

describe("MDX content pipeline", () => {
  it("gray-matter parses frontmatter from MDX fixture", () => {
    const { data, content } = matter(MDX_FIXTURE);

    expect(data.title).toBe("Test Project");
    expect(data.description).toBe("A test MDX document");
    expect(data.date).toBe("2024-06-01");
    expect(data.featured).toBe(true);
    expect(data.tags).toEqual(["unity", "c#"]);
    expect(content).toContain("# Main Heading");
    expect(content).toContain("**bold text**");
  });

  it("gray-matter strips frontmatter from body content", () => {
    const { content } = matter(MDX_FIXTURE);

    expect(content).not.toContain("title: Test Project");
    expect(content).not.toMatch(/^---/);
    expect(content.trim()).toMatch(/^#\s+Main Heading/);
  });

  it("gray-matter extracts all frontmatter fields correctly", () => {
    const { data } = matter(MDX_FIXTURE);

    expect(Object.keys(data)).toEqual(
      expect.arrayContaining(["title", "description", "date", "featured", "tags"])
    );
  });

  it("MdxContent renders without errors given raw MDX body", () => {
    const { content: bodyRaw } = matter(MDX_FIXTURE);

    render(<MDXContent source={bodyRaw} />);

    expect(screen.getByTestId("mdx-rendered")).toBeInTheDocument();
  });

  it("MdxContent passes source prop through to MDXRemote", () => {
    const bodyRaw = "# Hello\n\nA paragraph.";

    render(<MDXContent source={bodyRaw} />);

    const mdxEl = screen.getByTestId("mdx-rendered");
    expect(mdxEl).toHaveTextContent("# Hello");
    expect(mdxEl).toHaveTextContent("A paragraph.");
  });

  it("full pipeline: parse MDX file then render body via MdxContent", () => {
    // Simulate what getAllProjects does: parse file -> body.raw -> render
    const { content: bodyRaw } = matter(MDX_FIXTURE);

    render(<MDXContent source={bodyRaw} />);

    // Verify body contains expected MDX headings
    const rendered = screen.getByTestId("mdx-rendered");
    expect(rendered).toHaveTextContent("Main Heading");
    expect(rendered).toHaveTextContent("Sub Heading");
  });
});
