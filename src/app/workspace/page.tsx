import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import Reveal from "@/components/Reveal";
import { Badge, Metric } from "@/components/os";
import { modules } from "@/lib/content";

export const metadata: Metadata = { title: "Workspace" };

const surfaces = [
  { n: "01", tag: "Teams", title: "Teams & workspaces", desc: "Multiple organizations, members, roles and permissions — clean multi-tenant from day one." },
  { n: "02", tag: "Projects", title: "Projects & roadmap", desc: "Tasks, kanban, timeline and goals — execution that stays connected to outcomes." },
  { n: "03", tag: "Docs", title: "Document intelligence", desc: "Upload files, get AI summaries, search a company knowledge base and build the wiki." },
  { n: "04", tag: "CRM", title: "CRM & pipeline", desc: "Customers, leads, deal pipeline and customer analytics — your whole funnel in one view." },
  { n: "05", tag: "Finance", title: "Finance & cashflow", desc: "Revenue, expenses, runway, investor reports and AI-assisted financial forecasting." },
  { n: "06", tag: "Search", title: "Universal command", desc: "One ⌘K palette to jump, query and act across every record in the company." },
];

export default function WorkspacePage() {
  return (
    <PageShell>
      <PageHero
        badge="Business Command Workspace"
        title={["Run the whole company", "from one surface."]}
        sub="Teams, projects, documents, CRM and finance — unified in one command workspace where every record shares the same graph and the same agent."
        status={["4 workspaces", "38 members", "realtime sync"]}
      />

      {/* live snapshot */}
      <section className="section relative overflow-hidden pt-4">
        <div className="wrap relative">
          <Reveal><Badge>Live snapshot</Badge></Reveal>
          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            <Metric label="Members" value="38" />
            <Metric label="Open deals" value="142" delta="+12" />
            <Metric label="Pipeline" value="$1.92M" delta="+8.1%" />
            <Metric label="MRR" value="$248.6k" delta="+12.4%" />
            <Metric label="Active tasks" value="276" />
            <Metric label="Docs indexed" value="1,940" />
          </div>
        </div>
      </section>

      <FeatureGrid
        label="The workspace"
        heading={["Five surfaces.", "One source of truth."]}
        intro="Each surface is powerful alone and unstoppable together — because they share one graph of your company."
        features={surfaces}
      />

      <FeatureGrid
        label="Inside the workspace"
        heading={["Ten modules,", "fully connected."]}
        features={modules.map((m) => ({ n: m.n, title: m.name, desc: m.desc, tag: m.tag }))}
      />
    </PageShell>
  );
}
