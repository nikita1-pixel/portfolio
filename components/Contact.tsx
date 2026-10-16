"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import MaskLine from "@/components/MaskLine";

const EMAIL = "nirmalachoudharyu@gmail.com";

export default function Contact() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // clicking the envelope toggles it — but if it's open, clicks inside the
  // letter should work normally (links, copy) instead of re-sealing it.
  const onWrapClick = (e: React.MouseEvent) => {
    if (open && (e.target as HTMLElement).closest(".env-letter")) return;
    setOpen((o) => !o);
  };

  const onCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section
      id="contact"
      className="flex min-h-[100svh] w-full scroll-mt-20 flex-col items-center justify-center px-5 py-8 sm:px-8 lg:px-12"
    >
      <div className="mb-2 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          04 — Get in touch
        </span>
        <h2 className="mt-3 text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
          <MaskLine>Let&rsquo;s build something.</MaskLine>
        </h2>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Open to full-stack / web developer roles and interesting projects.
            Fastest way to reach me is email or LinkedIn.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="env-stage">
          <p className="env-hint">
            <span className="dot" />
            {open
              ? "Click the envelope to seal it again"
              : "Click the envelope to unseal a note"}
          </p>

          <div
            className={`envelope-wrap${open ? " open" : ""}`}
            role="button"
            tabIndex={0}
            aria-label="Open the letter"
            onClick={onWrapClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen((o) => !o);
              }
            }}
          >
            <div className="envelope">
              <div className="env-back" />

              <div className="env-letter">
                <div className="env-lhead">
                  <span>✦ DISPATCH // 2026</span>
                  <span>STATUS: OPEN</span>
                </div>
                <div>
                  <h4>Hey there, let&rsquo;s connect.</h4>
                  <p>
                    I build full-stack apps end to end — JavaScript, React, Node
                    and SQL. Early in my career and serious about shipping real,
                    working products. Open to full-stack / web developer roles.
                  </p>
                  <div className="env-links">
                    <a href={`mailto:${EMAIL}`}>✉ Email</a>
                    <a
                      href="https://www.linkedin.com/in/nirmalachoudharyou/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/nikita1-pixel"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
                <div className="env-lfoot">
                  <button
                    className={`pulse-btn env-btn copy${copied ? " done" : ""}`}
                    type="button"
                    onClick={onCopy}
                  >
                    📋{" "}
                    <span className="env-copy-label">
                      {copied ? "Copied!" : "Copy email"}
                    </span>
                  </button>
                  <a
                    className="pulse-btn env-btn compose"
                    href={`mailto:${EMAIL}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Compose ↗
                  </a>
                </div>
              </div>

              <div className="env-pocket">
                <span className="pk pk-left" />
                <span className="pk pk-right" />
                <span className="pk pk-bottom" />
              </div>
              <div className="env-flap" />
              <div className="env-seal">✦</div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
