"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { menu, menuGroups } from "@/lib/content";
import { site } from "@/lib/site";

const groupBySlug = Object.fromEntries(menuGroups.map((g) => [g.slug, g]));

// Real "from ₹X" per category, derived from the itemised menu (no invented prices).
function fromPrice(slug: string): number | null {
  const g = groupBySlug[slug];
  if (!g) return null;
  const nums = g.items.flatMap((it) => (it.price.match(/\d+/g) ?? []).map(Number));
  return nums.length ? Math.min(...nums) : null;
}

export function Menu() {
  return (
    <section id="menu" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-orange-200/30 blur-[120px]" />
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

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {menu.map((cat) => {
            const from = fromPrice(cat.target);
            const items = (groupBySlug[cat.target]?.items ?? []).slice(0, 4);
            return (
              <RevealItem key={cat.slug}>
              <Link
                href={`/menu#${cat.target}`}
                className="group relative block overflow-hidden rounded-[1.5rem] bg-white/80 p-6 ring-1 ring-black/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-leaf-900/10"
              >
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${cat.gradient}`} />

                <div className="flex items-start justify-between">
                  <span className="text-3xl">{cat.emoji}</span>
                  {from != null ? (
                    <span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold text-leaf-700 ring-1 ring-leaf-100">
                      from ₹{from}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-xl font-bold text-ink">{cat.name}</h3>

                <ul className="mt-3 space-y-1.5">
                  {items.map((it) => (
                    <li key={it.name} className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2 text-ink/65">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-orange-400" />
                        {it.name}
                      </span>
                      <span className="shrink-0 font-semibold text-ink/50">{it.price}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-leaf-700 transition-colors group-hover:text-orange-600">
                  See all {cat.name.toLowerCase()}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
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
