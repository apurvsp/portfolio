"use client";

import { motion } from "framer-motion";

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

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ProjectRow({ project, i }: { project: Project; i: number }) {
  return (
    <motion.div
      className="border-b border-[var(--border)] py-5"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 + i * 0.06, ease }}
    >
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-[140px_1fr_64px] gap-6 items-start">
        <p className="text-[10px] text-[var(--text3)] leading-relaxed pt-0.5">
          {project.type}
        </p>
        <div>
          <h3 className="font-serif text-[16px] text-[var(--text)] mb-2 hover:text-[var(--gold)] transition-colors duration-200 cursor-default leading-tight">
            {project.name}
          </h3>
          <p className="text-[12.5px] text-[var(--text2)] leading-[1.75] mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] px-2 py-0.5 border border-[var(--border2)] text-[var(--text3)] uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[10px] text-[var(--text3)] text-right pt-0.5">
          {project.year}
        </p>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <h3 className="font-serif text-[15px] text-[var(--text)] mb-2 leading-tight">
          {project.name}
        </h3>
        <p className="text-[12px] text-[var(--text2)] leading-[1.75] mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] px-2 py-0.5 border border-[var(--border2)] text-[var(--text3)] uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-[var(--text3)]">{project.year}</p>
      </div>
    </motion.div>
  );
}

function GroupLabel({ label, offset }: { label: string; offset: number }) {
  return (
    <motion.div
      className="flex items-center gap-4 py-3 mb-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: offset, ease }}
    >
      <span className="text-[9px] uppercase tracking-[2px] text-[var(--text3)] whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-[var(--border)]" />
    </motion.div>
  );
}

export default function ProjectsView() {
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
          <span className="text-[var(--gold)] text-[10px] tracking-wider">03</span>
          <div className="w-6 h-px bg-[var(--border2)]" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text3)]">
            Built Work
          </span>
        </div>
        <h2 className="font-serif text-[28px] md:text-[34px] text-[var(--text)] leading-tight mb-3">
          Projects
        </h2>
        <p className="text-[13px] text-[var(--text2)] max-w-[480px] leading-relaxed">
          A selection of financial models, software tools, and product work
          built across professional roles, personal experiments, and family
          business contexts.
        </p>
      </motion.div>

      {/* Group 1 */}
      <GroupLabel label="Financial Modelling" offset={0.12} />
      {financialProjects.map((p, i) => (
        <ProjectRow key={p.name} project={p} i={i} />
      ))}

      {/* Group 2 */}
      <div className="mt-8">
        <GroupLabel label="Software & Tools" offset={0.2} />
        {softwareProjects.map((p, i) => (
          <ProjectRow key={p.name} project={p} i={i + financialProjects.length} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="mt-10 pt-6 border-t border-[var(--border)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease }}
      >
        <p className="text-[12px] text-[var(--text3)] leading-relaxed">
          Interested in any of these?{" "}
          <a
            href="mailto:apurvsptl@gmail.com"
            className="text-[var(--gold)] hover:text-[var(--gold2)] transition-colors duration-150"
          >
            Reach out
          </a>{" "}
          — happy to walk through the thinking or share more detail.
        </p>
      </motion.div>
    </div>
  );
}
