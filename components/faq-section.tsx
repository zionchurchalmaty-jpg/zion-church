import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "Is the service in Russian or English?",
    answer:
      "Our services are bilingual! Sermons alternate between Russian and English, with translation always available. Worship songs include both languages so everyone can participate.",
  },
  {
    question: "Do you have programs for children?",
    answer:
      "Yes! We offer Sunday School for children ages 3-13 during the main service. We also have Friday youth group for teenagers.",
  },
  {
    question: "What denomination are you?",
    answer:
      "We are a nondenominational Bible church. Our focus is on Scripture, the Gospel of Jesus Christ, and authentic Christian community.",
  },
  {
    question: "How can I connect with other families?",
    answer:
      "Join one of our Home Groups meeting throughout Northern Virginia, or simply stay for coffee after the service — we'd love to introduce you to others!",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold text-navy uppercase tracking-wider">
              Got Questions?
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-700">
            Everything you want to know about our church
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Text */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy text-balance">
              Common Questions
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We know visiting a new church can bring questions. Here are
              answers to some of the most common ones.
            </p>
            <Card className="bg-cream border-none">
              <CardContent className="py-6">
                <p className="font-medium text-navy mb-2">
                  Still have questions?
                </p>
                <Button variant="link" className="p-0 h-auto text-primary">
                  Contact us <ChevronRight className="size-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                  className="border rounded-lg px-6 bg-white"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-navy hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
