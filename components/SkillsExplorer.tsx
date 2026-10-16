"use client";

import { useState } from "react";
import type { ReactNode, CSSProperties } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiDocker,
  SiGit,
  SiGithub,
  SiVercel,
  SiGithubactions,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiStreamlit,
  SiClaude,
  SiGooglegemini,
  SiJupyter,
  SiPostman,
} from "react-icons/si";
import { LuWebhook, LuSparkles, LuBoxes } from "react-icons/lu";

/* ---------- tiny inline icons ---------- */
function FolderIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
    </svg>
  );
}
function DocIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  );
}

/* ---------- data ---------- */
type Tool = { name: string; icon: ReactNode };
type Item = {
  id: string;
  name: string;
  kind: "folder" | "note";
  info?: string;
  tools?: Tool[];
  text?: string[];
};

const items: Item[] = [
  {
    id: "frontend",
    name: "Frontend",
    kind: "folder",
    info: "Interfaces built in React and shipped with Tailwind.",
    tools: [
      { name: "React", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Framer Motion", icon: <SiFramer /> },
      { name: "Bootstrap", icon: <SiBootstrap /> },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    kind: "folder",
    info: "APIs and server-side logic.",
    tools: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "REST APIs", icon: <LuWebhook /> },
    ],
  },
  {
    id: "databases",
    name: "Databases",
    kind: "folder",
    info: "Relational and document stores, modeled for how the app reads.",
    tools: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "SQLite", icon: <SiSqlite /> },
    ],
  },
  {
    id: "devops",
    name: "DevOps / Cloud",
    kind: "folder",
    info: "Ship it, version it, automate it.",
    tools: [
      { name: "Docker", icon: <SiDocker /> },
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "Vercel", icon: <SiVercel /> },
      { name: "GitHub Actions", icon: <SiGithubactions /> },
    ],
  },
  {
    id: "aiml",
    name: "AI / ML",
    kind: "folder",
    info: "Models, data and retrieval — from training to grounded answers.",
    tools: [
      { name: "scikit-learn", icon: <SiScikitlearn /> },
      { name: "pandas", icon: <SiPandas /> },
      { name: "NumPy", icon: <SiNumpy /> },
      { name: "Streamlit", icon: <SiStreamlit /> },
      { name: "RAG", icon: <LuSparkles /> },
      { name: "Embeddings", icon: <LuBoxes /> },
    ],
  },
  {
    id: "aitools",
    name: "AI / Dev Tools",
    kind: "folder",
    info: "The tools I reach for while building.",
    tools: [
      { name: "Claude Code", icon: <SiClaude /> },
      { name: "Gemini", icon: <SiGooglegemini /> },
      { name: "Jupyter", icon: <SiJupyter /> },
      { name: "Postman", icon: <SiPostman /> },
    ],
  },
  {
    id: "experience",
    name: "Experience",
    kind: "note",
    text: [
      "Barista Trainer — Starbucks India, Pune (Dec 2022 – Jun 2025).",
      "Ran high-volume POS across 100+ transactions a shift with zero cash-handling discrepancies over a 2.5-year tenure, and trained 3+ new team members. It's where I learned to stay accurate under pressure and read what actually drives a business.",
      "Education — BCA, Dr. Vishwanath Karad MIT World Peace University, Pune.",
      "Certifications — Cisco Data Science Essentials with Python (2026) · Deloitte Data Analytics Job Simulation (2026).",
    ],
  },
  {
    id: "highlights",
    name: "Highlights",
    kind: "note",
    text: [
      "• ScribeOS — shipped a live full-stack product with retrieval-augmented search (MongoDB Atlas vector search) and an async BullMQ queue, deployed on Vercel + Render.",
      "• Loan-default model — trained on 1.3M Lending Club loans and raised defaulter recall from 7% to ~60% through cost-based threshold tuning; live Streamlit app with LLM explanations.",
      "• Credit-risk analysis — surfaced $4.06B (21.6% of portfolio) in at-risk capital from 1.3M+ loan records.",
      "• Re-architected a backend from PostgreSQL to MongoDB, re-modeling the data for fast single-query reads.",
    ],
  },
];

/* tile colour for every tool — the logo sits on its own 3D coloured tile,
   so even black/white brands get a dark glossy tile and stay legible in
   both light and dark themes. */
const brandColor: Record<string, string> = {
  React: "#61DAFB",
  "Next.js": "#0A0A0A",
  "Tailwind CSS": "#06B6D4",
  "Framer Motion": "#0055FF",
  Bootstrap: "#7952B3",
  "Node.js": "#5FA04E",
  "Express.js": "#1A1A1A",
  "REST APIs": "#1B3BFF",
  MongoDB: "#47A248",
  MySQL: "#4479A1",
  PostgreSQL: "#4169E1",
  SQLite: "#0A5C88",
  Docker: "#2496ED",
  Git: "#F05032",
  GitHub: "#1A1A1A",
  Vercel: "#0A0A0A",
  "GitHub Actions": "#2088FF",
  "scikit-learn": "#F7931E",
  pandas: "#2A1A6E",
  NumPy: "#4DABCF",
  Streamlit: "#FF4B4B",
  RAG: "#6D5BFF",
  Embeddings: "#1B3BFF",
  "Claude Code": "#D97757",
  Gemini: "#8E75B2",
  Jupyter: "#F37626",
  Postman: "#FF6C37",
};

