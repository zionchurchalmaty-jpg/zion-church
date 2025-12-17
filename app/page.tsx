import { AboutSection } from "@/components/about-section";
import { CalendarSection } from "@/components/calendar-section";
import { ContactSection } from "@/components/contact-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { LocationSection } from "@/components/location-section";
import { MinistriesSection } from "@/components/ministries-section";
import { Navbar } from "@/components/navbar";
import { StayConnectedSection } from "@/components/stay-connected-section";
import { WhatToExpectSection } from "@/components/what-to-expect-section";

export default function ChurchLandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhatToExpectSection />
      {/* <GallerySection /> */}
      <MinistriesSection />
      <CalendarSection />
      <LocationSection />
      <FAQSection />
      <StayConnectedSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
