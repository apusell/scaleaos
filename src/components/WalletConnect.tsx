"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * WalletConnect — lightweight Solana (Phantom) connect button.
 * No heavy adapter deps (React 19 friendly): talks to window.solana directly.
 * Shows "Connect wallet" → on connect shows truncated address (click to copy,
 * long-press / second click menu to disconnect).
 */

type PhantomProvider = {
  isPhantom?: boolean;
  publicKey?: { toString(): string } | null;
  isConnected?: boolean;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString(): string } }>;
  disconnect: () => Promise<void>;
  on: (event: string, cb: (args: unknown) => void) => void;
  removeAllListeners?: (event: string) => void;
};

function getProvider(): PhantomProvider | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { solana?: PhantomProvider; phantom?: { solana?: PhantomProvider } };
  const p = w.phantom?.solana ?? w.solana;
  return p?.isPhantom ? p : null;
}

const short = (a: string) => `${a.slice(0, 4)}…${a.slice(-4)}`;

export default function WalletConnect({ full = false, className = "" }: { full?: boolean; className?: string }) {
  const [addr, setAddr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menu, setMenu] = useState(false);

  // restore session — only if the wallet is already connected, so we never
  // fire a request that Phantom would reject + log to the console.
  useEffect(() => {
    const p = getProvider();
    if (!p) return;
    if (p.isConnected && p.publicKey) {
      setAddr(p.publicKey.toString());
    }
    const onConnect = () => {
      const pk = getProvider()?.publicKey;
      if (pk) setAddr(pk.toString());
    };
    const onDisconnect = () => setAddr(null);
    p.on("connect", onConnect);
    p.on("disconnect", onDisconnect);
    return () => {
      p.removeAllListeners?.("connect");
      p.removeAllListeners?.("disconnect");
    };
  }, []);

  const connect = useCallback(async () => {
    const p = getProvider();
    if (!p) {
      window.open("https://phantom.app/", "_blank", "noopener,noreferrer");
      return;
    }
    try {
      setBusy(true);
      const res = await p.connect();
      setAddr(res.publicKey.toString());
    } catch {
      /* user rejected */
    } finally {
      setBusy(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await getProvider()?.disconnect();
    } catch {
      /* noop */
    }
    setAddr(null);
    setMenu(false);
  }, []);

  const copy = useCallback(() => {
    if (!addr) return;
    navigator.clipboard?.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [addr]);

  if (!addr) {
    return (
      <button
        onClick={connect}
        disabled={busy}
        className={`group inline-flex items-center justify-center gap-2 rounded-lg border border-line-2 bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-snow transition-all hover:border-glow/40 hover:bg-white/[0.06] hover:shadow-[0_0_24px_-6px_rgba(159,180,255,0.5)] disabled:opacity-60 ${
          full ? "w-full" : ""
        } ${className}`}
      >
        <span className="status"><i /></span>
        {busy ? "Connecting…" : "Connect wallet"}
      </button>
    );
  }

  return (
    <div className={`relative ${full ? "w-full" : ""} ${className}`}>
      <button
        onClick={() => setMenu((v) => !v)}
        className={`inline-flex items-center justify-center gap-2 rounded-lg border border-line-2 bg-white/[0.05] px-4 py-2 text-[13px] font-medium text-snow transition-all hover:border-glow/40 ${
          full ? "w-full" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_8px_#9fb4ff]" />
        <span className="mono">{short(addr)}</span>
      </button>
      {menu && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-line bg-ink/95 backdrop-blur-xl">
          <button onClick={copy} className="block w-full px-3.5 py-2.5 text-left text-[13px] text-mist transition-colors hover:bg-white/[0.04] hover:text-snow">
            {copied ? "Copied ✓" : "Copy address"}
          </button>
          <button onClick={disconnect} className="block w-full border-t border-line px-3.5 py-2.5 text-left text-[13px] text-mist transition-colors hover:bg-white/[0.04] hover:text-snow">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
