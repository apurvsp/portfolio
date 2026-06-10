"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ConnectView() {
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
          <span className="text-[var(--gold)] text-[10px] tracking-wider">06</span>
          <div className="w-6 h-px bg-[var(--border2)]" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text3)]">
            Connect
          </span>
        </div>
        <h2 className="font-serif text-[28px] md:text-[34px] text-[var(--text)] leading-tight mb-4">
          Let&apos;s talk.
        </h2>
        <p className="text-[13.5px] text-[var(--text2)] max-w-[480px] leading-[1.8]">
          I&apos;m open to conversations about M&A, industrial investing, US
          market entry for manufacturing businesses, content collaboration, and
          interesting problems in general. If you&apos;re serious, email is best.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.14, ease }}
      >
        <a
          href="mailto:apurvsptl@gmail.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--gold)] text-[var(--bg)] text-[12px] uppercase tracking-[1.5px] hover:bg-[var(--gold2)] transition-colors duration-150"
        >
          Email Me
        </a>
        <a
          href="https://www.linkedin.com/in/apurv-patil/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border2)] text-[var(--text2)] text-[12px] uppercase tracking-[1.5px] hover:border-[var(--text3)] hover:text-[var(--text)] transition-colors duration-150"
        >
          LinkedIn
        </a>
        <a
          href="https://www.youtube.com/@TheMechanicsofReality"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border2)] text-[var(--text2)] text-[12px] uppercase tracking-[1.5px] hover:border-[var(--text3)] hover:text-[var(--text)] transition-colors duration-150"
        >
          YouTube
        </a>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="mt-24 pt-5 border-t border-[var(--border)] flex items-center justify-between flex-wrap gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.28, ease }}
      >
        <span className="text-[10px] text-[var(--text3)] tracking-wide">
          © 2026 Apurv Patil
        </span>
        <span className="text-[10px] text-[var(--text3)] tracking-wide">
          Built with Next.js + Framer Motion
        </span>
      </motion.div>
    </div>
  );
}
