"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useCallback, useEffect, useMemo } from "react";
import type { ContentLanguage } from "@/lib/firestore/types";

export interface EventFilters {
  search: string;
  tag: string | null;
  language: ContentLanguage | null;
}

const INITIAL_PAGE_SIZE = 6;

export function useEventFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read filter state from URL
  const filters: EventFilters = useMemo(
    () => ({
      search: searchParams.get("q") || "",
      tag: searchParams.get("tag") || null,
      language: (searchParams.get("lang") as ContentLanguage) || null,
    }),
    [searchParams]
  );

  // Pagination state
  const [loadedCount, setLoadedCount] = useState(INITIAL_PAGE_SIZE);

  // Reset pagination when filters change
  useEffect(() => {
    setLoadedCount(INITIAL_PAGE_SIZE);
  }, [filters.search, filters.tag, filters.language]);

  const updateURL = useCallback(
    (newFilters: Partial<EventFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newFilters.search !== undefined) {
        if (newFilters.search) params.set("q", newFilters.search);
        else params.delete("q");
      }
      if (newFilters.tag !== undefined) {
        if (newFilters.tag) params.set("tag", newFilters.tag);
        else params.delete("tag");
      }
      if (newFilters.language !== undefined) {
        if (newFilters.language) params.set("lang", newFilters.language);
        else params.delete("lang");
      }

      const queryString = params.toString();
      router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, {
        scroll: false,
      });
    },
    [searchParams, router, pathname]
  );

  const setFilter = useCallback(
    <K extends keyof EventFilters>(key: K, value: EventFilters[K]) => {
      updateURL({ [key]: value });
    },
    [updateURL]
  );

  const clearFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const loadMore = useCallback(() => {
    setLoadedCount((prev) => prev + INITIAL_PAGE_SIZE);
  }, []);

  return {
    filters,
    setFilter,
    clearFilters,
    loadedCount,
    loadMore,
    hasActiveFilters: !!(filters.search || filters.tag || filters.language),
  };
}
