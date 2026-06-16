"use client";

import { useState } from "react";
import { site } from "@/lib/content";

/**
 * CaChip — Solana contract-address pill with copy-to-clipboard + pump.fun link.
 * Monochrome, command-center styled. Renders nothing if no CA is set.
 */
const short = (a: string) => `${a.slice(0, 5)}…${a.slice(-5)}`;

export default function CaChip({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const ca = site.ca;
  if (!ca) return null;

  const copy = () => {
    navigator.clipboard?.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  };

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] p-1 pl-3 ${className}`}>
      <span className="mono text-[10px] uppercase tracking-[0.18em] text-fog">CA</span>
      <button
        onClick={copy}
        title="Copy contract address"
        className="mono inline-flex items-center gap-2 text-[12.5px] text-mist transition-colors hover:text-snow"
      >
        <span className="hidden sm:inline">{ca}</span>
        <span className="sm:hidden">{short(ca)}</span>
        <span className={`text-[11px] ${copied ? "text-glow" : "text-fog"}`}>{copied ? "copied ✓" : "⧉"}</span>
      </button>
      {site.pump && (
        <a
          href={site.pump}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line-2 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-snow transition-all hover:border-glow/40 hover:bg-white/[0.07] hover:shadow-[0_0_20px_-6px_rgba(159,180,255,0.6)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_8px_#9fb4ff]" />
          pump.fun ↗
        </a>
      )}
    </div>
  );
}
