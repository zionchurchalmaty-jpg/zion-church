"use client";

import { useEffect, useState } from "react";
import { ContentList } from "@/components/admin/content-list";
import { getAllContent } from "@/lib/firestore/content";
import type { Content } from "@/lib/firestore/types";
import { Loader2 } from "lucide-react";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getAllContent({ contentType: "sermon" });
        setPosts(data);
      } catch (error) {
        console.error("Failed to load sermons:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-orange" />
      </div>
    );
  }

  return <ContentList items={posts} contentType="sermon" />;
}
