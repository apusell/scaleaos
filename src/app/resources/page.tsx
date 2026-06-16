import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import Reveal from "@/components/Reveal";
import { Badge, Terminal } from "@/components/os";

export const metadata: Metadata = { title: "Resources" };

const resources = [
  { n: "01", tag: "Guides", title: "Quickstart guides", desc: "Boot your first workspace, connect data and deploy an agent in under ten minutes." },
  { n: "02", tag: "Concepts", title: "Core concepts", desc: "The company graph, agent runtime, surfaces and the automation pipeline — explained." },
  { n: "03", tag: "API", title: "REST & GraphQL API", desc: "Read and write every record in the graph with typed, versioned, rate-limited endpoints." },
  { n: "04", tag: "SDK", title: "TypeScript SDK", desc: "A fully-typed client for the OS — build agents, tools and integrations in your own stack." },
  { n: "05", tag: "Webhooks", title: "Webhooks & events", desc: "Subscribe to graph events and drive your own systems from ScaleaOS in real time." },
  { n: "06", tag: "Status", title: "Status & changelog", desc: "Live system status, uptime history and a changelog of every shipped capability." },
];

export default function ResourcesPage() {
  return (
    <PageShell>
      <PageHero
        badge="Documentation Center"
        title={["Build on the", "operating system."]}
        sub="Everything to extend ScaleaOS — guides, core concepts, a typed API, an SDK and developer resources to program the OS to your company."
        status={["API v1 stable", "99.99% uptime", "sandbox open"]}
      />

      {/* quickstart */}
      <section className="section relative overflow-hidden pt-4">
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal><Badge>Quickstart</Badge></Reveal>
            <Reveal delay={60}>
              <h2 className="h-sec mt-6">
                <span className="text-snow">From zero to</span> <span className="text-grad">a running agent.</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lead mt-5 max-w-xl">
                Install the SDK, point it at your workspace, and ship your first autonomous workflow in minutes.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/dashboard" className="btn btn-primary">Open the console →</Link>
                <Link href="#" className="btn btn-ghost">Read the docs</Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Terminal
              title="scalea — sdk"
              lines={[
                { p: "$", t: "npm i @scaleaos/sdk", dim: true },
                { p: "code", t: "const os = new Scalea(process.env.KEY)", ok: true },
                { p: "code", t: "await os.agents.deploy('renewal-guard')", ok: true },
                { p: "sdk", t: "agent deployed · webhook registered", ok: true },
                { p: "sdk", t: "listening for graph events", caret: true },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <FeatureGrid
        label="Developer resources"
        heading={["Docs, API", "and everything in between."]}
        intro="Six pillars of documentation to learn, integrate and extend the operating system."
        features={resources}
      />
    </PageShell>
  );
}
