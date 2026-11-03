"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/** Single element that fades + slides into view on scroll. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  amount,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  amount?: "some" | "all" | number;
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={amount != null ? { once: true, amount } : viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Wraps a list so children (use <RevealItem>) reveal in a stagger. */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  delay = 0,
  amount,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: "some" | "all" | number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={amount != null ? { once: true, amount } : viewportOnce}
    >
      {children}
    </motion.div>
  );
}

/** A child of <RevealGroup>. */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
