"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Writing() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="writing"
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
          <span className="text-accent text-xs font-mono tracking-wider">03</span>
          <div className="w-7 h-px bg-border" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted font-mono">
            Writing
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-primary">
              Essays,<br />incoming.
            </h2>
            <div className="mt-6 w-8 h-px bg-border" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-muted text-[13px] leading-relaxed mb-4 font-mono uppercase tracking-widest">
              — Topics I&apos;m working through:
            </p>
            <ul className="space-y-3">
              {[
                "Why most financial software is a decade behind",
                "The operator edge in early-stage investing",
                "Building tools at the edge of regulation",
                "What manufacturing taught me about product",
              ].map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-3 text-[14px] text-secondary"
                >
                  <span className="text-border font-mono mt-[2px] flex-shrink-0">—</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
