import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";
import JsonLd from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/business";
import { site } from "@/lib/site";

const HOME_TITLE = "Fresh Juice Bar in Kukatpally, Hyderabad | FruitZen";

const body = Inter({
  variable: "--font-body-family",
  subsets: ["latin"],
});

const display = Sora({
  variable: "--font-display-family",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: HOME_TITLE,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "fresh juice",
    "cold pressed juice",
    "healthy beverages",
    "shakes",
    "Kukatpally",
    "Hyderabad",
    "FruitZen",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FruitZen fresh juices, Kukatpally",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-snippet": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={localBusinessJsonLd()} />
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
