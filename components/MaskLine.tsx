"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

/* a smooth, slightly overshooting ease (cubic-bezier) */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Props = {
  children: ReactNode;
  delay?: number;
  /** true = animate on page load (hero); false = animate when scrolled into view */
  onLoad?: boolean;
  className?: string;
};

/**
 * Wraps one line of text in an overflow-hidden "window" and slides the text
 * up from below it — the classic masked reveal.
 */
export default function MaskLine({
  children,
  delay = 0,
  onLoad = false,
  className = "",
}: Props) {
  const transition: Transition = { duration: 0.8, ease: EASE, delay };

  return (
    <span className={`block overflow-hidden pb-[0.12em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        transition={transition}
        {...(onLoad
          ? { animate: { y: 0 } }
          : {
              whileInView: { y: 0 },
              viewport: { once: true, margin: "-60px" },
            })}
      >
        {children}
      </motion.span>
    </span>
  );
}
