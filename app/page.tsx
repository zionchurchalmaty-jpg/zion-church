import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { HumanEscalationSection } from "@/components/human-escalation-section";
import { Navbar } from "@/components/navbar";
import { ProblemSection } from "@/components/problem-section";
import { TrustSection } from "@/components/trust-section";
import { VerticalShowcase } from "@/components/vertical-showcase";
import { VisionSection } from "@/components/vision-section";
import { WaitlistSection } from "@/components/waitlist-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <VerticalShowcase />
      <HowItWorksSection />
      <HumanEscalationSection />
      <TrustSection />
      {/* <InlineWaitlistCTA /> */}
      <WaitlistSection />
      <VisionSection />
      <FAQSection />
      {/* <FinalCTASection /> */}
      <Footer />
    </main>
  );
}
