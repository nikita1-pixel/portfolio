"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import MaskLine from "@/components/MaskLine";
import CountUp from "@/components/CountUp";
import Magnetic from "@/components/Magnetic";

/* the parent orchestrates its children: each child starts 0.09s after the last */
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/* every animated child uses this: start 22px down + invisible, settle into place */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Hero() {
  // starts null so server + first browser render agree (hydration-safe)
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        }),
      );
    tick(); // set immediately on mount
    const id = setInterval(tick, 1000); // then every second
    return () => clearInterval(id); // cleanup when the component leaves
  }, []);

  return (
    <motion.header
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full px-5 pt-28 pb-16 sm:px-8 sm:pt-36 lg:px-12"
    >
      {/* eyebrow + live clock row */}
      <motion.div
        variants={fadeUp}
        className="mb-8 flex flex-wrap items-baseline justify-between gap-4"
      >
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
          <span className="h-2 w-2 animate-pulse rounded-full bg-live" />
          Pune, India — full-stack developer, open to roles
        </span>
        <span className="font-mono text-xs tracking-wider text-ink-faint tabular-nums">
          {time ? `${time} IST` : "--:--:-- IST"}
        </span>
      </motion.div>

      {/* headline — masked slide-up reveal, line by line */}
      <h1 className="text-5xl font-extrabold leading-[0.96] tracking-tight sm:text-7xl lg:text-8xl">
        <MaskLine onLoad delay={0.15}>
          From idea to
        </MaskLine>
        <MaskLine onLoad delay={0.28}>
          <span className="text-accent">clickable product</span>.
        </MaskLine>
      </h1>

      {/* subline */}
      <motion.p
        variants={fadeUp}
        className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl"
      >
        Full-stack developer who takes an idea all the way to something you can
        open and use —{" "}
        <b className="font-semibold text-ink">React, Node &amp; databases</b>, and
        whatever else the idea needs.{" "}
        <b className="font-semibold text-ink">Deployed, not demoed.</b>
      </motion.p>

      {/* CTA buttons — magnetic pull toward the cursor */}
      <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
        <Magnetic>
          <a
            href="https://scribeos-five.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-mono text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            See a live build <span aria-hidden>↗</span>
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-xl border border-line px-6 py-3.5 font-mono text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            See the work
          </a>
        </Magnetic>
      </motion.div>

      {/* system status strip */}
      <motion.div
        variants={fadeUp}
        className="mt-16 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm"
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3 font-mono text-xs text-ink-faint">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2.5 w-2.5 rounded-full bg-line" />
            <i className="h-2.5 w-2.5 rounded-full bg-line" />
            <i className="h-2.5 w-2.5 rounded-full bg-line" />
          </span>
          ~/status — last deploy: green
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5 border-b border-line-soft p-5 sm:border-r sm:border-b-0">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              Flagship
            </span>
            <span className="text-2xl font-extrabold tracking-tight">
              ScribeOS
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-live">
              <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
              live in production
            </span>
          </div>
          <div className="flex flex-col gap-1.5 border-b border-line-soft p-5 sm:border-r sm:border-b-0">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              Shipped builds
            </span>
            <span className="text-2xl font-extrabold tracking-tight">
              <CountUp to={4} suffix="+" />
            </span>
            <span className="font-mono text-xs text-ink-faint">
              full-stack · deployed
            </span>
          </div>
          <div className="flex flex-col gap-1.5 p-5">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              Core stack
            </span>
            <span className="text-2xl font-extrabold tracking-tight">
              Full-stack
            </span>
            <span className="font-mono text-xs text-ink-faint">
              React · Node · Python
            </span>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
