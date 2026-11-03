"use client";

import { motion, useReducedMotion } from "framer-motion";

// Deterministic configs (no Math.random → no hydration mismatch).
// drift = how far it sways sideways (px) as it rises.
const DROPS = [
  { left: "9%", size: 13, color: "#f97316", dur: 15, delay: 0, drift: 34 },
  { left: "19%", size: 9, color: "#22c55e", dur: 18, delay: 3, drift: -26 },
  { left: "31%", size: 15, color: "#fb6f92", dur: 14, delay: 6, drift: 30 },
  { left: "43%", size: 8, color: "#f97316", dur: 20, delay: 1.5, drift: -20 },
  { left: "55%", size: 12, color: "#22c55e", dur: 16, delay: 4, drift: 28 },
  { left: "64%", size: 7, color: "#fb6f92", dur: 19, delay: 8, drift: -32 },
  { left: "75%", size: 14, color: "#f97316", dur: 14, delay: 2, drift: 24 },
  { left: "86%", size: 9, color: "#22c55e", dur: 17, delay: 5, drift: -28 },
  { left: "4%", size: 7, color: "#fb6f92", dur: 21, delay: 7, drift: 22 },
  { left: "49%", size: 10, color: "#facc15", dur: 15, delay: 9, drift: -24 },
  { left: "70%", size: 8, color: "#f97316", dur: 18, delay: 6.5, drift: 30 },
  { left: "27%", size: 7, color: "#fb6f92", dur: 22, delay: 2.5, drift: -18 },
  { left: "92%", size: 11, color: "#22c55e", dur: 16, delay: 4.5, drift: 26 },
  { left: "38%", size: 9, color: "#facc15", dur: 19, delay: 10, drift: -30 },
];

/** Glossy juice droplets drifting up across the hero (premium, reduced-motion safe). */
export function JuiceParticles() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {DROPS.map((d, i) => (
        <motion.span
          key={i}
          className="absolute blur-[0.4px]"
          style={{
            left: d.left,
            bottom: "-6%",
            width: d.size,
            height: d.size,
            // teardrop with a glossy highlight
            background: `radial-gradient(circle at 34% 28%, rgba(255,255,255,0.9), ${d.color} 62%)`,
            borderRadius: "50% 50% 50% 50% / 58% 58% 42% 42%",
            boxShadow: `0 2px 6px ${d.color}40`,
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0.75, 0.75, 0],
            y: ["0vh", "-98vh"],
            x: [0, d.drift, -d.drift * 0.5, d.drift * 0.4],
          }}
          transition={{
            duration: d.dur,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.12, 0.85, 1],
          }}
        />
      ))}
    </div>
  );
}
