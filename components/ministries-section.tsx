import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPublicGroups, type Group } from "@/lib/planning-center";
import { ChevronRight, Users } from "lucide-react";

const fallbackMinistries = [
  {
    id: "fallback-1",
    name: "Home Groups",
    description:
      "Bible study groups meeting across Northern Virginia for deeper fellowship and spiritual growth",
    image: "/small-group-bible-study-home.jpg",
    url: null,
    schedule: null,
    location: null,
  },
  {
    id: "fallback-2",
    name: "Youth & Teens",
    description:
      "Friday night gatherings for grades 6-12 with games, worship, and real conversations",
    image: "/youth-teens-church-group.jpg",
    url: null,
    schedule: null,
    location: null,
  },
  {
    id: "fallback-3",
    name: "ESL Classes",
    description:
      '"English with Joy" — Learn English in a welcoming, supportive environment',
    image: "/english-class-teaching-esl.jpg",
    url: null,
    schedule: null,
    location: null,
  },
  {
    id: "fallback-4",
    name: "Missions",
    description:
      "Serving communities in Kazakhstan and beyond through short-term mission trips",
    image: "/mission-trip-service-helping.jpg",
    url: null,
    schedule: null,
    location: null,
  },
  {
    id: "fallback-5",
    name: "Practical Help",
    description:
      "Supporting families in need with groceries and essential supplies",
    image: "/food-pantry-helping-groceries.jpg",
    url: null,
    schedule: null,
    location: null,
  },
  {
    id: "fallback-6",
    name: "Picnics & Retreats",
    description:
      "Church picnics, family getaways, and outdoor fellowship events throughout the year",
    image: "/church-picnic-outdoor-nature.jpg",
    url: null,
    schedule: null,
    location: null,
  },
] satisfies Group[];

export async function MinistriesSection() {
  const groups = await getPublicGroups();
  const ministries = (groups.length > 0 ? groups : fallbackMinistries).slice(
    0,
    6
  );

  return (
    <section id="ministries" className="py-20 bg-cream">
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
            Our Groups
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Connect, grow, and serve our community and family
          </p>
        </div>

        {/* Ministry Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {ministries.map((ministry) => (
            <Card
              key={ministry.id}
              className="bg-cream hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col h-full !pt-0 !gap-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={ministry.image || "/placeholder.svg"}
                  alt={ministry.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <Users className="absolute bottom-4 left-4 size-10 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
              </div>
              <CardContent className="py-6 flex flex-col flex-1">
                <h3 className="font-semibold text-xl mb-2 text-navy">
                  {ministry.name}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  {ministry.description}
                </p>
                {ministry.url && (
                  <a
                    href={ministry.url}
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
