"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, MapPin, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--secondary-navy))] via-[rgb(var(--secondary-navy-light))] to-[rgb(var(--secondary-navy))]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source
            src="/hero-video.mp4?height=1080&width=1920&query=church+worship+community+diverse+people+singing"
            type="video/mp4"
          />
        </video>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <div className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-white font-medium">
            Join us this Sunday at 1:30 PM
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif font-bold text-5xl sm:text-6xl md:text-7xl text-white mb-6 animate-fade-in-up text-balance">
          Welcome <span className="text-primary">Home</span>
        </h1>

        {/* Motto */}
        <p className="font-serif text-2xl sm:text-3xl text-white/90 mb-4 animate-fade-in-up animation-delay-100 text-balance italic">
          Bring God's Joy to All People
        </p>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
          A bilingual Russian-English Bible church in Ashburn, Virginia serving
          the Slavic community and beyond.
        </p>

        {/* Quick Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 text-white animate-fade-in-up animation-delay-300">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-primary" />
            <span className="text-sm sm:text-base">
              20430 Ashburn Village Blvd, Ashburn, VA
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-5 text-primary" />
            <span className="text-sm sm:text-base">Sundays at 1:30 PM</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
          <Button
            size="lg"
            className="px-8"
            onClick={() => {
              document
                .getElementById("what-to-expect")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            What to Expect
            <ChevronRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 bg-transparent"
            asChild
          >
            <a
              href="https://www.youtube.com/@GoodNewsBibleChurchYT/streams"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Play className="size-4" />
              Watch Online
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
