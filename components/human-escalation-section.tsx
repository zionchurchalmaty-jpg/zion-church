"use client";

import { useEffect, useRef } from "react";
import { User, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { event } from "@/lib/gtag";

export function HumanEscalationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            event("escalation_section_view", {});
            hasTrackedView.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
            AI That Knows Its Limits
          </h2>
          <p className="mt-4 text-lg text-brand-text max-w-2xl mx-auto">
            See how expert agents recognize when you need the real human.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-brand-accent/30 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-brand-primary/5 px-6 py-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-brand-primary">Tax Agent</p>
                <p className="text-xs text-muted-foreground">
                  Trained by Mike R., CPA
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <CardContent className="p-6 space-y-4">
              {/* User message 1 */}
              <div className="flex justify-end">
                <div className="bg-brand-primary text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm">
                    Can I deduct my home office if I&apos;m a W-2 employee?
                  </p>
                </div>
              </div>

              {/* Agent response 1 */}
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-brand-text">
                    Generally, W-2 employees can no longer deduct home office
                    expenses after the 2017 Tax Cuts and Jobs Act. However,
                    there are some exceptions for certain professions...
                  </p>
                </div>
              </div>

              {/* User message 2 */}
              <div className="flex justify-end">
                <div className="bg-brand-primary text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm">
                    What about my specific situation with multiple state
                    residences?
                  </p>
                </div>
              </div>

              {/* Agent escalation response */}
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-brand-text">
                    Multi-state tax situations can be complex and depend on
                    specific factors. I&apos;d recommend speaking with Mike
                    directly for this.
                  </p>
                </div>
              </div>

              {/* Escalation CTA Card */}
              <div className="bg-brand-cta/10 border border-brand-cta/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand-primary">
                      Talk to Mike
                    </p>
                    <p className="text-xs text-muted-foreground">
                      CPA, 15 yrs experience · Available today
                    </p>
                    <p className="text-sm font-medium text-brand-cta">
                      $75/30 min
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-brand-cta hover:bg-brand-cta/90 flex-shrink-0"
                  >
                    Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supporting copy */}
          <p className="mt-6 text-center text-brand-text">
            Generic AI hallucinates and hopes you don&apos;t notice.{" "}
            <span className="font-semibold text-brand-primary">
              ProAgent Me agents know their limits
            </span>{" "}
            and connect you to the human who trained them.
          </p>
        </div>
      </div>
    </section>
  );
}
