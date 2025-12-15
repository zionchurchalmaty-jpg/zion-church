"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { event } from "@/lib/gtag"

export function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-brand-accent/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">Ready to Own Your AI Future?</h2>
        <p className="mt-4 text-lg text-brand-text">
          Join thousands of professionals who are turning AI anxiety into AI income.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-brand-cta hover:bg-brand-cta/90 text-white text-lg px-8">
            <Link
              href="#waitlist"
              onClick={() => event("cta_click", { cta_name: "create_your_agent", location: "final_cta" })}
            >
              Create Your Agent <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white text-lg px-8 bg-transparent"
          >
            <Link
              href="#waitlist"
              onClick={() => event("cta_click", { cta_name: "hire_an_agent", location: "final_cta" })}
            >
              Hire an Agent
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
