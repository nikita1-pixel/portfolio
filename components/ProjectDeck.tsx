"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* the compact shape each deck card needs */
export type DeckCard = {
  flag: string; // "Idea → shipped product · <subtitle>" — subtitle is taken after the ·
  title: string;
  blurb: string; // kept in data (used elsewhere); not shown on the slim deck
  image: string; // /public screenshot
  ratio: number; // the screenshot's real width/height, so the frame never letterboxes
  url: string; // (kept in data; not shown now that the frame is bare)
  tags: string[];
  caseStudy?: string; // slug → /work/<slug>
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

function subtitleOf(flag: string) {
  const parts = flag.split("·");
  return parts[parts.length - 1].trim();
}

/* ----- the bare screenshot (no chrome); fills its box, no letterbox ----- */
function CardFace({
  card,
  interactive,
}: {
  card: DeckCard;
  interactive: boolean;
}) {
  const href = card.caseStudy ? `/work/${card.caseStudy}` : "#contact";
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
      <Image
        src={card.image}
        alt={`${card.title} — screenshot`}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 1200px"
        priority={interactive}
      />
      {interactive && (
        <Link
          href={href}
          className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-mono text-sm font-semibold text-black shadow-lg transition-transform duration-300 group-hover:scale-105">
            View details <span aria-hidden>→</span>
          </span>
        </Link>
      )}
    </div>
  );
}

/* ----- one layer in the stack; its transform is driven CONTINUOUSLY by scroll ----- */
function CardLayer({
  card,
  i,
  n,
  front, // smoothed "front index" as a motion value (0 … n-1)
  interactive,
}: {
  card: DeckCard;
  i: number;
  n: number;
  front: MotionValue<number>;
  interactive: boolean;
}) {
  // d = how far this card is from the front right now (0 = front, >0 = waiting behind, <0 = leaving up)
  const d = useTransform(front, (f) => i - f);

  // leaving (d<0): rise up and out; waiting (d>=0): peek above, scaled + faded
  const y = useTransform(d, (v) =>
    v < 0 ? v * 820 : -Math.min(v, 3) * 30,
  );
  const scale = useTransform(d, (v) =>
    v < 0 ? 1 : 1 - Math.min(v, 3) * 0.06,
  );
  const opacity = useTransform(d, (v) => {
    if (v < 0) return clamp(1 + v * 1.6, 0, 1); // fade as it leaves
    return v <= 3 ? Math.max(0.28, 1 - v * 0.22) : 0; // keep the stack visible
  });
  const rotate = useTransform(d, (v) => (v < 0 ? v * 3 : 0));
  const zIndex = useTransform(d, (v) =>
    v < 0 ? 60 - Math.round(v * 10) : Math.round(50 - v * 10),
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ y, scale, opacity, rotate, zIndex }}
    >
      <CardFace card={card} interactive={interactive} />
    </motion.div>
  );
}

/* ----- the scroll-driven deck ----- */
export default function ProjectDeck({ cards }: { cards: DeckCard[] }) {
  const n = cards.length;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // spring-smooth the raw scroll so motion is gentle, never jumpy
  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.4,
  });

  // continuous "front index" 0 … n-1
  const front = useTransform(smooth, (p) => p * (n - 1));

  // blended aspect ratio → the focused card never letterboxes or crops
  const ratio = useTransform(smooth, (p) => {
    const f = clamp(p * (n - 1), 0, n - 1);
    const i = Math.floor(f);
    const j = Math.min(n - 1, i + 1);
    const t = f - i;
    return cards[i].ratio * (1 - t) + cards[j].ratio * t;
  });

  // discrete current index (for the caption, dots, and which card is hoverable)
  useMotionValueEvent(front, "change", (f) => {
    const i = clamp(Math.round(f), 0, n - 1);
    setCurrent((prev) => (prev === i ? prev : i));
  });

  const active = cards[current];

  return (
    // tall wrapper → lots of scroll distance per card = slow, visible transitions
    <div ref={wrapRef} className="relative" style={{ height: `${n * 135}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-6">
        {/* desktop frame; height tracks the blended screenshot ratio */}
        <motion.div
          className="relative w-[min(92vw,1120px)]"
          style={{ aspectRatio: ratio }}
        >
          {cards.map((c, i) => (
            <CardLayer
              key={c.title}
              card={c}
              i={i}
              n={n}
              front={front}
              interactive={i === current}
            />
          ))}
        </motion.div>

        {/* caption — (0N) · title / subtitle · © year */}
        <div className="z-[70] flex w-[min(92vw,1120px)] items-center justify-between gap-4">
          <span className="font-mono text-sm text-ink-faint tabular-nums">
            ({String(current + 1).padStart(2, "0")})
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="text-lg font-bold tracking-tight sm:text-xl">
                {active.title}
              </div>
              <div className="font-mono text-xs text-ink-faint">
                {subtitleOf(active.flag)}
              </div>
            </motion.div>
          </AnimatePresence>

          <span className="font-mono text-sm text-ink-faint">© 2026</span>
        </div>

        {/* progress dots + scroll hint */}
        <div className="z-[70] flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {cards.map((c, i) => (
              <span
                key={c.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-accent" : "w-1.5 bg-line"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[11px] text-ink-faint">
            {current < n - 1 ? "scroll ↓" : "end"}
          </span>
        </div>
      </div>
    </div>
  );
}
