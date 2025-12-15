import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  Globe,
  GraduationCap,
  Home,
  Mountain,
  ShoppingCart,
  Users,
} from "lucide-react";

const ministries = [
  {
    icon: Home,
    title: "Home Groups",
    description:
      "Bible study groups meeting across Northern Virginia for deeper fellowship and spiritual growth",
    image: "/small-group-bible-study-home.jpg",
  },
  {
    icon: Users,
    title: "Youth & Teens",
    description:
      "Friday night gatherings for grades 6-12 with games, worship, and real conversations",
    image: "/youth-teens-church-group.jpg",
  },
  {
    icon: GraduationCap,
    title: "ESL Classes",
    description:
      '"English with Joy" — Learn English in a welcoming, supportive environment',
    image: "/english-class-teaching-esl.jpg",
  },
  {
    icon: Globe,
    title: "Missions",
    description:
      "Serving communities in Kazakhstan and beyond through short-term mission trips",
    image: "/mission-trip-service-helping.jpg",
  },
  {
    icon: ShoppingCart,
    title: "Practical Help",
    description:
      "Supporting families in need with groceries and essential supplies",
    image: "/food-pantry-helping-groceries.jpg",
  },
  {
    icon: Mountain,
    title: "Picnics & Retreats",
    description:
      "Church picnics, family getaways, and outdoor fellowship events throughout the year",
    image: "/church-picnic-outdoor-nature.jpg",
  },
];

export function MinistriesSection() {
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
            Our Ministries
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Connect, grow, and serve our community and family
          </p>
        </div>

        {/* Ministry Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {ministries.map((ministry, index) => (
            <Card
              key={index}
              className="bg-cream hover:shadow-md transition-all duration-300 group overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={ministry.image || "/placeholder.svg"}
                  alt={ministry.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <ministry.icon className="absolute bottom-4 left-4 size-10 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
              </div>
              <CardContent className="py-6">
                <h3 className="font-semibold text-xl mb-2 text-navy">
                  {ministry.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {ministry.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-gray-300 bg-transparent"
          >
            View All Ministries
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
