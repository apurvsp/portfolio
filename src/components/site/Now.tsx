"use client";

import { motion } from "framer-motion";
import { EASE, SectionHead } from "./shared";

interface NowCard {
  title: string;
  body: string;
}

const cards: NowCard[] = [
  {
    title: "PFPL Funding Round",
    body: "Raising for fiberglass door manufacturing capacity expansion. Finalising investor outreach and demand validation via LOIs from US contractors.",
  },
  {
    title: "Learning Mandarin",
    body: "HSK prep ongoing via HelloChinese. Informed by a long-term thesis on India-China manufacturing complementarity — started as curiosity, becoming conviction.",
  },
  {
    title: "M&A Coursework",
    body: "Deepening knowledge of deal structuring, LBO mechanics, and cross-border M&A via self-directed reading and case work. Building toward deal exposure.",
  },
  {
    title: "Planning the Next Trip",
    body: "Always have a trip on the horizon. Looking at Japan and possibly South America next. Travel is how I reset and how I think differently about the things I work on.",
  },
  {
    title: "2026 Misogi",
    body: "One hard thing per year — something physical, uncomfortable, and far enough outside normal life that it changes your reference point. Still planning what this year's looks like.",
  },
  {
    title: "The Mechanics of Reality",
    body: "AI-native YouTube channel — ongoing. Experimenting with fully automated scripting and video generation pipelines. Five episodes published.",
  },
];

function Stamp() {
  const text = "UPDATED JUNE 2026 · WHAT I'M WORKING ON · ";
  return (
    <div className="relative w-[110px] h-[110px] hidden md:flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path
            id="stamp-circle"
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          />
        </defs>
        <text className="fill-[var(--text3)]" style={{ fontSize: 8.2, letterSpacing: 1.8, fontFamily: "var(--font-geist-mono)" }}>
          <textPath href="#stamp-circle">{text}</textPath>
        </text>
      </svg>
      <span className="font-serif italic text-[26px] text-gold">Now</span>
    </div>
  );
}

export default function Now() {
  return (
    <section id="now" className="relative px-6 md:px-14 lg:px-24 xl:px-32 py-24 md:py-36">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-start justify-between gap-8">
          <SectionHead
            num="06"
            label="Updated June 2026"
            title={
              <>
                Currently <em className="italic text-gold">in motion.</em>
              </>
            }
          />
          <Stamp />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="group relative bg-surface border border-border p-7 hover:border-gold2 transition-colors duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.06, ease: EASE }}
            >
              {/* Corner accent */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 w-7 h-7 border-l border-b border-border group-hover:border-gold2 transition-colors duration-500"
              />
              <span className="font-mono text-[9px] tracking-[0.3em] text-gold block mb-5">
                N·{String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-[20px] text-text mb-3 leading-snug group-hover:text-gold transition-colors duration-300">
                {card.title}
              </h3>
              <p className="font-serif text-[15px] text-text2 leading-[1.75]">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
