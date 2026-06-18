"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const Drop = ({ fill }: { fill: string }) => (
  <svg viewBox="0 0 16 22" className="h-full w-full" aria-hidden>
    <path d="M8 0 C12 8 16 12 8 22 C0 12 4 8 8 0 Z" fill={fill} />
  </svg>
);

/** Three translucent juice droplets that trail the cursor with spring lag. */
export function JuiceCursor() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const xRaw = useMotionValue(-200);
  const yRaw = useMotionValue(-200);

  const x1 = useSpring(xRaw, { stiffness: 320, damping: 28 });
  const y1 = useSpring(yRaw, { stiffness: 320, damping: 28 });
  const x2 = useSpring(xRaw, { stiffness: 180, damping: 26 });
  const y2 = useSpring(yRaw, { stiffness: 180, damping: 26 });
  const x3 = useSpring(xRaw, { stiffness: 110, damping: 24 });
  const y3 = useSpring(yRaw, { stiffness: 110, damping: 24 });

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      xRaw.set(e.clientX - rect.left);
      yRaw.set(e.clientY - rect.top);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, xRaw, yRaw]);

  if (reduce) return null;

  const drops = [
    { x: x1, y: y1, size: 12, fill: "#fb923c", op: 0.5 },
    { x: x2, y: y2, size: 9, fill: "#22c55e", op: 0.35 },
    { x: x3, y: y3, size: 7, fill: "#fb6f92", op: 0.28 },
  ];

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((d, i) => (
        <motion.div
          key={i}
          style={{
            x: d.x,
            y: d.y,
            width: d.size,
            height: d.size * 1.35,
            opacity: d.op,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute left-0 top-0 blur-[0.5px]"
        >
          <Drop fill={d.fill} />
        </motion.div>
      ))}
    </div>
  );
}
