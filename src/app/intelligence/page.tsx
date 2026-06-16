import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import Reveal from "@/components/Reveal";
import { Badge, Terminal, Metric } from "@/components/os";

export const metadata: Metadata = { title: "Intelligence" };

const layers = [
  { n: "01", tag: "Analytics", title: "Live analytics", desc: "KPIs, cohorts and trends computed on the company graph in real time — no exports, no stale dashboards." },
  { n: "02", tag: "Prediction", title: "Predictive models", desc: "Forecast revenue, churn, runway and pipeline conversion with confidence bands you can act on." },
  { n: "03", tag: "Assistant", title: "Decision assistant", desc: "Ask a question in plain language; get the answer, the evidence and the recommended next move." },
  { n: "04", tag: "Insights", title: "Business insights", desc: "The agent surfaces what changed, why it matters and what to do — pushed before you ask." },
  { n: "05", tag: "Reports", title: "Auto reports", desc: "Board decks, investor updates and weekly reviews drafted from your data on a schedule." },
  { n: "06", tag: "Anomaly", title: "Anomaly detection", desc: "Continuous monitoring flags spikes, dips and outliers across every metric the moment they appear." },
];

export default function IntelligencePage() {
  return (
    <PageShell>
      <PageHero
        badge="Company Intelligence Layer"
        title={["Turn your data", "into decisions."]}
        sub="The intelligence layer reads every signal in your company, predicts what's next, and tells you what to do — a decision assistant, not another chart."
        status={["models trained", "live forecasting", "anomaly watch on"]}
      />

      {/* decision assistant */}
      <section className="section relative overflow-hidden pt-4">
        <div className="scanbeam" aria-hidden />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal><Badge>Decision assistant</Badge></Reveal>
            <Reveal delay={60}>
              <h2 className="h-sec mt-6">
                <span className="text-snow">Ask anything.</span> <span className="text-grad">Get a decision.</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lead mt-5 max-w-xl">
                The assistant grounds every answer in your company graph — and always returns the reasoning and the
                action, not just a number.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-7">
                <Terminal
                  title="scalea — intelligence"
                  lines={[
                    { p: "you", t: "which 5 deals are most at risk?" },
                    { p: "scalea", t: "scoring 142 open deals …", ok: true },
                    { p: "scalea", t: "risk model · recency + engagement + stage", dim: true },
                    { p: "scalea", t: "top risk: Vertex ($120k) · 0 touches 18d", warn: true },
                    { p: "scalea", t: "+4 more · drafted re-engagement plan", ok: true },
                    { p: "you", t: "send to owners", caret: true },
                  ]}
                />
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-3">
              <Metric label="Forecast MRR · 90d" value="$312k" delta="+25.5% projected" />
              <Metric label="Churn risk" value="2.1%" delta="-0.4% vs last mo" />
              <Metric label="Runway" value="21 mo" delta="+3 mo" />
              <Metric label="Win rate" value="34%" delta="+6 pts" />
              <div className="col-span-2 hud rounded-xl border border-line bg-white/[0.02] p-4">
                <div className="mono text-[10px] uppercase tracking-[0.14em] text-fog">insight · just now</div>
                <p className="mt-2 text-[14px] leading-relaxed text-mist">
                  Enterprise expansion is outpacing SMB churn 3:1 — reallocating 1 AE to expansion is projected to add
                  <span className="text-snow"> $42k MRR</span> this quarter.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FeatureGrid
        label="The intelligence layer"
        heading={["From raw data", "to real direction."]}
        intro="Six capabilities that turn your company graph into foresight — always live, always grounded in your data."
        features={layers}
      />
    </PageShell>
  );
}
