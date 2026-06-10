"use client";

import { motion } from "framer-motion";

interface VentureCard {
  badge: string;
  badgeStyle: string;
  name: string;
  sub: string;
  description: string;
  fullWidth?: boolean;
  url?: string;
  urlLabel?: string;
}

const ventures: VentureCard[] = [
  {
    badge: "🇺🇸 US Market",
    badgeStyle:
      "border-[var(--gold)] text-[var(--gold)] bg-[rgba(200,169,106,0.07)]",
    name: "Patson Doors",
    sub: "Premium Fiberglass Entry Doors",
    description:
      "A US-facing door brand manufacturing premium fiberglass entry doors, exported to the American residential and builder market. Exhibited at IBS 2026 in Orlando. Currently in the middle of a capacity expansion funding round. I work closely with the business on strategy, financial modelling, and market entry.",
    url: "https://www.patsondoors.com",
    urlLabel: "patsondoors.com",
  },
  {
    badge: "🇮🇳 India",
    badgeStyle:
      "border-[var(--green)] text-[var(--green)] bg-[rgba(74,124,89,0.08)]",
    name: "Polychem Group",
    sub: "Precision Manufacturing",
    description:
      "A ~100-person precision tooling and components manufacturer serving automotive and industrial clients. CNC/VMC machining with a multi-decade operating history. I am involved in business development, technology integration, and long-term structuring work.",
    url: "https://www.polychemgroup.in",
    urlLabel: "polychemgroup.in",
  },
  {
    badge: "📺 Experiment",
    badgeStyle:
      "border-[var(--border2)] text-[var(--text2)] bg-[rgba(255,255,255,0.03)]",
    name: "The Mechanics of Reality",
    sub: "YouTube · Fully AI-Driven Channel",
    description:
      "An ongoing experiment in AI-native content production. I use automation tools — NotebookLM, AI video generation, scripting pipelines — to produce Wendover Productions-style explainer videos on the hidden systems behind business, economics, and design. The goal is as much to learn the toolchain as it is to build an audience. Five videos published; topics have ranged from quiet luxury supply chains to the psychology of retail environments.",
    fullWidth: true,
    url: "https://www.youtube.com/@TheMechanicsofReality",
    urlLabel: "YouTube Channel ↗",
  },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function VenturesView() {
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
          <span className="text-[var(--gold)] text-[10px] tracking-wider">02</span>
          <div className="w-6 h-px bg-[var(--border2)]" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text3)]">
            Associated Businesses
          </span>
        </div>
        <h2 className="font-serif text-[28px] md:text-[34px] text-[var(--text)] leading-tight">
          Ventures
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ventures.map((v, i) => (
          <motion.div
            key={v.name}
            className={`border border-[var(--border)] bg-[var(--surface)] p-6 flex flex-col ${
              v.fullWidth ? "md:col-span-2" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease }}
          >
            {/* Badge */}
            <span
              className={`inline-block text-[10px] px-2.5 py-1 border uppercase tracking-wider mb-4 w-fit ${v.badgeStyle}`}
            >
              {v.badge}
            </span>

            {/* Name */}
            <h3 className="font-serif text-[20px] text-[var(--text)] leading-tight mb-1">
              {v.name}
            </h3>

            {/* Sub */}
            <p className="text-[10px] uppercase tracking-[1.5px] text-[var(--text3)] mb-4">
              {v.sub}
            </p>

            {/* Description */}
            <p className="text-[13px] text-[var(--text2)] leading-[1.8] flex-1">
              {v.description}
            </p>

            {/* URL */}
            {v.url && (
              <a
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-[11px] text-[var(--gold)] hover:text-[var(--gold2)] transition-colors duration-150 self-start"
              >
                {v.urlLabel} ↗
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
