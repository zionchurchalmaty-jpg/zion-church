"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ContentForm } from "@/components/admin/content-form";
import { getContentById } from "@/lib/firestore/content";
import type { Content } from "@/lib/firestore/types";
import { Loader2 } from "lucide-react";

export default function EditBlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!params.id) return;

      try {
        const data = await getContentById(params.id as string);
        if (data && data.contentType === "blog") {
          setPost(data);
        } else {
          router.push("/admin/blog");
        }
      } catch (error) {
        console.error("Failed to load blog post:", error);
        router.push("/admin/blog");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-orange" />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return <ContentForm contentType="blog" initialData={post} isEditing />;
}
