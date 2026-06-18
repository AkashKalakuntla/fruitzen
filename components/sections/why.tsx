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
          <span className="inline-flex items-center gap-2 rounded-full bg-leaf-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-leaf-700">
            Why FruitZen
          </span>
          <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl text-balance">
            Built on quality you can <span className="text-gradient">taste</span>
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
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group relative h-full overflow-hidden rounded-card border border-leaf-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl ${
                    featured ? "lg:flex lg:flex-col lg:justify-between" : ""
                  }`}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-leaf-100/70 blur-2xl transition-opacity group-hover:opacity-100"
                  />
                  <div className="relative">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-leaf-500 to-leaf-700 text-white shadow-lg shadow-leaf-500/30 transition-transform group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className={`mt-5 font-bold text-ink ${featured ? "text-2xl" : "text-xl"}`}>
                      {f.title}
                    </h3>
                    <p className="mt-2 leading-7 text-ink/65">{f.body}</p>
                  </div>
                  {featured ? (
                    <p className="relative mt-6 text-sm font-semibold text-leaf-600">
                      The FruitZen standard →
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
