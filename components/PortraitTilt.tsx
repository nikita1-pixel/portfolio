"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

/**
 * Frameless cutout portrait anchored to the bottom of the panel. It tilts in
 * 3D toward the cursor (left/right → rotateY, up/down → rotateX) pivoting from
 * the BOTTOM, so the feet stay planted and the figure sways toward you.
 * Static when reduced-motion is requested.
 */
export default function PortraitTilt() {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetRx = 0;
    let targetRy = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const el = tiltRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2); // -1 … 1
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      targetRy = clamp(dx * 26, -26, 26); // left / right — stronger
      targetRx = clamp(-dy * 18, -18, 18); // up / down — stronger
    };

    const loop = () => {
      rx += (targetRx - rx) * 0.12; // snappier follow
      ry += (targetRy - ry) * 0.12;
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
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
      className="relative flex w-full justify-center lg:mx-auto lg:max-w-sm"
      style={{ perspective: "1100px" }}
    >
      {/* soft accent glow behind the figure */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-10 top-1/4 rounded-[50%] bg-[#5B74FF]/25 blur-3xl"
      />
      <div
        ref={tiltRef}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "bottom center",
          willChange: "transform",
        }}
        className="relative"
      >
        <Image
          src="/nirmala-cutout.png"
          alt="Illustration of Nirmala"
          width={768}
          height={1364}
          priority
          className="h-auto w-full drop-shadow-2xl"
          sizes="(max-width: 1024px) 18rem, 24rem"
        />
      </div>
    </div>
  );
}
