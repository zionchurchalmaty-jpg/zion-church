import type { Content } from "@/lib/firestore/types";
import Link from "next/link";

function stripHtmlAndTruncate(html: string, maxLength: number = 150): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

interface BlogPostCardProps {
  post: Content;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group border rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all bg-white flex flex-col">
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
            {post.excerpt ||
              post.seo.metaDescription ||
              stripHtmlAndTruncate(post.content)}
          </p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t">
            <span className="text-sm font-medium text-navy/80">
              {post.author}
            </span>
            {post.tags && post.tags.length > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                {post.tags[0]}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
