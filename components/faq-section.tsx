import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function FAQSection() {
  const t = useTranslations("faq");

  const faqKeys = [
    "sect",
    "korean",
    "zion",
    "denomination",
    "registration",
    "society",
  ] as const;

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
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
          <p className="text-lg text-gray-700">{t("subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Text */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy text-balance">
              {t("sideTitle")}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t("sideDescription")}
            </p>
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="space-y-4">
              {faqKeys.map((key, index) => (
                <AccordionItem
                  key={key}
                  value={`item-${index + 1}`}
                  className="border rounded-lg px-6 bg-white shadow-sm"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-navy hover:no-underline py-4">
                    {t(`questions.${key}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-4 whitespace-pre-line">
                    {t(`questions.${key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
              {/* Contact Us - links to contact section */}
              <Link
                href="/#contact"
                className="border rounded-lg px-6 bg-white flex items-center justify-between py-4 hover:bg-gray-50 transition-colors mt-6 shadow-sm"
              >
                <span className="text-base font-semibold text-navy">
                  {t("stillHaveQuestions")}{" "}
                  <span className="text-primary">{t("contactUs")}</span>
                </span>
                <ChevronRight className="size-4 text-navy" />
              </Link>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
