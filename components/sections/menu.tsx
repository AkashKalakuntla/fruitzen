"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { menu, menuGroups } from "@/lib/content";
import { site } from "@/lib/site";

const groupBySlug = Object.fromEntries(menuGroups.map((g) => [g.slug, g]));

// Real "from ₹X" per category (no invented prices).
function fromPrice(slug: string): number | null {
  const g = groupBySlug[slug];
  if (!g) return null;
  const nums = g.items.flatMap((it) => (it.price.match(/\d+/g) ?? []).map(Number));
  return nums.length ? Math.min(...nums) : null;
}

// Vibrant, white-text-readable flavour gradient per category (arbitrary hex so
// they always render regardless of theme config).
const tileGrad: Record<string, string> = {
  "fresh-juices": "from-[#fb923c] to-[#ea580c]",
  smoothies: "from-[#4ade80] to-[#15803d]",
  shakes: "from-[#c084fc] to-[#7c3aed]",
  mojitos: "from-[#2dd4bf] to-[#0f766e]",
  waffles: "from-[#fbbf24] to-[#b45309]",
  snacks: "from-[#fb7185] to-[#be123c]",
};

export function Menu() {
  return (
    <section id="menu" className="relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 shadow-sm ring-1 ring-orange-200">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> The Menu
          </span>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl text-balance">
            What&apos;s on the FruitZen{" "}
            <span className="font-serif font-medium text-orange-500">menu?</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/60 text-balance">
            120+ items across juices, smoothies, shakes, mojitos, waffles, momos
            and combos — all crafted fresh to order.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {menu.map((cat) => {
            const from = fromPrice(cat.target);
            return (
              <RevealItem key={cat.slug}>
                <Link
                  href={`/menu#${cat.target}`}
                  className={`group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${tileGrad[cat.slug] ?? "from-leaf-400 to-leaf-600"} p-6 text-white shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl`}
                >
                  {/* glossy sheen that lifts on hover */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:bg-white/30" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />

                  <div className="relative flex items-start justify-between">
                    <span className="text-4xl drop-shadow-md transition-transform duration-500 group-hover:scale-110">
                      {cat.emoji}
                    </span>
                    {from != null ? (
                      <span className="rounded-full bg-white/25 px-3 py-1 text-xs font-bold backdrop-blur">
                        from ₹{from}
                      </span>
                    ) : null}
                  </div>

                  <div className="relative">
                    <h3 className="text-2xl font-extrabold leading-[1.05] tracking-tight drop-shadow-sm sm:text-3xl">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/85">{cat.blurb}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold">
                      Explore
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-4 text-center">
          <Button href="/menu" size="lg">
            View Full Menu →
          </Button>
          <Button href={site.contact.swiggyHref} variant="accent" size="lg">
            Order on Swiggy
          </Button>
          <Button href={site.contact.zomatoHref} variant="outline" size="lg">
            Order on Zomato
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
