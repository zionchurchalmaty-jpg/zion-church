import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ArrowLeft, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedContentBySlug } from "@/lib/firestore/content";

interface MinistryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: MinistryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ministry = await getPublishedContentBySlug("ministry", slug);

  if (!ministry) {
    return { title: "Служение не найдено" };
  }

  return {
    title: `${ministry.title} - Церковь Сион`,
    description: ministry.excerpt || ministry.seo?.metaDescription,
    openGraph: {
      title: ministry.title,
      description: ministry.excerpt || ministry.seo?.metaDescription,
      type: "website",
      images: ministry.coverImage ? [ministry.coverImage] : [],
    },
  };
}

export default async function MinistryPage({ params }: MinistryPageProps) {
  const { slug } = await params;
  
  const ministry = await getPublishedContentBySlug("ministry", slug);

  if (!ministry) {
    notFound();
  }

  const Icon = Users;
  const themeColor = "bg-blue-500"; 

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-[rgb(var(--secondary-navy))]">
          {ministry.coverImage && (
            <Image
              src={ministry.coverImage}
              alt={ministry.title}
              fill
              priority
              className="object-cover opacity-40"
              unoptimized
            />
          )}
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <div
            className={`w-16 h-16 ${themeColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">
            {ministry.title}
          </h1>
        </div>
      </section>

      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/#groups"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Вернуться к служениям
        </Link>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {ministry.excerpt && (
            <div className="bg-primary-orange/10 border-l-4 border-primary-orange rounded-r-lg p-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {ministry.excerpt}
              </p>
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none mb-8 text-gray-700"
            dangerouslySetInnerHTML={{ __html: ministry.content }}
          />

          <div className="bg-navy rounded-xl p-8 text-center mt-12">
            <h2 className="font-serif text-2xl font-bold text-white mb-4">
              Хотите присоединиться?
            </h2>
            <Link href="/#contact">
              <Button
                size="lg"
                className="bg-primary-orange hover:bg-primary-orange/90 text-white"
              >
                Написать нам
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}