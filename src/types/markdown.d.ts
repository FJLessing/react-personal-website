export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  draft?: boolean;
}

declare module "*.md" {
  import type { PostFrontmatter } from "@/types/markdown";

  export const frontmatter: PostFrontmatter;
  export const html: string;
  export const excerpt: string;
  export const readingTime: number;

  const mod: {
    frontmatter: PostFrontmatter;
    html: string;
    excerpt: string;
    readingTime: number;
  };
  export default mod;
}
