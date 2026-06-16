import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // monochrome system — black & white, intelligence-grade
        ink: "#06070a",
        "ink-2": "#0a0c10",
        panel: "#0e1116",
        line: "#1b1f27",
        "line-2": "#262b34",
        fog: "#8a909c", // muted text
        mist: "#b6bcc8", // secondary text
        snow: "#f4f6fa", // primary text
        accent: "#e8edf5", // near-white accent
        glow: "#9fb4ff", // faint cool intelligence glow (used sparingly)
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { wide: "1200px" },
    },
  },
  plugins: [],
};

export default config;
