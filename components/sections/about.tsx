"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@/lib/use-gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sprout, Sparkles, HeartPulse, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { iconMap } from "@/components/icons";
import { timeline } from "@/lib/content";
import { site } from "@/lib/site";

const pillars = [
  { icon: Sprout, title: "Fresh Ingredients", body: "Sourced daily, prepared to order." },
  { icon: Sparkles, title: "Modern Experience", body: "A premium, considered space & service." },
  { icon: HeartPulse, title: "Wellness Focused", body: "Built around how you want to feel." },
];

export function About({ showColdPressLink = false }: { showColdPressLink?: boolean }) {
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

      // subtle parallax depth on the store photo
      gsap.to(".about-photo-img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: ".about-photo", start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div ref={root} className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700 shadow-sm ring-1 ring-leaf-200">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Our Craft
          </span>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl text-balance">
            What makes FruitZen juice{" "}
            <span className="font-serif font-medium text-orange-500">fresh?</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink/60 text-balance">
            FruitZen is a modern wellness beverage brand in the heart of
            Kukatpally, Hyderabad — fresh juices, cold-pressed blends, shakes,
            mocktails, waffles and healthy snacks, made daily around real fruit
            and how you want to feel.
          </p>
          {showColdPressLink ? (
            <p className="mt-4 text-base text-ink/60">
              New to pressing?{" "}
              <Link
                href="/resources/cold-pressed-juice-kukatpally"
                className="font-semibold text-leaf-700 hover:underline"
              >
                Read about cold-pressed juice in Kukatpally
              </Link>
              .
            </p>
          ) : null}
        </Reveal>

        {/* Store photo */}
        <Reveal className="mt-12" delay={0.05}>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-leaf-100">
            <div className="about-photo relative aspect-[16/10] sm:aspect-[16/9]">
              <Image
                src={site.photos.storeInterior}
                alt="Inside the FruitZen store in Kukatpally, Hyderabad"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="about-photo-img scale-[1.12] object-cover"
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
            {timeline.map((step, i) => {
              const Icon = iconMap[step.icon];
              const right = i % 2 === 0;
              return (
                <div
                  key={step.title}
                  className={`tl-step relative pl-16 sm:w-1/2 sm:pl-0 ${
                    right ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
                  }`}
                >
                  {/* node */}
                  <span
                    className={`absolute left-6 top-6 z-10 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-leaf-500 to-leaf-700 text-[10px] font-bold text-white shadow-md ring-4 ring-cream sm:left-auto sm:top-7 ${
                      right ? "sm:-right-3 sm:translate-x-1/2" : "sm:-left-3 sm:-translate-x-1/2"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <Reveal>
                    <div className="group rounded-card glass p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
                      <div
                        className={`inline-flex items-center gap-3 ${
                          right ? "sm:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-leaf-500 to-leaf-700 text-white shadow-lg shadow-leaf-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="rounded-full bg-leaf-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-leaf-700">
                          {step.tag}
                        </span>
                      </div>
                      <h3 className="mt-4 text-2xl font-bold text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink/65">{step.body}</p>
                    </div>
                  </Reveal>
                  {i < timeline.length - 1 ? (
                    <ArrowDown className="mx-auto mt-3 h-5 w-5 text-leaf-300 sm:hidden" />
                  ) : null}
                </div>
              );
            })}
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
