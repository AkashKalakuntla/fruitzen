"use client";

import { Star, MapPin, CupSoda, Dumbbell } from "lucide-react";
import { Counter } from "@/components/counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

const badges = [
  { icon: Star, label: "Trusted Local Favorite", sub: "Loved across Kukatpally" },
  { icon: MapPin, label: "Kukatpally, Hyderabad", sub: "Easy to find" },
  { icon: CupSoda, label: "Freshly Prepared Daily", sub: "Made to order" },
  { icon: Dumbbell, label: "Near Fitness Centers", sub: "Gym-friendly menu" },
];

const stats = [
  { to: 50000, suffix: "+", label: "Freshly Served" },
  { to: 12000, suffix: "+", label: "Happy Customers" },
  { to: 6, suffix: "", label: "Product Categories" },
];

export function SocialProof() {
  return (
    <section id="social" className="relative -mt-8 px-5 pb-8 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="glass rounded-[2rem] p-6 shadow-xl shadow-leaf-900/5 sm:p-8">
            {/* Trust cards */}
            <RevealGroup className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4" stagger={0.08}>
              {badges.map((b) => (
                <RevealItem key={b.label}>
                  <div className="flex h-full items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-leaf-100 transition-shadow hover:shadow-md">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-leaf-100 text-leaf-700">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <div className="text-left">
                      <p className="text-sm font-bold leading-tight text-ink">{b.label}</p>
                      <p className="mt-0.5 text-xs text-ink/50">{b.sub}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-leaf-200 to-transparent" />

            {/* Animated counters */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-extrabold tracking-tight text-gradient sm:text-5xl">
                    <Counter to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink/55 sm:text-sm">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
