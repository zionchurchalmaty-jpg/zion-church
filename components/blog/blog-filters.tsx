"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { BlogFilters } from "@/lib/hooks/use-blog-filters";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

interface BlogFiltersProps {
  filters: BlogFilters;
  availableTags: string[];
  onFilterChange: <K extends keyof BlogFilters>(
    key: K,
    value: BlogFilters[K]
  ) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function BlogFiltersComponent({
  filters,
  availableTags,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
}: BlogFiltersProps) {
  const t = useTranslations("blog");

  // Local state for debounced search
  const [searchInput, setSearchInput] = useState(filters.search);

  // Track what we've sent to URL to avoid sync-back race condition
  const lastSentValueRef = useRef(filters.search);

  // Sync external filter changes to local state (e.g., browser back/forward, clear filters)
  // Only sync if the URL change wasn't initiated by our debounce
  useEffect(() => {
    if (filters.search !== lastSentValueRef.current) {
      setSearchInput(filters.search);
      lastSentValueRef.current = filters.search;
    }
  }, [filters.search]);

  // Debounce search - update URL after user stops typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== filters.search) {
        lastSentValueRef.current = searchInput;
        onFilterChange("search", searchInput);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchInput, filters.search, onFilterChange]);

  return (
    <div className="space-y-4 mb-8">
      {/* Search row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9"
          />
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearFilters} className="gap-2">
            <X className="h-4 w-4" />
            {t("clear")}
          </Button>
        )}
      </div>

      {/* Tags */}
      {availableTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={filters.tag === tag ? "default" : "outline"}
              className="cursor-pointer transition-colors hover:bg-primary/80"
              onClick={() =>
                onFilterChange("tag", filters.tag === tag ? null : tag)
              }
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
