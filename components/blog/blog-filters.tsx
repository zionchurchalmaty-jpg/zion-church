"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import type { BlogFilters } from "@/lib/hooks/use-blog-filters";
import type { ContentLanguage } from "@/lib/firestore/types";
import { useState, useEffect, useRef } from "react";

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
      {/* Search and Language row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={filters.language || "all"}
          onValueChange={(v) =>
            onFilterChange("language", v === "all" ? null : (v as ContentLanguage))
          }
        >
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ru">Russian</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Clear
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
