"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { EASE, Reveal, SectionLabel } from "./shared";

interface Project {
  type: string;
  name: string;
  description: string;
  tags: string[];
  year: string;
  hue: number; // preview card tint
}

const financialProjects: Project[] = [
  {
    type: "10-Year Model · Live Document",
    name: "PFPL Capacity Expansion — Financial Model",
    description:
      "Full 10-year integrated financial model built for Patson Doors' fiberglass manufacturing capex round. Covers revenue ramp, fixed and variable cost build-up, WDV depreciation schedule, debt service, and unlevered free cash flow. Outputs include NPV, equity IRR (high-20s under base assumptions), and a sensitivity table across capacity utilisation and average selling price. This is a live document being used for investor conversations.",
    tags: ["Excel", "DCF", "Manufacturing", "Capex"],
    year: "2025–26",
    hue: 255,
  },
  {
    type: "DCF · Pitchbook",
    name: "Comfort Systems USA — Goldman-style Analysis",
    description:
      "A practice IB exercise modelled on Goldman Sachs deal documentation. Built a full FCFF DCF with bottom-up WACC, comparable company analysis (EV/EBITDA, P/E multiples), and a pitchbook narrative for FIX. Done to develop deal structuring intuition and IB-ready output quality.",
    tags: ["DCF", "Comps", "HVAC", "Pitchbook"],
    year: "2025",
    hue: 215,
  },
  {
    type: "Equity Research",
    name: "AIA Engineering — Valuation Case Study",
    description:
      "Full equity valuation of AIA Engineering (NSE: AIAENG), a high-wear parts manufacturer. Included a detailed segment analysis, earnings quality review, competitive moat assessment, and fair value range using DCF and peer multiples. Identified as a quality compounder at a price worth watching.",
    tags: ["NSE Equity", "Valuation", "Manufacturing"],
    year: "2025",
    hue: 285,
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
    hue: 190,
  },
  {
    type: "Claude Code · Dashboard",
    name: "Personal Portfolio Tracker — 55 Positions",
    description:
      "A Dash-based portfolio dashboard tracking 55+ positions across Indian equities, mutual funds, and gold. Shows live P&L, allocation breakdown, sector concentration, and a normalised Z-score momentum screener for NSE equities. Replaced a sprawling spreadsheet with an actual interface.",
    tags: ["Python", "Dash", "NSE", "Claude Code"],
    year: "2025",
    hue: 250,
  },
  {
    type: "Claude Cowork · Options",
    name: "Options Greeks Visualiser",
    description:
      "An interactive web tool for visualising how Delta, Gamma, Theta, and Vega move across strike prices, expiry dates, and implied volatility levels. Built for personal use when structuring trades on NSE options. Makes the non-linear behaviour of Greeks intuitive through dynamic charts rather than static tables.",
    tags: ["React", "Options", "Derivatives", "Claude Cowork"],
    year: "2025",
    hue: 320,
  },
  {
    type: "Claude Cowork · Screener",
    name: "NSE Screener UI",
    description:
      "A front-end screener interface for Indian equities built on top of a custom momentum and quality scoring system. Filters NSE stocks by normalised Z-score rank across price momentum, volume signals, and fundamental flags. Replaced manual scanning with a filterable, sortable dashboard view.",
    tags: ["React", "NSE", "Screener", "Claude Cowork"],
    year: "2025",
    hue: 165,
  },
  {
    type: "Claude Cowork · Automation",
    name: "Morning Intel Brief",
    description:
      "A daily briefing automation that aggregates market data, overnight US/Asia moves, key macro events, and portfolio watchlist signals into a single structured digest. Delivered each morning before market open. Built as an experiment in personal information infrastructure — the goal was to eliminate tab-switching across five sources every morning.",
    tags: ["Automation", "Markets", "Claude Cowork"],
    year: "2026",
    hue: 35,
  },
];

const all = [...financialProjects, ...softwareProjects];

