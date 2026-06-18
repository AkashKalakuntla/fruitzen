"use client";

/* eslint-disable @next/next/no-img-element -- decorative, pre-optimized
   transparent cutouts (~15-50KB each) rendered as many absolutely-positioned
   animated layers; next/image fill fights the transform/parallax system. */

import { useEffect, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/*
  Hero fruit orbit — real photographic cutouts (/public/fruit/*.webp) arranged
  in 3 depth layers (background blurred · middle · foreground) with mouse
  parallax, scroll drift and independent organic float per element.
*/

const F = {
  orange: "/fruit/orange.webp",
  kiwi: "/fruit/kiwi.webp",
  watermelon: "/fruit/watermelon.webp",
  lemon: "/fruit/lemon.webp",
  mintLeaf: "/fruit/mint-leaf.webp",
  mintSprig: "/fruit/mint-sprig.webp",
  pom: "/fruit/pomegranate.webp",
} as const;

type AssetCfg = {
  src: string;
  pos: CSSProperties;
  size: string;
  depth: number;
  drift: number;
  dur: number;
  delay: number;
  rot: number;
  opacity: number;
  blur?: number;
  hideMobile?: boolean;
};

// Framing composition across 3 depth tiers (fruit sized down ~30% so the
// FruitZen wordmark stays the dominant element).
const ASSETS: AssetCfg[] = [
  // background layer — large, heavily blurred, slow, low opacity
  { src: F.kiwi, pos: { top: "-4%", left: "-3%" }, size: "clamp(120px,17vw,270px)", depth: 0.26, drift: 26, dur: 18, delay: 0, rot: 5, opacity: 0.18, blur: 9 },
  { src: F.watermelon, pos: { bottom: "-8%", right: "-4%" }, size: "clamp(135px,18vw,300px)", depth: 0.22, drift: 20, dur: 20, delay: 2, rot: 5, opacity: 0.15, blur: 10 },
  // middle layer — medium, framing
  { src: F.kiwi, pos: { top: "12%", right: "10%" }, size: "clamp(66px,7.6vw,124px)", depth: 0.9, drift: 68, dur: 9, delay: 0.3, rot: 9, opacity: 0.98, hideMobile: true },
  { src: F.watermelon, pos: { top: "45%", right: "5%" }, size: "clamp(54px,6.3vw,98px)", depth: 1.05, drift: 96, dur: 10.5, delay: 1, rot: -11, opacity: 0.98 },
  { src: F.mintSprig, pos: { top: "15%", left: "7%" }, size: "clamp(58px,6.8vw,108px)", depth: 0.95, drift: 78, dur: 11, delay: 0.2, rot: 7, opacity: 0.95, hideMobile: true },
  // foreground layer — sharp, fastest parallax
  { src: F.orange, pos: { bottom: "15%", left: "7%" }, size: "clamp(68px,7.7vw,120px)", depth: 1.3, drift: 124, dur: 9.5, delay: 0.6, rot: -9, opacity: 0.98 },
  { src: F.pom, pos: { top: "34%", right: "26%" }, size: "clamp(32px,3.6vw,58px)", depth: 1.45, drift: 145, dur: 8, delay: 0.9, rot: 13, opacity: 0.95, hideMobile: true },
  { src: F.pom, pos: { bottom: "26%", left: "24%" }, size: "clamp(28px,3.2vw,50px)", depth: 1.5, drift: 145, dur: 8.6, delay: 1.4, rot: -15, opacity: 0.9, hideMobile: true },
];

function shadow(blur?: number) {
  return `drop-shadow(0 16px 26px rgba(16,40,24,0.22))${blur ? ` blur(${blur}px)` : ""}`;
}

function FloatingAsset({
  cfg,
  mx,
  my,
  progress,
  reduce,
}: {
  cfg: AssetCfg;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const x = useTransform(mx, (v) => v * cfg.depth);
  const sDrift = useTransform(progress, [0, 1], [0, cfg.drift]);
  const y = useTransform([my, sDrift], ([m, s]: number[]) => m * cfg.depth + s);

  return (
    <motion.div
      style={{ position: "absolute", ...cfg.pos, width: cfg.size, x, y, opacity: cfg.opacity }}
      className={`will-change-transform ${cfg.hideMobile ? "hidden sm:block" : ""}`}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -15, 7, 0], rotate: [0, cfg.rot, -cfg.rot, 0] }}
        transition={{ duration: cfg.dur, delay: cfg.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        style={{ filter: shadow(cfg.blur) }}
      >
        <img src={cfg.src} alt="" aria-hidden draggable={false} className="block h-auto w-full select-none" />
      </motion.div>
    </motion.div>
  );
}

export function HeroOrbit({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion() ?? false;

  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 50, damping: 18, mass: 0.7 });
  const my = useSpring(myRaw, { stiffness: 50, damping: 18, mass: 0.7 });

  const lemonRotate = useTransform(progress, [0, 1], [0, 300]);
  const lemonX = useTransform(mx, (v) => v * 0.7);
  const lemonDrift = useTransform(progress, [0, 1], [0, 90]);
  const lemonY = useTransform([my, lemonDrift], ([m, s]: number[]) => m * 0.7 + s);

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const MAX = 24;
    const onMove = (e: MouseEvent) => {
      mxRaw.set(((e.clientX / window.innerWidth) * 2 - 1) * MAX);
      myRaw.set(((e.clientY / window.innerHeight) * 2 - 1) * MAX);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mxRaw, myRaw, reduce]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large orange slice behind the logo — dimmed + softened so the
          wordmark dominates */}
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          className="w-[clamp(300px,38vw,560px)]"
          style={{ opacity: 0.11, filter: "blur(2.5px)" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 130, repeat: Infinity, ease: "linear" }}
        >
          <img src={F.orange} alt="" aria-hidden draggable={false} className="h-auto w-full" />
        </motion.div>
      </div>

      {/* Layered framing fruit */}
      {ASSETS.map((cfg, i) => (
        <FloatingAsset key={i} cfg={cfg} mx={mx} my={my} progress={progress} reduce={reduce} />
      ))}

      {/* Lemon slice — bottom right, rotates on scroll */}
      <motion.div
        className="absolute w-[clamp(58px,6.6vw,104px)]"
        style={{ right: "15%", bottom: "13%", x: lemonX, y: lemonY }}
      >
        <motion.div style={{ rotate: lemonRotate, filter: shadow() }}>
          <img src={F.lemon} alt="" aria-hidden draggable={false} className="h-auto w-full" />
        </motion.div>
      </motion.div>

      {/* Kiwi crossing left → right */}
      <motion.div
        className="absolute top-[22%] hidden w-[clamp(30px,3.4vw,52px)] sm:block"
        style={{ filter: shadow() }}
        animate={reduce ? undefined : { x: ["-16vw", "118vw"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear", delay: 4 }}
      >
        <motion.div
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
        >
          <img src={F.kiwi} alt="" aria-hidden draggable={false} className="h-auto w-full" />
        </motion.div>
      </motion.div>

      {/* Individual mint leaves drifting gently downward, each rotating independently */}
      {[
        { left: "28%", size: "clamp(26px,2.9vw,44px)", duration: 22, delay: 0, spin: 360 },
        { left: "82%", size: "clamp(22px,2.5vw,38px)", duration: 28, delay: 7, spin: -300 },
        { left: "60%", size: "clamp(20px,2.2vw,34px)", duration: 25, delay: 13, spin: 280 },
      ].map((m, i) => (
        <motion.div
          key={i}
          className="absolute hidden sm:block"
          style={{ left: m.left, width: m.size, top: "-8%" }}
          animate={reduce ? undefined : { y: ["-8vh", "112vh"], x: [0, 24, -16, 8, 0] }}
          transition={{ duration: m.duration, delay: m.delay, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            animate={reduce ? undefined : { rotate: [0, m.spin] }}
            transition={{ duration: m.duration * 0.8, delay: m.delay, repeat: Infinity, ease: "linear" }}
            style={{ filter: shadow() }}
          >
            <img src={F.mintLeaf} alt="" aria-hidden draggable={false} className="h-auto w-full" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
