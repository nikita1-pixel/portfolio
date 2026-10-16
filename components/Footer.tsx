export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="flex w-full flex-wrap items-center justify-between gap-4 px-5 py-8 font-mono text-xs text-ink-faint sm:px-8 lg:px-12">
        <span>
          © 2026 Nirmala Choudhary — built from scratch with Next.js, no
          template.
        </span>
        <span>
          press{" "}
          <kbd className="rounded-md border border-line border-b-2 bg-surface px-1.5 py-0.5 text-ink-soft">
            T
          </kbd>{" "}
          to switch theme
        </span>
      </div>
    </footer>
  );
}
