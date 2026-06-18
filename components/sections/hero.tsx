"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin, MessageCircle, Star, Dumbbell } from "lucide-react";
import { HeroOrbit } from "@/components/hero-orbit";
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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-cream"
    >
      {/* Large blurred fruit-color glows — gently breathing for ambience */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <motion.div
          className="absolute -left-[10%] top-[6%] h-[42rem] w-[42rem] rounded-full bg-orange-300/35 blur-[140px]"
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[2%] top-[20%] h-[40rem] w-[40rem] rounded-full bg-leaf-300/45 blur-[150px]"
          animate={{ opacity: [0.8, 1, 0.8], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-12%] left-[28%] h-[38rem] w-[38rem] rounded-full bg-melon/25 blur-[150px]"
          animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

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

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: easePremium, delay: 0.1 }}
          className="mt-7 text-[5.25rem] font-extrabold leading-[0.88] tracking-tighter sm:text-9xl lg:text-[11.5rem]"
        >
          <span className="text-leaf-700">Fruit</span>
          <span className="text-orange-500">Z</span>
          <span className="text-leaf-700">en</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easePremium, delay: 0.3 }}
          className="mt-6 text-3xl font-semibold tracking-tight text-ink/85 sm:text-4xl"
        >
          Fresh. Healthy. <span className="text-orange-500">You.</span>
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
