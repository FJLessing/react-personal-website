/**
 * Static pre-rendering (SSG) script.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 * For every known route it renders the app to an HTML string with
 * react-dom/server, injects the markup and the react-helmet-async head tags
 * into the client build's index.html, and writes flat HTML files:
 *
 *   /                -> dist/index.html
 *   /blog            -> dist/blog.html
 *   /blog/hello-world -> dist/blog/hello-world.html
 *   /404             -> dist/404.html
 *
 * It also emits dist/sitemap.xml and dist/rss.xml.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const SITE_URL = "https://www.fjlessing.co.za";

const root = process.cwd();
const distDir = join(root, "dist");

interface HelmetPart {
  toString: () => string;
}

interface RenderedRoute {
  html: string;
  helmet: {
    title: HelmetPart;
    meta: HelmetPart;
    link: HelmetPart;
    script: HelmetPart;
  } | null;
}

interface PostInfo {
  slug: string;
  title: string;
  description: string;
  date: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function routeToFile(route: string): string {
  if (route === "/") return join(distDir, "index.html");
  return join(distDir, `${route}.html`);
}

async function main() {
  const template = readFileSync(join(distDir, "index.html"), "utf8");

  const serverEntry = (await import("../dist-ssr/entry-server.js")) as {
    render: (url: string) => RenderedRoute;
    getPrerenderRoutes: () => string[];
    getAllPosts: () => PostInfo[];
  };

  const { render, getPrerenderRoutes, getAllPosts } = serverEntry;
  const routes = getPrerenderRoutes();

  for (const route of routes) {
    const { html, helmet } = render(route);

    const headTags = helmet
      ? [helmet.title, helmet.meta, helmet.link, helmet.script]
          .map((part) => part.toString())
          .filter(Boolean)
          .join("\n    ")
      : "";

    let page = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`,
    );
    if (headTags) {
      page = page.replace("</head>", `    ${headTags}\n  </head>`);
    }

    const file = routeToFile(route);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, page);
    console.log(`pre-rendered ${route} -> ${file.replace(root, ".")}`);
  }

  // --- sitemap.xml ---
  const posts = getAllPosts();
  const sitemapUrls = [
    { loc: `${SITE_URL}/`, priority: "1.0" },
    { loc: `${SITE_URL}/blog`, priority: "0.8" },
    ...posts.map((post) => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: new Date(post.date).toISOString().slice(0, 10),
      priority: "0.6",
    })),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>${"lastmod" in url ? `\n    <lastmod>${url.lastmod}</lastmod>` : ""}
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
  writeFileSync(join(distDir, "sitemap.xml"), sitemap);

  // --- rss.xml ---
  const rssItems = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>FJ Lessing</title>
    <link>${SITE_URL}</link>
    <description>Articles by FJ Lessing on full-stack development, mobile apps, cloud architecture, DevOps, and team leadership.</description>
${rssItems}
  </channel>
</rss>
`;
  writeFileSync(join(distDir, "rss.xml"), rss);

  console.log(`\nDone: ${routes.length} routes, sitemap.xml, rss.xml`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