export default function SkillsExplorer() {
  const [activeId, setActiveId] = useState("frontend");
  const active = items.find((i) => i.id === activeId)!;
  const folders = items.filter((i) => i.kind === "folder");
  const notes = items.filter((i) => i.kind === "note");

  const count =
    active.kind === "folder"
      ? `${active.tools?.length ?? 0} items`
      : "1 document";

  const NavItem = ({ it }: { it: Item }) => (
    <button
      onClick={() => setActiveId(it.id)}
      className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors ${
        activeId === it.id
          ? "bg-accent/15 text-accent"
          : "text-ink-soft hover:bg-line-soft"
      }`}
    >
      {it.kind === "folder" ? (
        <FolderIcon className="shrink-0 text-accent" />
      ) : (
        <DocIcon className="shrink-0 text-ink-faint" />
      )}
      <span className="truncate">{it.name}</span>
    </button>
  );

  return (
    <div className="mx-auto max-w-[1080px] overflow-hidden rounded-xl border border-line bg-surface shadow-2xl">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-line bg-paper px-4 py-2.5">
        <div className="flex items-center gap-2 text-ink-soft">
          <FolderIcon className="text-accent" />
          <span className="font-mono text-xs">Skills — File Explorer</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs text-ink-faint">
          <span aria-hidden>—</span>
          <span aria-hidden>▢</span>
          <span aria-hidden className="transition-colors hover:text-red-500">
            ✕
          </span>
        </div>
      </div>

      {/* address bar / breadcrumb */}
      <div className="flex items-center gap-3 border-b border-line-soft px-4 py-2">
        <span className="font-mono text-sm text-ink-faint" aria-hidden>
          ‹
        </span>
        <span className="font-mono text-sm text-ink-faint" aria-hidden>
          ›
        </span>
        <div className="flex items-center gap-1.5 rounded-md border border-line bg-paper px-3 py-1 font-mono text-[11px] text-ink-soft">
          <span>This PC</span>
          <span className="text-ink-faint">›</span>
          <span>{active.kind === "folder" ? "Skills" : "Notes"}</span>
          <span className="text-ink-faint">›</span>
          <span className="text-ink">{active.name}</span>
        </div>
      </div>

      {/* body */}
      <div className="flex min-h-[340px] flex-col sm:min-h-[520px] sm:flex-row">
        {/* nav pane */}
        <aside className="border-b border-line-soft p-2 sm:w-56 sm:border-b-0 sm:border-r sm:p-3">
          <div className="mb-1 px-2.5 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Skills
          </div>
          <div className="flex flex-col gap-0.5">
            {folders.map((it) => (
              <NavItem key={it.id} it={it} />
            ))}
          </div>
          <div className="mt-4 mb-1 px-2.5 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Notes
          </div>
          <div className="flex flex-col gap-0.5">
            {notes.map((it) => (
              <NavItem key={it.id} it={it} />
            ))}
          </div>
        </aside>

        {/* main pane */}
        <div className="flex-1 p-3 sm:p-6">
          {active.kind === "folder" ? (
            <>
              <p className="mb-3 text-xs text-ink-faint sm:mb-5 sm:text-sm">
                {active.info}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
                {active.tools!.map((t) => {
                  const color = brandColor[t.name] ?? "#1B3BFF";
                  return (
                    <div
                      key={t.name}
                      className="group flex flex-col items-center gap-2.5 rounded-lg p-3 text-center"
                    >
                      <span
                        className="icon3d grid h-11 w-11 place-items-center text-[22px] sm:h-14 sm:w-14 sm:text-[26px]"
                        style={{ "--c": color } as CSSProperties}
                      >
                        {t.icon}
                      </span>
                      <span className="text-xs leading-tight text-ink-soft">
                        {t.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="max-w-xl space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-ink-faint">
                <DocIcon className="text-ink-faint" />
                {active.name}.txt
              </div>
              {active.text!.map((p, i) => (
                <p key={i} className="leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* info panel (desktop) */}
        <aside className="hidden w-60 border-l border-line-soft p-6 lg:block">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-accent/10 text-accent">
            {active.kind === "folder" ? (
              <FolderIcon className="h-8 w-8" />
            ) : (
              <DocIcon className="h-8 w-8" />
            )}
          </div>
          <div className="mt-4 font-semibold">{active.name}</div>
          <div className="mt-1 font-mono text-[11px] text-ink-faint">
            {active.kind === "folder"
              ? `Folder · ${active.tools?.length ?? 0} items`
              : "Text document"}
          </div>
          {active.kind === "folder" && (
            <div className="mt-6 border-t border-line-soft pt-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                Comments
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {active.info}
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* status bar */}
      <div className="flex items-center justify-between border-t border-line-soft bg-paper px-4 py-2 font-mono text-[10px] text-ink-faint">
        <span>{count}</span>
        <span>{folders.length} folders · ready</span>
      </div>
    </div>
  );
}
