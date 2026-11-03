"use client";

import Image from "next/image";
import { useRef } from "react";
import { Fraunces } from "next/font/google";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useGSAP } from "@/lib/use-gsap";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

// Swap the final Kling/Runway clip here — animation/layout stay unchanged.
const VIDEO_SRC = "/videos/juice-pour.mp4";
const VIDEO_POSTER = "/videos/juice-pour-poster.jpg";

const serif = Fraunces({ subsets: ["latin"], weight: ["500", "600"], style: ["italic"] });

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".h-rise", { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.35)
        .from(".h-scrim", { opacity: 0, duration: 1.1 }, 0);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="home"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-cream"
    >
      {/* Full-bleed cinematic product video — the central visual */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-[64%_42%] lg:object-[center_38%]"
        autoPlay={!reduce}
        loop={!reduce}
        muted
        playsInline
        preload="metadata"
        poster={VIDEO_POSTER}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Cinematic treatment: soft edge vignette + a cream base that both makes
          the lockup legible and transitions seamlessly into the next section */}
      <div
        className="h-scrim pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 22%, transparent 52%, color-mix(in srgb, var(--color-cream) 45%, transparent) 100%)",
        }}
      />
      <div
        className="h-scrim pointer-events-none absolute inset-x-0 bottom-0 h-[58%]"
        style={{
          background:
            "linear-gradient(to top, var(--color-cream) 12%, color-mix(in srgb, var(--color-cream) 86%, transparent) 44%, transparent)",
        }}
      />

      {/* Brand lockup — lower third, centred; the glass owns the upper frame */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-12 sm:pb-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Image
            src="/fruitzen-logo.webp"
            alt="FruitZen"
            width={1600}
            height={264}
            priority
            className="h-rise h-auto w-40 drop-shadow-[0_2px_18px_rgba(255,255,255,0.6)] sm:w-48"
          />
          <h1 className="h-rise mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Freshness, in its finest{" "}
            <span className={`${serif.className} font-medium italic text-orange-500`}>form.</span>
          </h1>
          <p className="h-rise mt-4 max-w-md text-base leading-7 text-ink/65 text-balance sm:text-lg">
            Fresh juices, vibrant blends and feel-good moments. Made to order in
            Kukatpally, Hyderabad.
          </p>
          <div className="h-rise mt-7 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Button href="/menu" size="lg">
                View Menu
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={site.contact.mapsHref} variant="outline" size="lg">
                <MapPin className="h-4 w-4" /> Directions
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
