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
        serif: ["var(--font-garamond)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        bg: "#0c0b09",
        surface: "#131210",
        surface2: "#1a1916",
        border: "#252320",
        border2: "#302e2b",
        text: "#e2ddd5",
        text2: "#9c9590",
        text3: "#5c5853",
        gold: "#c8a96a",
        gold2: "#a07840",
        green: "#4a7c59",
      },
    },
  },
  plugins: [],
};
export default config;
