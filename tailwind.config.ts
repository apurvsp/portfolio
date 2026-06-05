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
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        bg: "#090909",
        surface: "#0f0f0f",
        "surface-raised": "#141414",
        border: "#1a1a1a",
        "border-subtle": "#131313",
        primary: "#eeebe4",
        secondary: "#7a7a7a",
        muted: "#3a3a3a",
        accent: "#c8a87a",
        "accent-dim": "rgba(200, 168, 122, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
