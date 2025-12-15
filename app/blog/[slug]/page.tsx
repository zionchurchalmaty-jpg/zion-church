import { getAllPosts, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { useMDXComponents } from "@/mdx-components";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found - Good News Bible Church",
    };
  }

  return {
    title: `${post.title} - Good News Bible Church Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const components = useMDXComponents({});
  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
    components,
  });

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <main className="flex-1">
        <article className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <header className="mb-10">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
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
                Back to Blog
              </Link>

              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </>
                )}
              </div>

              <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 text-navy">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {post.description}
              </p>

              <div className="flex items-center justify-between border-y py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{post.author}</div>
                    {post.authorRole && (
                      <div className="text-sm text-muted-foreground">
                        {post.authorRole}
                      </div>
                    )}
                  </div>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
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
              </div>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {content}
            </div>

            <footer className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between">
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  ← Back to all posts
                </Link>
              </div>
            </footer>
          </div>
        </article>
      </main>
    </div>
  );
}
