"use client";

import { motion } from "framer-motion";
import { EASE, SectionHead } from "./shared";

function Icon({ path, extra }: { path: string; extra?: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
      {extra}
    </svg>
  );
}

interface NowCard {
  title: string;
  body: string;
  icon: React.ReactNode;
}

const cards: NowCard[] = [
  {
    title: "PFPL Funding Round",
    body: "Raising for fiberglass door manufacturing capacity expansion. Finalising investor outreach and demand validation via LOIs from US contractors.",
    // Factory
    icon: (
      <Icon
        path="M2 20h20M4 20v-9l5 3.5V11l5 3.5V4h6v16"
        extra={<path d="M21.5 8h-2" />}
      />
    ),
  },
  {
    title: "Learning Mandarin",
    body: "HSK prep ongoing via HelloChinese. Informed by a long-term thesis on India-China manufacturing complementarity — started as curiosity, becoming conviction.",
    // Hanko seal with 中
    icon: (
      <Icon
        path="M4 4h16v16H4z"
        extra={
          <text
            x="12"
            y="15.5"
            textAnchor="middle"
            fontSize="11"
            fill="currentColor"
            stroke="none"
          >
            中
          </text>
        }
      />
    ),
  },
  {
    title: "M&A Coursework",
    body: "Deepening knowledge of deal structuring, LBO mechanics, and cross-border M&A via self-directed reading and case work. Building toward deal exposure.",
    // Rising chart
    icon: (
      <Icon
        path="M3 3v18h18"
        extra={<path d="M7 15l4-4 3 3 6-7M20 7h-4M20 7v4" />}
      />
    ),
  },
  {
    title: "Planning the Next Trip",
    body: "Always have a trip on the horizon. Looking at Japan and possibly South America next. Travel is how I reset and how I think differently about the things I work on.",
    // Paper plane
    icon: <Icon path="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />,
  },
  {
    title: "2026 Misogi",
    body: "One hard thing per year — something physical, uncomfortable, and far enough outside normal life that it changes your reference point. Still planning what this year's looks like.",
    // Mountain peaks
    icon: <Icon path="M8 4l4.5 8.5L15 9l7 12H2L8 4z" />,
  },
  {
    title: "The Mechanics of Reality",
    body: "AI-native YouTube channel — ongoing. Experimenting with fully automated scripting and video generation pipelines. Five episodes published.",
    // Play
    icon: (
      <Icon
        path="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"
        extra={<path d="M10 8.5l6 3.5-6 3.5v-7z" />}
      />
    ),
  },
];

export default function Now() {
  return (
    <section id="now" className="relative px-6 md:px-14 lg:px-24 xl:px-32 py-24 md:py-36">
      <div className="max-w-[1100px] mx-auto">
        <SectionHead
          num="06"
          label="Updated June 2026"
          title={
            <>
              Currently <em className="italic text-gold">in motion.</em>
            </>
          }
        />

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
              <div className="flex items-center justify-between mb-5">
                {card.icon}
                <span className="font-mono text-[9px] tracking-[0.3em] text-text3">
                  N·{String(i + 1).padStart(2, "0")}
                </span>
              </div>
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
