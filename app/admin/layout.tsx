"use client";

import { AuthProvider, useAuth } from "@/components/admin/auth-provider";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthorized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-cream">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary-orange" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAuthorized) {
    return (
      <div className="flex h-screen items-center justify-center bg-cream">
        <div className="max-w-md rounded-lg border bg-card p-8 text-center">
          <h1 className="mb-4 font-serif text-2xl font-bold text-navy">
            Access Denied
          </h1>
          <p className="mb-6 text-muted-foreground">
            Your account does not have permission to access the admin panel.
            Please sign in with an authorized email address.
          </p>
          <button
            onClick={() => router.replace("/login")}
            className="rounded-lg bg-primary-orange px-4 py-2 text-white hover:bg-primary-orange/90"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-cream">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminAuthGuard>{children}</AdminAuthGuard>
    </AuthProvider>
  );
}
