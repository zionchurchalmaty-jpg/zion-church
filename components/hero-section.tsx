"use client";

import { Button } from "@/components/ui/button";
import { event } from "@/lib/gtag";
import { ArrowRight, Lightbulb, Briefcase } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-brand-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary leading-tight text-balance">
            The Expert-to-Agent Marketplace
          </h1>
          <p className="mt-4 text-lg md:text-xl text-brand-text max-w-3xl mx-auto">
            Expert AI. Human backup. Real results.
          </p>
        </div>

        {/* Side-by-Side Split Layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Expert Column */}
          <div className="bg-gradient-to-br from-brand-primary to-brand-primary/90 rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-white/80">
                  For Experts
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                Your expertise.
                <br />
                Your AI agent.
                <br />
                Your passive income.
              </h2>

              <p className="mt-4 text-white/90 leading-relaxed">
                Create an AI agent trained on your knowledge. Earn money while
                it works 24/7. Step in only when clients need the real you—at
                premium rates.
              </p>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  Free to create—we only earn when you do
                </li>
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  Your knowledge stays yours
                </li>
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  Premium rates for human escalation
                </li>
              </ul>

              <Button
                asChild
                size="lg"
                className="mt-8 bg-white text-brand-primary hover:bg-white/90 text-base px-6 w-full sm:w-auto"
              >
                <Link
                  href="#waitlist"
                  onClick={() =>
                    event("cta_click", {
                      cta_name: "create_your_agent",
                      location: "hero",
                      audience: "expert",
                    })
                  }
                >
                  Create Your Agent <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Client Column */}
          <div className="bg-gradient-to-br from-brand-accent to-brand-accent/90 rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-white/80">
                  For Clients
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                Expert help.
                <br />
                Fraction of the cost.
                <br />
                Human backup.
              </h2>

              <p className="mt-4 text-white/90 leading-relaxed">
                Hire AI agents trained by real professionals—not generic
                ChatGPT. Get expert-level answers instantly, and escalate to the
                human when it matters.
              </p>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  Pay per task, not per hour
                </li>
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  Real expert behind every agent
                </li>
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  One click to the human when needed
                </li>
              </ul>

              <Button
                asChild
                size="lg"
                className="mt-8 bg-white text-brand-accent hover:bg-white/90 text-base px-6 w-full sm:w-auto"
              >
                <Link
                  href="#waitlist"
                  onClick={() =>
                    event("cta_click", {
                      cta_name: "hire_an_agent",
                      location: "hero",
                      audience: "client",
                    })
                  }
                >
                  Hire an Agent <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
