"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import WalletConnect from "@/components/WalletConnect";
import { motion } from "framer-motion";

/* ============================================================
   ScaleaOS — Dashboard (the running application)
   Dark admin shell · sidebar · metrics · analytics · AI console
   ============================================================ */

const NAV = [
  { key: "overview", label: "Command Center", icon: "◫" },
  { key: "intelligence", label: "Intelligence", icon: "◈" },
  { key: "crm", label: "CRM", icon: "◎" },
  { key: "finance", label: "Finance", icon: "▤" },
  { key: "projects", label: "Projects", icon: "▥" },
  { key: "documents", label: "Documents", icon: "▦" },
  { key: "automation", label: "Automation", icon: "⚙" },
  { key: "settings", label: "Settings", icon: "⛭" },
];

const METRICS = [
  { label: "MRR", value: "$248.6k", delta: "+12.4%", up: true },
  { label: "Runway", value: "19 mo", delta: "+2 mo", up: true },
  { label: "Pipeline", value: "$1.92M", delta: "+8.1%", up: true },
  { label: "Active deals", value: "142", delta: "+12", up: true },
  { label: "Churn", value: "2.1%", delta: "-0.4%", up: true },
  { label: "Agents", value: "12", delta: "online", up: true },
];

const FEED = [
  { t: "09:41", who: "Scalea", msg: "MRR up 4.2% WoW — driven by Enterprise tier", tone: "good" },
  { t: "09:39", who: "Finance", msg: "Q2 investor report drafted · ready to review", tone: "" },
  { t: "09:32", who: "CRM", msg: "Deal · Northwind moved to Negotiation", tone: "" },
  { t: "09:28", who: "Scalea", msg: "2 contracts expiring in 14d — renewal queued", tone: "warn" },
  { t: "09:21", who: "Projects", msg: "Roadmap · 'Billing v2' shipped", tone: "" },
  { t: "09:12", who: "Automation", msg: "wf_renewal_guard ran · 1 task created", tone: "good" },
];

const AGENTS = [
  { name: "Atlas", role: "Operations", load: 0.62 },
  { name: "Ledger", role: "Finance", load: 0.41 },
  { name: "Scout", role: "Intelligence", load: 0.78 },
  { name: "Forge", role: "Automation", load: 0.33 },
];

const LINE =
  "M0,118 L40,108 L80,112 L120,92 L160,98 L200,78 L240,82 L280,58 L320,66 L360,40 L400,46 L440,24 L480,30";

type Msg = { role: "user" | "agent"; text: string };

function answerFor(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("mrr") || s.includes("revenue"))
    return "MRR is $248.6k, up 12.4% MoM. Growth is led by the Enterprise tier (+18%); SMB is flat. Want me to draft the board summary?";
  if (s.includes("risk") || s.includes("deal"))
    return "5 deals are at risk — Vertex ($120k) has had 0 touches in 18 days. I've drafted re-engagement steps for each owner. Send them?";
  if (s.includes("runway") || s.includes("cash"))
    return "Runway is 19 months at the current burn of $182k/mo. Closing the 3 deals in Negotiation extends it to 24 months.";
  if (s.includes("report") || s.includes("investor"))
    return "I've drafted the Q2 investor update from your finance + CRM data. It's 1 page with MRR, runway, pipeline and 3 highlights. Open it?";
  return "On it. I read that against your company graph — here's what I found and a recommended next step. Want me to execute it?";
}

