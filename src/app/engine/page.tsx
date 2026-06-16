import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import ScaleaCore from "@/components/ScaleaCore";
import Reveal from "@/components/Reveal";
import { Badge, Terminal, AgentCard } from "@/components/os";

export const metadata: Metadata = { title: "Engine" };

const architecture = [
  { n: "01", tag: "Graph", title: "Unified company graph", desc: "Users, orgs, customers, transactions, tasks and documents — one schema, fully connected and queryable." },
  { n: "02", tag: "Runtime", title: "Agent runtime", desc: "A managed runtime that hosts your agents, tools and memory with sandboxed execution and full audit." },
  { n: "03", tag: "Realtime", title: "Realtime sync bus", desc: "A WebSocket event bus — a change in any surface propagates across the OS in under 200ms." },
  { n: "04", tag: "Model", title: "Model router", desc: "Routes each task to the right Claude model — fast for triage, deep for reasoning — with cost controls." },
  { n: "05", tag: "Memory", title: "Vector memory", desc: "Long-term company memory so the agent recalls context across documents, threads and time." },
  { n: "06", tag: "Security", title: "Policy & RBAC", desc: "Org, team and role policies enforced at the graph edge — enterprise-grade from day one." },
];

const agents = [
  { name: "Atlas", role: "Operations", desc: "Watches pipeline & tasks, reroutes work and keeps execution on track." },
  { name: "Ledger", role: "Finance", desc: "Models cashflow & runway, drafts investor updates on schedule." },
  { name: "Scout", role: "Intelligence", desc: "Scans signals across the graph and surfaces what changed and why." },
  { name: "Forge", role: "Automation", desc: "Builds and runs workflows, wiring triggers to actions across tools." },
];

export default function EnginePage() {
  return (
    <PageShell>
      <PageHero
        badge="Core AI Engine"
        title={["The brain that runs", "your company."]}
        sub="ScaleaOS Engine is the autonomous core — a company graph, an agent runtime, a realtime bus and an automation pipeline working as one machine."
        status={["graph online", "12 agents active", "bus < 200ms", "runtime healthy"]}
      />

      {/* brain visualization + pipeline */}
      <section className="section relative overflow-hidden pt-4">
        <div className="scanbeam" aria-hidden />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal><ScaleaCore /></Reveal>
          <div>
            <Reveal><Badge>Automation pipeline</Badge></Reveal>
            <Reveal delay={60}>
              <h2 className="h-sec mt-6">
                <span className="text-snow">Signal in.</span> <span className="text-grad">Action out.</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lead mt-5 max-w-xl">
                Every event flows through the same pipeline: ingest, reason, decide, act, verify — with the agent in the
                loop and you in control.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-7">
                <Terminal
                  title="scalea — pipeline"
                  lines={[
                    { p: "ingest", t: "event · stripe.invoice.paid", dim: true },
                    { p: "reason", t: "matched account → Northwind", ok: true },
                    { p: "decide", t: "renewal risk dropped to low", ok: true },
                    { p: "act", t: "updated CRM · notified owner", ok: true },
                    { p: "verify", t: "consistency check passed", ok: true },
                    { p: "pipeline", t: "idle · awaiting next event", caret: true },
                  ]}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FeatureGrid
        label="System architecture"
        heading={["Built like an OS,", "not a dashboard."]}
        intro="Six subsystems compose the engine. Each is independent, observable and replaceable — wired together by the company graph."
        features={architecture}
      />

      {/* agents */}
      <section className="section relative border-t border-line">
        <div className="wrap">
          <Reveal><Badge>AI agents</Badge></Reveal>
          <Reveal delay={60}>
            <h2 className="h-sec mt-5 max-w-2xl">
              <span className="text-snow">A team of agents</span> <span className="text-grad">on every function.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((a, i) => (
              <Reveal key={a.name} delay={(i % 4) * 60}>
                <AgentCard name={a.name} role={a.role} desc={a.desc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
