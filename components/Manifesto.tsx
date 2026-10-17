import Reveal from "@/components/Reveal";
import PortraitTilt from "@/components/PortraitTilt";

/* ---- copy lives in one place; both layouts reference it ---- */
const eyebrow = (
  <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
    01 — How I work
  </span>
);

const heading = (
  <h2 className="mt-4 max-w-[18ch] text-3xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl">
    I build the whole thing. I don&rsquo;t ship{" "}
    <span className="text-accent">slop</span>.
  </h2>
);

const para1 = (
  <>
    I take an idea and own it end to end — the architecture, the data model, the
    trade-offs and the debugging are mine. I reach for whatever gets it built
    (yes, AI too), but I understand every line that goes to production, because
    I&rsquo;m the one who deployed it, watched it break, and fixed it live.
  </>
);

const para2 = (
  <>
    My bar is simple: if I can&rsquo;t give you a link you can click and use
    right now, it isn&rsquo;t done. Depth over a wall of half-finished repos.
  </>
);

const signature = (
  <div className="mt-8 font-mono text-sm text-ink-faint">
    — Nirmala, full-stack developer
  </div>
);

export default function Manifesto() {
  return (
    <section
      id="approach"
      className="w-full scroll-mt-20 px-5 py-14 sm:px-8 sm:py-24 lg:px-12"
    >
      <Reveal>
        {/* ===== DESKTOP / laptop (≥1024px): LOCKED two-column layout ===== */}
        <div className="hidden lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-14">
          <div>
            {eyebrow}
            {heading}
            <p className="mt-7 max-w-[54ch] text-base leading-relaxed text-ink-soft sm:text-lg">
              {para1}
            </p>
            <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-ink-soft sm:text-lg">
              {para2}
            </p>
            {signature}
          </div>
          <div className="lg:max-w-none">
            <PortraitTilt />
          </div>
        </div>

        {/* ===== MOBILE (<1024px): magazine layout — text wraps around the figure ===== */}
        <div className="lg:hidden">
          {eyebrow}
          {heading}
          {/* the character floats; the paragraphs below flow around it */}
          <div className="float-right ml-4 mb-2 mt-4 w-36 sm:ml-6 sm:w-52">
            <PortraitTilt />
          </div>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {para1}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            {para2}
          </p>
          {/* clear the float so the signature sits on its own line */}
          <div className="clear-both">{signature}</div>
        </div>
      </Reveal>
    </section>
  );
}
