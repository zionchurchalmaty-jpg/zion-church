import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Users } from "lucide-react";
import { useTranslations } from "next-intl";

interface GroupConfig {
  id: string;
  nameKey: string;
  descriptionKey: string;
  image: string;
  url?: string;
}

const GROUPS_CONFIG: GroupConfig[] = [
  {
    id: "home-groups",
    nameKey: "groups.homeGroups.name",
    descriptionKey: "groups.homeGroups.description",
    image: "/small-group-bible-study-home.jpg",
    url: "https://goodnewsbible.churchcenter.com/groups/bible-study-ministry?enrollment=open_signup%2Crequest_to_join%2Cclosed&filter=enrollment",
  },
  {
    id: "youth-teens",
    nameKey: "groups.youth.name",
    descriptionKey: "groups.youth.description",
    image: "/youth-teens-church-group.jpg",
    url: "https://goodnewsbible.churchcenter.com/groups/teen-youth-ministry/fc22c291-a386-4c20-8077-4995b739d2d8",
  },
  {
    id: "womens-meetups",
    nameKey: "groups.women.name",
    descriptionKey: "groups.women.description",
    image: "/womens-ministry-fellowship.jpg",
    url: "https://goodnewsbible.churchcenter.com/groups/women-s-ministry/women-s-ministry",
  },
  {
    id: "mens-meetups",
    nameKey: "groups.men.name",
    descriptionKey: "groups.men.description",
    image: "/mens-ministry-fellowship.jpg",
    url: "https://goodnewsbible.churchcenter.com/groups/men-s-ministry-groups/the-rock",
  },
  {
    id: "esl-classes",
    nameKey: "groups.esl.name",
    descriptionKey: "groups.esl.description",
    image: "/english-class-teaching-esl.jpg",
    url: "https://goodnewsbible.churchcenter.com/groups/esl-ministries/english-with-joy",
  },
  {
    id: "joyful-kicks",
    nameKey: "groups.soccer.name",
    descriptionKey: "groups.soccer.description",
    image: "/joyful-kicks-soccer-ministry.jpg",
    url: "https://goodnewsbible.churchcenter.com/groups/sport-ministries/joyful-kicks",
  },
];

export function MinistriesSection() {
  const t = useTranslations("ministries");

  return (
    <section id="groups" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold text-navy uppercase tracking-wider">
              {t("eyebrow")}
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Ministry Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {GROUPS_CONFIG.map((group) => (
            <Card
              key={group.id}
              className="bg-cream hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col h-full !pt-0 !gap-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={group.image || "/placeholder.svg"}
                  alt={t(group.nameKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <Users className="absolute bottom-4 left-4 size-10 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
              </div>
              <CardContent className="py-6 flex flex-col flex-1">
                <h3 className="font-semibold text-xl mb-2 text-navy">
                  {t(group.nameKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  {t(group.descriptionKey)}
                </p>
                {group.url && (
                  <a
                    href={group.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-primary hover:underline text-sm font-medium"
                  >
                    {t("learnMore")}
                    <ChevronRight className="size-4 ml-1" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://goodnewsbible.churchcenter.com/groups"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 bg-transparent"
            >
              {t("viewAllGroups")}
              <ChevronRight className="size-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
