"use client";

import { motion } from "framer-motion";
import { EASE, FileHead } from "./shared";

interface Venture {
  index: string;
  badge: string;
  badgeClass: string;
  name: string;
  sub: string;
  description: string;
  url?: string;
  urlLabel?: string;
}

const ventures: Venture[] = [
  {
    index: "01",
    badge: "US MARKET",
    badgeClass: "bg-red text-paper",
    name: "Patson Doors",
    sub: "Premium Fiberglass Entry Doors",
    description:
      "A US-facing door brand manufacturing premium fiberglass entry doors, exported to the American residential and builder market. Exhibited at IBS 2026 in Orlando. Currently in the middle of a capacity expansion funding round. I work closely with the business on strategy, financial modelling, and market entry.",
    url: "https://www.patsondoors.com",
    urlLabel: "patsondoors.com",
  },
  {
    index: "02",
    badge: "INDIA",
    badgeClass: "bg-blue text-paper",
    name: "Polychem Group",
    sub: "Precision Manufacturing",
    description:
      "A ~100-person precision tooling and components manufacturer serving automotive and industrial clients. CNC/VMC machining with a multi-decade operating history. I am involved in business development, technology integration, and long-term structuring work.",
    url: "https://www.polychemgroup.in",
    urlLabel: "polychemgroup.in",
  },
  {
    index: "03",
    badge: "EXPERIMENT",
    badgeClass: "bg-ink text-paper",
    name: "The Mechanics of Reality",
    sub: "YouTube · Fully AI-Driven Channel",
    description:
      "An ongoing experiment in AI-native content production. I use automation tools — NotebookLM, AI video generation, scripting pipelines — to produce Wendover Productions-style explainer videos on the hidden systems behind business, economics, and design. The goal is as much to learn the toolchain as it is to build an audience. Five videos published; topics have ranged from quiet luxury supply chains to the psychology of retail environments.",
    url: "https://www.youtube.com/@TheMechanicsofReality",
    urlLabel: "YouTube Channel",
  },
];

export default function Ventures() {
  return (
    <section
      id="ventures"
      className="relative px-5 md:px-10 py-20 md:py-28 bg-paper2 border-y-2 border-ink"
    >
      <div className="max-w-[1280px] mx-auto">
        <FileHead
          file="03"
          label="Associated Businesses"
          title={
            <>
              The <span className="text-red">holdings.</span>
            </>
          }
          lede="Operating businesses and experiments I'm building, backing, or running — across two continents and one YouTube channel."
        />

        <div className="border-t-2 border-ink">
          {ventures.map((v, i) => (
            <motion.a
              key={v.name}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border-b-2 border-ink overflow-hidden"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              {/* Ink fill sweeps up on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-ink translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />

              <div className="relative grid grid-cols-1 md:grid-cols-[90px_1fr_auto] gap-5 md:gap-10 items-start py-10 md:py-12">
                {/* Index numeral */}
                <span className="hidden md:block font-display text-[56px] leading-none text-outline-soft group-hover:text-outline-paper transition-all duration-500 pt-1">
                  {v.index}
                </span>

                <div className="max-w-[680px]">
                  <span
                    className={`inline-block font-mono text-[9px] font-bold px-2.5 py-1 uppercase tracking-[0.2em] mb-4 ${v.badgeClass}`}
                  >
                    {v.badge}
                  </span>
                  <h3
                    className="font-display uppercase leading-[0.95] tracking-[0.01em] mb-2 text-ink group-hover:text-paper transition-colors duration-400"
                    style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.6rem)" }}
                  >
                    {v.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink3 group-hover:text-paper/60 transition-colors duration-400 mb-5">
                    {v.sub}
                  </p>
                  <p className="text-[15px] md:text-[15.5px] leading-[1.75] text-ink2 group-hover:text-paper/80 transition-colors duration-400">
                    {v.description}
                  </p>
                </div>

                {/* Arrow + link */}
                <div className="flex md:flex-col items-center md:items-end gap-3 md:pt-2">
                  <span className="w-12 h-12 flex items-center justify-center border-2 border-ink text-[20px] text-ink group-hover:border-red group-hover:bg-red group-hover:text-paper group-hover:rotate-45 transition-all duration-400">
                    ↗
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink2 group-hover:text-paper/70 transition-colors duration-400">
                    {v.urlLabel}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
