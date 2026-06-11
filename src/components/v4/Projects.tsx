"use client";

import { motion } from "framer-motion";
import { EASE, FileHead, Reveal } from "./shared";

interface Project {
  type: string;
  name: string;
  description: string;
  tags: string[];
  year: string;
}

const financialProjects: Project[] = [
  {
    type: "10-Year Model · Live Document",
    name: "PFPL Capacity Expansion — Financial Model",
    description:
      "Full 10-year integrated financial model built for Patson Doors' fiberglass manufacturing capex round. Covers revenue ramp, fixed and variable cost build-up, WDV depreciation schedule, debt service, and unlevered free cash flow. Outputs include NPV, equity IRR (high-20s under base assumptions), and a sensitivity table across capacity utilisation and average selling price. This is a live document being used for investor conversations.",
    tags: ["Excel", "DCF", "Manufacturing", "Capex"],
    year: "2025–26",
  },
  {
    type: "DCF · Pitchbook",
    name: "Comfort Systems USA — Goldman-style Analysis",
    description:
      "A practice IB exercise modelled on Goldman Sachs deal documentation. Built a full FCFF DCF with bottom-up WACC, comparable company analysis (EV/EBITDA, P/E multiples), and a pitchbook narrative for FIX. Done to develop deal structuring intuition and IB-ready output quality.",
    tags: ["DCF", "Comps", "HVAC", "Pitchbook"],
    year: "2025",
  },
  {
    type: "Equity Research",
    name: "AIA Engineering — Valuation Case Study",
    description:
      "Full equity valuation of AIA Engineering (NSE: AIAENG), a high-wear parts manufacturer. Included a detailed segment analysis, earnings quality review, competitive moat assessment, and fair value range using DCF and peer multiples. Identified as a quality compounder at a price worth watching.",
    tags: ["NSE Equity", "Valuation", "Manufacturing"],
    year: "2025",
  },
];

const softwareProjects: Project[] = [
  {
    type: "Claude Cowork · Streamlit",
    name: "Reverse-DCF Calculator",
    description:
      "A Streamlit-based tool that flips the DCF question: rather than computing intrinsic value, it reads the current market price and back-solves for the implied revenue growth rate and FCF margin the market is pricing in. Useful for quickly sanity-checking whether a market price is pricing in realistic or heroic assumptions.",
    tags: ["Python", "Streamlit", "Valuation", "Claude Cowork"],
    year: "2025",
  },
  {
    type: "Claude Code · Dashboard",
    name: "Personal Portfolio Tracker — 55 Positions",
    description:
      "A Dash-based portfolio dashboard tracking 55+ positions across Indian equities, mutual funds, and gold. Shows live P&L, allocation breakdown, sector concentration, and a normalised Z-score momentum screener for NSE equities. Replaced a sprawling spreadsheet with an actual interface.",
    tags: ["Python", "Dash", "NSE", "Claude Code"],
    year: "2025",
  },
  {
    type: "Claude Cowork · Options",
    name: "Options Greeks Visualiser",
    description:
      "An interactive web tool for visualising how Delta, Gamma, Theta, and Vega move across strike prices, expiry dates, and implied volatility levels. Built for personal use when structuring trades on NSE options. Makes the non-linear behaviour of Greeks intuitive through dynamic charts rather than static tables.",
    tags: ["React", "Options", "Derivatives", "Claude Cowork"],
    year: "2025",
  },
  {
    type: "Claude Cowork · Screener",
    name: "NSE Screener UI",
    description:
      "A front-end screener interface for Indian equities built on top of a custom momentum and quality scoring system. Filters NSE stocks by normalised Z-score rank across price momentum, volume signals, and fundamental flags. Replaced manual scanning with a filterable, sortable dashboard view.",
    tags: ["React", "NSE", "Screener", "Claude Cowork"],
    year: "2025",
  },
  {
    type: "Claude Cowork · Automation",
    name: "Morning Intel Brief",
    description:
      "A daily briefing automation that aggregates market data, overnight US/Asia moves, key macro events, and portfolio watchlist signals into a single structured digest. Delivered each morning before market open. Built as an experiment in personal information infrastructure — the goal was to eliminate tab-switching across five sources every morning.",
    tags: ["Automation", "Markets", "Claude Cowork"],
    year: "2026",
  },
];

