"use client";

import { useEffect, useRef } from "react";

/**
 * A soft, accent-coloured glow that follows the cursor and eases toward it.
 * Sits fixed behind all content (-z-10) and ignores pointer events, so it's
 * pure ambience — the page stays fully clickable.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // respect users who asked for less motion → park it, don't animate
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // target = where the cursor is; current = where the glow is right now.
    // we lerp current toward target each frame for a smooth trailing feel.
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.3;
    let cx = tx;
    let cy = ty;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const place = () => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
    };

    if (reduce) {
      place(); // just sit at the centre, no rAF loop
      return;
    }

    const loop = () => {
      cx += (tx - cx) * 0.08; // 0.08 = how springy the follow feels
      cy += (ty - cy) * 0.08;
      place();
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div ref={ref} className="cursor-glow" />
    </div>
  );
}
