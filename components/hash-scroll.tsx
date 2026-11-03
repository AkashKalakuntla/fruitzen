"use client";

import { useEffect } from "react";

/**
 * Reliably scrolls to the element named by the URL hash on the menu page.
 *
 * Why this is defensive:
 *  - Browser scroll-restoration can win over a cross-route hash navigation
 *    (arriving from the homepage tiles), leaving you where you last were.
 *  - A malformed hash like `#waffles#waffles` matches no element, so the
 *    native jump silently does nothing. We sanitise to the first segment.
 *  - With Lenis smooth-scroll active, a single programmatic jump right after a
 *    route change uses Lenis's *stale* dimensions and overshoots (to the
 *    footer). So instead of trusting one jump, we measure the target's real
 *    position each frame and nudge toward it until it's actually in place.
 */
const NAV_OFFSET = 96; // keep the group heading clear of the fixed navbar

type Lenis = {
  scrollTo: (t: number, o?: { immediate?: boolean }) => void;
  resize?: () => void;
};

export function HashScroll() {
  useEffect(() => {
    let raf = 0;

    function scrollToHash() {
      const raw = window.location.hash.replace(/^#+/, "");
      if (!raw) return;
      const id = decodeURIComponent(raw.split("#")[0]); // tolerate double-hash
      if (!id) return;

      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis?.resize?.(); // refresh scroll bounds after the route change

      let frames = 0;
      const settle = () => {
        const el = document.getElementById(id);
        if (!el) {
          if (frames++ < 40) raf = requestAnimationFrame(settle);
          return;
        }
        const delta = el.getBoundingClientRect().top - NAV_OFFSET;
        if (Math.abs(delta) > 2) {
          const target = Math.max(0, window.scrollY + delta);
          if (lenis?.scrollTo) lenis.scrollTo(target, { immediate: true });
          else window.scrollTo(0, target);
          if (frames++ < 40) raf = requestAnimationFrame(settle); // converge
        }
      };
      settle();
    }

    const t = setTimeout(scrollToHash, 60);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
