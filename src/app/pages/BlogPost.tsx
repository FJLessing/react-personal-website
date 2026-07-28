import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { Seo, SITE_URL } from "@/app/components/Seo";
import { formatPostDate, getPost } from "@/lib/blog";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "FJ Lessing",
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <div className="min-h-screen bg-black/90 text-white">
      <Seo
        title={`${post.title} | FJ Lessing`}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={new Date(post.date).toISOString()}
        tags={post.tags}
        jsonLd={articleJsonLd}
      />
      <Navigation />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-yellow-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <article>
          <header className="mb-10">
            <h1 className="text-4xl mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
              <time dateTime={post.date}>
                {formatPostDate(post.date)}
              </time>
              <span>{post.readingTime} min read</span>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded bg-zinc-800 text-yellow-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Post HTML is generated at build time from our own markdown files */}
          <div
            className="prose prose-invert prose-zinc max-w-none prose-a:text-yellow-500 prose-headings:text-white prose-strong:text-white prose-code:text-yellow-500 prose-pre:border prose-pre:border-zinc-800"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </main>

      <Footer />
    </div>
  );
}
