import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";

const galleryItems = [
  {
    span: "md:col-span-2 md:row-span-2",
    label: "Worship Service",
    image: "/church-worship-service-people-singing.jpg",
  },
  {
    span: "",
    label: "Youth Night",
    image: "/youth-group-teens.jpg",
  },
  {
    span: "",
    label: "Church Picnic",
    image: "/church-picnic-outdoor.jpg",
  },
  { span: "", label: "Baptism", image: "/baptism-celebration.jpg" },
  {
    span: "",
    label: "Kids Ministry",
    image: "/children-sunday-school.jpg",
  },
  {
    span: "md:col-span-2",
    label: "Mission Trip",
    image: "/mission-trip-service.jpg",
  },
  {
    span: "",
    label: "Home Group",
    image: "/placeholder.svg?height=400&width=400",
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold text-navy uppercase tracking-wider">
              Our Community
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
            Church Life
          </h2>
          <p className="text-lg text-gray-700">
            Moments of worship, fellowship, and service
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-xl ${item.span}`}
            >
              <div className="aspect-square md:h-full">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="text-white font-medium">{item.label}</span>
              </div>
              {index === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <Play className="size-8 text-primary ml-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-gray-300 bg-transparent"
          >
            See More Photos
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
