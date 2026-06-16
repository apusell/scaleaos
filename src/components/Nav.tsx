"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import WalletConnect from "./WalletConnect";
import { site } from "@/lib/content";

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/70 backdrop-blur-2xl"
          : "border-b border-white/[0.04] bg-ink/20 backdrop-blur-md"
      }`}
    >
      <nav className="wrap flex h-20 items-center justify-between gap-6">
        {/* left — symbol + wordmark */}
        <Link href="/" className="flex items-center">
          <Logo size={26} withWord />
        </Link>

        {/* center — control-panel nav */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className={`navlink mono uppercase tracking-[0.08em] ${isActive(n.href) ? "active" : ""}`}>
              {n.label}
            </Link>
          ))}
        </div>

        {/* right — X · dashboard · connect wallet */}
        <div className="flex items-center gap-3">
          <a
            href={site.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ScaleaOS on X"
            className="hidden h-9 w-9 place-items-center rounded-lg border border-line text-mist transition-all hover:border-glow/40 hover:text-snow sm:grid"
          >
            <XIcon className="h-3.5 w-3.5" />
          </a>
          <Link
            href="/dashboard"
            className="navlink mono hidden uppercase tracking-[0.08em] sm:inline"
          >
            Dashboard
          </Link>
          <WalletConnect />
          <button
            onClick={() => setOpen(!open)}
            className="ml-1 grid h-9 w-9 place-items-center rounded-lg border border-line text-snow lg:hidden"
            aria-label="Menu"
          >
            <span className="text-[14px]">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      {open && (
        <div className="border-t border-line bg-ink/95 px-6 py-5 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-1">
            {site.nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`mono rounded-lg px-2 py-2.5 text-[14px] uppercase tracking-wide ${
                  isActive(n.href) ? "bg-white/[0.04] text-snow" : "text-mist hover:text-snow"
                }`}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/dashboard" className="mono mt-2 rounded-lg border border-line-2 bg-white/[0.03] px-2 py-2.5 text-center text-[13px] text-snow">
              Open Dashboard →
            </Link>
            <div className="mt-3 flex items-center gap-2">
              <WalletConnect full />
              <a
                href={site.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ScaleaOS on X"
                className="grid h-9 w-11 shrink-0 place-items-center rounded-lg border border-line text-mist"
              >
                <XIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
