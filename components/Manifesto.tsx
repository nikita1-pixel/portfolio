import Reveal from "@/components/Reveal";

export default function Manifesto() {
  return (
    <section
      id="approach"
      className="w-full scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16 lg:px-12"
    >
      <Reveal>
        <div className="rounded-[28px] bg-[#101218] px-8 py-14 text-[#F3F3F5] sm:px-16 sm:py-20">
          <span className="font-mono text-xs uppercase tracking-widest text-white/50">
            02 — How I work
          </span>
          <h2 className="mt-4 max-w-[18ch] text-3xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl">
            I build the whole thing. I don&rsquo;t ship{" "}
            <span className="text-[#5B74FF]">slop</span>.
          </h2>
          <p className="mt-7 max-w-[54ch] text-base leading-relaxed text-white/70 sm:text-lg">
            I take an idea and own it end to end — the architecture, the data
            model, the trade-offs and the debugging are mine. I reach for
            whatever gets it built (yes, AI too), but I understand every line
            that goes to production, because I&rsquo;m the one who deployed it,
            watched it break, and fixed it live.
          </p>
          <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-white/70 sm:text-lg">
            My bar is simple: if I can&rsquo;t give you a link you can click and
            use right now, it isn&rsquo;t done. Depth over a wall of
            half-finished repos.
          </p>
          <div className="mt-8 font-mono text-sm text-white/55">
            — Nirmala, full-stack developer
          </div>
        </div>
      </Reveal>
    </section>
  );
}
