"use client";

import { Fraunces } from "next/font/google";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const display = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });

// CONCEPT A — Premium Editorial Beverage Brand
// Warm ivory, generous whitespace, oversized elegant serif display, restrained
// colour, small-caps metadata. Aesop / Kinfolk editorial luxury.
export function HeroA() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-cream text-ink">
      <div className="mx-auto grid min-h-[100svh] w-full max-w-7xl grid-rows-[auto_1fr_auto] px-6 pb-10 pt-28 sm:px-10">
        {/* top rule + metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between border-t border-ink/15 pt-5 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-ink/55"
        >
          <span>Est. Kukatpally · Hyderabad</span>
          <span className="hidden sm:inline">Cold-Pressed · Made to Order</span>
          <span>Open 9—11</span>
        </motion.div>

        {/* headline */}
        <div className="flex flex-col justify-center py-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-leaf-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> FruitZen · Fresh Juice Bar
          </motion.p>

          <h1
            className={`${display.className} max-w-5xl text-[13vw] font-light leading-[0.92] tracking-[-0.02em] sm:text-7xl lg:text-[5.6rem]`}
          >
            {["Fresh juices &", "cold-pressed,", "pressed to order."].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {i === 1 ? (
                  <>
                    cold-pressed,{" "}
                    <span className={`${display.className} italic text-leaf-700`}>pure</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* bottom row: lede + actions */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid items-end gap-8 border-t border-ink/15 pt-7 lg:grid-cols-[1fr_auto]"
        >
          <p className="max-w-md text-lg leading-8 text-ink/65">
            A juice bar in the heart of Kukatpally, Hyderabad — juices,
            cold-pressed blends, shakes and waffles, crafted from fruit sourced
            every morning.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/menu" size="lg">
              View the Menu
            </Button>
            <Button href={site.contact.mapsHref} variant="ghost" size="lg">
              Visit us →
            </Button>
          </div>
        </motion.div>
      </div>

      {/* restrained colour accent: a soft citrus wash bleeding from the right */}
      <div
        className="pointer-events-none absolute -right-20 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full opacity-70 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-orange-300), transparent 68%)" }}
      />
    </section>
  );
}
