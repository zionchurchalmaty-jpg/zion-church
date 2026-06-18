"use client";

import { useEffect, useState } from "react";
import { ContentList } from "@/components/admin/content-list";
import { getAllContent } from "@/lib/firestore/content";
import type { Content } from "@/lib/firestore/types";
import { Loader2 } from "lucide-react";

export default function AdminMinistriesPage() {
  const [ministries, setMinistries] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMinistries() {
      try {
        const data = await getAllContent({ contentType: "ministry" });
        setMinistries(data);
      } catch (error) {
        console.error("Failed to load ministries:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMinistries();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-orange" />
      </div>
    );
  }

  return <ContentList items={ministries} contentType="ministry" />;
}