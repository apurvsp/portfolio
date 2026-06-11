"use client";

import { motion } from "framer-motion";
import { EASE, Reveal, SectionLabel } from "./shared";

function Icon({ path, extra }: { path: string; extra?: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 text-cyan"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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
  span?: boolean;
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
    span: true,
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
    span: true,
  },
];

export default function Now() {
  return (
    <section id="now" className="relative px-6 md:px-14 lg:px-24 py-28 md:py-40">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel num="006" text="Updated June 2026" className="mb-5" />
        <Reveal>
          <h2 className="font-display font-extrabold text-ivory tracking-[-0.03em] leading-none text-[clamp(2.4rem,6vw,4.6rem)] mb-16">
            Currently in motion<span className="text-aurora">.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className={`glass glass-hover rounded-3xl p-7 ${
                card.span ? "lg:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.06, ease: EASE }}
            >
              <div className="flex items-center justify-between mb-6">
                {card.icon}
                <span className="font-mono text-[9px] tracking-[0.3em] text-dim">
                  N·{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display font-bold text-[19px] text-ivory mb-2.5 leading-snug tracking-[-0.01em]">
                {card.title}
              </h3>
              <p className="text-[14px] text-mist leading-[1.75]">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
