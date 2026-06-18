"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { Button } from "@/components/ui/button";
import { iconMap } from "@/components/icons";
import { wellness } from "@/lib/content";

export function Wellness() {
  return (
    <section
      id="wellness"
      className="relative overflow-hidden bg-leaf-950 bg-dots py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-leaf-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-leaf-300">
              Gym & Wellness
            </span>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl text-balance">
              Fuel Your Workout.{" "}
              <span className="bg-gradient-to-r from-leaf-300 to-orange-400 bg-clip-text text-transparent">
                Recover Better.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-white/70 text-balance">
              Located near Hyderabad&apos;s top gyms and studios, FruitZen is built
              for fitness-first lifestyles — clean fuel before, during and after
              every session.
            </p>
            <div className="mt-8">
              <Button href="/menu" variant="accent" size="lg">
                See gym-friendly options
              </Button>
            </div>
          </Reveal>

          <RevealGroup className="grid grid-cols-2 gap-4 sm:gap-6" stagger={0.1}>
            {wellness.map((m) => {
              const Icon = iconMap[m.icon];
              return (
                <RevealItem key={m.label}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="glass-dark h-full rounded-card p-6"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-leaf-500/20 text-leaf-300">
                      <Icon className="h-6 w-6" />
                    </span>
                    <p className="mt-5 text-4xl font-extrabold tracking-tight text-white">
                      <Counter to={m.value} suffix={m.suffix} />
                    </p>
                    <p className="mt-1 font-semibold text-leaf-300">{m.label}</p>
                    <p className="mt-1 text-sm leading-5 text-white/55">{m.blurb}</p>
                  </motion.div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
