"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@/lib/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sprout, Sparkles, HeartPulse, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { timeline } from "@/lib/content";
import { img } from "@/lib/images";
import { site } from "@/lib/site";

const pillars = [
  { icon: Sprout, title: "Fresh Ingredients", body: "Sourced daily, prepared to order." },
  { icon: Sparkles, title: "Modern Experience", body: "A premium, considered space & service." },
  { icon: HeartPulse, title: "Wellness Focused", body: "Built around how you want to feel." },
];

export function About() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        ".tl-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".tl-track",
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".tl-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 82%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div ref={root} className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-leaf-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-leaf-700">
            Our Craft
          </span>
          <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl text-balance">
            From fruit to cup, <span className="text-gradient">crafted fresh.</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink/60 text-balance">
            FruitZen is a modern wellness beverage brand in the heart of
            Kukatpally, Hyderabad — fresh juices, cold-pressed blends, shakes,
            mocktails, waffles and healthy snacks, made daily around real fruit
            and how you want to feel.
          </p>
        </Reveal>

        {/* Store photo */}
        <Reveal className="mt-12" delay={0.05}>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-leaf-100">
            <div className="relative aspect-[16/10] sm:aspect-[16/9]">
              <Image
                src={site.photos.storeInterior}
                alt="Inside the FruitZen store in Kukatpally, Hyderabad"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-leaf-950/40 to-transparent" />
              <span className="absolute bottom-4 left-5 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur">
                Our store · Kukatpally, Hyderabad
              </span>
            </div>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="tl-track relative mx-auto mt-16 max-w-3xl">
          {/* center line */}
          <div className="absolute left-6 top-0 h-full w-px bg-leaf-100 sm:left-1/2 sm:-translate-x-1/2">
            <div className="tl-line-fill h-full w-full origin-top bg-gradient-to-b from-leaf-500 to-orange-500" />
          </div>

          <div className="space-y-12">
            {timeline.map((step, i) => (
              <div
                key={step.title}
                className={`tl-step relative pl-16 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0
                    ? "sm:pr-12 sm:text-right"
                    : "sm:ml-auto sm:pl-12"
                }`}
              >
                {/* node */}
                <span
                  className={`absolute left-6 top-3 z-10 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-leaf-500 to-leaf-700 text-[10px] font-bold text-white shadow-md ring-4 ring-cream sm:left-auto ${
                    i % 2 === 0 ? "sm:-right-3 sm:translate-x-1/2" : "sm:-left-3 sm:-translate-x-1/2"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="overflow-hidden rounded-card glass shadow-md">
                  <div className="relative h-36 w-full">
                    <Image
                      src={img(step.photo, 600)}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-leaf-950/45 to-transparent" />
                    <span className="absolute left-4 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-600 backdrop-blur">
                      {step.tag}
                    </span>
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="text-2xl font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink/65">{step.body}</p>
                  </div>
                </div>
                {i < timeline.length - 1 ? (
                  <ArrowDown className="mx-auto mt-3 h-5 w-5 text-leaf-300 sm:hidden" />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Pillars */}
        <Reveal className="mt-20 grid gap-6 sm:grid-cols-3" delay={0.1}>
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-card border border-leaf-100 bg-white/60 p-6 text-center backdrop-blur"
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
                <p.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-bold text-ink">{p.title}</h3>
              <p className="mt-1 text-sm text-ink/60">{p.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
