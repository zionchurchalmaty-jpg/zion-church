"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { event } from "@/lib/gtag";
import { Code, Calculator, Scale, Rocket, Check } from "lucide-react";
import Link from "next/link";

const verticals = [
  {
    id: "developers",
    icon: Code,
    title: "Developers",
    tagline: "Code review from a senior dev's AI—while they sleep.",
    bullets: [
      "Code review & best practices",
      "Architecture decisions",
      "Debugging help",
      "Framework expertise",
    ],
    price: "From $5/task",
    available: true,
    badges: null,
  },
  {
    id: "tax_accounting",
    icon: Calculator,
    title: "Tax & Accounting",
    tagline: "CPA-trained AI. Not ChatGPT guesses.",
    bullets: [
      "Tax deduction questions",
      "Expense categorization",
      "Estimated tax help",
      "Bookkeeping guidance",
    ],
    price: "From $10/session",
    available: true,
    badges: ["Proper disclaimers included", "Human escalation available"],
  },
  {
    id: "legal",
    icon: Scale,
    title: "Legal",
    tagline: "Legal guidance from attorney-trained AI. Human when needed.",
    bullets: [
      "Contract review basics",
      "Process & timeline questions",
      "Document prep guidance",
      "Jurisdiction information",
    ],
    price: "From $15/session",
    available: true,
    badges: ["Proper disclaimers included", "Human escalation available"],
  },
  {
    id: "coming_soon",
    icon: Rocket,
    title: "Coming Soon",
    tagline: null,
    bullets: [
      "Marketing & Growth",
      "Design & UX",
      "HR & Recruiting",
      "Financial Planning",
      "And more...",
    ],
    price: null,
    available: false,
    badges: null,
  },
];

export function VerticalShowcase() {
  const handleVerticalClick = (
    verticalId: string,
    action: "hire" | "create" | "waitlist"
  ) => {
    event("vertical_card_click", {
      vertical: verticalId,
      action,
    });
  };

  return (
    <section id="verticals" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
            Expert Agents for Every Need
          </h2>
          <p className="mt-4 text-lg text-brand-text">
            Browse AI agents trained by real professionals in these fields.
          </p>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible snap-x snap-mandatory md:snap-none">
          {verticals.map((vertical) => (
            <Card
              key={vertical.id}
              className={`flex-shrink-0 w-[280px] md:w-auto snap-center ${
                vertical.available
                  ? "bg-card hover:shadow-lg transition-shadow"
                  : "bg-muted/50"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${
                      vertical.available ? "bg-brand-accent/10" : "bg-muted"
                    } flex items-center justify-center`}
                  >
                    <vertical.icon
                      className={`w-6 h-6 ${
                        vertical.available
                          ? "text-brand-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-lg font-semibold ${
                      vertical.available
                        ? "text-brand-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {vertical.title}
                  </h3>
                </div>

                {vertical.tagline && (
                  <p className="mt-4 text-sm text-brand-text italic">
                    &quot;{vertical.tagline}&quot;
                  </p>
                )}

                <ul className="mt-4 space-y-2">
                  {vertical.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-brand-text"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {vertical.badges && (
                  <div className="mt-4 space-y-1">
                    {vertical.badges.map((badge, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400"
                      >
                        <Check className="w-3 h-3" />
                        {badge}
                      </div>
                    ))}
                  </div>
                )}

                {vertical.price && (
                  <p className="mt-4 text-sm font-medium text-brand-primary">
                    {vertical.price}
                  </p>
                )}

                <div className="mt-6 space-y-2">
                  {vertical.available ? (
                    <>
                      <Button
                        asChild
                        className="w-full bg-brand-cta hover:bg-brand-cta/90"
                        onClick={() =>
                          handleVerticalClick(vertical.id, "hire")
                        }
                      >
                        <Link href="#waitlist">
                          Hire a {vertical.title.split(" ")[0]} Agent
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                        onClick={() =>
                          handleVerticalClick(vertical.id, "create")
                        }
                      >
                        <Link href="#waitlist">
                          Create Your {vertical.title.split(" ")[0]} Agent
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        handleVerticalClick(vertical.id, "waitlist")
                      }
                    >
                      <Link href="#waitlist">Join Waitlist</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scroll indicator for mobile */}
        <div className="mt-4 flex justify-center gap-2 md:hidden">
          {verticals.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-brand-accent/30"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
