"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getContentCounts, getAllContent } from "@/lib/firestore/content";
import type { Content } from "@/lib/firestore/types";
import { FileText, Music, Calendar, Plus, Loader2, ArrowRight } from "lucide-react";

interface ContentCounts {
  blog: { total: number; published: number; draft: number };
  song: { total: number; published: number; draft: number };
  event: { total: number; published: number; draft: number };
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<ContentCounts | null>(null);
  const [recentItems, setRecentItems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [countsData, recent] = await Promise.all([
          getContentCounts(),
          getAllContent({ limit: 5 }),
        ]);
        setCounts(countsData);
        setRecentItems(recent);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-orange" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-navy">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome to the admin panel. Manage your blog posts and songs here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Blog Posts"
          icon={FileText}
          total={counts?.blog.total || 0}
          published={counts?.blog.published || 0}
          draft={counts?.blog.draft || 0}
          href="/admin/blog"
        />
        <StatsCard
          title="Events"
          icon={Calendar}
          total={counts?.event.total || 0}
          published={counts?.event.published || 0}
          draft={counts?.event.draft || 0}
          href="/admin/events"
        />
        <StatsCard
          title="Songs"
          icon={Music}
          total={counts?.song.total || 0}
          published={counts?.song.published || 0}
          draft={counts?.song.draft || 0}
          href="/admin/songs"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 font-serif text-xl font-semibold text-navy">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="orange">
            <Link href="/admin/blog/new">
              <Plus className="mr-2 h-4 w-4" />
              New Blog Post
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/events/new">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/songs/new">
              <Plus className="mr-2 h-4 w-4" />
              New Song
            </Link>
          </Button>
        </div>
      </div>

      {/* Recent Content */}
      <div>
        <h2 className="mb-4 font-serif text-xl font-semibold text-navy">
          Recent Content
        </h2>
        <Card className="divide-y">
          {recentItems.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No content yet. Create your first post or song!
            </div>
          ) : (
            recentItems.map((item) => {
              const pathMap = { blog: "blog", song: "songs", event: "events" };
              const labelMap = { blog: "Blog Post", song: "Song", event: "Event" };
              const iconMap = { blog: FileText, song: Music, event: Calendar };
              const Icon = iconMap[item.contentType as keyof typeof iconMap] || FileText;

              return (
                <Link
                  key={item.id}
                  href={`/admin/${pathMap[item.contentType as keyof typeof pathMap] || "blog"}/${item.id}/edit`}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-accent/50"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {labelMap[item.contentType as keyof typeof labelMap] || item.contentType} •{" "}
                        {item.status}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              );
            })
          )}
        </Card>
      </div>
    </div>
  );
}

function StatsCard({
  title,
  icon: Icon,
  total,
  published,
  draft,
  href,
}: {
  title: string;
  icon: typeof FileText;
  total: number;
  published: number;
  draft: number;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="p-6 transition-shadow hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="rounded-lg bg-primary-orange/10 p-2">
            <Icon className="h-5 w-5 text-primary-orange" />
          </div>
          <span className="text-3xl font-bold text-navy">{total}</span>
        </div>
        <h3 className="mt-4 font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {published} published • {draft} drafts
        </p>
      </Card>
    </Link>
  );
}