export default function Dashboard() {
  const [view, setView] = useState("overview");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "agent", text: "Good morning. 12 agents online. MRR is up 4.2% this week — ask me anything about the company." },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q || thinking) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "agent", text: answerFor(q) }]);
      setThinking(false);
    }, 900);
  };

  const active = NAV.find((n) => n.key === view)!;

  return (
    <div className="relative z-[1] min-h-screen text-mist">
      <div className="flex">
        {/* ───────── SIDEBAR ───────── */}
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-ink/60 backdrop-blur-xl md:flex">
          <div className="flex h-16 items-center border-b border-line px-5">
            <Link href="/"><Logo size={24} withWord /></Link>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            <div className="mono px-2 pb-2 pt-1 text-[10px] uppercase tracking-[0.16em] text-fog">Systems</div>
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => setView(n.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13.5px] transition-colors ${
                  view === n.key ? "border border-line-2 bg-white/[0.05] text-snow" : "text-mist hover:bg-white/[0.03] hover:text-snow"
                }`}
              >
                <span className="text-glow">{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>
          <div className="space-y-3 border-t border-line p-4">
            <div className="status"><i /> all systems operational</div>
            <WalletConnect full />
          </div>
        </aside>

        {/* ───────── MAIN ───────── */}
        <main className="min-w-0 flex-1">
          {/* topbar */}
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-line bg-ink/70 px-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="text-glow">{active.icon}</span>
              <h1 className="text-[15px] font-semibold text-snow">{active.label}</h1>
              <span className="status idle ml-2 hidden sm:inline-flex"><i /> {view}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="hidden items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3 py-1.5 sm:flex">
                <span className="mono text-[11px] text-fog">⌘K</span>
                <span className="text-[12.5px] text-fog">Search or ask…</span>
              </div>
              <Link href="/" className="rounded-lg border border-line px-3 py-1.5 text-[12.5px] text-mist transition-colors hover:text-snow">
                Exit
              </Link>
            </div>
          </header>

          {/* content */}
          <div className="grid gap-6 p-5 xl:grid-cols-[1fr_340px]">
            <div className="space-y-6">
              {/* metrics */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {METRICS.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hud rounded-xl border border-line bg-white/[0.02] p-4"
                  >
                    <div className="mono text-[10px] uppercase tracking-[0.14em] text-fog">{m.label}</div>
                    <div className="mt-2 text-[20px] font-semibold text-snow">{m.value}</div>
                    <div className="mono mt-1 text-[11px] text-glow">{m.delta}</div>
                  </motion.div>
                ))}
              </div>

              {/* analytics chart */}
              <div className="rounded-2xl border border-line bg-white/[0.015] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mono text-[10px] uppercase tracking-[0.14em] text-fog">cumulative growth</div>
                    <div className="mt-1 text-[18px] font-semibold text-snow">$248.6k MRR</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {["7d", "30d", "90d"].map((d, i) => (
                      <span key={d} className={`mono rounded-md border px-2.5 py-1 text-[11px] ${i === 2 ? "border-line-2 bg-white/[0.04] text-snow" : "border-line text-fog"}`}>{d}</span>
                    ))}
                  </div>
                </div>
                <svg viewBox="0 0 480 150" className="mt-4 h-[180px] w-full overflow-visible">
                  <defs>
                    <linearGradient id="dfill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(159,180,255,0.20)" />
                      <stop offset="100%" stopColor="rgba(159,180,255,0)" />
                    </linearGradient>
                  </defs>
                  {[30, 66, 102, 138].map((y) => (
                    <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#1b1f27" strokeWidth="1" />
                  ))}
                  <path d={`${LINE} L480,150 L0,150 Z`} fill="url(#dfill)" />
                  <motion.path
                    d={LINE}
                    fill="none"
                    stroke="#dfe6f3"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                  />
                  <motion.circle cx="480" cy="30" r="3.5" fill="#fff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} />
                </svg>
              </div>

              {/* agents + activity */}
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-line bg-white/[0.015] p-5">
                  <div className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-fog">agent fleet</div>
                  <div className="space-y-3">
                    {AGENTS.map((a) => (
                      <div key={a.name} className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-lg border border-line-2 bg-white/[0.03] mono text-[11px] text-snow">
                          {a.name.slice(0, 2).toUpperCase()}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] text-snow">{a.name}</span>
                            <span className="mono text-[10px] text-fog">{Math.round(a.load * 100)}%</span>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                            <motion.div
                              className="h-full rounded-full bg-glow/70"
                              initial={{ width: 0 }}
                              animate={{ width: `${a.load * 100}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-line bg-white/[0.015] p-5">
                  <div className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-fog">activity</div>
                  <div className="space-y-1.5">
                    {FEED.map((f, i) => (
                      <div key={i} className="flex items-center gap-2.5 rounded-md border border-line/60 bg-white/[0.015] px-2.5 py-1.5">
                        <span className="mono shrink-0 text-[10px] text-fog">{f.t}</span>
                        <span className={`mono shrink-0 text-[10px] ${f.who === "Scalea" ? "text-glow" : "text-mist"}`}>{f.who}</span>
                        <span className="truncate text-[12px] text-mist">{f.msg}</span>
                        <span className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full ${f.tone === "good" ? "bg-glow" : f.tone === "warn" ? "bg-fog" : "bg-line-2"}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ───────── AI CONSOLE ───────── */}
            <div className="flex h-[calc(100vh-7rem)] flex-col rounded-2xl border border-line bg-ink/40 backdrop-blur-xl xl:sticky xl:top-[5.5rem]">
              <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
                <Logo size={20} />
                <div>
                  <div className="text-[13px] font-semibold text-snow">Scalea Console</div>
                  <div className="status"><i /> connected to company graph</div>
                </div>
              </div>

              <div ref={feedRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[88%] rounded-2xl border px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        m.role === "user"
                          ? "border-line-2 bg-white/[0.06] text-snow"
                          : "border-line bg-white/[0.02] text-mist"
                      }`}
                    >
                      {m.role === "agent" && <div className="mono mb-1 text-[9.5px] uppercase tracking-wide text-glow">scalea</div>}
                      {m.text}
                    </div>
                  </div>
                ))}
                {thinking && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-line bg-white/[0.02] px-3.5 py-2.5">
                      <span className="mono text-[12px] text-fog caret">analyzing</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-line p-3">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {["MRR?", "Deals at risk", "Runway"].map((s) => (
                    <button key={s} onClick={() => setInput(s)} className="chip mono !text-[10px] hover:!text-snow">
                      {s}
                    </button>
                  ))}
                </div>
                <form onSubmit={send} className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Scalea anything…"
                    className="min-w-0 flex-1 rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-[13px] text-snow placeholder:text-fog focus:border-glow/40 focus:outline-none"
                  />
                  <button type="submit" className="btn btn-primary !px-3.5 !py-2 !text-[13px]" aria-label="Send">
                    ↑
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
