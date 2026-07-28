import type { PostFrontmatter } from "@/types/markdown";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  html: string;
  excerpt: string;
  readingTime: number;
}

interface MarkdownModule {
  frontmatter: PostFrontmatter;
  html: string;
  excerpt: string;
  readingTime: number;
}

// Blog posts live in src/content/blog/*.md and are bundled at build time
// (the markdown Vite plugin turns each file into a JS module). Adding a new
// post is just dropping a new .md file into that folder and rebuilding.
const modules = import.meta.glob("../content/blog/*.md", {
  eager: true,
}) as Record<string, MarkdownModule>;

function toPost(path: string, mod: MarkdownModule): Post {
  const slug = path.replace(/^.*\//, "").replace(/\.md$/, "");
  return {
    slug,
    title: mod.frontmatter.title,
    description: mod.frontmatter.description,
    date: mod.frontmatter.date,
    tags: mod.frontmatter.tags ?? [],
    draft: mod.frontmatter.draft ?? false,
    html: mod.html,
    excerpt: mod.excerpt,
    readingTime: mod.readingTime,
  };
}

/** All published posts, newest first. Drafts are only included in dev. */
export function getAllPosts(): Post[] {
  return Object.entries(modules)
    .map(([path, mod]) => toPost(path, mod))
    .filter((post) => import.meta.env.DEV || !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Formats a frontmatter date as e.g. "28 Jul 2026".
 * Derived from the raw date parts rather than a Date object so the output is
 * identical on the prerender server and in every browser timezone (a bare
 * "2026-07-28" parses as UTC midnight, which is the previous day behind UTC).
 */
export function formatPostDate(date: string): string {
  const [year, month, day] = date.slice(0, 10).split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}
