"use client";

import { motion, useReducedMotion } from "framer-motion";

// Deterministic configs (no Math.random → no hydration mismatch).
const PARTICLES = [
  { left: "12%", size: 7, color: "#f97316", dur: 13, delay: 0 },
  { left: "22%", size: 5, color: "#22c55e", dur: 16, delay: 3 },
  { left: "34%", size: 9, color: "#fb6f92", dur: 12, delay: 6 },
  { left: "46%", size: 5, color: "#f97316", dur: 18, delay: 1 },
  { left: "58%", size: 7, color: "#22c55e", dur: 14, delay: 4 },
  { left: "67%", size: 4, color: "#fb6f92", dur: 17, delay: 8 },
  { left: "78%", size: 8, color: "#f97316", dur: 12, delay: 2 },
  { left: "88%", size: 5, color: "#22c55e", dur: 15, delay: 5 },
  { left: "5%", size: 4, color: "#fb6f92", dur: 19, delay: 7 },
  { left: "52%", size: 6, color: "#22c55e", dur: 13, delay: 9 },
  { left: "72%", size: 5, color: "#f97316", dur: 16, delay: 6 },
  { left: "30%", size: 4, color: "#fb6f92", dur: 20, delay: 2 },
];

/** Subtle ambient juice droplets slowly rising — premium, very low opacity. */
export function JuiceParticles() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: p.left,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.5, 0.5, 0], y: ["0vh", "-92vh"] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.15, 0.8, 1],
          }}
        />
      ))}
    </div>
  );
}
