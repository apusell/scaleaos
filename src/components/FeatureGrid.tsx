import Reveal from "./Reveal";
import { SectionLabel } from "./os";

/**
 * FeatureGrid — a labelled section of feature cards used across sub-routes.
 */
export type Feature = { n: string; title: string; desc: string; tag?: string };

export default function FeatureGrid({
  label,
  heading,
  intro,
  features,
  cols = 3,
}: {
  label: string;
  heading: [string, string];
  intro?: string;
  features: Feature[];
  cols?: 2 | 3;
}) {
  return (
    <section className="section relative border-t border-line">
      <div className="wrap">
        <Reveal><SectionLabel>{label}</SectionLabel></Reveal>
        <Reveal delay={60}>
          <h2 className="h-sec mt-5 max-w-2xl">
            <span className="text-snow">{heading[0]}</span> <span className="text-grad">{heading[1]}</span>
          </h2>
        </Reveal>
        {intro && <Reveal delay={120}><p className="lead mt-5 max-w-2xl">{intro}</p></Reveal>}
        <div className={`mt-12 grid gap-4 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
          {features.map((f, i) => (
            <Reveal key={f.n} delay={(i % cols) * 70}>
              <div className="card group h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="mono text-[12px] text-fog">{f.n}</span>
                  {f.tag && <span className="chip mono !text-[10px] uppercase tracking-wide">{f.tag}</span>}
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-snow">{f.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-mist">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
