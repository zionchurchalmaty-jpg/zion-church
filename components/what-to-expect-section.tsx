"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Baby, Users } from "lucide-react";

interface MinistryItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

const ADULTS_MINISTRIES: MinistryItem[] = [
  {
    id: "worship",
    name: "Поклонение",
    description:
      "Через пение и музыку мы вместе ищем Божье присутствие. Это момент, когда сердце успокаивается, а внимание направляется к Богу.",
    image: "/worship.jpg",
  },
  {
    id: "sermon",
    name: "Проповедь",
    description:
      "Слово, которое помогает увидеть Бога ближе, прочувствовать Его, возродить веру и применить её в повседневной жизни. Всё просто, ясно и по существу.",
    image: "/sermon.jpg",
  },
  {
    id: "fellowship-meal",
    name: "Вкусный обед и общение",
    description:
      "После служения — тёплое общение за столом. В простой атмосфере продолжается то, что Бог начал делать в сердцах.",
    image: "/meal.jpg",
  },
  {
    id: "prayer-groups",
    name: "Молитва и общение по группам",
    description:
      "В небольших группах мы молимся и делимся жизнью, переживая Божью заботу и поддержку друг друга.",
    image: "/prayer.jpg",
  },
];

const CHILDREN_MINISTRIES: MinistryItem[] = [
  {
    id: "children-worship",
    name: "Детское поклонение",
    description:
      "Дети учатся быть в Божьем присутствии через простые песни, радость и участие, понятные их возрасту.",
    image: "/children-worship.jpg",
  },
  {
    id: "children-ministry",
    name: "Детское служение",
    description:
      "Библейские истории и занятия, которые помогают детям узнавать Бога как любящего и близкого. Каждая возрастная группа — со своим учителем и подходом.",
    image: "/children-ministry.jpg",
  },
  {
    id: "youth-ministry",
    name: "Подростковое служение",
    description:
      "Без формальностей и давления. Пространство, где подростки могут задавать вопросы, говорить откровенно и учиться слышать Бога в своей жизни.",
    image: "/youth.jpg",
  },
  {
    id: "children-meal",
    name: "Отдельный вкусный обед для детей",
    description:
      "Время отдыха, радости и общения в атмосфере заботы и безопасности под присмотром служителей.",
    image: "/children-meal.jpg",
  },
];

interface MinistrySectionProps {
  title: string;
  icon: React.ReactNode;
  items: MinistryItem[];
}

function MinistrySubSection({ title, icon, items }: MinistrySectionProps) {
  return (
    <div className="mb-16 last:mb-0">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
        <h3 className="font-serif font-bold text-2xl md:text-3xl text-navy">
          {title}
        </h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            className="bg-cream hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col h-full !pt-0 !gap-0"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
            <CardContent className="py-6 flex flex-col flex-1">
              <h4 className="font-semibold text-lg mb-2 text-navy">
                {item.name}
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm flex-1">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function WhatToExpectSection() {
  return (
    <section id="ministries" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold text-navy uppercase tracking-wider">
              Служения
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
            Что происходит на служении
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Наше служение — это время для общения с Богом и друг с другом
          </p>
        </div>

        {/* Adults Section */}
        <MinistrySubSection
          title="Взрослым"
          icon={<Users className="size-6" />}
          items={ADULTS_MINISTRIES}
        />

        {/* Children Section */}
        <MinistrySubSection
          title="Детям"
          icon={<Baby className="size-6" />}
          items={CHILDREN_MINISTRIES}
        />
      </div>
    </section>
  );
}
