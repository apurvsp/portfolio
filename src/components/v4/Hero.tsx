"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { EASE } from "./shared";

const roles = [
  "BUILDER",
  "STARTUP ENTHUSIAST",
  "INVESTOR",
  "FINANCE LEARNER",
  "PRODUCT LEADER",
  "MANUFACTURING OPERATOR",
  "PROBLEM SOLVER",
];

const tags = [
  { label: "AI Product Management", hot: true },
  { label: "M&A · Private Equity", hot: false },
  { label: "Manufacturing", hot: true },
  { label: "Financial Modelling", hot: false },
  { label: "Software Tools", hot: false },
  { label: "NSE Equities", hot: false },
  { label: "Family Business", hot: false },
  { label: "US Market Entry", hot: false },
];

/* Staggered per-character poster reveal */
function PosterLine({
  text,
  className,
  delay,
}: {
  text: string;
  className?: string;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <span className={`flex ${className ?? ""}`} aria-hidden="true">
        {text.split("").map((ch, i) => (
          <motion.span
            key={i}
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.045, ease: EASE }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

/* Circular rotating stamp */
function Stamp() {
  return (
    <div className="absolute -bottom-12 -left-12 w-[120px] h-[120px] animate-spin-slow z-10 pointer-events-none">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <path
            id="stamp-circle"
            d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <circle
          cx="60"
          cy="60"
          r="58"
          fill="var(--paper)"
          stroke="var(--red)"
          strokeWidth="2"
        />
        <circle
          cx="60"
          cy="60"
          r="30"
          fill="none"
          stroke="var(--red)"
          strokeWidth="1.5"
        />
        <text
          fill="var(--red)"
          style={{
            fontSize: "11.5px",
            fontFamily: "var(--font-spacemono), monospace",
            letterSpacing: "0.18em",
            fontWeight: 700,
          }}
        >
          <textPath href="#stamp-circle">
            OPERATOR · BUILDER · INVESTOR ·
          </textPath>
        </text>
        <text
          x="60"
          y="66"
          textAnchor="middle"
          fill="var(--red)"
          style={{
            fontSize: "17px",
            fontFamily: "var(--font-anton), Impact, sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          AP
        </text>
      </svg>
    </div>
  );
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden pt-[52px]"
    >
      {/* Blueprint grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--line-soft) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(ellipse 95% 80% at 50% 35%, black 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 80% at 50% 35%, black 0%, transparent 78%)",
        }}
      />

      {/* Meta strip */}
      <motion.div
        className="relative flex items-center justify-between px-5 md:px-10 py-4 border-b border-line-soft"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-ink2">
          File 01 — Identity
        </span>
        <span className="hidden sm:block font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-ink2">
          Est. Pune · Operating worldwide
        </span>
        <span className="flex items-center gap-2 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-blue">
          <span className="relative inline-block w-[7px] h-[7px] rounded-full bg-blue status-ping" />
          Available for conversations
        </span>
      </motion.div>

      {/* Main poster area */}
      <motion.div
        style={{ opacity: fade }}
        className="relative flex-1 flex flex-col justify-center px-5 md:px-10 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
          {/* Name block */}
          <div className="min-w-0">
            <h1
              className="font-display uppercase text-ink"
              style={{
                fontSize: "clamp(4.6rem, 17.5vw, 16.5rem)",
                lineHeight: 0.84,
              }}
            >
              <span className="sr-only">Apurv Patil</span>
              <PosterLine text="APURV" delay={0.15} />
              <PosterLine text="PATIL" delay={0.38} className="text-red" />
            </h1>

            {/* Rotating role strip */}
            <motion.div
              className="mt-8 inline-flex items-stretch border-2 border-ink bg-paper shadow-hard-sm"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            >
              <span className="px-3 py-2.5 bg-ink text-paper font-mono text-[10px] tracking-[0.25em] uppercase self-stretch flex items-center whitespace-nowrap">
                A passionate
              </span>
              <span className="relative px-3 sm:px-4 py-2.5 min-w-[185px] sm:min-w-[330px] flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    className="font-mono font-bold text-[11.5px] sm:text-[15px] tracking-[0.08em] sm:tracking-[0.12em] text-red whitespace-nowrap"
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -22, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {roles[roleIdx]}
                    <span className="animate-blink text-ink">_</span>
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mt-8 max-w-[640px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.05 }}
            >
              {tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`font-mono text-[9px] px-2.5 py-1.5 border uppercase tracking-[0.12em] transition-colors duration-300 ${
                    tag.hot
                      ? "border-red text-red hover:bg-red hover:text-paper"
                      : "border-ink/40 text-ink2 hover:border-ink hover:text-ink"
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Photo block */}
          <motion.div
            className="hidden lg:block relative mr-8"
            style={{ y: photoY }}
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
          >
            <div className="relative rotate-[1.5deg] hover:rotate-0 transition-transform duration-700">
              <div className="photo-duo relative w-[310px] h-[420px] overflow-hidden border-2 border-ink shadow-hard">
                <Image
                  src="/photos/London.jpeg"
                  alt="Apurv in London"
                  fill
                  className="object-cover object-center"
                  sizes="310px"
                  priority
                />
              </div>
              {/* Caption bar */}
              <div className="flex items-center justify-between border-2 border-t-0 border-ink bg-ink text-paper px-3 py-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em]">
                  London
                </span>
                <span className="font-mono text-[9px] tracking-[0.12em]">
                  51.5074°N / 0.1278°W
                </span>
              </div>
              <Stamp />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom strip */}
      <motion.div
        className="relative flex items-center justify-between px-5 md:px-10 py-4 border-t border-line-soft"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.25 }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-ink2">
            Scroll
          </span>
          <motion.span
            className="font-mono text-[11px] text-red"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>
        <span className="hidden sm:block font-mono text-[9px] uppercase tracking-[0.35em] text-ink3">
          Product / Finance / Manufacturing
        </span>
      </motion.div>
    </section>
  );
}
