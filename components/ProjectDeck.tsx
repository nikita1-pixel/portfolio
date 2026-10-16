"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* the compact shape each deck card needs */
export type DeckCard = {
  flag: string; // "Idea → shipped product · <subtitle>" — subtitle = text after the ·
  title: string;
  blurb: string;
  image: string; // /public screenshot
  ratio: number; // the screenshot's real width/height, so the frame never letterboxes
  url: string; // fake browser-bar url
  tags: string[];
  caseStudy?: string; // slug → /work/<slug>
};

function subtitleOf(flag: string) {
  const parts = flag.split("·");
  return parts[parts.length - 1].trim();
}

/* directional slide: next → card leaves up & enters from below; prev → reverse */
const slide = {
  enter: (d: number) => ({ y: d > 0 ? 64 : -64, scale: 0.96, opacity: 0 }),
  center: { y: 0, scale: 1, opacity: 1 },
  exit: (d: number) => ({ y: d > 0 ? -90 : 90, scale: 0.98, opacity: 0 }),
};

/* ----- one card = the screenshot itself (no chrome); fills its box, no letterbox ----- */
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
        sizes="(max-width: 768px) 92vw, 1100px"
        priority={interactive}
      />
      {interactive && (
        <Link
          href={href}
          className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-sm font-semibold text-black shadow-lg transition-transform duration-300 group-hover:scale-105">
            View details <span aria-hidden>→</span>
          </span>
        </Link>
      )}
    </div>
  );
}

/* ----- button-driven deck ----- */
export default function ProjectDeck({ cards }: { cards: DeckCard[] }) {
  const n = cards.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d: 1 | -1) => {
    setDir(d);
    setIndex((i) => (i + d + n) % n);
  };
  const jump = (i: number) => {
    setDir(i > index ? 1 : -1);
    setIndex(i);
  };

  const active = cards[index];
  const peek1 = cards[(index + 1) % n];
  const peek2 = cards[(index + 2) % n];
  const activeHref = active.caseStudy ? `/work/${active.caseStudy}` : "#contact";

  return (
    <div className="mx-auto w-[min(92vw,1000px)]">
      {/* the stack — height follows the active screenshot's real ratio (no crop) */}
      <div className="relative" style={{ aspectRatio: active.ratio }}>
        {/* deepest peek (behind + above) */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ transform: "translateY(-26px) scale(0.93)", opacity: 0.5 }}
        >
          <CardFace card={peek2} interactive={false} />
        </div>
        {/* first peek */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ transform: "translateY(-13px) scale(0.965)", opacity: 0.8 }}
        >
          <CardFace card={peek1} interactive={false} />
        </div>
        {/* active card */}
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <CardFace card={active} interactive />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* caption — (0N) · title / subtitle · © year */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="font-mono text-sm text-ink-faint tabular-nums">
          ({String(index + 1).padStart(2, "0")})
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="min-w-0 text-center"
          >
            <Link
              href={activeHref}
              className="block truncate text-base font-bold tracking-tight transition-colors hover:text-accent sm:text-lg"
            >
              {active.title}
            </Link>
            <div className="truncate font-mono text-xs text-ink-faint">
              {subtitleOf(active.flag)}
            </div>
          </motion.div>
        </AnimatePresence>
        <span className="font-mono text-sm text-ink-faint">© 2026</span>
      </div>

      {/* controls */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {cards.map((c, i) => (
            <button
              key={c.title}
              onClick={() => jump(i)}
              aria-label={`Go to ${c.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-accent" : "w-1.5 bg-line hover:bg-ink-faint"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="pulse-btn grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink hover:border-accent"
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            onClick={() => go(1)}
            className="pulse-btn inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-sm font-semibold text-accent-ink"
          >
            Next <span aria-hidden>›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
