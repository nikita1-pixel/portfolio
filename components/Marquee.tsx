const items = [
  "React",
  "Node.js",
  "MongoDB",
  "RAG",
  "Next.js",
  "Redis / BullMQ",
  "Vector Search",
  "Express",
  "TypeScript",
  "Groq",
  "Python",
  "Vercel",
];

export default function Marquee() {
  // the list is duplicated so the loop is seamless (track slides exactly one copy width)
  const track = [...items, ...items];

  return (
    <div className="marquee-pause overflow-hidden border-y border-line bg-surface py-5">
      <div className="animate-marquee flex w-max gap-10">
        {track.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-mono text-sm uppercase tracking-wider whitespace-nowrap text-ink-soft"
          >
            {t}
            <span className="text-accent" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
