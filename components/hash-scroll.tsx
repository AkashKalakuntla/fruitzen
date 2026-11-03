"use client";

import { useEffect } from "react";

/**
 * Reliably scrolls to the element named by the URL hash on the menu page.
 *
 * Why this exists:
 *  - Browser scroll-restoration can win over a cross-route hash navigation
 *    (e.g. arriving from the homepage tiles), leaving you where you last were.
 *  - A malformed hash like `#waffles#waffles` has no matching element, so the
 *    native jump silently does nothing. We sanitise to the first segment.
 *  - The target group reveals with motion, so we retry across a few frames
 *    until it is in the DOM, then jump (respecting each group's scroll-mt).
 */
export function HashScroll() {
  useEffect(() => {
    function scrollToHash() {
      const raw = window.location.hash.replace(/^#+/, "");
      if (!raw) return;
      const id = decodeURIComponent(raw.split("#")[0]); // tolerate double-hash
      if (!id) return;

      let tries = 0;
      const attempt = () => {
        const el = document.getElementById(id);
        if (!el) {
          if (tries++ < 20) requestAnimationFrame(attempt);
          return;
        }
        const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number; immediate?: boolean }) => void } }).__lenis;
        if (lenis) {
          // Lenis lands accurately and won't be overridden by its own RAF loop.
          lenis.scrollTo(el, { offset: -96, immediate: true });
        } else {
          const y = window.scrollY + el.getBoundingClientRect().top - 96;
          window.scrollTo({ top: Math.max(0, y) });
        }
      };
      attempt();
    }

    // Defer past first paint so streamed content is present.
    const t = setTimeout(scrollToHash, 60);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
