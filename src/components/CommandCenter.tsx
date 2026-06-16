"use client";

import { motion } from "framer-motion";

/**
 * CommandCenter — the hero's command-center mock. A premium, monochrome
 * dashboard panel: live KPIs, an animated growth line, and an activity feed.
 * Pure CSS/SVG, no data — it sells the product surface.
 */

const KPIS = [
  { label: "MRR", value: "$248.6k", delta: "+12.4%" },
  { label: "Runway", value: "19 mo", delta: "+2 mo" },
  { label: "Pipeline", value: "$1.92M", delta: "+8.1%" },
];

const FEED = [
  { t: "09:41", who: "Scalea", msg: "MRR up 4.2% WoW — driven by Enterprise tier", tone: "good" },
  { t: "09:39", who: "Finance", msg: "Q2 investor report drafted · ready to review", tone: "" },
  { t: "09:32", who: "CRM", msg: "Deal · Northwind moved to Negotiation", tone: "" },
  { t: "09:28", who: "Scalea", msg: "2 contracts expiring in 14d — renewal queued", tone: "warn" },
  { t: "09:21", who: "Projects", msg: "Roadmap · 'Billing v2' shipped", tone: "" },
];

// a smooth-ish upward area path
const LINE = "M0,86 L26,80 L52,82 L78,68 L104,72 L130,58 L156,60 L182,44 L208,48 L234,30 L260,34 L286,18";

export default function CommandCenter() {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-line px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_8px_#9fb4ff]" />
          <span className="mono text-[11px] tracking-wide text-mist">scaleaos · command center</span>
        </div>
        <span className="mono text-[10px] text-fog">live</span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-2 p-3">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-lg border border-line bg-white/[0.02] p-3">
            <div className="mono text-[10px] uppercase tracking-wide text-fog">{k.label}</div>
            <div className="mt-1 text-[18px] font-semibold text-snow">{k.value}</div>
            <div className="mono mt-0.5 text-[10px] text-glow">{k.delta}</div>
          </div>
        ))}
      </div>

      {/* chart */}
      <div className="mx-3 rounded-lg border border-line bg-white/[0.015] p-3">
        <div className="flex items-center justify-between">
          <span className="mono text-[10px] uppercase tracking-wide text-fog">cumulative growth</span>
          <span className="mono text-[10px] text-mist">90d</span>
        </div>
        <svg viewBox="0 0 286 100" className="mt-2 h-[96px] w-full overflow-visible">
          <defs>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(159,180,255,0.18)" />
              <stop offset="100%" stopColor="rgba(159,180,255,0)" />
            </linearGradient>
          </defs>
          <path d={`${LINE} L286,100 L0,100 Z`} fill="url(#fill)" />
          <motion.path
            d={LINE}
            fill="none"
            stroke="#dfe6f3"
            strokeWidth="1.6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <motion.circle
            cx="286" cy="18" r="3" fill="#fff"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4 }}
          />
        </svg>
      </div>

      {/* feed */}
      <div className="mt-3 px-3 pb-3">
        <div className="mono mb-1.5 text-[10px] uppercase tracking-wide text-fog">activity</div>
        <div className="space-y-1.5">
          {FEED.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="flex items-center gap-2.5 rounded-md border border-line/60 bg-white/[0.015] px-2.5 py-1.5"
            >
              <span className="mono shrink-0 text-[10px] text-fog">{f.t}</span>
              <span className={`mono shrink-0 text-[10px] ${f.who === "Scalea" ? "text-glow" : "text-mist"}`}>{f.who}</span>
              <span className="truncate text-[12px] text-mist">{f.msg}</span>
              <span
                className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full ${
                  f.tone === "good" ? "bg-glow" : f.tone === "warn" ? "bg-fog" : "bg-line-2"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* moving scan sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.04] to-transparent scan-line" />
    </div>
  );
}
