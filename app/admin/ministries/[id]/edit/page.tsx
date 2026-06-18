"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ContentForm } from "@/components/admin/content-form";
import { getContentById } from "@/lib/firestore/content";
import type { Content } from "@/lib/firestore/types";
import { Loader2 } from "lucide-react";

export default function EditMinistryPage() {
  const params = useParams();
  const router = useRouter();
  const [ministry, setMinistry] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMinistry() {
      if (!params.id) return;

      try {
        const data = await getContentById(params.id as string);
        if (data && data.contentType === "ministry") {
          setMinistry(data);
        } else {
          router.push("/admin/ministries");
        }
      } catch (error) {
        console.error("Failed to load ministry:", error);
        router.push("/admin/ministries");
      } finally {
        setLoading(false);
      }
    }

    loadMinistry();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-orange" />
      </div>
    );
  }

  if (!ministry) {
    return null;
  }

  return <ContentForm contentType="ministry" initialData={ministry} isEditing />;
}