"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * ScaleaCore — the futuristic AI core at the center of the operating system.
 * Concentric counter-rotating rings, a tick dial, orbiting nodes wired to the
 * center with animated data streams, sonar pings and a glowing emblem.
 * Monochrome, cybernetic, calm.
 */

const C = 200; // svg center
const NODES = [
  { label: "Agents", a: -90 },
  { label: "Data", a: -30 },
  { label: "Finance", a: 30 },
  { label: "Tasks", a: 90 },
  { label: "Docs", a: 150 },
  { label: "Signals", a: 210 },
];
const NODE_R = 150; // svg radius for nodes
const HTML_R = 38; // percent radius for html chips

const ringStyle = { transformBox: "fill-box", transformOrigin: "center" } as const;

// round to 3 decimals so server & client produce identical strings (no hydration mismatch)
const r3 = (n: number) => Math.round(n * 1000) / 1000;

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: r3(C + r * Math.cos(rad)), y: r3(C + r * Math.sin(rad)) };
}

export default function ScaleaCore({ className = "" }: { className?: string }) {
  // tick dial
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[520px] ${className}`}>
      {/* breathing core glow */}
      <div
        className="breathe absolute inset-[22%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(159,180,255,0.20), transparent 65%)" }}
        aria-hidden
      />

      {/* sonar pings */}
      {[0, 1.2, 2.4].map((d) => (
        <span
          key={d}
          className="ping-ring absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow/25"
          style={{ animationDelay: `${d}s` }}
          aria-hidden
        />
      ))}

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="coreFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(159,180,255,0.10)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx={C} cy={C} r="196" fill="url(#coreFade)" />

        {/* outer ring + tick dial */}
        <circle cx={C} cy={C} r="196" fill="none" stroke="#1b1f27" strokeWidth="1" />
        <g className="spin-slow" style={ringStyle}>
          {ticks.map((t) => {
            const o = polar(196, t);
            const inn = polar(t % 30 === 0 ? 184 : 190, t);
            return (
              <line
                key={t}
                x1={o.x}
                y1={o.y}
                x2={inn.x}
                y2={inn.y}
                stroke="#2f3540"
                strokeWidth={t % 30 === 0 ? 1.4 : 0.7}
              />
            );
          })}
        </g>

        {/* mid dashed ring (counter-rotating) */}
        <circle
          className="spin-rev"
          style={ringStyle}
          cx={C}
          cy={C}
          r="150"
          fill="none"
          stroke="#262b34"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
        <circle cx={C} cy={C} r="110" fill="none" stroke="#1b1f27" strokeWidth="1" />
        <circle className="spin-slow" style={ringStyle} cx={C} cy={C} r="72" fill="none" stroke="#262b34" strokeWidth="0.8" strokeDasharray="1 5" />

        {/* data streams from core to nodes */}
        {NODES.map((n, i) => {
          const p = polar(NODE_R, n.a);
          return (
            <g key={n.label}>
              <line x1={C} y1={C} x2={p.x} y2={p.y} stroke="rgba(159,180,255,0.10)" strokeWidth="1" />
              <line className="dash-flow" x1={C} y1={C} x2={p.x} y2={p.y} stroke="rgba(159,180,255,0.5)" strokeWidth="1" style={{ animationDelay: `${i * 0.25}s` }} />
              <circle cx={p.x} cy={p.y} r="3.4" fill="#0a0c10" stroke="#9fb4ff" strokeWidth="1" />
            </g>
          );
        })}
      </svg>

      {/* center emblem */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="float-slow absolute left-1/2 top-1/2 grid h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center"
      >
        <Image src="/logo.png" alt="ScaleaOS Core" width={200} height={200} className="glow-pulse h-full w-full object-contain" />
      </motion.div>

      {/* node chips */}
      {NODES.map((n, i) => {
        const rad = (n.a * Math.PI) / 180;
        const x = r3(50 + HTML_R * Math.cos(rad));
        const y = r3(50 + HTML_R * Math.sin(rad));
        return (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="chip mono !text-[9.5px] uppercase tracking-[0.14em]">
              <span className="blink h-1 w-1 rounded-full bg-glow shadow-[0_0_6px_#9fb4ff]" /> {n.label}
            </span>
          </motion.div>
        );
      })}

      {/* scanning beam */}
      <div className="scanbeam rounded-full" aria-hidden />
    </div>
  );
}
