// ============================================================
// ScaleaOS — OS component kit
// Server-safe, CSS-animated command-center primitives.
// ============================================================
import Link from "next/link";

/* ---------- Badge ---------- */
export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge">{children}</span>;
}

/* ---------- Section label / eyebrow ---------- */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

/* ---------- Status indicator ---------- */
export function StatusDot({ label, idle = false }: { label: string; idle?: boolean }) {
  return (
    <span className={`status ${idle ? "idle" : ""}`}>
      <i /> {label}
    </span>
  );
}

/* ---------- System metric ---------- */
export function Metric({ label, value, delta, sub }: { label: string; value: string; delta?: string; sub?: string }) {
  return (
    <div className="hud rounded-xl border border-line bg-white/[0.02] p-4">
      <div className="mono text-[10px] uppercase tracking-[0.14em] text-fog">{label}</div>
      <div className="mt-2 text-[22px] font-semibold tracking-tight text-snow">{value}</div>
      {delta && <div className="mono mt-1 text-[11px] text-glow">{delta}</div>}
      {sub && <div className="mono mt-1 text-[11px] text-fog">{sub}</div>}
    </div>
  );
}

/* ---------- Command card (links to a route) ---------- */
export function CommandCard({
  n,
  title,
  desc,
  tag,
  href,
}: {
  n: string;
  title: string;
  desc: string;
  tag: string;
  href?: string;
}) {
  const inner = (
    <div className="card group h-full p-6">
      <div className="flex items-center justify-between">
        <span className="mono text-[12px] text-fog">{n}</span>
        <span className="chip mono !text-[10px] uppercase tracking-wide">{tag}</span>
      </div>
      <h3 className="mt-5 flex items-center gap-2 text-[17px] font-semibold text-snow">
        {title}
        {href && <span className="cmd-arrow text-glow opacity-0">→</span>}
      </h3>
      <p className="mt-3 text-[14px] leading-relaxed text-mist">{desc}</p>
    </div>
  );
  return href ? (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  );
}

/* ---------- Agent card ---------- */
export function AgentCard({
  name,
  role,
  desc,
  online = true,
}: {
  name: string;
  role: string;
  desc: string;
  online?: boolean;
}) {
  return (
    <div className="card group h-full p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-line-2 bg-white/[0.03] mono text-[12px] text-snow">
            {name.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <div className="text-[14px] font-semibold text-snow">{name}</div>
            <div className="mono text-[10px] uppercase tracking-wide text-fog">{role}</div>
          </div>
        </div>
        <StatusDot label={online ? "online" : "idle"} idle={!online} />
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-mist">{desc}</p>
    </div>
  );
}

/* ---------- Terminal window ---------- */
export type TermLine = { p?: string; t: string; ok?: boolean; warn?: boolean; dim?: boolean; caret?: boolean };

export function Terminal({ title = "scalea — console", lines }: { title?: string; lines: TermLine[] }) {
  return (
    <div className="term hud">
      <div className="term-bar">
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="ml-2 text-[11px] text-fog">{title}</span>
        <span className="ml-auto status">
          <i /> live
        </span>
      </div>
      <div className="term-body">
        {lines.map((l, i) => (
          <div key={i} className="flex gap-2">
            {l.p && <span className="shrink-0 text-glow">{l.p}</span>}
            {l.p && <span className="shrink-0 text-fog">$</span>}
            <span
              className={
                l.ok ? "text-snow" : l.warn ? "text-mist" : l.dim ? "text-fog" : "text-mist"
              }
            >
              {l.ok && <span className="text-glow">✓ </span>}
              <span className={l.caret ? "caret" : ""}>{l.t}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
