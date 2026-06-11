"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Fade-up reveal on scroll */
export function Reveal({
  children,
  delay = 0,
  y = 28,
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

/* Small numbered section label: "002 / THE OPERATOR" */
export function SectionLabel({
  num,
  text,
  light = false,
  className = "",
}: {
  num: string;
  text: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal y={12} className={className}>
      <div className="flex items-center gap-4">
        <span
          className={`font-mono text-[11px] tracking-[0.2em] ${
            light ? "text-violet" : "text-violet-bright"
          }`}
        >
          {num}
        </span>
        <span
          className={`h-px w-12 ${light ? "bg-linedark2" : "bg-line2"}`}
        />
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.45em] ${
            light ? "text-void/55" : "text-mist"
          }`}
        >
          {text}
        </span>
      </div>
    </Reveal>
  );
}

/* Aurora — drifting blurred light orbs behind a section */
export function Aurora({ dim = false }: { dim?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${
        dim ? "opacity-50" : ""
      }`}
    >
      <div
        className="aurora-a absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,93,250,0.32) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="aurora-b absolute top-[10%] right-[-12%] w-[48vw] h-[48vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(111,227,255,0.16) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="aurora-c absolute bottom-[-25%] left-[28%] w-[50vw] h-[50vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,92,168,0.12) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}

/* Magnetic hover — element leans toward the cursor */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setOffset({
      x: (e.clientX - rect.left - rect.width / 2) * strength,
      y: (e.clientY - rect.top - rect.height / 2) * strength,
    });
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 180, damping: 16, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Scroll-illuminated paragraph ───────────
   Words brighten one by one as the block crosses the viewport. */
function Word({
  progress,
  range,
  children,
  light,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
  light?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  return (
    <span className="relative inline-block mr-[0.27em]">
      <motion.span
        style={{ opacity }}
        className={light ? "text-void" : "text-ivory"}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Illuminate({
  text,
  className = "",
  light = false,
}: {
  text: string;
  className?: string;
  light?: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.42"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          light={light}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}
