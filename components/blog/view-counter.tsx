"use client";

import { useEffect, useState, useRef } from "react";
import { incrementViewCount } from "@/lib/actions/views";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  id: string;
  initialViews?: number;
}

export function ViewCounter({ id, initialViews = 0 }: ViewCounterProps) {
  const [views, setViews] = useState(initialViews);
  const hasRegisteredView = useRef(false);

  useEffect(() => {
    if (hasRegisteredView.current) return;

    const registerView = async () => {
      hasRegisteredView.current = true;
      setViews((prev) => prev + 1);
      await incrementViewCount(id);
    };

    registerView();
  }, [id]);

  return (
    <div
      className="flex items-center gap-1.5 text-sm text-muted-foreground"
    >
      <Eye className="w-4 h-4" />
      <span>{views.toLocaleString()}</span>
    </div>
  );
}