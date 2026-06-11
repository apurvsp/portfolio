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
        display: ["var(--font-bricolage)", "Georgia", "sans-serif"],
        sans: ["var(--font-manrope)", "Helvetica Neue", "sans-serif"],
        mono: ["var(--font-plexmono)", "ui-monospace", "monospace"],
      },
      colors: {
        void: "var(--void)",
        void2: "var(--void2)",
        bone: "var(--bone)",
        bone2: "var(--bone2)",
        ivory: "var(--ivory)",
        mist: "var(--mist)",
        dim: "var(--dim)",
        violet: "var(--violet)",
        "violet-bright": "var(--violet-bright)",
        cyan: "var(--cyan)",
        magenta: "var(--magenta)",
        line: "var(--line)",
        line2: "var(--line2)",
        linedark: "var(--linedark)",
        linedark2: "var(--linedark2)",
      },
      boxShadow: {
        glow: "0 0 80px rgba(124, 93, 250, 0.25)",
        "glow-soft": "0 0 50px rgba(124, 93, 250, 0.14)",
        card: "0 30px 60px -20px rgba(7, 6, 11, 0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
