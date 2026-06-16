"use client";

import { useEffect, useState } from "react";

/**
 * TypingText — types through a list of phrases, deletes, repeats.
 * Used for the "AI agent prompt" feel. Mono, with a blinking caret.
 */
export default function TypingText({
  phrases,
  className = "",
  typeMs = 42,
  holdMs = 1600,
}: {
  phrases: string[];
  className?: string;
  typeMs?: number;
  holdMs?: number;
}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(phrases[0]);
      return;
    }
    const full = phrases[i % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!del && text === full) {
      timeout = setTimeout(() => setDel(true), holdMs);
    } else if (del && text === "") {
      setDel(false);
      setI((v) => v + 1);
    } else {
      timeout = setTimeout(
        () => setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
        del ? typeMs / 1.8 : typeMs,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, del, i, phrases, typeMs, holdMs]);

  return (
    <span className={`caret ${className}`}>{text}</span>
  );
}
