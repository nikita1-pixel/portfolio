/* ---------------------------------------------------------------------------
 * caseStudies.ts — the CONTENT for every project case study, in one place.
 *
 * Why separate from the page? The page is the *layout* (how a case study looks);
 * this file is the *story* (what each project actually says). Keeping them apart
 * means you edit words here without touching JSX, and every project renders in
 * the exact same anatomy automatically.
 *
 * The anatomy mirrors a strong case-study page:
 *   header (category · title · tagline · status) → meta rail → stat row →
 *   (01) Problem → (02) Approach → (03) Architecture → (04) How it works →
 *   (05) What I owned (the difference) → (06) Outcome
 * ------------------------------------------------------------------------- */

export type Stat = { value: string; label: string };
export type Step = { title: string; body: string };
export type FeatureBlock = { heading: string; items: string[] };

export type CaseStudy = {
  slug: string; // the URL: /work/<slug>
  category: string; // eyebrow, e.g. "AI/ML · Full-stack · Solo build"
  title: string;
  tagline: string; // one line under the title
  status: string; // the chip, e.g. "Live & deployed"
  image: string; // hero screenshot in /public, e.g. "/scribeos.png"
  meta: { role: string; year: string; status: string; stack: string[] };
  stats: Stat[]; // the big numbers at the top (keep them TRUE)
  problem: string[]; // paragraphs
  approach: string[];
  architecture: string[]; // the pipeline, left→right node labels
  lifecycle: Step[]; // numbered "how it works" steps
  features?: FeatureBlock[]; // optional extra feature breakdowns
  difference: string[]; // "the difference I make" — your engineering decisions
  outcome: string[];
  links: { label: string; href: string; external?: boolean }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "scribeos",
    category: "An idea I shipped · Full-stack product · Solo build",
    title: "ScribeOS",
    tagline:
      "A customer-feedback platform that reads your data for you — from raw comment to a plain-English answer with cited sources.",
    status: "Live & deployed",
    image: "/scribeos.png",
    meta: {
      role: "Design and engineering — solo",
      year: "2026",
      status: "Live in production",
      stack: [
        "React",
        "Node / Express",
        "MongoDB Atlas + Vector Search",
        "Redis / BullMQ",
        "Groq (Llama)",
        "Gemini embeddings",
        "RAG",
        "Socket-free polling",
        "Vercel + Render",
      ],
    },
    stats: [
      { value: "768-dim", label: "embedding per comment" },
      { value: "Top 5", label: "sources cited per answer" },
      { value: "2 LLMs", label: "behind one provider swap" },
      { value: "0 blocked", label: "UI waits — AI runs in a queue" },
    ],
    problem: [
      "A growing product drowns in feedback — support tickets, reviews, in-app messages. The signal is in there: what are people unhappy about, what keeps coming up, what changed after the last release. But reading it by hand doesn't scale, and keyword search misses anything phrased differently from the search box.",
      "The minutes a team spends triaging and the themes they never spot are exactly the cost that compounds. The question isn't \"show me messages containing the word slow\" — it's \"what are customers actually unhappy about,\" and that needs meaning, not string matching.",
    ],
    approach: [
      "Treat every piece of feedback as something to be understood, not just stored. The moment a comment arrives it's queued for an async worker that scores sentiment, extracts themes and tags, and computes a vector embedding — so the slow AI work never blocks the person submitting.",
      "Then the payoff: an \"Ask your data\" panel takes a plain-English question, embeds it, and runs semantic search over every comment to retrieve the closest matches. The language model answers using only those retrieved sources — and the answer ships with the sources and their match scores, so it can be trusted and checked rather than taken on faith.",
    ],
    architecture: [
      "Feedback in (API / UI)",
      "Express API",
      "Redis / BullMQ queue",
      "Worker: sentiment + tags + embedding",
      "MongoDB Atlas + Vector Search",
      "RAG: retrieve top-5 → LLM",
      "Answer + cited sources",
    ],
    lifecycle: [
      {
        title: "Feedback captured",
        body: "A comment arrives via the API or the dashboard and is stored immediately, so there's a durable record before any AI touches it.",
      },
      {
        title: "Queued, not blocked",
        body: "The analysis job is pushed onto a Redis/BullMQ queue and the user gets an instant response. The expensive AI work happens in the background.",
      },
      {
        title: "Worker analyses",
        body: "A separate worker scores sentiment, extracts themes/tags, and generates a 768-dimension embedding for the comment — then writes it all back.",
      },
      {
        title: "Indexed for meaning",
        body: "The embedding lands in a MongoDB Atlas Vector Search index (cosine, bring-your-own-vectors), so the comment is now findable by meaning, not keywords.",
      },
      {
        title: "Ask in plain English",
        body: "A question is embedded the same way and run through a $vectorSearch aggregation that returns the five closest comments with a similarity score each.",
      },
      {
        title: "Grounded answer",
        body: "Those five sources become the only context the LLM is allowed to use. It answers the question and the UI shows the answer alongside each source and its match score.",
      },
    ],
    features: [
      {
        heading: "The RAG answer panel",
        items: [
          "Plain-English question box — no query syntax, no filters to learn.",
          "Answer grounded strictly in retrieved feedback, with an anti-hallucination system prompt.",
          "Every answer cites its sources as cards, each with a similarity match score (e.g. 83.4%).",
          "If nothing relevant is found, it says so rather than inventing an answer.",
        ],
      },
      {
        heading: "The workspace",
        items: [
          "JWT auth with register / login; each account sees only its own feedback.",
          "A read-only guest demo seeded with realistic analysed feedback, so a recruiter can try the product without signing up.",
          "Live dashboard: sentiment breakdown, tags, and status for every incoming comment.",
        ],
      },
    ],
    difference: [
      "The hard part was answering fuzzy questions, which keyword search can't do. My fix was to embed every comment and run Atlas vector search, then ground the LLM in only the retrieved sources — with match scores shown — so the answer is checkable and can't drift into hallucination.",
      "I kept the UI instant by moving the slow AI into a Redis/BullMQ queue, so submitting feedback never waits on a model call. And when Gemini's free tier capped generation at 20 calls a day, I split generation to Groq behind a single provider-agnostic service — swapping models became a one-file change, not a rewrite.",
      "I deployed the whole stack on free tiers (Vercel + Render + Atlas + Upstash Redis) and ran the API and worker together with concurrently, an honest trade-off I can defend: separate processes locally, combined for a zero-cost public demo.",
    ],
    outcome: [
      "Shipped end-to-end and live in production — a recruiter can open the URL, use the read-only demo, and watch a question return a grounded, source-cited answer.",
      "It's my proof project: not a tutorial clone but a real retrieval-augmented product with an async pipeline, vector search and a defensible architecture behind every choice.",
    ],
    links: [
      { label: "Live demo", href: "https://scribeos-five.vercel.app", external: true },
      { label: "Source", href: "https://github.com/nikita1-pixel/scribeos", external: true },
    ],
  },

  {
    slug: "loan-risk-predictor",
    category: "An idea I shipped · Data product · Solo build",
    title: "Loan Default Risk Predictor",
    tagline:
      "Enter a loan's details — a model trained on 1.3M real loans scores its default risk, and AI explains why in plain English.",
    status: "Deployed demo",
    image: "/loan.png",
    meta: {
      role: "Built it end to end — data, model, app",
      year: "2026",
      status: "Deployed (educational demo)",
      stack: [
        "Python",
        "pandas",
        "scikit-learn",
        "Logistic Regression",
        "Streamlit",
        "LLM explanation",
      ],
    },
    stats: [
      { value: "1.3M", label: "real Lending Club loans trained on" },
      { value: "~60%", label: "of real defaults caught at the chosen threshold" },
      { value: "20%", label: "flag threshold — tuned for recall over precision" },
      { value: "8 inputs", label: "drive every risk assessment" },
    ],
    problem: [
      "This is the second half of a two-part loan-risk project. Part one was a data-analyst dashboard that explored a large lending dataset to understand who defaults and why — the patterns in interest rate, grade, income and utilisation. This part turns those findings into something operational: a model that scores and explains a single loan.",
      "When a lender approves a loan, the two mistakes are not equal. Rejecting someone who would have repaid costs a little lost business; approving someone who then defaults costs the whole loan. A useful risk model has to respect that asymmetry — and a credit score on its own doesn't explain itself to the person reading it.",
      "So the real task isn't just 'predict default.' It's: predict it in a way that catches the expensive mistakes, and explain the reasoning clearly enough that a human can trust or challenge it.",
    ],
    approach: [
      "Train a logistic regression on 1.3 million historical loans using the features that actually drive risk — interest rate, loan amount, term, revolving utilisation, debt-to-income, open accounts, income and credit grade.",
      "Then the key decision: don't chase raw accuracy. On data where most loans are repaid, a model that predicts 'never defaults' looks ~85% accurate and is useless. Instead I tune the decision threshold so the model catches roughly 60% of real defaults, deliberately accepting more false alarms because a missed default is the costly error. Finally, an AI layer turns the model's drivers into a plain-English explanation.",
    ],
    architecture: [
      "Loan inputs (8 fields)",
      "Feature prep (training transforms)",
      "Logistic Regression",
      "Default probability",
      "Threshold @ 20% → flag / clear",
      "AI plain-English explanation",
    ],
    lifecycle: [
      {
        title: "Enter the loan",
        body: "Eight fields describe the loan and borrower — the same features the model was trained on.",
      },
      {
        title: "Features prepared",
        body: "Inputs are transformed exactly the way the training data was, so the model sees them in the form it expects.",
      },
      {
        title: "Model scores risk",
        body: "The logistic regression returns a default probability between 0 and 1 for this specific loan.",
      },
      {
        title: "Threshold decides",
        body: "If the probability clears the 20% flag threshold, the loan is marked risky — a cut-off chosen to favour catching defaults over avoiding false alarms.",
      },
      {
        title: "AI explains why",
        body: "An explanation layer describes, in plain English, which inputs pushed the risk up or down — so the score isn't a black box.",
      },
    ],
    difference: [
      "The hard part is one most tutorials skip: accuracy is a trap on imbalanced data. I evaluated on recall and precision instead, then moved the decision threshold to 20% so the model catches ~60% of real defaults — because in lending a missed default costs far more than a false alarm. That threshold is a business decision, and I can defend exactly why I set it there.",
      "I trained on 1.3M real Lending Club loans rather than a toy dataset, and I added an AI explanation layer so every score comes with a human-readable reason. It's the full lifecycle — data, model, honest evaluation, threshold tuning, explainability, deployment — not just a fit-and-predict notebook.",
    ],
    outcome: [
      "A deployed, interactive demo: anyone can enter a loan and get a risk read plus a plain-English explanation of the drivers.",
      "It's the project that shows I think about ML the way a hiring team wants — framing the right metric, respecting the cost of each error, and making the model explainable rather than treating a high accuracy number as the finish line.",
    ],
    links: [{ label: "Discuss this project", href: "/#contact" }],
  },

  {
    slug: "city-dashboard",
    category: "An idea I shipped · Full-stack product · Civic tech",
    title: "City Issues Dashboard",
    tagline:
      "A civic reporting tool: residents file local issues, a civic team triages them on a live dashboard with role-based access.",
    status: "Full-stack build",
    image: "/govdash.png",
    meta: {
      role: "Full-stack — data model, API, dashboard",
      year: "2026",
      status: "Working build",
      stack: ["React", "Node / Express", "MongoDB", "JWT", "RBAC", "REST API"],
    },
    stats: [
      { value: "2 roles", label: "resident + admin, enforced server-side" },
      { value: "1 query", label: "per dashboard view (embedded model)" },
      { value: "JWT", label: "stateless, role-checked auth" },
      { value: "SQL → NoSQL", label: "data model migrated and re-modeled" },
    ],
    problem: [
      "Local civic issues — a broken light, an overflowing bin, a pothole — get reported through scattered channels and then vanish. The resident has no idea if anyone saw it, and the team triaging has no single place that turns raw reports into something they can act on.",
      "The gap isn't a form; it's the loop. Someone needs to file an issue, the right team needs to see it ranked and categorised, and the resident needs to know its status — all with the two sides kept strictly apart.",
    ],
    approach: [
      "Build the full loop on one stack: residents submit issues through a React front end; a civic team works them on a live dashboard with categories, status and analytics. The two audiences are separated by role, not by trust in the browser.",
      "Because the dashboard is read constantly and written occasionally, I modelled the data around how it's read — so each view loads in a single query instead of stitching tables together on every request.",
    ],
    architecture: [
      "Resident / Admin UI",
      "React",
      "Express API",
      "JWT + role check",
      "MongoDB (read-shaped docs)",
      "Dashboard + analytics",
    ],
    lifecycle: [
      {
        title: "Resident files an issue",
        body: "A report with type, location and description is submitted and validated, then stored with its reporter and a timestamp.",
      },
      {
        title: "Auth decides what you see",
        body: "A JWT carries the user's role. The server — never the browser — checks it, so residents and admins only ever reach their own views.",
      },
      {
        title: "Team triages on the dashboard",
        body: "Admins see issues grouped by type and status, update state, and resolve them. Each view is one read against the read-shaped documents.",
      },
      {
        title: "Status flows back",
        body: "The resident can see their issue move through its states, closing the loop that scattered channels never did.",
      },
      {
        title: "Patterns surface",
        body: "Resolved issues aggregate into analytics — by type and area — so the team can see where problems cluster.",
      },
    ],
    difference: [
      "The hard part was migrating the backend from PostgreSQL to MongoDB. I first modelled it like SQL tables, and the dashboard reads came out slow and awkward — so I restructured to embed the data each view reads together. That trades harder writes for fast single-query reads, which is the right call for a read-heavy dashboard, and it's a decision I can defend end to end.",
      "Auth is JWT with the role check on the server, not the client — the rule I hold everywhere: never trust the browser. Residents and admins get genuinely separate surfaces, not just hidden buttons.",
    ],
    outcome: [
      "A complete civic loop on a full JavaScript stack — data model, REST API, authenticated roles and the analytics views that make raw reports actionable.",
      "The migration story is the part interviewers care about: a real before/after where I changed the data model to fit how the app actually reads, and can explain exactly why.",
    ],
    links: [{ label: "Discuss this project", href: "/#contact" }],
  },

  {
    slug: "trekking-platform",
    category: "An idea I shipped · Full-stack product · Community",
    title: "Trekus",
    tagline:
      "A full-stack trekking community & booking platform for the Sahyadris — built for working people who'd rather spend a weekend on a ridge than at a desk.",
    status: "Live & deployed",
    image: "/trekus.png",
    meta: {
      role: "Design and engineering",
      year: "2026",
      status: "Live (Vercel · CI/CD)",
      stack: [
        "React 18",
        "Vite",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "Vercel Functions",
        "Google Gemini",
        "Open-Meteo",
        "GitHub Actions",
      ],
    },
    stats: [
      { value: "Supabase", label: "Postgres · Auth · Storage · RLS" },
      { value: "Serverless", label: "AI key never reaches the browser" },
      { value: "CI on push", label: "Vitest + RTL via GitHub Actions" },
      { value: "Live weather", label: "per trailhead via Open-Meteo" },
    ],
    problem: [
      "Working professionals around Pune want their weekends back on the Sahyadri ridges — but planning one is scattered across blogs, WhatsApp groups and booking forms. Which trek? What's the weather at the trailhead? How do I book, who else is going, and is it any good?",
      "The idea was to put all of it in one place — discover a trek, check live conditions, book a spot, share summit photos, read and write reviews, and ask questions — built for people escaping a desk, not for hardcore mountaineers.",
    ],
    approach: [
      "Build it 'backend-less': the React app talks directly to managed services, so there's no server to babysit. Supabase holds the Postgres data, auth and photo storage (with row-level security); a Google Sheet acts as a no-code CMS for the trek list; and Open-Meteo supplies live trailhead weather.",
      "The one piece that can't live in the browser is the AI key — so the 'Trail Guide' chat routes through a single Vercel serverless function that holds the secret and grounds Google Gemini in the live trek list. Everything is tested (Vitest + React Testing Library) and ships through GitHub Actions + Vercel on every push.",
    ],
    architecture: [
      "Browser · React / Vite / TS",
      "Supabase · Postgres / Auth / Storage",
      "Google Sheets CMS",
      "Open-Meteo weather",
      "Vercel fn /api/chat",
      "Google Gemini",
    ],
    lifecycle: [
      {
        title: "Discover a trek",
        body: "Browse the catalogue and detail pages — itineraries, photos and facts. The trek list comes from a Google Sheet acting as a no-code CMS, so it updates without a deploy.",
      },
      {
        title: "Check the conditions",
        body: "Each trailhead shows a live forecast pulled from the free Open-Meteo API, so you know what you're walking into.",
      },
      {
        title: "Join the community",
        body: "Sign up / log in with Supabase Auth — a protected dashboard and an editable profile.",
      },
      {
        title: "Book or plan",
        body: "Guests reserve a spot; members plan and track completed treks. Booking and enquiry notifications go out via Web3Forms.",
      },
      {
        title: "Share & review",
        body: "Members upload trek photos and post star-rated reviews, stored in Supabase Storage + Postgres with row-level security so people only touch their own.",
      },
      {
        title: "Ask the Trail Guide",
        body: "The AI chat calls a Vercel serverless function that holds the Gemini key and grounds answers in the live trek list — useful and on-topic.",
      },
    ],
    features: [
      {
        heading: "The AI Trail Guide",
        items: [
          "On-site assistant grounded in the live trek list, so answers reflect what's actually on offer.",
          "Powered by Google Gemini (free tier, gemini-2.5-flash-lite) through a serverless endpoint.",
          "The API key lives in the Vercel function — it never touches the browser.",
        ],
      },
      {
        heading: "Production-ready, not a demo",
        items: [
          "A global error boundary so the app never white-screens, plus a proper 404 page.",
          "Unit + component tests (Vitest + React Testing Library + jsdom).",
          "CI/CD: tests run on every push via GitHub Actions; Vercel auto-deploys.",
        ],
      },
    ],
    difference: [
      "I architected it backend-less on purpose — the React app talks straight to Supabase (Postgres, Auth, Storage) with row-level security doing the access control, and a Google Sheet as the CMS so the trek list is editable without a deploy. Fewer moving parts, nothing to babysit.",
      "The one secret — the AI key — lives in a single Vercel serverless function that grounds Gemini in the live trek list, so the browser never sees it and the assistant can't wander off-topic.",
      "And I treated it like production, not a demo: an error boundary so it never white-screens, a real 404, and Vitest/RTL tests gating every push through GitHub Actions.",
    ],
    outcome: [
      "A real community product with a clear audience — working professionals who want a weekend on the ridge — spanning auth, data, storage, live external APIs, an AI assistant and a tested CI/CD pipeline.",
      "It's the build where I can walk an interviewer from 'who is this for' all the way to row-level security, a secret-keeping serverless function, and tests running on every push.",
    ],
    links: [
      { label: "Live demo", href: "https://www.trekus.co/", external: true },
      { label: "Source", href: "https://github.com/nikita1-pixel/Trek", external: true },
      { label: "Discuss this project", href: "/#contact" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function allSlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
