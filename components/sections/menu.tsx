"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { menu } from "@/lib/content";
import { img } from "@/lib/images";

export function Menu() {
  return (
    <section id="menu" className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-600">
            The Menu
          </span>
          <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl text-balance">
            Fresh juices to loaded <span className="text-gradient">waffles</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/60 text-balance">
            Juices, smoothies, shakes, mojitos, waffles, momos and combos — all
            crafted fresh to order.
          </p>
        </Reveal>

        {/* Category cards → open the full menu page */}
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {menu.map((cat) => (
            <RevealItem key={cat.slug}>
              <Link href={`/menu#${cat.target}`} className="block">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative h-56 overflow-hidden rounded-card shadow-md"
                >
                  <Image
                    src={img(cat.photo, 600)}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-leaf-950/85 via-leaf-950/15 to-transparent" />
                  <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-orange-500">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="text-2xl">{cat.emoji}</span>
                    <h3 className="mt-1 text-lg font-bold text-white drop-shadow">{cat.name}</h3>
                    <p className="mt-0.5 text-sm text-white/70">{cat.blurb}</p>
                  </div>
                </motion.div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12 text-center">
          <Button href="/menu" size="lg">
            View Full Menu →
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
