// ============================================================
// ScaleaOS — site content
// The autonomous OS for modern companies.
// ============================================================

export const site = {
  name: "ScaleaOS",
  tagline: "The autonomous OS for modern companies.",
  description:
    "ScaleaOS is an AI-native business operating system — an autonomous engine, intelligence layer, command workspace and automation fabric in one command center, run by an AI agent that understands your company.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://scaleaos.com",
  email: "hello@scaleaos.com",
  x: "https://x.com/ScaleaOS", // handle X resmi ScaleaOS
  ca: "2Qrc7Fu8EX4NtqLRQgkKj52epCRBtSt5xzw9hT2mpump", // Solana token contract address
  pump: "https://pump.fun/coin/2Qrc7Fu8EX4NtqLRQgkKj52epCRBtSt5xzw9hT2mpump",
  // control-panel navigation
  nav: [
    { label: "Engine", href: "/engine" },
    { label: "Intelligence", href: "/intelligence" },
    { label: "Workspace", href: "/workspace" },
    { label: "Automation", href: "/automation" },
    { label: "Resources", href: "/resources" },
  ],
  actions: [
    { label: "AI Console", href: "/dashboard", kind: "ghost" as const },
    { label: "Dashboard", href: "/dashboard", kind: "primary" as const },
  ],
};

// Hero
export const hero = {
  badge: "AI Business Operating System",
  title: ["Scale intelligence.", "Operate everything."],
  body:
    "ScaleaOS unifies your metrics, customers, finance, projects and knowledge into one command center — then runs it with an autonomous agent that reads the data, finds the signal, and acts.",
  ctas: { primary: "Launch console", secondary: "Explore the engine" },
  boot: [
    { p: "scalea@os", t: "init --company", dim: false },
    { p: "core", t: "loading intelligence graph … ok", ok: true },
    { p: "core", t: "agents online · 12 active", ok: true },
    { p: "core", t: "automation fabric synced", ok: true },
    { p: "scalea@os", t: "ready", caret: true },
  ],
};

// Live status strip
export const stats = [
  { value: "12", label: "agents online" },
  { value: "<200ms", label: "command latency" },
  { value: "99.99%", label: "system uptime" },
  { value: "SOC2", label: "ready architecture" },
];

// The six surfaces of the OS (used on landing as command cards → routes)
export const surfaces = [
  { n: "01", name: "Engine", href: "/engine", tag: "Core", desc: "The AI core — agents, system architecture and the automation pipeline that runs your company." },
  { n: "02", name: "Intelligence", href: "/intelligence", tag: "Insight", desc: "Analytics, prediction and a decision assistant that turns raw data into direction." },
  { n: "03", name: "Workspace", href: "/workspace", tag: "Operate", desc: "Teams, projects, documents, CRM and finance — your whole company in one command surface." },
  { n: "04", name: "Automation", href: "/automation", tag: "Autonomous", desc: "AI workflows, triggers and integrations that execute operations without you in the loop." },
  { n: "05", name: "Resources", href: "/resources", tag: "Build", desc: "Guides, API and developer resources to extend and program the operating system." },
  { n: "06", name: "Dashboard", href: "/dashboard", tag: "Live", desc: "The running application — company metrics, agents and your AI console in real time." },
];

// The AI agent section
export const agent = {
  badge: "Scalea Agent",
  title: ["An agent that runs", "the whole company."],
  body:
    "Scalea connects to every surface — revenue, pipeline, tasks, documents — builds a live model of your business, and turns questions into decisions. Ask it anything; it answers with your data and the steps to act.",
  bullets: [
    "Understands your company graph",
    "Analyzes documents & reports",
    "Suggests decisions, not dashboards",
    "Runs automations on your behalf",
  ],
  prompts: [
    "Why did MRR dip last week?",
    "Draft the investor update for Q2.",
    "Which 5 deals are most at risk?",
    "Summarize every contract this month.",
  ],
};

// Modules (the 10) — surfaced on /workspace
export const modules = [
  { n: "01", name: "Command Center", desc: "Business overview, growth, revenue and an activity timeline with AI insights surfaced up top.", tag: "Dashboard" },
  { n: "02", name: "Scalea Agent", desc: "A chat-native analyst that understands company data, analyzes documents and generates reports.", tag: "AI" },
  { n: "03", name: "Workspaces", desc: "Multiple organizations, team members, roles and permissions — clean multi-tenant from the start.", tag: "Teams" },
  { n: "04", name: "CRM", desc: "Customers, leads, a deal pipeline and customer analytics — your whole funnel in one view.", tag: "Sales" },
  { n: "05", name: "Finance", desc: "Revenue, expenses, cashflow, investor reports and AI-assisted financial forecasting.", tag: "Money" },
  { n: "06", name: "Projects", desc: "Tasks, roadmap, kanban, timeline and goals — execution that stays connected to outcomes.", tag: "Work" },
  { n: "07", name: "Document Intelligence", desc: "Upload files, get AI summaries, search a company knowledge base and build the wiki.", tag: "Knowledge" },
  { n: "08", name: "Automation", desc: "Compose workflows, trigger actions, and let the agent run repetitive ops for you.", tag: "Workflows" },
  { n: "09", name: "Analytics", desc: "Charts, reports, KPI tracking and predictive insights across every part of the business.", tag: "Insights" },
  { n: "10", name: "Settings & Billing", desc: "Billing, team management, API keys and integrations — the controls, all in one place.", tag: "Admin" },
];

// Footer
export const footer = {
  groups: [
    { title: "System", links: [
      { label: "Engine", href: "/engine" },
      { label: "Intelligence", href: "/intelligence" },
      { label: "Workspace", href: "/workspace" },
      { label: "Automation", href: "/automation" },
    ] },
    { title: "Build", links: [
      { label: "Resources", href: "/resources" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "AI Console", href: "/dashboard" },
      { label: "Status", href: "/resources" },
    ] },
    { title: "Company", links: [
      { label: "About", href: "/resources" },
      { label: "Security", href: "/resources" },
      { label: "Careers", href: "/resources" },
      { label: "Contact", href: "/resources" },
    ] },
  ],
};
