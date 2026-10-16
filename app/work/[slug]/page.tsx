import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import MaskLine from "@/components/MaskLine";
import { getCaseStudy, allSlugs } from "@/lib/caseStudies";

/* Pre-build one static page per project at build time (fast + SEO-friendly). */
export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

/* Give each case-study page its own browser-tab title + description. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Not found" };
  return { title: `${cs.title} — case study`, description: cs.tagline };
}

/* ---------- small building blocks, local to this page ---------- */

/* A numbered section header like "(01) Problem". */
function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3">
      <span className="font-mono text-sm text-accent">({n})</span>
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
    </div>
  );
}

/* Paragraph stack used by most sections. */
function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-2xl space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="leading-relaxed text-ink-soft">
          {p}
        </p>
      ))}
    </div>
  );
}

/* ---------- the page ---------- */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <main className="w-full px-5 pb-28 pt-28 sm:px-8 sm:pt-32 lg:px-12">
      {/* back link */}
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 font-mono text-sm text-ink-faint transition-colors hover:text-accent"
      >
        <span aria-hidden>←</span> All work
      </Link>

      {/* ---- header ---- */}
      <header className="mt-8 border-b border-line pb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          {cs.category}
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
          <MaskLine>{cs.title}</MaskLine>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {cs.tagline}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-live/40 bg-live/10 px-3 py-1 font-mono text-xs text-live">
          <i className="h-1.5 w-1.5 rounded-full bg-live" />
          {cs.status}
        </span>
      </header>

      {/* ---- hero screenshot ---- */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-paper shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-line-soft bg-surface px-4 py-3">
          <i className="h-2.5 w-2.5 rounded-full bg-line" />
          <i className="h-2.5 w-2.5 rounded-full bg-line" />
          <i className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        <div className="relative aspect-video w-full">
          <Image
            src={cs.image}
            alt={`${cs.title} — product screenshot`}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        </div>
      </div>

      {/* ---- meta rail ---- */}
      <section className="grid gap-6 border-b border-line py-10 sm:grid-cols-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Role
          </div>
          <div className="mt-1.5 text-sm text-ink-soft">{cs.meta.role}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Year
          </div>
          <div className="mt-1.5 text-sm text-ink-soft">{cs.meta.year}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Status
          </div>
          <div className="mt-1.5 text-sm text-ink-soft">{cs.meta.status}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Stack
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {cs.meta.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[10px] text-ink-soft"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---- stat row ---- */}
      <section className="grid grid-cols-2 gap-4 border-b border-line py-10 sm:grid-cols-4">
        {cs.stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-2 text-xs leading-snug text-ink-faint">
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* ---- (01) Problem ---- */}
      <Reveal>
        <section className="border-b border-line py-12">
          <SectionHead n="01" title="Problem" />
          <Prose paragraphs={cs.problem} />
        </section>
      </Reveal>

      {/* ---- (02) Approach ---- */}
      <Reveal>
        <section className="border-b border-line py-12">
          <SectionHead n="02" title="Approach" />
          <Prose paragraphs={cs.approach} />
        </section>
      </Reveal>

      {/* ---- (03) Architecture ---- */}
      <Reveal>
        <section className="border-b border-line py-12">
          <SectionHead n="03" title="Architecture" />
          <div className="flex flex-wrap items-stretch gap-2">
            {cs.architecture.map((node, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="rounded-lg border border-line bg-surface px-3.5 py-2.5 font-mono text-xs text-ink-soft">
                  {node}
                </div>
                {i < cs.architecture.length - 1 && (
                  <span className="font-mono text-accent" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ---- (04) How it works ---- */}
      <Reveal>
        <section className="border-b border-line py-12">
          <SectionHead n="04" title="How it works" />
          <ol className="max-w-2xl space-y-5">
            {cs.lifecycle.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 font-mono text-xs text-accent">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold">{step.title}</div>
                  <p className="mt-1 leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      {/* ---- optional feature blocks ---- */}
      {cs.features && cs.features.length > 0 && (
        <Reveal>
          <section className="border-b border-line py-12">
            <SectionHead n="05" title="In detail" />
            <div className="grid gap-8 sm:grid-cols-2">
              {cs.features.map((f) => (
                <div key={f.heading}>
                  <h3 className="font-semibold">{f.heading}</h3>
                  <ul className="mt-3 space-y-2">
                    {f.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* ---- what I owned / the difference ---- */}
      <Reveal>
        <section className="border-b border-line py-12">
          <SectionHead
            n={cs.features && cs.features.length > 0 ? "06" : "05"}
            title="The difference I made"
          />
          <Prose paragraphs={cs.difference} />
        </section>
      </Reveal>

      {/* ---- outcome ---- */}
      <Reveal>
        <section className="py-12">
          <SectionHead
            n={cs.features && cs.features.length > 0 ? "07" : "06"}
            title="Outcome"
          />
          <Prose paragraphs={cs.outcome} />
          <div className="mt-8 flex flex-wrap gap-4">
            {cs.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-5 py-2.5 font-mono text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                {l.label} <span aria-hidden>{l.external ? "↗" : "→"}</span>
              </a>
            ))}
          </div>
        </section>
      </Reveal>
    </main>
  );
}
