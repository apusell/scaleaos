import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Particles from "@/components/Particles";
import ScaleaCore from "@/components/ScaleaCore";
import TypingText from "@/components/TypingText";
import { Badge, SectionLabel, CommandCard, Metric, Terminal, AgentCard } from "@/components/os";
import { site, hero, stats, surfaces, agent, modules } from "@/lib/content";

export default function Home() {
  return (
    <main id="top" className="relative">
      <Nav />

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden pt-32 sm:pt-36">
        <Particles className="opacity-70" />
        <div
          className="pointer-events-none absolute left-1/2 top-[-10%] h-[640px] w-[1000px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(159,180,255,0.12), transparent 60%)" }}
          aria-hidden
        />

        <div className="wrap relative text-center">
          <Reveal>
            <div className="flex justify-center">
              <Badge>{hero.badge}</Badge>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="h-hero mx-auto mt-8 max-w-4xl">
              <span className="text-snow">{hero.title[0]}</span>
              <br />
              <span className="text-grad">{hero.title[1]}</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead mx-auto mt-7 max-w-2xl">{hero.body}</p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/dashboard" className="btn btn-primary">{hero.ctas.primary} →</Link>
              <Link href="/engine" className="btn btn-ghost">{hero.ctas.secondary}</Link>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="mono mt-6 flex items-center justify-center gap-2 text-[12.5px] text-fog">
              <span className="text-glow">›</span>
              <TypingText
                phrases={agent.prompts}
                className="text-mist"
              />
            </div>
          </Reveal>
        </div>

        {/* command-center HUD: metrics · core · console */}
        <div className="wrap relative mt-16 grid items-center gap-6 lg:grid-cols-[0.8fr_1.4fr_0.8fr]">
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              {stats.map((s) => (
                <Metric key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={80} className="order-1 lg:order-2">
            <ScaleaCore />
          </Reveal>

          <Reveal delay={160} className="order-3">
            <Terminal
              title="scalea — boot"
              lines={hero.boot}
            />
          </Reveal>
        </div>
      </section>

      {/* ───────── SURFACES ───────── */}
      <section className="section relative border-t border-line">
        <div className="wrap">
          <Reveal><SectionLabel>The operating system</SectionLabel></Reveal>
          <Reveal delay={60}>
            <h2 className="h-sec mt-5 max-w-2xl">
              <span className="text-snow">Six surfaces.</span> <span className="text-grad">One command center.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead mt-5 max-w-2xl">
              Every surface writes to one graph of your company and is run by one agent that understands all of it.
              Open any system — it&apos;s the same OS underneath.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {surfaces.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 70}>
                <CommandCard n={s.n} title={s.name} desc={s.desc} tag={s.tag} href={s.href} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── AGENT ───────── */}
      <section id="agent" className="section relative border-t border-line overflow-hidden">
        <div className="scanbeam" aria-hidden />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal><Badge>{agent.badge}</Badge></Reveal>
            <Reveal delay={60}>
              <h2 className="h-sec mt-6">
                <span className="text-snow">{agent.title[0]}</span>{" "}
                <span className="text-grad">{agent.title[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={120}><p className="lead mt-6 max-w-xl">{agent.body}</p></Reveal>
            <Reveal delay={160}>
              <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {agent.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[14.5px] text-mist">
                    <span className="grid h-5 w-5 place-items-center rounded-md border border-line text-[11px] text-glow">→</span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <Terminal
              title="scalea — agent"
              lines={[
                { p: "you", t: "why did MRR dip last week?" },
                { p: "scalea", t: "analyzing revenue graph …", ok: true },
                { p: "scalea", t: "2 enterprise renewals slipped to Q3", warn: true },
                { p: "scalea", t: "net impact: -$8.4k MRR (-3.1%)", warn: true },
                { p: "scalea", t: "drafted recovery plan · 3 actions queued", ok: true },
                { p: "you", t: "run it", caret: true },
              ]}
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <AgentCard name="Atlas" role="Operations" desc="Watches pipeline & tasks, reroutes work, keeps execution on track." />
              <AgentCard name="Ledger" role="Finance" desc="Models cashflow & runway, drafts investor updates on schedule." />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── WORKSPACE MODULES ───────── */}
      <section className="section relative border-t border-line">
        <div className="wrap">
          <Reveal><SectionLabel>Inside the workspace</SectionLabel></Reveal>
          <Reveal delay={60}>
            <h2 className="h-sec mt-5 max-w-2xl">
              <span className="text-snow">Ten modules.</span> <span className="text-grad">One operating system.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => (
              <Reveal key={m.n} delay={(i % 3) * 60}>
                <CommandCard n={m.n} title={m.name} desc={m.desc} tag={m.tag} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section id="cta" className="section relative overflow-hidden border-t border-line">
        <Particles density={28} className="opacity-50" />
        <div
          className="breathe pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(159,180,255,0.12), transparent 65%)" }}
          aria-hidden
        />
        <div className="wrap relative text-center">
          <Reveal>
            <h2 className="h-sec mx-auto max-w-3xl">
              <span className="text-snow">Your edge is your operating system.</span>{" "}
              <span className="text-grad">Put it to work.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lead mx-auto mt-6 max-w-xl">
              Give your company one command center and an agent that never sleeps. Boot the console — bring your team
              when you&apos;re ready.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/dashboard" className="btn btn-primary">Launch console →</Link>
              <Link href="/engine" className="btn btn-ghost">Explore the engine</Link>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="mono mt-6 text-[12px] text-fog">{site.tagline}</p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
