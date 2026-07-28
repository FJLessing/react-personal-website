import type { Plugin } from "vite";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";

/**
 * Transforms `.md` imports into JS modules at build time.
 *
 * Each markdown file becomes a module exporting:
 *   - frontmatter: parsed YAML frontmatter object
 *   - html: rendered HTML (GFM + Shiki syntax highlighting)
 *   - excerpt: plain-text excerpt derived from the rendered content
 *   - readingTime: estimated minutes to read
 *
 * Because the transform runs in Node during the Vite build, none of the
 * markdown/shiki tooling ships in the browser bundle - only the resulting
 * HTML strings do.
 */
export default function markdownBlog(): Plugin {
  // A single processor instance is reused across files so Shiki's
  // highlighter is only created once.
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeShiki, { theme: "github-dark" })
    .use(rehypeStringify);

  return {
    name: "vite-plugin-markdown-blog",
    enforce: "pre",

    async transform(code, id) {
      if (!id.endsWith(".md")) return null;

      const { data: frontmatter, content } = matter(code);

      const file = await processor.process(content);
      const html = String(file);

      const plainText = html
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const excerpt = plainText.slice(0, 200).replace(/\s+\S*$/, "") + (plainText.length > 200 ? "…" : "");
      const readingTime = Math.max(1, Math.round(plainText.split(" ").length / 200));

      return {
        code: [
          `export const frontmatter = ${JSON.stringify(frontmatter)};`,
          `export const html = ${JSON.stringify(html)};`,
          `export const excerpt = ${JSON.stringify(excerpt)};`,
          `export const readingTime = ${JSON.stringify(readingTime)};`,
          `export default { frontmatter, html, excerpt, readingTime };`,
        ].join("\n"),
        map: null,
      };
    },
  };
}
