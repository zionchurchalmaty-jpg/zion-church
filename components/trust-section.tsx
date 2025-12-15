import { User, ArrowUpCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const trustElements = [
  {
    icon: User,
    title: "Real Expert Behind Every Agent",
    description:
      "Know who trained your AI. See credentials, experience, and reviews.",
  },
  {
    icon: ArrowUpCircle,
    title: "Human Escalation Built In",
    description: "Complex issues go to the real human. One click to the expert.",
  },
  {
    icon: Star,
    title: "Quality You Can Trust",
    description: "Reviews, ratings, and track records for every agent.",
  },
];

export function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
            AI With Accountability
          </h2>
          <p className="mt-4 text-lg text-brand-text">
            Every agent on ProAgent Me is created by a real professional with a
            real reputation. When AI isn&apos;t enough, the expert steps in.
          </p>
        </div>

        {/* Trust Pillars Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {trustElements.map((element, index) => (
            <Card key={index} className="border-border bg-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-brand-primary/10 flex items-center justify-center">
                  <element.icon className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-brand-primary">
                  {element.title}
                </h3>
                <p className="mt-2 text-brand-text">{element.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
