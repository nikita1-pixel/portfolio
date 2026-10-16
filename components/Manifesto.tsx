import Reveal from "@/components/Reveal";
import PortraitTilt from "@/components/PortraitTilt";

export default function Manifesto() {
  return (
    <section
      id="approach"
      className="w-full scroll-mt-20 px-5 py-14 sm:px-8 sm:py-32 lg:px-12"
    >
      <Reveal>
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            01 — How I work
          </span>
          <h2 className="mt-2 text-2xl font-extrabold leading-[1.05] tracking-tight text-balance sm:mt-3 sm:text-5xl">
            Fresher, yes. But I know what{" "}
            <span className="text-accent">matters.</span>
          </h2>

          {/* character floats right — the paragraphs wrap beside it, then run
              full width again once the text passes the figure */}
          <div className="float-right mb-2 ml-5 w-36 sm:ml-8 sm:w-56 lg:w-72">
            <PortraitTilt />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:mt-7 sm:text-lg">
            I&rsquo;m early in my career, so I won&rsquo;t pretend I&rsquo;ve
            seen it all. What I bring is judgment about what actually matters:
            get the data model right, keep the user flow simple, and ship
            something real instead of polishing a demo. I&rsquo;ll take the
            boring, reliable option over the clever one.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
            My approach is build-to-learn — take an idea, cut it down to the
            smallest version that works, get it running end to end, then make it
            better. I read the docs, debug patiently, and understand every line
            I ship, because I&rsquo;m the one who deployed it and fixed it when
            it broke.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
            The bar stays the same: if I can&rsquo;t hand you a link you can
            open and use, it isn&rsquo;t done.
          </p>
          <div className="mt-5 font-mono text-xs text-ink-faint sm:mt-8 sm:text-sm">
            — Nirmala, full-stack developer
          </div>
        </div>
      </Reveal>
    </section>
  );
}
