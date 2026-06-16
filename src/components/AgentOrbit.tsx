"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * AgentOrbit — the Scalea agent at the center of the company, with the
 * modules orbiting it. Breathing halo, sonar pings, counter-rotating rings,
 * pulsing connector lines and floating node chips. Monochrome, alive.
 */

const NODES = [
  { label: "Revenue", x: 50, y: 6 },
  { label: "Pipeline", x: 90, y: 32 },
  { label: "Tasks", x: 84, y: 78 },
  { label: "Docs", x: 16, y: 78 },
  { label: "Cashflow", x: 10, y: 32 },
];

export default function AgentOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      {/* breathing glow */}
      <div
        className="breathe absolute inset-[18%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(159,180,255,0.18), transparent 65%)" }}
        aria-hidden
      />

      {/* sonar pings emanating from the core */}
      {[0, 1.2, 2.4].map((d) => (
        <span
          key={d}
          className="ping-ring absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow/30"
          style={{ animationDelay: `${d}s` }}
          aria-hidden
        />
      ))}

      {/* rings — counter-rotating */}
      <div className="spin-rev absolute inset-0 rounded-full border border-line" />
      <div className="absolute inset-[14%] rounded-full border border-line/70" />
      <div className="spin-slow absolute inset-[6%] rounded-full border border-dashed border-line-2" />

      {/* connecting lines (pulsing) */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        {NODES.map((n, i) => (
          <motion.line
            key={i}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="rgba(159,180,255,0.35)"
            strokeWidth="0.4"
            strokeDasharray="2 3"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.6, 0.15], strokeDashoffset: [0, -10] }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* center emblem — transparent, glowing, floating */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="float-slow absolute left-1/2 top-1/2 grid h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 place-items-center"
      >
        <Image
          src="/logo.png"
          alt="Scalea Agent"
          width={180}
          height={180}
          className="glow-pulse h-full w-full object-contain"
        />
      </motion.div>

      {/* nodes */}
      {NODES.map((n, i) => (
        <motion.div
          key={n.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span className="chip float-slow mono !text-[10px] uppercase tracking-wide" style={{ animationDelay: `${i * 0.6}s` }}>
            <span className="blink h-1 w-1 rounded-full bg-glow shadow-[0_0_6px_#9fb4ff]" /> {n.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
