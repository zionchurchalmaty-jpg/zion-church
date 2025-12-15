"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Baby,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Coffee,
  Facebook,
  Globe,
  GraduationCap,
  Home,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Mountain,
  Music,
  Phone,
  Play,
  ShoppingCart,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function ChurchLandingPage() {
  const [language, setLanguage] = useState<"en" | "ru">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Visit", href: "#visit" },
    { label: "Ministries", href: "#ministries" },
    { label: "Gallery", href: "#gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/GNBC_logo.png"
                alt="Good News Bible Church"
                className="h-10 md:h-12 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* Language Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    language === "en"
                      ? "bg-primary text-white"
                      : "text-gray-600"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("ru")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    language === "ru"
                      ? "bg-primary text-white"
                      : "text-gray-600"
                  }`}
                >
                  RU
                </button>
              </div>

              <Button
                size="sm"
                className="bg-primary hover:bg-[rgb(var(--primary-orange-hover))]"
              >
                Give
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-gray-700 hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      language === "en"
                        ? "bg-primary text-white"
                        : "text-gray-600"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("ru")}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      language === "ru"
                        ? "bg-primary text-white"
                        : "text-gray-600"
                    }`}
                  >
                    RU
                  </button>
                </div>
                <Button size="sm" className="flex-1">
                  Give
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--secondary-navy))] via-[rgb(var(--secondary-navy-light))] to-[rgb(var(--secondary-navy))]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          >
            <source
              src="/placeholder.mp4?height=1080&width=1920&query=church+worship+community+diverse+people+singing"
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
            Welcome <span className="text-primary-orange">Home</span>
          </h1>

          {/* Motto */}
          <p className="font-serif text-2xl sm:text-3xl text-white/90 mb-4 animate-fade-in-up animation-delay-100 text-balance">
            Bring God's Joy to All People
          </p>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
            A bilingual Russian-English Bible church in Ashburn, Virginia
            serving the Slavic community and beyond.
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
              className="bg-primary hover:bg-[rgb(var(--primary-orange-hover))] text-white px-8"
            >
              Plan Your Visit
              <ChevronRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 bg-transparent"
            >
              <Play className="size-4" />
              Watch Online
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/church-family-community-fellowship.jpg"
                alt="Church community gathering"
                className="w-full h-full object-cover"
              />
              <p className="mt-4 text-sm text-gray-700 text-center">
                Our church family
              </p>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  About Us
                </span>
              </div>

              <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy text-balance">
                Serving the Slavic Community in Northern Virginia
              </h2>

              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>
                  We are a family of believers from Russia, Ukraine, the former
                  Soviet Union, and America — united by faith in Jesus Christ.
                  Our bilingual services in Russian and English welcome
                  immigrants, their families, and all who seek authentic
                  community, spiritual growth, and opportunities to serve
                  together.
                </p>
                <p>
                  Whether you're a new immigrant or have called this area home
                  for years, you'll find a warm, welcoming community ready to
                  embrace you and walk alongside you in your faith journey.
                </p>
              </div>

              <div className="bg-cream border-l-4 border-primary p-6 rounded-lg">
                <p className="font-serif text-xl text-navy font-medium">
                  "Bring God's Joy to All People"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
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
            {[
              {
                icon: Music,
                title: "Worship",
                description:
                  "30 minutes of heartfelt praise in Russian and English",
                image: "/church-worship-choir-singing.jpg",
              },
              {
                icon: BookOpen,
                title: "Sermon",
                description:
                  "45-minute bilingual message with translation available",
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
            ].map((feature, index) => (
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

      {/* Ministries Section */}
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
            {[
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
            ].map((ministry, index) => (
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

      {/* Gallery Section */}
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
            {[
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
            ].map((item, index) => (
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

      {/* Location Section */}
      <section id="location" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Info */}
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-sm font-semibold text-navy uppercase tracking-wider">
                    Visit Us
                  </span>
                  <div className="h-px w-12 bg-primary" />
                </div>
                <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
                  Find Us
                </h2>
                <p className="text-lg text-gray-700">
                  We'd love to see you this Sunday
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-navy mb-1">
                      Address
                    </h3>
                    <p className="text-gray-700">20430 Ashburn Village Blvd</p>
                    <p className="text-gray-700">Ashburn, VA 20147</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-navy mb-1">
                      Service Times
                    </h3>
                    <p className="text-gray-700">Sunday Worship: 1:30 PM</p>
                    <p className="text-gray-700">
                      Wednesday Bible Study: 7:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-navy mb-1">
                      Contact
                    </h3>
                    <p className="text-gray-700">Phone: 703-594-1088</p>
                    <p className="text-gray-700">
                      Email: info@goodnewsbible.org
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.234567890123!2d-77.481234!3d39.043210!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDAyJzM1LjYiTiA3N8KwMjgnNTIuNCJX!5e0!3m2!1sen!2sus!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-semibold text-navy uppercase tracking-wider">
                Got Questions?
              </span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-700">
              Everything you want to know about our church
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Text */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy text-balance">
                Common Questions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We know visiting a new church can bring questions. Here are
                answers to some of the most common ones.
              </p>
              <Card className="bg-cream border-none">
                <CardContent className="py-6">
                  <p className="font-medium text-navy mb-2">
                    Still have questions?
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Contact us <ChevronRight className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Accordion */}
            <div className="lg:col-span-2">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="item-1"
                  className="border rounded-lg px-6 bg-white"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-navy hover:no-underline">
                    Is the service in Russian or English?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                    Our services are bilingual! Sermons alternate between
                    Russian and English, with translation always available.
                    Worship songs include both languages so everyone can
                    participate.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="border rounded-lg px-6 bg-white"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-navy hover:no-underline">
                    Do you have programs for children?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                    Yes! We offer Sunday School for children ages 3-13 during
                    the main service. We also have Friday youth group for
                    teenagers.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="border rounded-lg px-6 bg-white"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-navy hover:no-underline">
                    What denomination are you?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                    We are a nondenominational Bible church. Our focus is on
                    Scripture, the Gospel of Jesus Christ, and authentic
                    Christian community.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="border rounded-lg px-6 bg-white"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-navy hover:no-underline">
                    How can I connect with other families?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                    Join one of our Home Groups meeting throughout Northern
                    Virginia, or simply stay for coffee after the service — we'd
                    love to introduce you to others!
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Connected Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Stay Connected
              </span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
              Join Our Community
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow us on social media and subscribe to our newsletter for
              updates, encouragement, and event announcements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Social Media */}
            <div className="space-y-6">
              {/* Instagram Card */}
              <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="py-8">
                  <div className="flex items-start gap-6">
                    <div className="size-16 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Instagram className="size-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-1 text-navy">
                        @goodnewsbibleorg
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Follow us for daily encouragement, event photos, and
                        community highlights
                      </p>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        <a
                          href="https://www.instagram.com/goodnewsbibleorg/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Follow on Instagram
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Facebook Card */}
              <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="py-8">
                  <div className="flex items-start gap-6">
                    <div className="size-16 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Facebook className="size-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-1 text-navy">
                        Good News Bible Church
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Join our Facebook community for events, livestreams, and
                        discussions
                      </p>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <a
                          href="https://www.facebook.com/goodnewsbibleorg"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Like on Facebook
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* YouTube channel card */}
              <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="py-8">
                  <div className="flex items-start gap-6">
                    <div className="size-16 rounded-xl bg-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Youtube className="size-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-1 text-navy">
                        Good News Bible Church YT
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Watch sermons, worship sessions, and teachings on our
                        YouTube channel
                      </p>
                      <Button asChild className="bg-red-600 hover:bg-red-700">
                        <a
                          href="https://www.youtube.com/@GoodNewsBibleChurchYT"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Subscribe on YouTube
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Newsletter */}
            <Card className="bg-white border-2 border-primary/20">
              <CardContent className="py-8">
                <div className="text-center mb-6">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="size-8 text-primary" />
                  </div>
                  <h3 className="font-serif font-semibold text-2xl mb-2 text-navy">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get weekly updates, sermon highlights, and event
                    announcements delivered to your inbox.
                  </p>
                </div>

                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-[rgb(var(--primary-orange-hover))] h-12"
                  >
                    Subscribe
                  </Button>
                  <p className="text-xs text-gray-600 text-center">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-[rgb(var(--secondary-navy))] to-[rgb(var(--secondary-navy-light))] relative overflow-hidden"
      >
        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent blur-3xl" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Get in Touch
              </span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white mb-4 text-balance">
              We'd Love to Meet You
            </h2>
            <p className="text-lg text-white/80">
              Planning to visit or have a question? Drop us a message.
            </p>
          </div>

          {/* Form */}
          <Card className="bg-white">
            <CardContent className="py-8">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contactFirstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="contactFirstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    I'm interested in:
                  </p>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="size-4 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <span className="text-gray-700">
                      I'm planning to visit this Sunday
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="size-4 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <span className="text-gray-700">
                      I'd like to learn about ESL classes
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="size-4 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <span className="text-gray-700">
                      I have a prayer request
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-[rgb(var(--primary-orange-hover))] h-12"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(var(--secondary-navy))] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/icon_only.png" alt="GNBC Icon" className="size-10" />
                <div className="font-serif font-semibold text-lg">
                  Good News Bible Church
                </div>
              </div>
              <p className="font-serif text-white/80">
                Bring God's Joy to All People
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/goodnewsbibleorg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <Instagram className="size-5" />
                </a>
                <a
                  href="https://www.facebook.com/goodnewsbibleorg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <Facebook className="size-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Youtube className="size-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a
                    href="#about"
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#visit"
                    className="hover:text-primary transition-colors"
                  >
                    Plan a Visit
                  </a>
                </li>
                <li>
                  <a
                    href="#ministries"
                    className="hover:text-primary transition-colors"
                  >
                    Ministries
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Watch Online
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Home Groups
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Events Calendar
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Give Online
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Church App
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-white/80 text-sm">
                <li>20430 Ashburn Village Blvd</li>
                <li>Ashburn, VA 20147</li>
                <li>703-594-1088</li>
                <li>info@goodnewsbible.org</li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>© 2025 Good News Bible Church. All rights reserved.</p>
            <p>Sundays at 1:30 PM · Ashburn, Virginia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
