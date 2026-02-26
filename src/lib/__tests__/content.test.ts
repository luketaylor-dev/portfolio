import fs from "fs";
import { getAllProjects, getProjectBySlug, getAllBlogPosts, getBlogPostBySlug } from "../content";

jest.mock("fs");

const mockFs = fs as jest.Mocked<typeof fs>;

const PROJECT_MDX_A = `---
title: TatFindr
description: A tattoo artist discovery platform
date: "2024-06-01"
featured: true
tags: ["react", "next.js"]
---

# TatFindr

Body content here.
`;

const PROJECT_MDX_B = `---
title: Older Project
description: An older project
date: "2023-01-15"
featured: false
tags: ["python"]
---

Older project body.
`;

const BLOG_MDX_A = `---
title: First Post
description: My first blog post
date: "2024-05-10"
featured: true
tags: ["web"]
---

Blog body.
`;

const BLOG_MDX_B = `---
title: Older Post
description: An older post
date: "2023-03-20"
featured: false
---

Older blog body.
`;

const MALFORMED_MDX = `---
title: Bad
---

Body.
`;

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("getAllProjects()", () => {
  it("returns parsed projects sorted newest-first", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["tatfindr.mdx", "older-project.mdx"] as unknown as fs.Dirent[]);
    mockFs.readFileSync
      .mockReturnValueOnce(PROJECT_MDX_A)
      .mockReturnValueOnce(PROJECT_MDX_B);

    const projects = getAllProjects();

    expect(projects).toHaveLength(2);
    expect(projects[0].slug).toBe("tatfindr");
    expect(projects[0].title).toBe("TatFindr");
    expect(projects[1].slug).toBe("older-project");
    // Newest first
    expect(new Date(projects[0].date).getTime()).toBeGreaterThan(
      new Date(projects[1].date).getTime()
    );
  });

  it("returns [] when directory does not exist", () => {
    mockFs.existsSync.mockReturnValue(false);

    const projects = getAllProjects();

    expect(projects).toEqual([]);
  });

  it("skips non-.mdx files", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["tatfindr.mdx", "README.md", ".DS_Store"] as unknown as fs.Dirent[]);
    mockFs.readFileSync.mockReturnValue(PROJECT_MDX_A);

    const projects = getAllProjects();

    expect(projects).toHaveLength(1);
    expect(projects[0].slug).toBe("tatfindr");
  });

  it("includes body.raw from MDX content", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["tatfindr.mdx"] as unknown as fs.Dirent[]);
    mockFs.readFileSync.mockReturnValue(PROJECT_MDX_A);

    const projects = getAllProjects();

    expect(projects[0].body.raw).toContain("TatFindr");
  });

  it("skips files that throw on readFileSync and logs error", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["bad.mdx"] as unknown as fs.Dirent[]);
    mockFs.readFileSync.mockImplementation(() => {
      throw new Error("read error");
    });

    const projects = getAllProjects();

    expect(projects).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });
});

describe("getProjectBySlug()", () => {
  it("returns the correct project for a valid slug", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["tatfindr.mdx", "older-project.mdx"] as unknown as fs.Dirent[]);
    mockFs.readFileSync
      .mockReturnValueOnce(PROJECT_MDX_A)
      .mockReturnValueOnce(PROJECT_MDX_B);

    const project = getProjectBySlug("tatfindr");

    expect(project).toBeDefined();
    expect(project?.slug).toBe("tatfindr");
    expect(project?.title).toBe("TatFindr");
  });

  it("returns undefined for a nonexistent slug", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["tatfindr.mdx"] as unknown as fs.Dirent[]);
    mockFs.readFileSync.mockReturnValue(PROJECT_MDX_A);

    const project = getProjectBySlug("nonexistent");

    expect(project).toBeUndefined();
  });
});

describe("getAllBlogPosts()", () => {
  it("returns parsed posts sorted newest-first", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["first-post.mdx", "older-post.mdx"] as unknown as fs.Dirent[]);
    mockFs.readFileSync
      .mockReturnValueOnce(BLOG_MDX_A)
      .mockReturnValueOnce(BLOG_MDX_B);

    const posts = getAllBlogPosts();

    expect(posts).toHaveLength(2);
    expect(posts[0].slug).toBe("first-post");
    expect(posts[0].title).toBe("First Post");
    expect(new Date(posts[0].date).getTime()).toBeGreaterThan(
      new Date(posts[1].date).getTime()
    );
  });

  it("returns [] when blog directory does not exist", () => {
    mockFs.existsSync.mockReturnValue(false);

    const posts = getAllBlogPosts();

    expect(posts).toEqual([]);
  });

  it("skips non-.mdx files", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["first-post.mdx", "notes.txt"] as unknown as fs.Dirent[]);
    mockFs.readFileSync.mockReturnValue(BLOG_MDX_A);

    const posts = getAllBlogPosts();

    expect(posts).toHaveLength(1);
  });

  it("includes body.raw from MDX content", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["first-post.mdx"] as unknown as fs.Dirent[]);
    mockFs.readFileSync.mockReturnValue(BLOG_MDX_A);

    const posts = getAllBlogPosts();

    expect(posts[0].body.raw).toContain("Blog body");
  });
});

describe("getBlogPostBySlug()", () => {
  it("returns the correct post for a valid slug", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["first-post.mdx"] as unknown as fs.Dirent[]);
    mockFs.readFileSync.mockReturnValue(BLOG_MDX_A);

    const post = getBlogPostBySlug("first-post");

    expect(post).toBeDefined();
    expect(post?.slug).toBe("first-post");
    expect(post?.title).toBe("First Post");
  });

  it("returns undefined for a missing slug", () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(["first-post.mdx"] as unknown as fs.Dirent[]);
    mockFs.readFileSync.mockReturnValue(BLOG_MDX_A);

    const post = getBlogPostBySlug("does-not-exist");

    expect(post).toBeUndefined();
  });
});
