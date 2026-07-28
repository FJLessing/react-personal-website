# Resume Site Design

This site was intially generated with Figma Make and has been deeply customised.

## Running the code

Run `bun i` to install the dependencies.

Run `bun run dev` to start the development server.

## Building

Run `bun run build`. This produces a fully pre-rendered static site in `dist/`:

1. `vite build` — client bundle
2. `vite build --ssr` — server bundle (used only at build time)
3. `bun scripts/prerender.ts` — renders every route (`/`, `/blog`, one file per
   blog post, `/404`) to flat HTML files and generates `sitemap.xml` and
   `rss.xml`

Deploy by uploading the contents of `dist/` to Apache. The included
`dist/.htaccess` maps clean extensionless URLs (e.g. `/blog/my-post`) onto the
flat `.html` files.

## Writing blog posts

Add a markdown file to `src/content/blog/` with frontmatter:

```md
---
title: "My Post"
description: "One-line summary for SEO and the blog index."
date: 2026-07-28
tags: ["react", "devops"]
draft: false
---

Post content in markdown. Code blocks are highlighted with Shiki at build time.
```

The filename becomes the URL slug (`my-post.md` -> `/blog/my-post`). Drafts are
visible in `bun run dev` but excluded from production builds. Rebuild to publish.
