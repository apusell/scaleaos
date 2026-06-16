import Reveal from "./Reveal";
import { Badge, StatusDot } from "./os";

/**
 * PageHero — standard header for sub-routes: badge, huge title, lead, status row.
 */
export default function PageHero({
  badge,
  title,
  sub,
  status,
}: {
  badge: string;
  title: [string, string];
  sub: string;
  status?: string[];
}) {
  return (
    <section className="section relative overflow-hidden pb-10 pt-16">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(159,180,255,0.10), transparent 65%)" }}
        aria-hidden
      />
      <div className="scanbeam" aria-hidden />
      <div className="wrap relative">
        <Reveal>
          <Badge>{badge}</Badge>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="h-page mt-7 max-w-4xl">
            <span className="text-snow">{title[0]}</span>{" "}
            <span className="text-grad">{title[1]}</span>
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="lead mt-6 max-w-2xl">{sub}</p>
        </Reveal>
        {status && (
          <Reveal delay={180}>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line pt-6">
              {status.map((s) => (
                <StatusDot key={s} label={s} />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
