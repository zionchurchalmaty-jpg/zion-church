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

function stripHtmlAndTruncate(html: string, maxLength: number = 150): string {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  // Truncate if needed
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
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
        <div className="max-w-6xl mx-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group border rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all bg-white flex flex-col"
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                    {post.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex flex-col flex-1 p-5">
                      <h2 className="text-lg font-semibold group-hover:text-primary transition-colors text-navy mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {post.excerpt || post.seo.metaDescription || stripHtmlAndTruncate(post.content)}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t">
                        <span className="text-sm font-medium text-navy/80">{post.author}</span>
                        {post.tags && post.tags.length > 0 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                            {post.tags[0]}
                          </span>
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
