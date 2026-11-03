"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Root smooth-scroll provider (Lenis) driven by the GSAP ticker so every
 * ScrollTrigger stays perfectly in sync. Honours prefers-reduced-motion by
 * collapsing the smoothing to an instant response (scroll still works).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const update = (time: number) => {
      const lenis = lenisRef.current?.lenis;
      lenis?.raf(time * 1000);
      // Expose for programmatic scrolls (e.g. hash navigation on /menu) so they
      // go through Lenis instead of fighting its RAF loop. Set each frame so it
      // is reliably present as soon as Lenis is running.
      if (lenis) (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const lenis = lenisRef.current?.lenis;
    const onScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onScroll);
    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", onScroll);
    };
  }, [reduce]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: reduce ? 1 : 0.1,
        duration: reduce ? 0 : 1.1,
        smoothWheel: !reduce,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    >
      {children}
    </ReactLenis>
  );
}