function SpecGroup({
  group,
  label,
  projects,
  startIndex,
}: {
  group: string;
  label: string;
  projects: Project[];
  startIndex: number;
}) {
  return (
    <div className="mb-16 last:mb-0">
      <Reveal y={10}>
        <div className="flex items-stretch border-2 border-ink bg-paper mb-0">
          <span className="px-3 py-2 bg-red text-paper font-display text-[16px] tracking-wide">
            {group}
          </span>
          <span className="px-4 py-2 self-center font-mono text-[10px] font-bold uppercase tracking-[0.35em]">
            {label}
          </span>
          <span className="ml-auto px-4 py-2 self-center font-mono text-[9px] tracking-[0.2em] text-ink3">
            {String(projects.length).padStart(2, "0")} ENTRIES
          </span>
        </div>
      </Reveal>

      <div className="border-2 border-t-0 border-ink">
        {projects.map((p, i) => (
          <motion.article
            key={p.name}
            className="group relative border-b border-line-soft last:border-b-0 py-7 px-4 md:px-6 grid grid-cols-1 md:grid-cols-[56px_170px_1fr_70px] gap-3 md:gap-8 items-start hover:bg-paper2 transition-colors duration-300"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.04 + i * 0.05, ease: EASE }}
          >
            {/* Red index bar on hover */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-[4px] bg-red scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-400"
            />

            <span className="hidden md:block font-display text-[26px] leading-none text-outline-soft group-hover:text-outline-ink transition-all duration-400 pt-0.5">
              {String(startIndex + i + 1).padStart(2, "0")}
            </span>

            <span className="hidden md:block font-mono text-[9px] uppercase tracking-[0.14em] text-ink3 leading-[1.8] pt-1.5">
              {p.type}
            </span>

            <div>
              <span className="md:hidden font-mono text-[9px] uppercase tracking-[0.18em] text-ink3 block mb-2">
                {String(startIndex + i + 1).padStart(2, "0")} · {p.type} ·{" "}
                {p.year}
              </span>
              <h3 className="text-[18px] md:text-[20px] font-extrabold text-ink leading-tight mb-2.5 group-hover:text-red transition-colors duration-300">
                {p.name}
              </h3>
              <p className="text-[14.5px] text-ink2 leading-[1.7] mb-4 max-w-[660px]">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8.5px] px-2 py-[3px] border border-ink/35 text-ink2 uppercase tracking-[0.12em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <span className="hidden md:block font-mono text-[10px] text-ink3 md:text-right pt-1.5">
              {p.year}
            </span>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-5 md:px-10 py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto">
        <FileHead
          file="04"
          label="Built Work"
          title={
            <>
              The <span className="text-red">workbench.</span>
            </>
          }
          lede="A selection of financial models, software tools, and product work built across professional roles, personal experiments, and family business contexts."
        />

        <SpecGroup
          group="A"
          label="Financial Modelling"
          projects={financialProjects}
          startIndex={0}
        />
        <SpecGroup
          group="B"
          label="Software & Tools"
          projects={softwareProjects}
          startIndex={financialProjects.length}
        />

        <Reveal className="mt-10" y={10}>
          <p className="text-[14.5px] text-ink2 leading-relaxed">
            Interested in any of these?{" "}
            <a
              href="mailto:apurvsptl@gmail.com"
              className="font-bold text-red link-draw"
            >
              Reach out
            </a>{" "}
            — happy to walk through the thinking or share more detail.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
