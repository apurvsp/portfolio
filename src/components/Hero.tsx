"use client";

import { motion } from "framer-motion";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.5,
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section className="min-h-screen relative flex flex-col justify-end overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Bottom fade so content reads cleanly */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent pointer-events-none" />

      {/* Thin top accent line */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-accent"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
        <motion.div variants={stagger} initial="hidden" animate="show">
          {/* Eyebrow */}
          <motion.p
            variants={slideUp}
            className="text-[11px] uppercase tracking-[0.45em] text-accent mb-7 font-mono"
          >
            Finance × Software
          </motion.p>

          {/* Name — massive display */}
          <motion.div variants={slideUp} className="overflow-hidden">
            <h1
              className="font-black leading-[0.87] tracking-[-0.04em] text-primary"
              style={{ fontSize: "clamp(3.8rem, 12.5vw, 13.5rem)" }}
            >
              Apurv
              <br />
              Patil
            </h1>
          </motion.div>

          {/* Positioning line */}
          <motion.div
            variants={slideUp}
            className="mt-7 flex items-center gap-5"
          >
            <div className="w-9 h-px bg-accent flex-shrink-0" />
            <p className="text-lg md:text-xl text-secondary tracking-wide font-light">
              Operator. Builder. Investor.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            variants={slideUp}
            className="mt-8 flex items-center gap-6"
          >
            <a
              href="https://github.com/apurvpatil"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted hover:text-primary transition-colors duration-200"
            >
              <span className="border-b border-muted group-hover:border-primary transition-colors duration-200 pb-px">
                GitHub
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0 transform transition-transform">
                ↗
              </span>
            </a>
            <div className="w-px h-3 bg-border" />
            <a
              href="https://linkedin.com/in/apurvpatil"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted hover:text-primary transition-colors duration-200"
            >
              <span className="border-b border-muted group-hover:border-primary transition-colors duration-200 pb-px">
                LinkedIn
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0 transform transition-transform">
                ↗
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — vertical text + line */}
      <motion.div
        className="absolute bottom-10 right-8 md:right-14 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.35em] text-muted font-mono"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px bg-gradient-to-b from-muted to-transparent"
          initial={{ height: 0 }}
          animate={{ height: 48 }}
          transition={{ delay: 2, duration: 0.6, ease: "easeOut" }}
        />
      </motion.div>
    </section>
  );
}
