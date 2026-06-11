"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
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
          <span className="text-accent text-xs font-mono tracking-wider">04</span>
          <div className="w-7 h-px bg-border" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted font-mono">
            Contact
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-black tracking-tight leading-[0.9] text-primary mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Let&apos;s
              <br />
              talk.
            </h2>
            <p className="text-secondary text-[14px] leading-relaxed max-w-sm">
              Whether you&apos;re building something interesting, want to compare notes on markets, or are looking for a collaborator — my inbox is open.
            </p>
          </motion.div>

          {/* Right — email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-start pt-2"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted font-mono mb-4">
              Direct line
            </p>
            <a
              href="mailto:apurv@example.com"
              className="group inline-flex items-baseline gap-3 text-primary hover:text-accent transition-colors duration-200"
            >
              <span className="text-xl md:text-2xl font-medium tracking-tight">
                apurv@example.com
              </span>
              <span className="text-accent opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 transform text-lg">
                ↗
              </span>
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-28 pt-6 border-t border-border-subtle flex items-center justify-between flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <span className="text-[11px] font-mono text-muted tracking-wide">
            © 2024 Apurv Patil
          </span>
          <span className="text-[11px] font-mono text-muted tracking-wide">
            Built with Next.js + Framer Motion
          </span>
        </motion.div>
      </div>
    </section>
  );
}
