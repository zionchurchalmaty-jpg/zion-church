import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Good News Bible Church",
  description:
    "Privacy Policy for Good News Bible Church website.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Home
        </Link>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="font-serif text-navy">Privacy Policy</h1>

          <p className="text-lg text-muted-foreground">
            <strong>Good News Bible Church</strong>
          </p>

          <p>
            <strong>Last Updated:</strong> December 2025
          </p>

          <hr />

          <p className="text-muted-foreground">
            This page is a placeholder for the Privacy Policy of Good News Bible Church.
            Content will be added soon.
          </p>

          <p className="text-muted-foreground">
            For questions about our privacy practices, please contact us at{" "}
            <a href="mailto:info@goodnewsbible.org">info@goodnewsbible.org</a>.
          </p>
        </article>
      </div>
    </main>
  );
}
