"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// 3D is heavy — load it only on capable desktops, after mount, never for
// reduced-motion users or small/low-core devices. The hero's aurora + grain
// remain as the graceful fallback behind this.
const JuiceScene = dynamic(() => import("./juice-scene"), { ssr: false });

export function JuiceCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const lowCore = (navigator.hardwareConcurrency ?? 8) <= 4;
    if (!reduce && !small && !lowCore) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
      <JuiceScene />
    </div>
  );
}
