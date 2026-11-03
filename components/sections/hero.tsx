"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin, MessageCircle, Star, Dumbbell } from "lucide-react";
import { HeroOrbit } from "@/components/hero-orbit";
import { JuiceCanvas } from "@/components/three/juice-canvas";
import { JuiceCursor } from "@/components/juice-cursor";
import { JuiceParticles } from "@/components/juice-particles";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/ui/button";
import { easePremium } from "@/lib/motion";
import { site } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-cream pt-28 pb-16 sm:pt-20"
    >
      {/* Animated aurora backdrop (transform-only, reduced-motion safe) */}
      <div className="hero-aurora pointer-events-none absolute -inset-[14%] -z-20" />
      {/* WebGL liquid-fruit scene (desktop only; aurora is the fallback) */}
      <JuiceCanvas />
      {/* Film-grain texture over the backdrop for a premium, printed feel */}
      <div className="grain pointer-events-none absolute inset-0 z-0" />

      {/* Hero Fruit Orbit System */}
      <HeroOrbit progress={scrollYProgress} />

      {/* Ambient juice particles + cursor droplets */}
      <JuiceParticles />
      <JuiceCursor />

      {/* Center content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-5xl px-5 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easePremium }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-leaf-700 shadow-sm ring-1 ring-leaf-200 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Fresh Juices · Cold-Pressed · Healthy Shots
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: easePremium, delay: 0.1 }}
          className="mt-7"
        >
          <Image
            src="/fruitzen-logo.webp"
            alt="FruitZen — fresh juice bar in Kukatpally, Hyderabad"
            width={1600}
            height={264}
            priority
            className="mx-auto h-auto w-[60vw] sm:w-[min(82vw,760px)]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easePremium, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl"
        >
          Fresh juices &amp; cold-pressed juice bar in Kukatpally, Hyderabad
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easePremium, delay: 0.3 }}
          className="mt-5 text-5xl font-extrabold leading-[0.95] tracking-tighter text-ink sm:text-7xl"
        >
          Fresh. Healthy. <span className="text-gradient animate-text-gradient">You.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink/60 text-balance sm:text-xl"
        >
          Fresh juices, cold-pressed blends, shakes, mocktails, waffles and
          healthy snacks — crafted daily in Kukatpally, Hyderabad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easePremium, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <Button href="/menu" size="lg">
              View Menu
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href={site.contact.mapsHref} variant="outline" size="lg">
              <MapPin className="h-4 w-4" /> Get Directions
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href={site.contact.whatsappHref} variant="accent" size="lg">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
          </Magnetic>
        </motion.div>

        {/* Trust badges directly below the CTAs */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easePremium, delay: 0.75 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-ink/55"
        >
          <li className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 text-orange-500" /> Trusted Local Favorite
          </li>
          <li className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-leaf-600" /> Kukatpally, Hyderabad
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Dumbbell className="h-4 w-4 text-leaf-600" /> Near Multiple Fitness Centers
          </li>
        </motion.ul>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#social"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ink/40 hover:text-ink/70"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="h-7 w-7" />
        </motion.span>
      </motion.a>
    </section>
  );
}
