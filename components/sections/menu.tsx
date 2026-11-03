"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@/lib/use-gsap";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { menu, menuGroups } from "@/lib/content";
import { img } from "@/lib/images";

// Real "from ₹X" per category, derived from the itemised menu (no invented prices).
const priceFrom: Record<string, number | null> = Object.fromEntries(
  menuGroups.map((g) => {
    const nums = g.items.flatMap((it) => (it.price.match(/\d+/g) ?? []).map(Number));
    return [g.slug, nums.length ? Math.min(...nums) : null];
  }),
);

export function Menu() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".menu-card", {
        y: 52,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".menu-grid", start: "top 82%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="menu" className="relative py-24 sm:py-32">
      <div ref={root} className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 shadow-sm ring-1 ring-orange-200">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> The Menu
          </span>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl text-balance">
            What&apos;s on the FruitZen{" "}
            <span className="font-serif font-medium text-orange-500">menu?</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/60 text-balance">
            Juices, smoothies, shakes, mojitos, waffles, momos and combos — all
            crafted fresh to order.
          </p>
        </Reveal>

        <div className="menu-grid mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((cat) => {
            const from = priceFrom[cat.target];
            return (
              <Link
                key={cat.slug}
                href={`/menu#${cat.target}`}
                className="menu-card group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-md ring-1 ring-black/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-leaf-900/15 sm:aspect-[5/6]"
              >
              <Image
                src={img(cat.photo, 700)}
                alt={`${cat.name} at FruitZen, Kukatpally`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
              />
              {/* readability + a flavour-tinted wash that intensifies on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-leaf-950/90 via-leaf-950/25 to-transparent" />
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${cat.gradient} opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-60`}
              />

              {/* from-price chip */}
              {from != null ? (
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur">
                  from ₹{from}
                </span>
              ) : null}
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-300 group-hover:bg-orange-500 group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="text-3xl drop-shadow">{cat.emoji}</span>
                <h3 className="mt-2 text-xl font-bold text-white drop-shadow sm:text-2xl">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm leading-6 text-white/75">{cat.blurb}</p>
                {/* slides in on hover */}
                <span className="mt-3 inline-flex max-h-0 items-center gap-1.5 overflow-hidden text-sm font-semibold text-orange-300 opacity-0 transition-all duration-400 group-hover:max-h-8 group-hover:opacity-100">
                  View items <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
            );
          })}
        </div>

        <Reveal className="mt-12 text-center">
          <Button href="/menu" size="lg">
            View Full Menu →
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
