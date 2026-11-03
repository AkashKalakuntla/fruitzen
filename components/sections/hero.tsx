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
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
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
      className="relative overflow-hidden bg-leaf-950 text-white"
    >
      {/* warm studio glow behind the product */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[6%] top-[18%] h-[42rem] w-[42rem] rounded-full bg-orange-500/20 blur-[150px]" />
        <div className="absolute -left-[12%] bottom-[-10%] h-[38rem] w-[38rem] rounded-full bg-leaf-500/15 blur-[160px]" />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-7xl items-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-0">
        {/* Left — brand + copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-leaf-200 ring-1 ring-white/15 backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-orange-400" />
            Fresh Juices · Cold-Pressed · Healthy Shots
          </motion.span>

          <motion.div variants={item}>
            <Image
              src="/fruitzen-logo.webp"
              alt="FruitZen"
              width={1600}
              height={264}
              priority
              className="mx-auto mt-7 h-auto w-44 drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] sm:w-52 lg:mx-0"
            />
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Fresh juices &amp; cold-pressed juice bar in Kukatpally, Hyderabad
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-md text-lg leading-8 text-white/65 text-balance lg:mx-0"
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
              <Button href={site.contact.mapsHref} variant="glass" size="lg">
                <MapPin className="h-4 w-4" /> Directions
              </Button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Right — the product: a vibrant juice-pour spotlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easePremium, delay: 0.15 }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-[2.25rem] shadow-2xl shadow-black/50 ring-1 ring-white/15">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "66% center" }}
              autoPlay={!reduce}
              loop={!reduce}
              muted
              playsInline
              preload="metadata"
              poster="/videos/juice-pour-poster.jpg"
            >
              <source src="/videos/juice-pour.mp4" type="video/mp4" />
            </video>
            {/* inner edge + subtle top sheen for a premium framed look */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] ring-1 ring-inset ring-white/20" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
