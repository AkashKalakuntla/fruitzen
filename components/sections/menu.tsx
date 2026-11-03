"use client";

import Image from "next/image";
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

/** Official Swiggy brand mark (simple-icons), tinted via currentColor. */
function SwiggyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.034 24c-.376-.411-2.075-2.584-3.95-5.513-.547-.916-.901-1.63-.833-1.814.178-.48 3.355-.743 4.333-.308.298.132.29.307.29.409 0 .44-.022 1.619-.022 1.619a.441.441 0 1 0 .883-.002l-.005-2.939c0-.255-.278-.319-.331-.329-.511-.002-1.548-.006-2.661-.006-2.457 0-3.006.101-3.423-.172-.904-.591-2.383-4.577-2.417-6.819C3.849 4.964 5.723 2.225 8.362.868A8.13 8.13 0 0 1 12.026 0c4.177 0 7.617 3.153 8.075 7.209l.001.011c.084.981-5.321 1.189-6.39.904-.164-.044-.206-.212-.206-.284L13.5 4.996a.442.442 0 0 0-.884.002l.009 3.866a.33.33 0 0 0 .268.32l3.354-.001c1.79 0 2.542.207 3.042.588.333.254.461.739.349 1.37C18.633 16.755 12.273 23.71 12.034 24z" />
    </svg>
  );
}

/** Official Zomato brand mark (simple-icons), tinted via currentColor. */
function ZomatoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.615 9.45l-1.258.473-.167.71-.446.021-.115.978h.408l-.211 1.51c-.131.939.036 1.381.865 1.381.488 0 .91-.175 1.135-.297l.145-.9c-.167.083-.436.19-.618.19-.247 0-.276-.13-.225-.488l.189-1.396h.843c.03-.206.131-.877.16-1h-.865zm-3.779 1.002c-.115.002-.236.01-.361.026a3.592 3.592 0 0 0-1.347.432l.26.789c.269-.15.615-.28.978-.326.538-.066.757.1.79.375.014.109.004.199-.005.289l-.014.056a3.46 3.46 0 0 0-1.097-.036c-.518.063-.943.273-1.204.6a1.324 1.324 0 0 0-.225 1.034c.127.583.553.84 1.199.76.45-.055.812-.27 1.076-.63a2.665 2.665 0 0 1-.03.304 1.74 1.74 0 0 1-.072.29l1.244.001a3.657 3.657 0 0 1-.001-.365c.036-.459.118-1.143.247-2.051a2.397 2.397 0 0 0-.002-.59c-.08-.644-.628-.969-1.436-.958zm6.536.063c-1.194 0-2.107 1.067-2.107 2.342 0 .959.552 1.693 1.628 1.693 1.2 0 2.107-1.067 2.107-2.35 0-.95-.538-1.685-1.628-1.685zm-11.777.041c-.538 0-1.12.465-1.52 1.236.102-.504.08-1.076.051-1.198a8.964 8.964 0 0 1-1.287.122 6.9 6.9 0 0 1-.073 1.243l-.167 1.145c-.066.45-.138.969-.211 1.297h1.353c.007-.199.058-.511.094-.786l.116-.786c.095-.511.502-1.114.815-1.114.182 0 .175.176.124.504l-.131.885c-.066.45-.138.969-.211 1.297h1.367c.008-.199.051-.512.088-.786l.116-.786c.094-.512.502-1.114.814-1.114.182 0 .175.168.146.396l-.327 2.29H13l.438-2.609c.095-.649.044-1.236-.676-1.236-.523 0-1.09.443-1.49 1.182.087-.61.036-1.182-.677-1.182zm-4.88.008c-1.177 0-2.08 1.053-2.08 2.312 0 .946.546 1.67 1.608 1.67 1.185 0 2.08-1.052 2.08-2.319 0-.938-.531-1.663-1.607-1.663zm-5.126.091c-.05.39-.102.778-.175 1.13.328-.008.619-.016 1.411-.016l-1.81 1.96-.015.703c.444-.03.997-.039 1.63-.039.566 0 1.134.008 1.497.039.065-.458.13-.763.21-1.137-.275.015-.755.023-1.512.023l1.81-1.969.023-.694c-.437.023-.83.03-1.52.03-.749 0-.975-.007-1.549-.03zm4.988.927c.255 0 .408.228.408.701 0 .687-.276 1.251-.626 1.251-.261 0-.414-.236-.414-.702 0-.694.283-1.25.632-1.25zm16.629 0c.254 0 .407.228.407.701 0 .687-.276 1.251-.625 1.251-.262 0-.415-.236-.415-.702 0-.694.284-1.25.633-1.25zM15.51 12.64c.206-.003.403.024.55.058l-.013.118c-.075.44-.39.881-.848.938-.31.037-.578-.148-.608-.39a.538.538 0 0 1 .114-.41c.117-.159.336-.268.599-.3.069-.009.138-.013.206-.014Z" />
    </svg>
  );
}

export function Menu() {
  return (
    <section id="menu" className="relative scroll-mt-24 overflow-hidden py-24 sm:scroll-mt-28 sm:py-32">
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
          amount="some"
        >
          {menu.map((cat) => {
            const from = fromPrice(cat.target);
            return (
              <RevealItem key={cat.slug}>
                <Link
                  href={`/menu#${cat.target}`}
                  className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[1.6rem] p-6 text-white shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  {/* real food/drink photo (swap-in for owner photos: /public/menu/<slug>.webp) */}
                  <Image
                    src={`/menu/${cat.slug}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* brand colour wash over the photo */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tileGrad[cat.slug] ?? "from-leaf-400 to-leaf-600"} opacity-[0.72]`} />
                  {/* darken toward the bottom so the title stays crisp */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/5" />
                  {/* glossy sheen that lifts on hover */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:bg-white/30" />

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
          <a
            href={site.contact.swiggyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#FC8019] px-8 text-base font-semibold text-white shadow-lg shadow-[#FC8019]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e8710f] hover:shadow-xl"
          >
            <SwiggyIcon className="h-5 w-5" />
            Order on Swiggy
          </a>
          <a
            href={site.contact.zomatoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#E23744] px-8 text-base font-semibold text-white shadow-lg shadow-[#E23744]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#cf2c38] hover:shadow-xl"
          >
            <ZomatoIcon className="h-5 w-5" />
            Order on Zomato
          </a>
        </Reveal>
      </div>
    </section>
  );
}
