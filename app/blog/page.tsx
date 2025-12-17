import { getPublishedContent } from "@/lib/firestore/content";
import type { Content } from "@/lib/firestore/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Good News Bible Church",
  description:
    "News, updates, and spiritual encouragement from Good News Bible Church in Ashburn, VA.",
};

// Revalidate every 5 minutes
export const revalidate = 300;

// Helper to convert Firestore timestamp (may be object with _seconds or Timestamp instance)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toDate(timestamp: any): Date | null {
  if (!timestamp) return null;
  // If it's a Firestore Timestamp instance with toDate method
  if (typeof timestamp.toDate === "function") {
    return timestamp.toDate();
  }
  // If it's a plain object with _seconds (serialized Timestamp)
  if (timestamp._seconds !== undefined) {
    return new Date(timestamp._seconds * 1000);
  }
  // If it's already a Date
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return null;
}

function formatDate(timestamp: unknown): string {
  const date = toDate(timestamp);
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getISOString(timestamp: unknown): string | undefined {
  const date = toDate(timestamp);
  return date?.toISOString();
}

function getUniqueTags(posts: Content[]): string[] {
  const tagsSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
}

export default async function BlogPage() {
  const posts = await getPublishedContent("blog");
  console.log("posts =====>", posts);
  const tags = getUniqueTags(posts);

  return (
    <div className="bg-cream pt-16">
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
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
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
                  key={post.id}
                  className="group border rounded-lg p-6 hover:border-primary/50 transition-colors bg-white"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex flex-col space-y-3">
                      {post.coverImage && (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-lg mb-2"
                        />
                      )}
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <time dateTime={getISOString(post.publishedAt)}>
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                      <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors text-navy">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-2">
                        {post.excerpt || post.seo.metaDescription}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">{post.author}</span>
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
    </div>
  );
}
