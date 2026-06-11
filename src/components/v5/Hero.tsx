"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { Aurora, EASE } from "./shared";

const roles = [
  "builder",
  "startup enthusiast",
  "investor",
  "finance learner",
  "product leader",
  "manufacturing operator",
  "problem solver",
];

/* Per-letter drift factors — letters scatter at different speeds on scroll */
const DRIFT = [0.55, 1.4, 0.85, 1.9, 0.7, 1.15, 0.5, 1.65, 0.95, 1.35];

function DriftLetter({
  char,
  index,
  lineDelay,
  progress,
  gradientPos,
}: {
  char: string;
  index: number;
  lineDelay: number;
  progress: MotionValue<number>;
  /* 0–1 position within the word — fakes one continuous gradient across
     letters (bg-clip:text on the parent breaks once children transform) */
  gradientPos?: { i: number; n: number };
}) {
  const factor = DRIFT[index % DRIFT.length];
  const y = useTransform(progress, [0, 1], [0, factor * 260]);
  const rotate = useTransform(
    progress,
    [0, 1],
    [0, (index % 2 === 0 ? -1 : 1) * factor * 9]
  );
  const gradientStyle = gradientPos
    ? {
        backgroundImage:
          "linear-gradient(100deg, var(--violet-bright) 0%, var(--cyan) 55%, var(--violet-bright) 100%)",
        backgroundSize: `${gradientPos.n * 100}% 100%`,
        backgroundPosition: `${(gradientPos.i / Math.max(1, gradientPos.n - 1)) * 100}% 50%`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }
    : undefined;
  return (
    <motion.span
      className="inline-block will-change-transform"
      style={{ y, rotate, ...gradientStyle }}
      initial={{ opacity: 0, y: 90, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 1.05,
        delay: lineDelay + index * 0.055,
        ease: EASE,
      }}
    >
      {char}
    </motion.span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0.1, 0.85], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const photoRotate = useTransform(scrollYProgress, [0, 1], [4, 12]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <Aurora />

      {/* Horizon line */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-[68%] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--line2) 30%, var(--line2) 70%, transparent)",
        }}
      />

      <motion.div
        style={{ opacity: fade }}
        className="relative px-6 md:px-14 lg:px-20 pt-24 pb-16"
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          <span className="relative inline-block w-[7px] h-[7px] rounded-full bg-cyan status-ping flex-shrink-0" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-mist">
            Available for conversations
          </span>
          <span className="hidden sm:block flex-1" />
          <span className="hidden sm:block font-mono text-[10px] tracking-[0.3em] uppercase text-dim">
            Est. Pune · Operating worldwide
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Name — letters scatter as you scroll away */}
          <h1
            className="font-display font-extrabold leading-[0.88] tracking-[-0.045em] select-none"
            style={{ fontSize: "clamp(4.2rem, 15vw, 14rem)" }}
          >
            <span className="sr-only">Apurv Patil</span>
            <span aria-hidden="true" className="block text-ivory">
              {"Apurv".split("").map((ch, i) => (
                <DriftLetter
                  key={i}
                  char={ch}
                  index={i}
                  lineDelay={0.25}
                  progress={scrollYProgress}
                />
              ))}
            </span>
            <span aria-hidden="true" className="block pb-[0.08em]">
              {"Patil".split("").map((ch, i) => (
                <DriftLetter
                  key={i}
                  char={ch}
                  index={i + 5}
                  lineDelay={0.45}
                  progress={scrollYProgress}
                  gradientPos={{ i, n: 5 }}
                />
              ))}
            </span>
          </h1>

          {/* Floating London photo */}
          <motion.div
            className="hidden lg:block relative mr-4"
            style={{ y: photoY, rotate: photoRotate }}
            initial={{ opacity: 0, y: 60, rotate: 8 }}
            animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
          >
            <div className="photo-noir relative w-[270px] h-[360px] overflow-hidden rounded-2xl border border-line2 shadow-card">
              <Image
                src="/photos/London.jpeg"
                alt="Apurv in London"
                fill
                className="object-cover object-center"
                sizes="270px"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 px-4 py-3 flex items-center justify-between bg-gradient-to-t from-[rgba(7,6,11,0.85)] to-transparent">
                <span className="font-mono text-[8.5px] tracking-[0.3em] uppercase text-ivory/85">
                  London
                </span>
                <span className="font-mono text-[8px] tracking-[0.12em] text-mist">
                  51.5074°N
                </span>
              </div>
            </div>
            {/* Glow under the card */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[32px] opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(124,93,250,0.35), transparent)",
                filter: "blur(30px)",
              }}
            />
          </motion.div>
        </div>

        {/* Role line */}
        <motion.div
          className="mt-10 md:mt-14 flex items-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
        >
          <span className="hidden sm:block h-px w-12 bg-violet" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-mist whitespace-nowrap">
            A passionate
          </span>
          <span className="relative h-[30px] overflow-hidden flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                className="absolute left-0 font-display font-semibold text-[16.5px] sm:text-[20px] md:text-[24px] text-cyan whitespace-nowrap leading-[30px]"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {roles[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom cue */}
      <motion.div
        className="absolute bottom-7 left-6 md:left-14 lg:left-20 right-6 md:right-14 lg:right-20 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.4 }}
      >
        <span className="flex items-center gap-3 font-mono text-[9px] tracking-[0.35em] uppercase text-dim">
          Scroll
          <motion.span
            className="block w-px h-8 bg-gradient-to-b from-violet to-transparent origin-top"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="hidden md:block font-mono text-[9px] tracking-[0.35em] uppercase text-dim">
          Product / Finance / Manufacturing
        </span>
      </motion.div>
    </section>
  );
}
