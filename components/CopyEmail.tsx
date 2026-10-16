"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked (rare) — silently ignore
    }
  }

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 font-mono text-[13px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
    >
      {copied ? "Copied ✓" : "⧉  Copy email"}
    </button>
  );
}
