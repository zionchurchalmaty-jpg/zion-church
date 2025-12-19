import { Suspense } from "react";
import { getPublishedContent } from "@/lib/firestore/content";
import type { Content } from "@/lib/firestore/types";
import type { Metadata } from "next";
import Link from "next/link";
import { BlogListClient } from "@/components/blog/blog-list-client";

export const metadata: Metadata = {
  title: "Blog - Good News Bible Church",
  description:
    "News, updates, and spiritual encouragement from Good News Bible Church in Ashburn, VA.",
};

// Revalidate every 5 minutes
export const revalidate = 300;

function getUniqueTags(posts: Content[]): string[] {
  const tagsSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
}

export default async function BlogPage() {
  const posts = await getPublishedContent("blog");
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

          <Suspense fallback={<BlogListSkeleton />}>
            <BlogListClient posts={posts} availableTags={tags} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function BlogListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-8">
        <div className="h-10 bg-muted rounded flex-1 animate-pulse" />
        <div className="h-10 bg-muted rounded w-40 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg overflow-hidden bg-white">
            <div className="aspect-video bg-muted animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
