import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import Reveal from "@/components/Reveal";
import { Badge, Terminal } from "@/components/os";

export const metadata: Metadata = { title: "Automation" };

const workflows = [
  { n: "01", tag: "Triggers", title: "Event triggers", desc: "Fire on any signal — a paid invoice, a stage change, a new doc, a metric crossing a threshold." },
  { n: "02", tag: "Logic", title: "Conditional logic", desc: "Compose IF/THEN rules across surfaces — when MRR drops, alert finance and draft the analysis." },
  { n: "03", tag: "Actions", title: "Agent actions", desc: "Let the agent execute: update records, send updates, reconcile books, queue renewals." },
  { n: "04", tag: "Schedule", title: "Scheduled runs", desc: "Recurring reports, reviews and reconciliations that run on their own — with you in control." },
  { n: "05", tag: "Integrations", title: "Integrations", desc: "Stripe, Slack, Gmail, GitHub, HubSpot and webhooks — wire any tool into the OS." },
  { n: "06", tag: "Audit", title: "Full audit trail", desc: "Every automated action is logged, attributable and reversible — autonomy you can trust." },
];

export default function AutomationPage() {
  return (
    <PageShell>
      <PageHero
        badge="Autonomous Workflow System"
        title={["Operations that run", "without you."]}
        sub="Wire triggers to actions and let the agent execute. Automation turns repetitive operations into autonomous workflows — observable, auditable and always reversible."
        status={["24 workflows live", "1.2k runs today", "0 failures"]}
      />

      {/* workflow builder */}
      <section className="section relative overflow-hidden pt-4">
        <div className="scanbeam" aria-hidden />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal><Badge>Workflow builder</Badge></Reveal>
            <Reveal delay={60}>
              <h2 className="h-sec mt-6">
                <span className="text-snow">Trigger.</span> <span className="text-grad">Reason. Act.</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lead mt-5 max-w-xl">
                Describe the outcome; the agent assembles the workflow. Watch every run step through the pipeline in real
                time.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-7 grid gap-3">
                {[
                  ["WHEN", "invoice marked overdue > 7d"],
                  ["IF", "account tier is Enterprise"],
                  ["THEN", "notify owner · draft dunning email"],
                  ["AND", "create finance task · log to graph"],
                ].map(([k, v]) => (
                  <div key={k} className="hud flex items-center gap-4 rounded-xl border border-line bg-white/[0.02] px-4 py-3">
                    <span className="mono w-14 shrink-0 text-[11px] uppercase tracking-wide text-glow">{k}</span>
                    <span className="text-[14px] text-mist">{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Terminal
              title="scalea — runs"
              lines={[
                { p: "run", t: "wf_renewal_guard · #4192", dim: true },
                { p: "trigger", t: "stage → Negotiation (Vertex)", ok: true },
                { p: "agent", t: "drafted proposal + 2 next steps", ok: true },
                { p: "action", t: "slack · #sales notified", ok: true },
                { p: "action", t: "calendar · review booked Thu", ok: true },
                { p: "run", t: "completed in 1.4s · ✓ verified", ok: true },
                { p: "runner", t: "watching · 24 workflows", caret: true },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <FeatureGrid
        label="The automation fabric"
        heading={["Everything you do twice,", "done autonomously."]}
        intro="Six building blocks compose any operation — from a one-step alert to a multi-surface autonomous process."
        features={workflows}
      />
    </PageShell>
  );
}
