import Link from "next/link";
import Logo from "./Logo";
import { site, footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-line py-16">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo size={28} withWord />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-fog">
              The autonomous operating system for the whole company. Engine, intelligence, workspace and automation —
              one command center, one agent.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="status"><i /> all systems operational</span>
              <a
                href={site.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ScaleaOS on X"
                className="grid h-8 w-8 place-items-center rounded-lg border border-line text-mist transition-all hover:border-glow/40 hover:text-snow"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </a>
            </div>
          </div>
          {footer.groups.map((g) => (
            <div key={g.title}>
              <h4 className="mono text-[11px] uppercase tracking-[0.18em] text-fog">{g.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[14px] text-mist transition-colors hover:text-snow">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <p className="mono text-[12px] text-fog">© 2026 {site.name} · Scale + Operating System</p>
          <p className="mono text-[12px] text-fog">Built for ScaleaOS.</p>
        </div>
      </div>
    </footer>
  );
}
