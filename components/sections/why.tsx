"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { iconMap } from "@/components/icons";
import { whyFeatures } from "@/lib/content";

export function Why() {
  return (
    <section id="why" className="relative overflow-hidden bg-cream-deep py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-leaf-200/40 blur-3xl" />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700 shadow-sm ring-1 ring-leaf-200">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Why FruitZen
          </span>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl text-balance">
            Why choose FruitZen in{" "}
            <span className="font-serif font-medium text-orange-500">Kukatpally?</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {whyFeatures.map((f, i) => {
            const Icon = iconMap[f.icon];
            const featured = i === 0;
            return (
              <RevealItem
                key={f.title}
                className={featured ? "lg:row-span-2" : ""}
              >
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group relative h-full overflow-hidden rounded-card border border-leaf-100 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-2xl ${
                    featured ? "lg:flex lg:flex-col lg:justify-between" : ""
                  }`}
                >
                  {/* glow that blooms on hover */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-leaf-200/60 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-leaf-300/60" />
                  {/* accent bar that sweeps in on hover */}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-leaf-500 via-leaf-400 to-orange-400 transition-transform duration-500 ease-out group-hover:scale-x-100" />

                  <div className="relative">
                    {/* floating icon badge (continuous, disabled under reduced motion) */}
                    <span
                      className="inline-block animate-float"
                      style={{ animationDelay: `${i * 0.7}s` }}
                    >
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-leaf-500 to-leaf-700 text-white shadow-lg shadow-leaf-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <Icon className="h-7 w-7" />
                      </span>
                    </span>
                    <h3 className={`mt-5 font-bold text-ink ${featured ? "text-2xl" : "text-xl"}`}>
                      {f.title}
                    </h3>
                    <p className="mt-2 leading-7 text-ink/65">{f.body}</p>
                  </div>
                  {featured ? (
                    <p className="relative mt-6 font-serif text-lg leading-snug text-leaf-700/80">
                      Freshness you can taste — in every single cup.
                    </p>
                  ) : null}
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
