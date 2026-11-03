"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

// CONCEPT C — Immersive Product Advertising (bold graphic poster)
// High-impact, vibrant, type-led campaign poster on warm ivory: an oversized
// headline, a sweeping vibrant "juice arc" (SVG) and energetic colour.
export function HeroC() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream">
      {/* sweeping juice arc */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="juice" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fdba74" />
            <stop offset="0.5" stopColor="#f97316" />
            <stop offset="1" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4ade80" />
            <stop offset="1" stopColor="#15803d" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          d="M1500,120 C1050,150 1050,560 1360,620 C1180,690 980,760 1160,900"
          fill="none"
          stroke="url(#juice)"
          strokeWidth="190"
          strokeLinecap="round"
        />
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          cx="250"
          cy="760"
          r="90"
          fill="url(#leaf)"
        />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Image src="/fruitzen-logo.webp" alt="FruitZen" width={1600} height={264} priority className="h-auto w-40" />
        </motion.div>

        <h1 className="mt-8 max-w-4xl text-6xl font-extrabold uppercase leading-[0.9] tracking-tighter text-ink sm:text-8xl lg:text-[8.5rem]">
          {["Taste", "the", "fresh."].map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {w === "fresh." ? <span className="text-gradient">fresh.</span> : w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-7 max-w-md text-lg font-medium leading-8 text-ink/70"
        >
          Cold-pressed juices, shakes &amp; waffles — crafted to order in
          Kukatpally, Hyderabad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Button href="/menu" size="lg">
            Order Now
          </Button>
          <Button href={site.contact.whatsappHref} variant="outline" size="lg">
            WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
