import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Use process.cwd() to ensure we're in the right directory
const contentDirectory = path.join(process.cwd(), "content");

// Project type
export interface Project {
  slug: string;
  title: string;
  description: string;
  seoDescription?: string;
  altText?: string;
  date: string;
  featured: boolean;
  workType: "game" | "web";
  tags: string[];
  cover?: string;
  video?: string;
  url?: string;
  featureTitles?: string[];
  featureDescriptions?: string[];
  featureIcons?: string[];
  technologies?: string[];
  body: {
    raw: string;
    code: string;
  };
}

// Blog post type
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  featured: boolean;
  tags?: string[];
  image?: string;
  readingTime?: string;
  body: {
    raw: string;
    code: string;
  };
}

// Get all projects
export function getAllProjects(): Project[] {
  try {
    // Use process.cwd() which should work in Next.js runtime
    const projectsDirectory = path.join(process.cwd(), "content", "projects");

    if (!fs.existsSync(projectsDirectory)) {
      console.error("Projects directory not found:", projectsDirectory);
      return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);

    const projects = fileNames
      .filter((name) => name.endsWith(".mdx"))
      .map((fileName) => {
        try {
          const fullPath = path.join(projectsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          const slug = fileName.replace(/\.mdx$/, "");

          return {
            slug,
            ...data,
            body: {
              raw: content,
              code: content,
            },
          } as Project;
        } catch (error) {
          console.error(`Error reading project file ${fileName}:`, error);
          return null;
        }
      })
      .filter((project): project is Project => project !== null);

    return projects.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error getting all projects:", error);
    return [];
  }
}

// Get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getAllProjects();
  return projects.find((project) => project.slug === slug);
}

// Get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  const blogDirectory = path.join(contentDirectory, "blog");
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);

  const posts = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const slug = fileName.replace(/\.mdx$/, "");

      return {
        slug,
        ...data,
        body: {
          raw: content,
          code: content,
        },
      } as BlogPost;
    });

  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

// Get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find((post) => post.slug === slug);
}
