"use client";

import Image from "next/image";
import { useRef } from "react";
import { Fraunces } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import { useGSAP } from "@/lib/use-gsap";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const serif = Fraunces({ subsets: ["latin"], weight: ["500", "600"], style: ["italic"] });

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // cinematic entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-rise", { y: 34, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.1)
        // the juice reveals bottom→top like it's filling, with a soft settle
        .fromTo(
          ".hero-product",
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.06, opacity: 0 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 1.3, ease: "power2.out" },
          0.2,
        )
        .from(".hero-glow", { opacity: 0, scale: 0.8, duration: 1.2 }, 0.1);

      // gentle idle float + scroll parallax on the product
      gsap.to(".hero-product", {
        y: -14,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-product-wrap", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream"
    >
      {/* warm ivory + soft green sunlit ambiance (recreates the reference stage) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="hero-glow absolute right-0 top-0 h-[55rem] w-[55rem] translate-x-1/4 -translate-y-1/4 rounded-full opacity-70 blur-[130px]"
          style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-leaf-300) 65%, transparent), transparent 70%)" }}
        />
        <div
          className="absolute -left-20 bottom-0 h-[34rem] w-[34rem] rounded-full opacity-60 blur-[150px]"
          style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-orange-300) 40%, transparent), transparent 70%)" }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pt-24 pb-16 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-0 lg:pb-0">
        {/* LEFT — copy */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <span className="hero-rise inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-leaf-700 shadow-sm ring-1 ring-leaf-200 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Fresh Juices · Cold-Pressed · Healthy Shots
          </span>

          <h1 className="hero-rise mt-7 text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Freshness,
            <br />
            in its finest{" "}
            <span className={`${serif.className} font-medium italic text-orange-500`}>form.</span>
          </h1>

          <p className="hero-rise mx-auto mt-6 max-w-md text-lg leading-8 text-ink/65 text-balance lg:mx-0">
            Fresh juices, vibrant blends and feel-good moments. Made to order in
            Kukatpally, Hyderabad.
          </p>

          <div className="hero-rise mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
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

          <div className="hero-rise mt-8 flex items-center justify-center gap-3 text-sm text-ink/55 lg:justify-start">
            <span className="inline-flex items-center gap-1.5 font-medium text-ink/70">
              <span className="text-orange-500">★</span> Trusted Local Favorite
            </span>
            <span className="h-4 w-px bg-ink/15" />
            <span>Kukatpally, Hyderabad</span>
          </div>
        </div>

        {/* RIGHT — photoreal product, feathered into the stage */}
        <div className="hero-product-wrap order-1 lg:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
            <Image
              src="/brand/hero-juice.webp"
              alt="A glass of fresh FruitZen orange juice with a splash, surrounded by oranges"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 34rem"
              className="hero-product object-contain"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 72% 72% at 50% 52%, #000 62%, transparent 93%)",
                maskImage:
                  "radial-gradient(ellipse 72% 72% at 50% 52%, #000 62%, transparent 93%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
