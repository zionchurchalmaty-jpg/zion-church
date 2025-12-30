import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { LocationSection } from "@/components/location-section";
import { MinistriesSection } from "@/components/ministries-section";
import { Navbar } from "@/components/navbar";
import { StayConnectedSection } from "@/components/stay-connected-section";
import { WhatToExpectSection } from "@/components/what-to-expect-section";
import { setRequestLocale } from "next-intl/server";

export default async function ChurchLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhatToExpectSection />
      {/* <GallerySection /> */}
      <MinistriesSection />
      {/* <CalendarSection /> */}
      <LocationSection />
      <FAQSection />
      <StayConnectedSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
