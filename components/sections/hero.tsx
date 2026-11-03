"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, MessageCircle } from "lucide-react";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/ui/button";
import { easePremium } from "@/lib/motion";
import { site } from "@/lib/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easePremium } },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream"
    >
      {/* Cinematic product video — a real orange-juice pour, studio lit */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "74% center" }}
        autoPlay={!reduce}
        loop={!reduce}
        muted
        playsInline
        preload="metadata"
        poster="/videos/juice-pour-poster.jpg"
      >
        <source src="/videos/juice-pour.mp4" type="video/mp4" />
      </video>

      {/* Cream wash: keeps the left clean for the copy, softens the edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, var(--color-cream) 0%, color-mix(in srgb, var(--color-cream) 90%, transparent) 32%, transparent 60%)",
        }}
      />
      {/* On phones the video becomes a soft backdrop so the copy stays clean */}
      <div className="pointer-events-none absolute inset-0 bg-cream/45 lg:hidden" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 lg:hidden"
        style={{ background: "linear-gradient(to top, var(--color-cream) 18%, transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 lg:pt-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl text-center lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-leaf-700 shadow-sm ring-1 ring-leaf-200 backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Fresh Juices · Cold-Pressed · Healthy Shots
          </motion.span>

          <motion.div variants={item}>
            <Image
              src="/fruitzen-logo.webp"
              alt="FruitZen"
              width={1600}
              height={264}
              priority
              className="mx-auto mt-7 h-auto w-44 sm:w-52 lg:mx-0"
            />
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-tight text-ink text-balance sm:text-4xl lg:text-5xl"
          >
            Fresh juices &amp; cold-pressed juice bar in Kukatpally, Hyderabad
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-md text-lg leading-8 text-ink/65 text-balance lg:mx-0"
          >
            Pressed to order from fruit sourced every morning — juices,
            cold-pressed blends, shakes, waffles and more.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Magnetic>
              <Button href="/menu" size="lg">
                View Menu
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={site.contact.whatsappHref} variant="accent" size="lg">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={site.contact.mapsHref} variant="outline" size="lg">
                <MapPin className="h-4 w-4" /> Directions
              </Button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
