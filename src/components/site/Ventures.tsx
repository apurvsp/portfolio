"use client";

import { motion } from "framer-motion";
import { EASE, SectionHead } from "./shared";

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
    index: "I",
    badge: "🇺🇸 US Market",
    badgeClass:
      "border-[rgba(201,169,110,0.5)] text-gold bg-[rgba(201,169,110,0.06)]",
    name: "Patson Doors",
    sub: "Premium Fiberglass Entry Doors",
    description:
      "A US-facing door brand manufacturing premium fiberglass entry doors, exported to the American residential and builder market. Exhibited at IBS 2026 in Orlando. Currently in the middle of a capacity expansion funding round. I work closely with the business on strategy, financial modelling, and market entry.",
    url: "https://www.patsondoors.com",
    urlLabel: "patsondoors.com",
  },
  {
    index: "II",
    badge: "🇮🇳 India",
    badgeClass:
      "border-[rgba(93,138,107,0.55)] text-green bg-[rgba(93,138,107,0.07)]",
    name: "Polychem Group",
    sub: "Precision Manufacturing",
    description:
      "A ~100-person precision tooling and components manufacturer serving automotive and industrial clients. CNC/VMC machining with a multi-decade operating history. I am involved in business development, technology integration, and long-term structuring work.",
    url: "https://www.polychemgroup.in",
    urlLabel: "polychemgroup.in",
  },
  {
    index: "III",
    badge: "📺 Experiment",
    badgeClass: "border-border2 text-text2 bg-[rgba(255,255,255,0.03)]",
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
      className="relative px-6 md:px-14 lg:px-24 xl:px-32 py-24 md:py-36 bg-surface border-y border-border"
    >
      <div className="max-w-[1100px] mx-auto">
        <SectionHead
          num="03"
          label="Associated Businesses"
          title={
            <>
              The <em className="italic text-gold">holdings.</em>
            </>
          }
          lede="Operating businesses and experiments I'm building, backing, or running — across two continents and one YouTube channel."
        />

        <div>
          {ventures.map((v, i) => (
            <motion.div
              key={v.name}
              className="group relative border-t border-border last:border-b py-12 md:py-14 grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-6 md:gap-10 items-start hover:bg-[rgba(201,169,110,0.025)] transition-colors duration-500"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, delay: i * 0.08, ease: EASE }}
            >
              {/* Roman numeral */}
              <span
                aria-hidden="true"
                className="hidden md:block font-serif italic text-[64px] leading-none text-outline select-none pt-1"
              >
                {v.index}
              </span>

              <div className="max-w-[620px]">
                <span
                  className={`inline-block font-mono text-[9px] px-2.5 py-1 border uppercase tracking-[0.18em] mb-5 ${v.badgeClass}`}
                >
                  {v.badge}
                </span>
                <h3
                  className="font-serif text-text leading-[1.05] tracking-[-0.01em] mb-2 group-hover:text-gold transition-colors duration-400"
                  style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)" }}
                >
                  {v.name}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text3 mb-6">
                  {v.sub}
                </p>
                <p className="font-serif text-[16px] md:text-[16.5px] text-text2 leading-[1.8]">
                  {v.description}
                </p>
              </div>

              {/* Link */}
              <div className="md:pt-2 md:text-right">
                {v.url && (
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold link-draw pb-1"
                  >
                    {v.urlLabel}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
