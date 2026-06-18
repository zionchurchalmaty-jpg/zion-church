import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import { getPublishedContent } from "@/lib/firestore/content";

export async function MinistriesSection() {
  const ministries = await getPublishedContent("ministry");

  const Icon = Users;
  const themeColor = "bg-blue-500";

  return (
    <section id="groups" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold text-navy uppercase tracking-wider">
              Общины
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
            Наши служения
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Найдите свое место в семье
          </p>
        </div>

        {/* Ministry Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry) => (
            <Card
              key={ministry.id}
              className="bg-cream hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col h-full !pt-0 !gap-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {ministry.coverImage && (
                  <img
                    src={ministry.coverImage}
                    alt={ministry.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div
                  className={`absolute bottom-4 left-4 w-12 h-12 ${themeColor} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardContent className="py-6 flex flex-col flex-1">
                <h3 className="font-semibold text-xl mb-2 text-navy">
                  {ministry.title}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-1 line-clamp-3">
                  {ministry.excerpt}
                </p>
                <Link
                  href={`/ministry/${ministry.slug}`}
                  className="inline-flex items-center mt-4 text-primary hover:underline text-sm font-medium group/link"
                >
                  Подробнее
                  <ChevronRight className="size-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <Link href="/#contact">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 bg-transparent hover:bg-primary-orange hover:text-white hover:border-primary-orange transition-colors"
            >
              Присоединиться к нам
              <ChevronRight className="size-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}