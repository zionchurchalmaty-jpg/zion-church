"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WaitlistForm } from "@/components/waitlist-form";
import { event } from "@/lib/gtag";
import { ArrowLeftRight, Briefcase, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function FormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-10 w-full bg-muted rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-16 bg-muted rounded" />
        <div className="h-10 w-full bg-muted rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="h-24 w-full bg-muted rounded" />
      </div>
      <div className="h-10 w-full bg-muted rounded" />
    </div>
  );
}

export function WaitlistSection() {
  const handleTabChange = (value: string) => {
    event("waitlist_tab_change", { tab: value });
  };

  return (
    <section
      id="waitlist"
      className="py-16 md:py-24 bg-gradient-to-b from-muted to-background"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
            Join the Waitlist
          </h2>
          {/* <div className="mt-4 inline-flex items-center gap-2 bg-brand-primary/10 px-4 py-2 rounded-full">
            <Users className="w-5 h-5 text-brand-primary" />
            <span className="font-semibold text-brand-primary">
              1,247 professionals already signed up
            </span>
          </div> */}
        </div>

        <div className="mt-10">
          <Tabs
            defaultValue="creator"
            className="w-full"
            onValueChange={handleTabChange}
          >
            <div className="relative mb-8">
              <TabsList className="grid w-full grid-cols-2 h-auto p-1.5 bg-muted/80 rounded-xl border border-border">
                <TabsTrigger
                  value="creator"
                  className="text-base py-3 px-4 rounded-lg data-[state=active]:bg-brand-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-foreground data-[state=inactive]:font-semibold data-[state=inactive]:hover:bg-muted transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Lightbulb className="w-5 h-5" />
                  I'm a Creator
                </TabsTrigger>
                <TabsTrigger
                  value="client"
                  className="text-base py-3 px-4 rounded-lg data-[state=active]:bg-brand-cta data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-foreground data-[state=inactive]:font-semibold data-[state=inactive]:hover:bg-muted transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-5 h-5" />
                  I'm a Client
                </TabsTrigger>
              </TabsList>
              {/* Switch indicator */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="bg-white rounded-full p-1.5 shadow-md border border-border">
                  <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              {/* Helper text */}
              <p className="text-center text-sm text-muted-foreground mt-2">
                Click to switch between Creator and Client signup
              </p>
            </div>

            <TabsContent value="creator">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                <Suspense fallback={<FormSkeleton />}>
                  <WaitlistForm variant="creator" />
                </Suspense>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By submitting this form, you agree to our{" "}
                  <Link
                    href="/legal/terms-of-service"
                    className="underline hover:text-foreground"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/legal/privacy-policy"
                    className="underline hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </TabsContent>

            <TabsContent value="client">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                <Suspense fallback={<FormSkeleton />}>
                  <WaitlistForm variant="client" />
                </Suspense>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By submitting this form, you agree to our{" "}
                  <Link
                    href="/legal/terms-of-service"
                    className="underline hover:text-foreground"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/legal/privacy-policy"
                    className="underline hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
