import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Users } from "lucide-react";

interface GroupConfig {
  id: string;
  name: string;
  description: string;
  image: string;
  url?: string;
}

const GROUPS_CONFIG: GroupConfig[] = [
  {
    id: "home-groups",
    name: "Home Groups",
    description:
      "Bible study groups meeting across Northern Virginia for deeper fellowship and spiritual growth.",
    image: "/small-group-bible-study-home.jpg",
    url: "https://goodnewsbible.churchcenter.com/groups/bible-study-ministry?enrollment=open_signup%2Crequest_to_join%2Cclosed&filter=enrollment",
  },
  {
    id: "youth-teens",
    name: "Youth & Teens",
    description:
      "Friday night gatherings for grades 6-12 with games, worship, and relevant teaching.",
    image: "/youth-teens-church-group.jpg",
    url: "https://goodnewsbible.churchcenter.com/groups/teen-youth-ministry/fc22c291-a386-4c20-8077-4995b739d2d8",
  },
  {
    id: "womens-meetups",
    name: "Women's Meetups",
    description:
      "A vibrant community where women come together to grow in Christ through Bible studies, prayer, fellowship, and special events, building lasting friendships.",
    image: "/womens-ministry-fellowship.jpg",
    url: "https://goodnewsbible.churchcenter.com/groups/women-s-ministry/women-s-ministry",
  },
  {
    id: "mens-meetups",
    name: "Men's Meetups",
    description:
      "A network of men committed to spiritual growth, brotherhood, and biblical leadership, equipping men to live with faith, integrity, and purpose.",
    image: "/mens-ministry-fellowship.jpg",
    url: "https://goodnewsbible.churchcenter.com/groups/men-s-ministry-groups/the-rock",
  },
  {
    id: "esl-classes",
    name: "ESL Classes",
    description:
      '"English with Joy" — Learn English in a welcoming, supportive environment with caring teachers and a friendly community.',
    image: "/english-class-teaching-esl.jpg",
    url: "https://goodnewsbible.churchcenter.com/groups/esl-ministries/english-with-joy",
  },
  {
    id: "joyful-kicks",
    name: "Joyful Kicks",
    description:
      "A soccer ministry for children ages 7-13 led by Coach Gustavo Sanchez, teaching teamwork, discipline, and Christian character through the beautiful game.",
    image: "/joyful-kicks-soccer-ministry.jpg",
    url: "https://goodnewsbible.churchcenter.com/groups/sport-ministries/joyful-kicks",
  },
];

export function MinistriesSection() {
  return (
    <section id="groups" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold text-navy uppercase tracking-wider">
              Get Involved
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
            Our Groups and Ministries
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Connect, grow, and serve our community and family
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
                  alt={group.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <Users className="absolute bottom-4 left-4 size-10 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
              </div>
              <CardContent className="py-6 flex flex-col flex-1">
                <h3 className="font-semibold text-xl mb-2 text-navy">
                  {group.name}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  {group.description}
                </p>
                {group.url && (
                  <a
                    href={group.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-primary hover:underline text-sm font-medium"
                  >
                    Learn More
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
              View All Groups
              <ChevronRight className="size-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
