"use client";

import { motion } from "framer-motion";
import { EASE, FileHead } from "./shared";

function Icon({ path, extra }: { path: string; extra?: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 text-red"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
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
    icon: <Icon path="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />,
  },
  {
    title: "2026 Misogi",
    body: "One hard thing per year — something physical, uncomfortable, and far enough outside normal life that it changes your reference point. Still planning what this year's looks like.",
    icon: <Icon path="M8 4l4.5 8.5L15 9l7 12H2L8 4z" />,
  },
  {
    title: "The Mechanics of Reality",
    body: "AI-native YouTube channel — ongoing. Experimenting with fully automated scripting and video generation pipelines. Five episodes published.",
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
    <section
      id="now"
      className="relative px-5 md:px-10 py-20 md:py-28 bg-paper2 border-y-2 border-ink"
    >
      <div className="max-w-[1280px] mx-auto">
        <FileHead
          file="06"
          label="Updated June 2026"
          title={
            <>
              Currently <span className="text-red">in motion.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="group relative bg-paper border-2 border-ink p-6 hover:-translate-y-1.5 hover:shadow-hard transition-all duration-300"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.05 + i * 0.06, ease: EASE }}
            >
              <div className="flex items-center justify-between mb-5">
                {card.icon}
                <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-ink3 group-hover:text-red transition-colors duration-300">
                  N·{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-[18px] font-extrabold text-ink mb-2.5 leading-snug uppercase tracking-[0.01em]">
                {card.title}
              </h3>
              <p className="text-[14px] text-ink2 leading-[1.7]">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
