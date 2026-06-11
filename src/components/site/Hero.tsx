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
  "builder",
  "startup enthusiast",
  "investor",
  "finance learner",
  "product leader",
  "manufacturing operator",
  "problem solver",
];

const tags = [
  { label: "AI Product Management", highlighted: true },
  { label: "M&A · Private Equity", highlighted: false },
  { label: "Manufacturing", highlighted: true },
  { label: "Financial Modelling", highlighted: false },
  { label: "Software Tools", highlighted: false },
  { label: "NSE Equities", highlighted: false },
  { label: "Family Business", highlighted: false },
  { label: "US Market Entry", highlighted: false },
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-14 lg:px-20 pt-[58px]"
    >
      {/* Giant outlined AP watermark */}
      <motion.span
        aria-hidden="true"
        style={{ y: watermarkY }}
        className="absolute -right-8 bottom-[-7%] font-serif italic leading-none select-none pointer-events-none hidden lg:block text-outline text-[34vh]"
      >
        AP
      </motion.span>

      {/* Faint architectural grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, black 0%, transparent 75%)",
        }}
      />

      <motion.div style={{ opacity: fade }} className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-20 items-center">
          {/* ── Left: name block ── */}
          <div>
            {/* Status */}
            <motion.div
              className="flex items-center mb-9"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              <span className="relative inline-block w-[7px] h-[7px] rounded-full bg-green mr-3 flex-shrink-0 status-ping" />
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-text3">
                Available for conversations
              </span>
            </motion.div>

            {/* Display name — masked line reveals */}
            <h1
              className="font-serif font-medium text-text tracking-[-0.045em]"
              style={{ fontSize: "clamp(4.4rem, 13.5vw, 12.5rem)", lineHeight: 0.86 }}
            >
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
                >
                  Apurv
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block italic text-gold"
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.32, ease: EASE }}
                >
                  Patil
                </motion.span>
              </span>
            </h1>

            {/* Rotating role */}
            <motion.div
              className="mt-8 flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            >
              <div className="w-10 h-px bg-gold flex-shrink-0" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text3 whitespace-nowrap">
                A passionate
              </span>
              <span className="relative overflow-hidden h-[26px] min-w-[150px] sm:min-w-[240px] flex-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    className="absolute left-0 font-serif italic text-[20px] text-gold-bright whitespace-nowrap"
                    style={{ color: "var(--gold-bright)" }}
                    initial={{ y: 26, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -26, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    {roles[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mt-9 max-w-[560px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
            >
              {tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`font-mono text-[9px] px-2.5 py-1.5 border uppercase tracking-[0.12em] ${
                    tag.highlighted
                      ? "border-[rgba(201,169,110,0.55)] text-gold bg-[rgba(201,169,110,0.06)]"
                      : "border-border2 text-text3"
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: London photo ── */}
          <motion.div
            className="hidden lg:block relative"
            style={{ y: photoY }}
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          >
            {/* Offset gold frame */}
            <div
              aria-hidden="true"
              className="absolute -top-3 -right-3 w-full h-full border border-[rgba(201,169,110,0.4)]"
            />
            <div className="relative w-[320px] h-[440px] overflow-hidden border border-border2 photo-tone">
              <Image
                src="/photos/London.jpeg"
                alt="Apurv in London"
                fill
                className="object-cover object-center"
                sizes="320px"
                priority
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-text3">
                London
              </span>
              <span className="font-mono text-[9px] tracking-[0.15em] text-text3">
                51.5074° N / 0.1278° W
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom strip */}
      <motion.div
        className="absolute bottom-8 left-6 md:left-14 lg:left-20 right-6 md:right-14 lg:right-20 flex items-end justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-text3">
            Scroll
          </span>
          <motion.div
            className="w-10 h-px bg-border2"
            animate={{ scaleX: [1, 0.4, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: 0 }}
          />
        </div>
        <span className="hidden md:block font-mono text-[9px] uppercase tracking-[0.35em] text-text3">
          Est. Pune · Operating worldwide
        </span>
      </motion.div>
    </section>
  );
}
