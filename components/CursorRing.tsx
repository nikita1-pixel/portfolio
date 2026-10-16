"use client";

import { useEffect, useRef } from "react";

/* interactive elements always grow the cursor, even icon-only ones */
const INTERACTIVE =
  'a, button, input, textarea, select, label, summary, [role="button"], .cursor-grow';

/* true only when the point sits INSIDE a rendered character's box
   (letters/numbers) — not merely near the nearest text node. */
function overText(x: number, y: number) {
  const d = document as unknown as {
    caretPositionFromPoint?: (
      x: number,
      y: number,
    ) => { offsetNode: Node; offset: number } | null;
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
  };

  let node: Node | null = null;
  let offset = 0;
  if (typeof d.caretPositionFromPoint === "function") {
    const p = d.caretPositionFromPoint(x, y);
    if (p) {
      node = p.offsetNode;
      offset = p.offset;
    }
  } else if (typeof d.caretRangeFromPoint === "function") {
    const r = d.caretRangeFromPoint(x, y);
    if (r) {
      node = r.startContainer;
      offset = r.startOffset;
    }
  }

  const text = node?.textContent ?? "";
  if (!node || node.nodeType !== 3 || !text.trim()) return false;

  // measure the character nearest the caret and test if the point is in it
  const len = text.length;
  const start = Math.max(0, Math.min(offset, len - 1));
  const range = document.createRange();
  range.setStart(node, start);
  range.setEnd(node, Math.min(start + 1, len));
  const pad = 2;
  for (const r of Array.from(range.getClientRects())) {
    if (
      x >= r.left - pad &&
      x <= r.right + pad &&
      y >= r.top - pad &&
      y <= r.bottom + pad
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Custom cursor: a small filled dot that follows the pointer, growing into a
 * larger hollow ring when hovering interactive elements OR actual text
 * (letters/numbers). Mouse devices only; touch keeps the native cursor.
 */
export default function CursorRing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      const c = ref.current;
      if (!c) return;
      c.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      c.style.opacity = "1";
      const t = e.target as HTMLElement | null;
      const grow =
        (t && t.closest(INTERACTIVE)) || overText(e.clientX, e.clientY);
      if (grow) c.classList.add("grow");
      else c.classList.remove("grow");
    };
    const hide = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="cursor-ring" style={{ opacity: 0 }} />
  );
}
