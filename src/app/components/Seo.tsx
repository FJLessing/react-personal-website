import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://www.fjlessing.co.za";
export const SITE_NAME = "FJ Lessing";
export const DEFAULT_IMAGE = `${SITE_URL}/assets/816cce38ea06beccf64a13c02ed16a2a72daced0.png`;

interface SeoProps {
  title: string;
  description: string;
  /** Canonical path, e.g. "/" or "/blog/my-post" */
  path: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  tags?: string[];
  jsonLd?: Record<string, unknown>;
}

/**
 * Per-route SEO tags. Rendered into <head> by react-helmet-async both in the
 * browser and during static pre-rendering (see scripts/prerender.ts).
 */
export function Seo({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_IMAGE,
  publishedTime,
  tags = [],
  jsonLd,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="FJ Lessing" />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" &&
        tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@FJLessing" />
      <meta name="twitter:creator" content="@FJLessing" />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
