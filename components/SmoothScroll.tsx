"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* Renders nothing — it just runs the smooth-scroll engine for the whole page. */
export default function SmoothScroll() {
  useEffect(() => {
    // respect people who ask for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1 }); // lerp = how "weighted"/laggy; lower = smoother

    // drive Lenis on every animation frame
    let id = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    });

    // clean up if the component ever unmounts
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return null;
}
