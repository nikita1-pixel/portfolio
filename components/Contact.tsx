import Reveal from "@/components/Reveal";
import MaskLine from "@/components/MaskLine";
import CopyEmail from "@/components/CopyEmail";

const socials = [
  { label: "✉  Email", href: "mailto:nikkitachoudhary306@gmail.com" },
  {
    label: "⌥  GitHub",
    href: "https://github.com/nikita1-pixel",
    external: true,
  },
  {
    label: "in  LinkedIn",
    href: "https://www.linkedin.com/in/nirmalachoudharyou/",
    external: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          04 — Let&rsquo;s talk
        </span>
        <h2 className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
          <MaskLine>Got something</MaskLine>
          <MaskLine delay={0.08}>worth building?</MaskLine>
          <MaskLine delay={0.16}>
            <a
              href="mailto:nikkitachoudhary306@gmail.com"
              className="text-accent underline decoration-2 underline-offset-[6px] transition-opacity hover:opacity-80"
            >
              Email me ↗
            </a>
          </MaskLine>
        </h2>

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            Open to full-stack developer roles. If you want someone who turns
            ideas into deployed products and understands every line, let&rsquo;s
            talk.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <CopyEmail email="nikkitachoudhary306@gmail.com" />
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 font-mono text-[13px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
