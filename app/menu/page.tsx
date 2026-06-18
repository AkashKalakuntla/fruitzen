import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FullMenu } from "@/components/sections/full-menu";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full FruitZen menu — fresh juices, cold-pressed juices, smoothies, shakes, mojitos, iced teas, cold coffees, waffles, momos, snacks and combos, with prices.",
};

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-cream pt-28 pb-24 sm:pt-32">
      {/* Header */}
      <header className="mx-auto w-full max-w-6xl px-5 text-center sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/55 transition-colors hover:text-leaf-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-600">
          Fresh Juices · Cold-Pressed · Healthy Shots
        </p>
        <h1 className="mt-3 text-5xl font-extrabold tracking-tighter text-gradient sm:text-6xl">
          Our Menu
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink/60 text-balance">
          All prices in ₹ · 350 ml unless noted · crafted fresh to order. Order on
          Zomato &amp; Swiggy or dine in at {site.contact.address.line2}.
        </p>
      </header>

      {/* Full itemised menu */}
      <main className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-8">
        <FullMenu />
      </main>
    </div>
  );
}
