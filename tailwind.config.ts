import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        sans: ["var(--font-archivo)", "Helvetica Neue", "sans-serif"],
        mono: ["var(--font-spacemono)", "ui-monospace", "monospace"],
      },
      colors: {
        paper: "var(--paper)",
        paper2: "var(--paper2)",
        paper3: "var(--paper3)",
        ink: "var(--ink)",
        ink2: "var(--ink2)",
        ink3: "var(--ink3)",
        red: "var(--red)",
        blue: "var(--blue)",
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
      },
      boxShadow: {
        hard: "6px 6px 0 0 var(--ink)",
        "hard-sm": "4px 4px 0 0 var(--ink)",
        "hard-red": "6px 6px 0 0 var(--red)",
        "hard-blue": "6px 6px 0 0 var(--blue)",
      },
    },
  },
  plugins: [],
};
export default config;
