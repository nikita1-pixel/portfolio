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
    title: "Trekking Community Platform",
    tagline:
      "A community platform for trekkers — discover routes, read trail guides, and ask an AI assistant for planning help.",
    status: "Full-stack build",
    image: "/trekus.png",
    meta: {
      role: "Full-stack — content model + AI assistant layer",
      year: "2026",
      status: "Working build",
      stack: ["React", "Node / Express", "MongoDB", "Serverless function", "LLM assistant"],
    },
    stats: [
      { value: "0 keys", label: "exposed in the browser" },
      { value: "Serverless", label: "AI proxy scales to zero" },
      { value: "1 prompt", label: "domain-locks the assistant" },
      { value: "Full JS", label: "one language front to back" },
    ],
    problem: [
      "Planning a trek means hunting across blogs, forums and group chats for route details, difficulty and what to pack — and there's nowhere to just ask a question and get a planning answer grounded in trekking.",
      "A community needs two things a static site can't give: a place to discover and read about routes, and a way to ask for help conversationally — without that help going off-topic or, worse, leaking the keys that power it.",
    ],
    approach: [
      "Build a content platform for routes and trail guides on a full JavaScript stack, then add an AI 'trek buddy' that answers planning questions in plain language.",
      "The assistant is the interesting part: it can't call a language model straight from the browser without exposing the API key, so it runs through a small serverless function that acts as a secure proxy, with a system prompt that keeps it on trekking.",
    ],
    architecture: [
      "React UI",
      "Node / Express API",
      "MongoDB (routes + guides)",
      "Serverless proxy (key server-side)",
      "LLM assistant",
    ],
    lifecycle: [
      {
        title: "Discover routes",
        body: "A trekker browses routes and reads trail guides served from the content model.",
      },
      {
        title: "Ask the trek buddy",
        body: "A planning question goes to the front end, which calls the app's own serverless endpoint — never the model directly.",
      },
      {
        title: "Proxy adds the secret",
        body: "The serverless function attaches the API key server-side and wraps the question in a system prompt that keeps the assistant on trekking topics.",
      },
      {
        title: "Grounded planning reply",
        body: "The model's answer comes back through the proxy to the user, with the key never having touched the browser.",
      },
    ],
    difference: [
      "The hard part was letting a browser use an LLM without ever shipping the API key to it. My fix was a serverless function as a secure proxy: the key lives on the server, and the browser only ever talks to my endpoint.",
      "I locked the assistant to trekking with a system prompt so it stays useful and on-brand, and I chose serverless deliberately — it scales to zero when nobody's asking, with cold-start latency as the trade-off I accepted and can explain.",
    ],
    outcome: [
      "A community product that combines a real content model with a conversational AI layer, built so the AI is both useful and safe to expose publicly.",
      "It's the project where I can walk through a genuine security decision — keeping a secret out of the client — rather than just wiring up an API.",
    ],
    links: [{ label: "Discuss this project", href: "/#contact" }],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function allSlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
