import { Card, CardContent } from "@/components/ui/card";
import { Baby, BookOpen, Check, Coffee, Music } from "lucide-react";

const features = [
  {
    icon: Music,
    title: "Worship",
    description: "30 minutes of heartfelt praise in Russian and English",
    image: "/church-worship-choir-singing.jpg",
  },
  {
    icon: BookOpen,
    title: "Sermon",
    description: "45-minute bilingual message with translation available",
    image: "/pastor-preaching-sermon-bible.jpg",
  },
  {
    icon: Baby,
    title: "Kids Program",
    description: "Sunday School for ages 3-13 during the service",
    image: "/children-sunday-school-learning.jpg",
  },
  {
    icon: Coffee,
    title: "Coffee & Connect",
    description: "Fellowship time after service to meet others",
    image: "/church-fellowship-coffee-people-talking.jpg",
  },
];

export function WhatToExpectSection() {
  return (
    <section id="visit" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold text-navy uppercase tracking-wider">
              Your First Visit
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
            What to Expect
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Everything you need to know for a comfortable first experience
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <feature.icon className="absolute bottom-4 left-4 size-10 text-white drop-shadow-lg" />
              </div>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2 text-navy">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Checklist */}
        <Card className="bg-white max-w-3xl mx-auto">
          <CardContent className="py-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Services are approximately 90 minutes
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Casual dress is welcome – come as you are
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Translation available for Russian and English
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Free parking available
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
