import { Cormorant_Garamond, Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${inter.variable} ${cormorantGaramond.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  );
}
