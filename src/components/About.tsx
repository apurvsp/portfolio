"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const paragraphs = [
  `I grew up watching assembly lines and balance sheets — my family built a manufacturing business from the ground up, and from an early age I learned that operating a business is fundamentally a problem of systems thinking. Every constraint is knowable, every inefficiency has a root cause, and excellence comes from iterating on both until they disappear. That first-principles discipline never left me.`,
  `That same disposition brought me to JPMorgan, where I worked on product for institutional clients navigating markets. I saw up close how financial institutions sit on extraordinary data yet move at geological pace — and that the gap between what's technically possible and what's actually deployed is enormous. Most of the alpha in finance isn't in smarter models. It's in better tools wielded by sharper operators.`,
  `I'm now focused on closing that gap. I build software that gives individual investors and lean fund operators the analytical edge previously reserved for quant desks with 50-engineer teams. When I'm not building, I'm investing — backing founders who understand that the next wave of financial infrastructure will be software-first, not banks with software bolted on as an afterthought.`,
];

const containerAnim = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="about"
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
          <span className="text-accent text-xs font-mono tracking-wider">01</span>
          <div className="w-7 h-px bg-border" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted font-mono">
            About
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-24">
          {/* Left — pull quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-primary text-balance">
              Building at the intersection of finance and software.
            </h2>
            <div className="mt-6 w-8 h-px bg-accent" />
          </motion.div>

          {/* Right — body copy */}
          <motion.div
            className="space-y-5"
            variants={containerAnim}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-secondary leading-[1.85] text-[15px]"
                style={{ transitionDelay: `${0.25 + i * 0.1}s` }}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
