"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, CheckCircle, Handshake } from "lucide-react";
import { event } from "@/lib/gtag";

const trustBadges = [
  {
    icon: Lock,
    text: "Your data stays yours",
  },
  {
    icon: CheckCircle,
    text: "Real experts, real accountability",
  },
  {
    icon: Handshake,
    text: "Human backup included",
  },
];

export function InlineWaitlistCTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand-primary/5 to-brand-accent/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
          Ready to Get Started?
        </h2>

        <p className="mt-4 text-lg text-brand-text">
          Join professionals and businesses already on the waitlist.
        </p>

        <Button
          asChild
          size="lg"
          className="mt-8 bg-brand-cta hover:bg-brand-cta/90 text-white text-lg px-8"
          onClick={() =>
            event("cta_click", {
              cta_name: "join_waitlist",
              location: "inline_cta",
            })
          }
        >
          <Link href="#waitlist">
            Join the Waitlist <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-8">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-brand-text">
              <badge.icon className="w-5 h-5 text-brand-accent" />
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
