import type { Metadata } from "next";
import { Inter, Sora, Baloo_2 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { site } from "@/lib/site";

const body = Inter({
  variable: "--font-body-family",
  subsets: ["latin"],
});

const display = Sora({
  variable: "--font-display-family",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

// Rounded heavy display font for the FruitZen wordmark (matches the logo).
const brand = Baloo_2({
  variable: "--font-brand-family",
  weight: ["700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
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
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${brand.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
