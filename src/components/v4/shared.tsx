"use client";

import { motion } from "framer-motion";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Simple fade-up reveal on scroll */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* File-folder section header: tab + giant poster title + optional lede.
   `dark` flips colors for inverted (ink) sections. */
export function FileHead({
  file,
  label,
  title,
  lede,
  dark = false,
}: {
  file: string;
  label: string;
  title: React.ReactNode;
  lede?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-14 md:mb-20">
      {/* Tab row */}
      <Reveal y={12}>
        <div
          className={`flex items-stretch border-t-2 ${
            dark ? "border-paper" : "border-ink"
          }`}
        >
          <span
            className={`font-mono text-[11px] font-bold tracking-[0.2em] px-3 py-2 ${
              dark ? "bg-paper text-ink" : "bg-ink text-paper"
            }`}
          >
            FILE {file}
          </span>
          <span
            className={`font-mono text-[10px] tracking-[0.3em] uppercase px-4 py-2 self-center ${
              dark ? "text-paper/60" : "text-ink2"
            }`}
          >
            {label}
          </span>
          <span
            className={`ml-auto hidden sm:block font-mono text-[10px] tracking-[0.2em] px-1 py-2 self-center ${
              dark ? "text-paper/40" : "text-ink3"
            }`}
          >
            APURV PATIL — INDEX/2026
          </span>
        </div>
      </Reveal>

      {/* Poster title — masked wipe reveal.
         whileInView lives on the unclipped wrapper; a fully clipped child
         never intersects the viewport. */}
      <motion.div
        className="overflow-hidden mt-8 md:mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.h2
          className={`font-display uppercase leading-[0.92] tracking-[0.005em] ${
            dark ? "text-paper" : "text-ink"
          }`}
          style={{ fontSize: "clamp(2.9rem, 8.5vw, 7rem)" }}
          variants={{
            hidden: { y: "108%" },
            visible: { y: 0, transition: { duration: 0.95, ease: EASE } },
          }}
        >
          {title}
        </motion.h2>
      </motion.div>

      {lede && (
        <Reveal delay={0.15} y={14}>
          <p
            className={`mt-6 max-w-[620px] text-[15.5px] md:text-[16.5px] leading-[1.7] font-medium ${
              dark ? "text-paper/70" : "text-ink2"
            }`}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
