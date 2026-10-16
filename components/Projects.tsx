import MaskLine from "@/components/MaskLine";
import ProjectDeck, { type DeckCard } from "@/components/ProjectDeck";

/* ---------- the deck: image-forward, minimal info, links to the case study ---------- */
const deck: DeckCard[] = [
  {
    flag: "Idea → shipped product · feedback intelligence",
    title: "ScribeOS",
    blurb: "Customer feedback, read and answered for you — with cited sources.",
    image: "/scribeos.png",
    ratio: 1.78,
    url: "scribeos-five.vercel.app",
    tags: ["React", "Node", "MongoDB", "RAG"],
    caseStudy: "scribeos",
  },
  {
    flag: "Idea → shipped product · trekking community",
    title: "Trekus",
    blurb:
      "A weekend-escape trekking community for the Sahyadris — discover treks, check live weather, book a spot, review, and ask an AI trail guide.",
    image: "/trekus.png",
    ratio: 1.93,
    url: "www.trekus.co",
    tags: ["React", "TypeScript", "Supabase", "Gemini"],
    caseStudy: "trekking-platform",
  },
  {
    flag: "Idea → shipped product · civic reporting",
    title: "City Issues Dashboard",
    blurb:
      "Residents report civic issues; a team triages them live with role-based access.",
    image: "/govdash.png",
    ratio: 1.86,
    url: "dashboard — issues overview",
    tags: ["React", "Node", "MongoDB", "JWT"],
    caseStudy: "city-dashboard",
  },
  {
    flag: "Idea → shipped product · loan risk, explained",
    title: "Loan Default Risk Predictor",
    blurb:
      "A model scores a loan's default risk and explains why in plain English.",
    image: "/loan.png",
    ratio: 1.71,
    url: "loan-default-risk-predictor",
    tags: ["Python", "scikit-learn", "Streamlit"],
    caseStudy: "loan-risk-predictor",
  },
];

/* ---------- the section ---------- */
export default function Projects() {
  return (
    <section
      id="work"
      className="w-full scroll-mt-20 px-5 py-8 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 sm:mb-12">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            02 — Selected work
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
            <MaskLine>Things I shipped.</MaskLine>
          </h2>
        </div>
        <span className="font-mono text-sm text-ink-faint">
          {deck.length} builds · tap through →
        </span>
      </div>

      <ProjectDeck cards={deck} />
    </section>
  );
}
