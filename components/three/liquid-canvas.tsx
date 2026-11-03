"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// WebGL fluid shader — loaded only on capable desktops, after mount. The hero's
// aurora backdrop remains the graceful fallback for mobile / reduced-motion.
const LiquidHero = dynamic(() => import("./liquid-hero"), { ssr: false });

export function LiquidCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const lowCore = (navigator.hardwareConcurrency ?? 8) <= 4;
    if (!reduce && !small && !lowCore) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <LiquidHero />
    </div>
  );
}
