import { getAllPosts, getAllTags } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Good News Bible Church",
  description:
    "News, updates, and spiritual encouragement from Good News Bible Church in Ashburn, VA.",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back to Home
            </Link>

            <header className="mb-12">
              <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 text-navy">
                Blog
              </h1>
              <p className="text-xl text-muted-foreground">
                News, updates, and spiritual encouragement from Good News Bible
                Church.
              </p>
            </header>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase()}`}
                    className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No blog posts yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="group border rounded-lg p-6 hover:border-primary/50 transition-colors bg-white"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <time dateTime={post.date}>
                            {formatDate(post.date)}
                          </time>
                          {post.readingTime && (
                            <>
                              <span>•</span>
                              <span>{post.readingTime}</span>
                            </>
                          )}
                        </div>
                        <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors text-navy">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">{post.author}</span>
                            {post.authorRole && (
                              <span className="text-muted-foreground">
                                • {post.authorRole}
                              </span>
                            )}
                          </div>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-2">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
