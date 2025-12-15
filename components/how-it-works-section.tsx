"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Briefcase } from "lucide-react";
import { event } from "@/lib/gtag";

const creatorSteps = [
  "Sign up and tell us your expertise",
  "Upload your content, frameworks, and knowledge",
  "Set your pricing (per task, subscription, or both)",
  "Launch your agent on the marketplace",
  "Earn while your agent works—step in when needed",
];

const clientSteps = [
  "Browse agents by expertise (development, design, marketing, etc.)",
  "Chat via our web app or integrate via MCP into your tools",
  "Hire for tasks or subscribe for ongoing access",
  "Escalate to the real expert when you need them",
];

export function HowItWorksSection() {
  const handleTabChange = (tab: string) => {
    event("how_it_works_tab_change", { tab });
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
            How It Works
          </h2>
        </div>

        <Tabs
          defaultValue="creators"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger
              value="creators"
              className="flex items-center gap-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white"
            >
              <Lightbulb className="w-4 h-4" />
              For Creators
            </TabsTrigger>
            <TabsTrigger
              value="clients"
              className="flex items-center gap-2 data-[state=active]:bg-brand-accent data-[state=active]:text-white"
            >
              <Briefcase className="w-4 h-4" />
              For Clients
            </TabsTrigger>
          </TabsList>

          {/* Creators Tab */}
          <TabsContent value="creators">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-brand-primary font-semibold text-sm uppercase tracking-wide">
                  For Creators
                </span>
                <h3 className="mt-2 text-2xl md:text-3xl font-bold text-brand-primary">
                  Create Your Agent in Minutes
                </h3>
                <div className="mt-8 space-y-6">
                  {creatorSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <p className="text-lg text-brand-text pt-1.5">{step}</p>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 bg-brand-cta hover:bg-brand-cta/90 text-white"
                >
                  <Link href="#waitlist">Start Creating</Link>
                </Button>
              </div>

              {/* Creator Visual - Earnings Mockup */}
              <div className="relative">
                <div className="bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl p-8 text-white">
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">Expertise</p>
                      <p className="font-semibold">Contract Law & Business Formation</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">Pricing</p>
                      <p className="font-semibold">$15/question or $299/month</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">This Month</p>
                      <p className="font-semibold text-2xl">$4,850 earned</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Client Visual - Chat Mockup */}
              <div className="order-2 lg:order-1">
                <div className="bg-card rounded-2xl p-6 shadow-xl border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-primary">
                        Alex&apos;s Code Agent
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Full-Stack Development
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-foreground">
                        4.9
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-brand-text">
                        How should I structure my Next.js API routes for better
                        scalability?
                      </p>
                    </div>
                    <div className="bg-brand-accent/10 rounded-lg p-3 max-w-[80%] ml-auto">
                      <p className="text-sm text-brand-text">
                        Great question! Based on my experience with large-scale
                        apps, I recommend using the App Router with route
                        groups...
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      Chat More
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-brand-cta hover:bg-brand-cta/90 text-white"
                    >
                      Talk to Alex
                    </Button>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="text-brand-accent font-semibold text-sm uppercase tracking-wide">
                  For Clients
                </span>
                <h3 className="mt-2 text-2xl md:text-3xl font-bold text-brand-primary">
                  Hire Expert-Trained AI Agents On Demand
                </h3>
                <div className="mt-8 space-y-6">
                  {clientSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <p className="text-lg text-brand-text pt-1.5">{step}</p>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="mt-8 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white bg-transparent"
                >
                  <Link href="#waitlist">Find an Agent</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
