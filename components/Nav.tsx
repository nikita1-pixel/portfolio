"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "work" },
  { href: "#approach", label: "approach" },
  { href: "#stack", label: "stack" },
  { href: "#contact", label: "contact" },
];

function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.getAttribute("data-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (
        (e.key === "t" || e.key === "T") &&
        tag !== "INPUT" &&
        tag !== "TEXTAREA"
      ) {
        toggleTheme();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/75 shadow-sm"
          : "border-b border-transparent bg-paper/30"
      }`}
    >
      <div
        className={`flex w-full items-center justify-between gap-4 px-5 transition-all duration-300 sm:px-8 lg:px-12 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <a
          href="#top"
          className={`flex items-center gap-2.5 font-mono font-semibold transition-all duration-300 ${
            scrolled ? "text-sm" : "text-base sm:text-lg"
          }`}
        >
          <span
            className={`animate-pulse rounded-full bg-live transition-all duration-300 ${
              scrolled ? "h-2 w-2" : "h-2.5 w-2.5"
            }`}
          />
          nirmala.dev
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`hidden rounded-lg font-mono text-ink-soft transition-all duration-300 hover:bg-line-soft hover:text-ink sm:block ${
                scrolled ? "px-3 py-2 text-[13px]" : "px-4 py-2.5 text-sm"
              }`}
            >
              {l.label}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className={`grid place-items-center rounded-lg border border-line bg-surface text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent ${
              scrolled ? "h-9 w-9" : "h-11 w-11"
            }`}
          >
            <svg
              className="icon-moon h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg
              className="icon-sun h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
