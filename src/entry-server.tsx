import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./app/App";
import { getAllPosts } from "./lib/blog";

export { getAllPosts };

export interface RenderResult {
  html: string;
  helmet: HelmetServerState | null;
}

export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState | null } = {};

  const html = renderToString(
    <StaticRouter location={url}>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </StaticRouter>,
  );

  return { html, helmet: helmetContext.helmet ?? null };
}

/** Every route that should be pre-rendered to a static HTML file. */
export function getPrerenderRoutes(): string[] {
  return [
    "/",
    "/blog",
    ...getAllPosts().map((post) => `/blog/${post.slug}`),
    "/404",
  ];
}
