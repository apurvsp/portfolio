"use client";

import { motion } from "framer-motion";

interface NowCard {
  icon: string;
  title: string;
  body: string;
}

const cards: NowCard[] = [
  {
    icon: "🏭",
    title: "PFPL Funding Round",
    body: "Raising for fiberglass door manufacturing capacity expansion. Finalising investor outreach and demand validation via LOIs from US contractors.",
  },
  {
    icon: "🀄",
    title: "Learning Mandarin",
    body: "HSK prep ongoing via HelloChinese. Informed by a long-term thesis on India-China manufacturing complementarity — started as curiosity, becoming conviction.",
  },
  {
    icon: "📊",
    title: "M&A Coursework",
    body: "Deepening knowledge of deal structuring, LBO mechanics, and cross-border M&A via self-directed reading and case work. Building toward deal exposure.",
  },
  {
    icon: "✈️",
    title: "Planning the Next Trip",
    body: "Always have a trip on the horizon. Looking at Japan and possibly South America next. Travel is how I reset and how I think differently about the things I work on.",
  },
  {
    icon: "🌍",
    title: "2026 Misogi",
    body: "One hard thing per year — something physical, uncomfortable, and far enough outside normal life that it changes your reference point. Still planning what this year's looks like.",
  },
  {
    icon: "🎬",
    title: "The Mechanics of Reality",
    body: "AI-native YouTube channel — ongoing. Experimenting with fully automated scripting and video generation pipelines. Five episodes published.",
  },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function NowView() {
  return (
    <div className="px-8 md:px-12 lg:px-16 py-14 max-w-3xl">
      {/* Section header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[var(--gold)] text-[10px] tracking-wider">05</span>
          <div className="w-6 h-px bg-[var(--border2)]" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text3)]">
            Updated June 2026
          </span>
        </div>
        <h2 className="font-serif text-[28px] md:text-[34px] text-[var(--text)] leading-tight">
          What I&apos;m Working On
        </h2>
      </motion.div>

      {/* Cards grid: 3-col desktop, 2-col tablet, 1-col mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="bg-[var(--surface)] border border-[var(--border)] p-[22px]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 + i * 0.07, ease }}
          >
            <span className="text-[22px] mb-3 block">{card.icon}</span>
            <h3 className="font-serif text-[15px] text-[var(--text)] mb-2 leading-snug">
              {card.title}
            </h3>
            <p className="text-[12.5px] text-[var(--text2)] leading-[1.75]">
              {card.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
