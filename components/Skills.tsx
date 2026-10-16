import Reveal from "@/components/Reveal";
import MaskLine from "@/components/MaskLine";
import SkillsExplorer from "@/components/SkillsExplorer";

export default function Skills() {
  return (
    <section
      id="stack"
      className="w-full scroll-mt-20 px-3 py-8 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mb-8 max-w-xl sm:mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          03 — The toolkit
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
          <MaskLine>What I build with.</MaskLine>
        </h2>
        <Reveal delay={0.15}>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Open a folder. Everything in here comes from a project I actually
            shipped — no buzzword padding.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <SkillsExplorer />
      </Reveal>
    </section>
  );
}
