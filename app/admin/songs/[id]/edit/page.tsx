"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ContentForm } from "@/components/admin/content-form";
import { getContentById } from "@/lib/firestore/content";
import type { Content } from "@/lib/firestore/types";
import { Loader2 } from "lucide-react";

export default function EditSongPage() {
  const params = useParams();
  const router = useRouter();
  const [song, setSong] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSong() {
      if (!params.id) return;

      try {
        const data = await getContentById(params.id as string);
        if (data && data.contentType === "song") {
          setSong(data);
        } else {
          router.push("/admin/songs");
        }
      } catch (error) {
        console.error("Failed to load song:", error);
        router.push("/admin/songs");
      } finally {
        setLoading(false);
      }
    }

    loadSong();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-orange" />
      </div>
    );
  }

  if (!song) {
    return null;
  }

  return <ContentForm contentType="song" initialData={song} isEditing />;
}
