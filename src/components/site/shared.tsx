"use client";

import { motion } from "framer-motion";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Generic viewport-reveal wrapper */
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
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* Chapter heading: № — rule — label, then display title */
export function SectionHead({
  num,
  label,
  title,
  lede,
}: {
  num: string;
  label: string;
  title: React.ReactNode;
  lede?: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <motion.div
        className="flex items-center gap-4 mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className="font-mono text-[11px] text-gold tracking-[0.2em]">
          {num}
        </span>
        <motion.div
          className="h-px bg-border2 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ width: 56 }}
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-text3">
          {label}
        </span>
      </motion.div>

      {/* whileInView lives on the unclipped wrapper — a fully clipped child
          never intersects, so the variant must propagate down */}
      <motion.div
        className="overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="font-serif text-text leading-[1.02] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)" }}
          variants={{
            hidden: { y: "110%" },
            visible: { y: 0, transition: { duration: 1, ease: EASE } },
          }}
        >
          {title}
        </motion.h2>
      </motion.div>

      {lede && (
        <Reveal delay={0.15} y={14}>
          <p className="font-serif text-[17px] md:text-[18px] text-text2 italic max-w-[560px] leading-[1.7] mt-6">
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
