import { Link } from "react-router";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { Seo } from "@/app/components/Seo";
import { formatPostDate, getAllPosts } from "@/lib/blog";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black/90 text-white">
      <Seo
        title="Blog | FJ Lessing"
        description="Articles by FJ Lessing on full-stack development, mobile apps, cloud architecture, DevOps, and leading development teams."
        path="/blog"
      />
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-12">
          <h1 className="text-4xl mb-4">
            Bl<span className="text-yellow-500">og</span>
          </h1>
          <p className="text-zinc-400">
            Notes on software development, architecture, DevOps, and team
            leadership.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-zinc-500">No posts published yet. Check back soon.</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="block border border-zinc-800 rounded-lg p-6 bg-zinc-900/50 hover:border-yellow-500/60 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500 mb-2">
                    <time dateTime={post.date}>
                      {formatPostDate(post.date)}
                    </time>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <h2 className="text-2xl text-white mb-2">{post.title}</h2>
                  <p className="text-zinc-400 mb-4">{post.description}</p>
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
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
