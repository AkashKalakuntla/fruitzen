"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Minimal useGSAP-style hook: runs the callback inside a scoped
 * `gsap.context` on mount and reverts (cleans up all tweens + ScrollTriggers)
 * on unmount. Keeps GSAP animations scoped to the provided ref.
 */
export function useGSAP(
  callback: () => void,
  { scope }: { scope: RefObject<HTMLElement | null> },
) {
  useEffect(() => {
    const ctx = gsap.context(callback, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
