import { Clock, AlertTriangle, Lightbulb, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ProblemSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary text-balance">
            The AI Anxiety Is Real. But So Is the Opportunity.
          </h2>
          <p className="mt-6 text-lg text-brand-text leading-relaxed">
            72% of professionals worry AI will impact their jobs. But what if
            you could flip the script? Instead of competing with AI, what if AI
            worked for you—and paid you?
          </p>
        </div>

        {/* Dual-Track Problem Cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Expert Problem Card */}
          <Card className="border-brand-primary/20 bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-brand-primary" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand-primary">
                  For Experts
                </span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-primary">
                    The Time-for-Money Trap
                  </h3>
                </div>
              </div>

              <p className="text-brand-text leading-relaxed">
                You&apos;re brilliant at what you do. But your income is capped
                by your calendar.
              </p>

              <div className="mt-4 p-4 bg-amber-50/80 dark:bg-amber-950/20 rounded-lg border border-amber-200/50 dark:border-amber-800/30">
                <p className="text-sm font-mono text-amber-700 dark:text-amber-300 text-center">
                  $300/hour × 40 billable hours = ceiling
                </p>
              </div>

              <p className="mt-4 text-brand-text leading-relaxed font-medium">
                What if your expertise could work while you sleep?
              </p>
            </CardContent>
          </Card>

          {/* Client Problem Card */}
          <Card className="border-brand-accent/20 bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-brand-accent" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
                  For Clients
                </span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-primary">
                    The Trust Gap
                  </h3>
                </div>
              </div>

              <p className="text-brand-text leading-relaxed">
                You asked ChatGPT for tax advice. It sounded right.
              </p>

              <div className="mt-4 p-4 bg-amber-50/80 dark:bg-amber-950/20 rounded-lg border border-amber-200/50 dark:border-amber-800/30">
                <p className="text-sm text-amber-700 dark:text-amber-300 text-center font-medium">
                  But would you bet $10,000 on it being correct?
                </p>
              </div>

              <p className="mt-4 text-brand-text leading-relaxed font-medium">
                Generic AI gives generic answers. You need expert knowledge with
                accountability.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
