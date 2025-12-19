"use client";

import { useMemo } from "react";
import type { Content } from "@/lib/firestore/types";
import { useBlogFilters } from "@/lib/hooks/use-blog-filters";
import { BlogFiltersComponent } from "./blog-filters";
import { BlogPostCard } from "./blog-post-card";
import { Button } from "@/components/ui/button";

interface BlogListClientProps {
  posts: Content[];
  availableTags: string[];
}

export function BlogListClient({ posts, availableTags }: BlogListClientProps) {
  const {
    filters,
    setFilter,
    clearFilters,
    loadedCount,
    loadMore,
    hasActiveFilters,
  } = useBlogFilters();

  // Filter posts based on current filters
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          post.searchableText?.includes(searchLower) ||
          post.title.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Tag filter
      if (filters.tag && !post.tags.includes(filters.tag)) {
        return false;
      }

      // Language filter
      if (filters.language && post.language !== filters.language) {
        return false;
      }

      return true;
    });
  }, [posts, filters]);

  // Apply pagination
  const displayedPosts = filteredPosts.slice(0, loadedCount);
  const hasMorePosts = filteredPosts.length > loadedCount;

  return (
    <>
      <BlogFiltersComponent
        filters={filters}
        availableTags={availableTags}
        onFilterChange={setFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {hasActiveFilters
              ? "No posts match your filters."
              : "No blog posts yet. Check back soon!"}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {hasMorePosts && (
            <div className="flex justify-center mt-8">
              <Button variant="outline" onClick={loadMore} size="lg">
                Load More ({filteredPosts.length - loadedCount} remaining)
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
