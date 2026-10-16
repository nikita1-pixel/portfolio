import Reveal from "@/components/Reveal";
import MaskLine from "@/components/MaskLine";

type Line = { dir?: string; prefix?: string; k?: string; v?: string };

const lines: Line[] = [
  { dir: "├─ languages/" },
  { prefix: "│  ├─ ", k: "javascript", v: "   es2023, async" },
  { prefix: "│  ├─ ", k: "python", v: "       data, scripting, ml" },
  { prefix: "│  └─ ", k: "sql", v: "          joins, aggregation" },
  { dir: "├─ frontend/" },
  { prefix: "│  ├─ ", k: "react", v: "        hooks, router" },
  { prefix: "│  └─ ", k: "next.js", v: "      app router, ssr" },
  { dir: "├─ backend/" },
  { prefix: "│  ├─ ", k: "node + express", v: " rest apis, jwt" },
  { prefix: "│  └─ ", k: "redis / bullmq", v: " async workers" },
  { dir: "├─ ai-tooling/ (used in builds)" },
  { prefix: "│  ├─ ", k: "rag", v: "          retrieval + grounding" },
  { prefix: "│  ├─ ", k: "vector-search", v: " embeddings, cosine" },
  { prefix: "│  └─ ", k: "llm-apis", v: "     groq, gemini, claude" },
  { dir: "└─ data + infra/" },
  { prefix: "   ├─ ", k: "mongodb", v: "      atlas + vector index" },
  { prefix: "   ├─ ", k: "pandas", v: "       cleaning, analysis" },
  { prefix: "   └─ ", k: "deploy", v: "       vercel, render, git" },
];

export default function Skills() {
  return (
    <section
      id="stack"
      className="w-full scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            03 — The toolkit
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
            <MaskLine>What I build with.</MaskLine>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-sm leading-relaxed text-ink-soft">
              Honest list — only things I&rsquo;ve actually used to ship
              something real. No buzzword padding.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
            <div className="flex items-center gap-2 border-b border-line-soft px-4 py-2.5 font-mono text-xs text-ink-faint">
              <span className="flex gap-1.5" aria-hidden>
                <i className="h-2.5 w-2.5 rounded-full bg-line" />
                <i className="h-2.5 w-2.5 rounded-full bg-line" />
                <i className="h-2.5 w-2.5 rounded-full bg-line" />
              </span>
              ~/nirmala/skills — tree
            </div>
            <div className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
              {lines.map((ln, i) => (
                <div key={i} className="whitespace-pre">
                  {ln.dir ? (
                    <span className="font-semibold text-accent">{ln.dir}</span>
                  ) : (
                    <>
                      <span className="text-ink-faint">{ln.prefix}</span>
                      <span className="text-ink">{ln.k}</span>
                      <span className="text-ink-soft">{ln.v}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
