"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";

type CaseStudy = { problem: string; built: string; result: string };
type Project = {
  name: string;
  description: string;
  tags: string[];
  href: string;
  caseStudy: CaseStudy;
};

const projects: Project[] = [
  {
    name: "Morning Intel Brief",
    description:
      "Automated pre-market intelligence aggregating earnings surprises, macro events, and sector moves — delivered before the open.",
    tags: ["Python", "OpenAI", "FastAPI", "Cron"],
    href: "#",
    caseStudy: {
      problem:
        "Pre-market hours carry the day's highest signal density, but assembling context from 6+ sources takes 45 minutes most fund operators don't have.",
      built:
        "Python pipeline pulling earnings surprises, Fed calendar, overnight futures, and sector moves into a single GPT-summarised brief — auto-delivered via email and Slack by 8:30 AM.",
      result:
        "Cuts pre-market prep from ~45 min to under 5. Used daily by 3 fund operators for their morning process.",
    },
  },
  {
    name: "Reverse DCF Tool",
    description:
      "Solves backwards from a stock's current price for the implied growth rate the market is already pricing in.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    href: "#",
    caseStudy: {
      problem:
        "Most investors buy stocks without knowing what growth rate the market is assuming — making it trivially easy to overpay for a 'great company.'",
      built:
        "Web app taking current price + WACC, solving backwards for the implied revenue CAGR, with analyst consensus overlaid as a sanity-check reference.",
      result:
        "200+ investors use it monthly. Answers 'what does the market believe about this stock?' in under 30 seconds.",
    },
  },
  {
    name: "Options Greeks Visualiser",
    description:
      "Interactive 3D surface showing how delta, gamma, vega, and theta evolve across strike, expiry, and vol in real-time.",
    tags: ["React", "D3.js", "Black-Scholes", "Three.js"],
    href: "#",
    caseStudy: {
      problem:
        "Options greeks are taught as static formulas — but their real behaviour, shifting simultaneously across price, time, and vol, is nearly impossible to grasp without seeing it.",
      built:
        "3D interactive surface rendering how each greek evolves across the strike/expiry plane. Black-Scholes runs client-side; the surface updates in real-time as you drag vol and spot inputs.",
      result:
        "Used in 3 university finance labs and 1 prop trading firm's analyst onboarding curriculum.",
    },
  },
  {
    name: "NSE Screener UI",
    description:
      "Real-time filterable screener for NSE-listed equities with composite factor scoring and one-click research export.",
    tags: ["Next.js", "Python", "PostgreSQL", "NSE API"],
    href: "#",
    caseStudy: {
      problem:
        "NSE's official screener has no composite factor scoring, no export, and data delayed 15+ minutes — and most retail tools only cover US markets.",
      built:
        "Full-stack screener pulling live NSE data into PostgreSQL, scored on composite momentum/quality/value factors, with CSV export built for research workflows.",
      result:
        "Processes 1,800+ equities in real-time. Used by 2 SEBI-registered investment advisors.",
    },
  },
];

const CASE_LABELS = [
  { key: "problem" as const, label: "The Problem" },
  { key: "built" as const, label: "What I Built" },
  { key: "result" as const, label: "Result" },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20 border-t border-border-subtle"
    >
      <div className="max-w-5xl">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-accent text-xs font-mono tracking-wider">02</span>
          <div className="w-7 h-px bg-border" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted font-mono">
            Projects
          </span>
        </motion.div>

        {/* Hint */}
        <motion.p
          className="text-[11px] font-mono uppercase tracking-widest text-muted mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Hover a card to see the case study
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projects.map((project, i) => {
            const isOpen = hoveredId === project.name;
            return (
              <motion.div
                key={project.name}
                className="border bg-surface transition-colors duration-300"
                style={{
                  borderColor: isOpen ? "rgba(200,168,122,0.25)" : "#1a1a1a",
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredId(project.name)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Main card content */}
                <div className="p-7">
                  <div className="flex items-start justify-between mb-4">
                    <h3
                      className="text-[15px] font-semibold tracking-tight transition-colors duration-200"
                      style={{ color: isOpen ? "#c8a87a" : "#eeebe4" }}
                    >
                      {project.name}
                    </h3>
                    <motion.span
                      className="font-mono text-sm ml-3 mt-0.5 flex-shrink-0 text-accent"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ↗
                    </motion.span>
                  </div>
                  <p className="text-secondary text-[13px] leading-relaxed mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 border border-border text-muted font-mono uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Case study drawer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="drawer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="border-t border-border-subtle mx-7 pt-5 pb-7 space-y-4">
                        {CASE_LABELS.map(({ key, label }, idx) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: idx * 0.07,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-mono mb-1">
                              {label}
                            </p>
                            <p className="text-secondary text-[13px] leading-relaxed">
                              {project.caseStudy[key]}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
