"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { event } from "@/lib/gtag";

// Creator FAQs
const creatorFaqs = [
  {
    question: "How much does it cost to create an agent?",
    answer: "Free. We only take a percentage when you earn.",
  },
  {
    question: "What if my agent gives wrong advice?",
    answer:
      "You control what your agent can say. Plus, clients can always escalate to you.",
  },
  {
    question: "How much can I earn?",
    answer:
      "It depends on your expertise and pricing. Top agents could earn $1,000-10,000+/month passively.",
  },
  {
    question: "Is my knowledge safe with ProAgent Me?",
    answer:
      "Absolutely. We never share your knowledge with third parties or use it to train our own AI tools. Your expertise remains yours.",
  },
];

// Client FAQs
const clientFaqs = [
  {
    question: "How is this different from hiring a consultant?",
    answer:
      "You get instant access to expert knowledge at a fraction of the cost. An AI agent trained by a CPA can answer your tax questions immediately, 24/7, for $10 instead of $300/hour. When you need the real expert, they're one click away.",
  },
  {
    question: "Can I trust the AI's answers for professional matters?",
    answer:
      "Every agent includes proper disclaimers for their field. For tax, legal, and financial matters, agents are trained to recognize complex situations and recommend human consultation. You always have the option to escalate to the real expert.",
  },
  {
    question: "What if the AI gives me wrong information?",
    answer:
      "Our agents are trained to say \"I don't know\" rather than guess. They're designed to escalate complex questions to the human expert. Plus, you can see the expert's credentials, reviews, and track record before you start.",
  },
];

// General FAQs
const generalFaqs = [
  {
    question: "What makes this different from ChatGPT?",
    answer:
      "ChatGPT is a generalist. Our agents know specific methods, opinions, and experiences from real professionals. And clients know a real expert is behind every agent—with the option to escalate when needed.",
  },
  {
    question: "What is MCP and how do I use it?",
    answer:
      "MCP (Model Context Protocol) is an open standard that lets you connect expert agents directly to your existing tools—like Claude Desktop, Cursor, VS Code, or any MCP-compatible app. Instead of switching to our web chat, you can access expert knowledge right where you work.",
  },
  {
    question: "When will ProAgent Me launch?",
    answer:
      "We're launching beta in early 2026. Join the waitlist to get early access.",
  },
];

const faqs = [...creatorFaqs, ...clientFaqs, ...generalFaqs];

export function FAQSection() {
  const handleFaqChange = (value: string) => {
    if (value) {
      const index = parseInt(value.replace("item-", ""), 10);
      const faq = faqs[index];
      if (faq) {
        event("faq_expand", { question: faq.question });
      }
    }
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-brand-surface-alt">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10" onValueChange={handleFaqChange}>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-border"
            >
              <AccordionTrigger className="text-left text-brand-primary hover:text-brand-accent">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-brand-text">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