function Row({
  p,
  num,
  onEnter,
  onLeave,
}: {
  p: Project;
  num: number;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      className="group border-b border-line"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: 0.04, ease: EASE }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button
        className="w-full text-left py-7 md:py-8 grid grid-cols-[44px_1fr_auto] gap-4 md:gap-8 items-baseline"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        data-cursor-label={open ? "CLOSE" : "OPEN"}
      >
        <span className="font-mono text-[11px] text-dim group-hover:text-violet-bright transition-colors duration-300">
          {String(num).padStart(2, "0")}
        </span>
        <span>
          <span className="block font-display font-bold text-[19px] md:text-[24px] text-ivory leading-tight tracking-[-0.015em] transition-transform duration-500 group-hover:translate-x-2">
            {p.name}
          </span>
          <span className="block mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-dim">
            {p.type}
          </span>
        </span>
        <span className="flex items-center gap-5">
          <span className="hidden md:block font-mono text-[10px] text-dim">
            {p.year}
          </span>
          <motion.span
            className="text-mist text-[13px]"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            ＋
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-[44px] md:pl-[76px] pr-4 max-w-[760px]">
              <p className="text-[15px] text-mist leading-[1.8] mb-5">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8.5px] px-2.5 py-1 rounded-full border border-line text-dim uppercase tracking-[0.14em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [fine, setFine] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 200, damping: 24, mass: 0.6 });
  const py = useSpring(my, { stiffness: 200, damping: 24, mass: 0.6 });

  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  function onMove(e: React.MouseEvent) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  const active = activeIdx !== null ? all[activeIdx] : null;

  return (
    <section
      id="projects"
      ref={sectionRef}
      onMouseMove={fine ? onMove : undefined}
      className="relative px-6 md:px-14 lg:px-24 py-28 md:py-40"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel num="004" text="Built Work" className="mb-5" />
        <Reveal>
          <h2 className="font-display font-extrabold text-ivory tracking-[-0.03em] leading-none text-[clamp(2.4rem,6vw,4.6rem)] mb-4">
            The workbench<span className="text-aurora">.</span>
          </h2>
          <p className="text-[15.5px] text-mist max-w-[600px] leading-[1.75] mb-16">
            Financial models, software tools, and product work built across
            professional roles, personal experiments, and family business
            contexts. Tap a row for the full story.
          </p>
        </Reveal>

        <Reveal y={10}>
          <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-violet-bright mb-2">
            A — Financial Modelling
          </div>
        </Reveal>
        <div className="border-t border-line mb-16">
          {financialProjects.map((p, i) => (
            <Row
              key={p.name}
              p={p}
              num={i + 1}
              onEnter={() => setActiveIdx(i)}
              onLeave={() => setActiveIdx(null)}
            />
          ))}
        </div>

        <Reveal y={10}>
          <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-violet-bright mb-2">
            B — Software &amp; Tools
          </div>
        </Reveal>
        <div className="border-t border-line">
          {softwareProjects.map((p, i) => (
            <Row
              key={p.name}
              p={p}
              num={financialProjects.length + i + 1}
              onEnter={() => setActiveIdx(financialProjects.length + i)}
              onLeave={() => setActiveIdx(null)}
            />
          ))}
        </div>

        <Reveal className="mt-12" y={10}>
          <p className="text-[14.5px] text-dim leading-relaxed">
            Interested in any of these?{" "}
            <a
              href="mailto:apurvsptl@gmail.com"
              className="text-violet-bright link-draw font-semibold"
            >
              Reach out
            </a>{" "}
            — happy to walk through the thinking or share more detail.
          </p>
        </Reveal>
      </div>

      {/* Cursor-following preview card (fine pointers only) */}
      {fine && (
        <AnimatePresence>
          {active && (
            <motion.div
              className="absolute z-30 pointer-events-none w-[230px] rounded-2xl overflow-hidden border border-line2"
              style={{ x: px, y: py, top: -90, left: 30 }}
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              exit={{ opacity: 0, scale: 0.85, rotate: -3 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div
                className="p-5 h-[150px] flex flex-col justify-between"
                style={{
                  background: `linear-gradient(150deg, hsl(${active.hue} 70% 16%) 0%, hsl(${(active.hue + 40) % 360} 60% 9%) 100%)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-ivory/60">
                    {active.year}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: `hsl(${active.hue} 90% 70%)` }}
                  />
                </div>
                <span
                  className="font-display font-extrabold text-[52px] leading-none"
                  style={{ color: `hsl(${active.hue} 90% 75%)` }}
                >
                  {String(activeIdx! + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-wrap gap-1">
                  {active.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[7.5px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-full border border-ivory/25 text-ivory/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
