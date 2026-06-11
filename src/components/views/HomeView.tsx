"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { View } from "@/types";

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
  { label: "M&A · Private Equity", highlighted: true },
  { label: "Manufacturing", highlighted: true },
  { label: "Financial Modelling", highlighted: false },
  { label: "Software Tools", highlighted: false },
  { label: "NSE Equities", highlighted: false },
  { label: "Family Business", highlighted: false },
  { label: "US Market Entry", highlighted: false },
];

const paragraphs = [
  `I grew up watching assembly lines and balance sheets — my family built a manufacturing business from the ground up, and from an early age I learned that operating a business is fundamentally a problem of systems thinking. Every constraint is knowable, every inefficiency has a root cause, and excellence comes from iterating on both until they disappear. That first-principles discipline never left me.`,
  `That same disposition brought me to JPMorganChase, where I've worked across financial teams and am currently focused on Chase Travel as product — sitting at the intersection of large-scale infrastructure and everyday consumer experience.`,
  `Outside of that, most of my energy goes into the family manufacturing businesses, M&A research, and the occasional side project when a useful tool doesn't exist yet. I'm drawn to businesses with real assets and durable economics — the kind that compound quietly rather than loudly.`,
];

const facts = [
  { label: "Currently", value: "JPMorganChase — Product" },
  { label: "Education", value: "COEP Engineering + SPJIMR MBA" },
  { label: "Ventures", value: "Patson Doors · Polychem Group" },
  { label: "Interests", value: "M&A, Options, AI tooling, India–US trade" },
];

const travelDestinations = [
  "San Francisco", "New York", "London", "Beijing", "Hong Kong",
  "Singapore", "Vietnam", "Malaysia", "Pune",
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HomeViewProps {
  setActiveView: (view: View) => void;
}

export default function HomeView({ setActiveView }: HomeViewProps) {
  void setActiveView;
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* ── HERO: fills first viewport ── */}
      <section className="relative min-h-[calc(100vh-52px)] md:min-h-screen px-8 md:px-12 lg:px-16 py-10 flex flex-col justify-center overflow-hidden">
        {/* AP watermark */}
        <span
          className="absolute right-0 bottom-0 font-serif text-[220px] text-[var(--border)] leading-none select-none pointer-events-none hidden xl:block opacity-30"
          aria-hidden="true"
        >
          AP
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 lg:gap-14 items-center">
          {/* Left: name + role + tags */}
          <div>
            {/* Status dot */}
            <motion.div
              className="flex items-center mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
            >
              <span className="inline-block w-[7px] h-[7px] rounded-full bg-[var(--green)] animate-pulse mr-2.5 flex-shrink-0" />
              <span className="text-[9px] tracking-[2px] uppercase text-[var(--text3)]">
                Available for conversations
              </span>
            </motion.div>

            {/* BIG display name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease }}
            >
              <h1
                className="font-serif font-black leading-[0.85] tracking-[-0.04em] text-[var(--text)]"
                style={{ fontSize: "clamp(5rem, 13vw, 12rem)" }}
              >
                Apurv
                <br />
                Patil
              </h1>
            </motion.div>

            {/* Dynamic role line */}
            <motion.div
              className="mt-6 flex items-center gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease }}
            >
              <div className="w-6 h-px bg-[var(--gold)] flex-shrink-0" />
              <span className="text-[13px] text-[var(--text3)]">A passionate</span>
              <div className="overflow-hidden h-[20px] relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    className="block text-[13px] text-[var(--gold)] italic"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    {roles[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mt-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
            >
              {tags.map((tag) =>
                tag.highlighted ? (
                  <span
                    key={tag.label}
                    className="text-[10px] px-2.5 py-1 border border-[var(--gold)] text-[var(--gold)] bg-[rgba(200,169,106,0.07)] uppercase tracking-wide"
                  >
                    {tag.label}
                  </span>
                ) : (
                  <span
                    key={tag.label}
                    className="text-[10px] px-2.5 py-1 border border-[var(--border2)] text-[var(--text3)] uppercase tracking-wide"
                  >
                    {tag.label}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Right: London photo */}
          <motion.div
            className="hidden lg:block flex-shrink-0"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.28, ease }}
          >
            <div className="relative w-[260px] h-[360px] border border-[var(--border2)] overflow-hidden bg-[var(--surface2)]">
              <Image
                src="/photos/London.jpeg"
                alt="London"
                fill
                className="object-cover object-center"
                sizes="260px"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-7 left-8 md:left-12 lg:left-16 flex items-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease }}
        >
          <span className="text-[9px] uppercase tracking-[2px] text-[var(--text3)]">Scroll</span>
          <div className="w-8 h-px bg-[var(--border2)]" />
        </motion.div>
      </section>

      {/* ── ABOUT: revealed on scroll ── */}
      <section className="px-8 md:px-12 lg:px-16 pt-16 pb-14 max-w-3xl">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="text-[var(--gold)] text-[10px] tracking-wider">01</span>
          <div className="w-6 h-px bg-[var(--border2)]" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text3)]">
            About
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-10">
          {/* Paragraphs */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          >
            {paragraphs.map((para, i) => (
              <p key={i} className="text-[var(--text2)] leading-[1.85] text-[13.5px]">
                {para}
              </p>
            ))}
          </motion.div>

          {/* Fact table */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <p className="text-[9px] uppercase tracking-[1.5px] text-[var(--text3)] mb-1">
                  {fact.label}
                </p>
                <p className="text-[12px] text-[var(--text2)] leading-snug">
                  {fact.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TRAVEL ── */}
      <section className="px-8 md:px-12 lg:px-16 pb-16 max-w-3xl">
        <motion.div
          className="border-t border-[var(--border)] pt-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text3)]">
              Beyond the desk
            </span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
            <div>
              <p className="text-[13px] text-[var(--text2)] leading-[1.8] mb-4">
                When not at a desk, I&apos;m usually somewhere unfamiliar. I find that
                moving through different systems — economic, cultural, logistical —
                sharpens thinking in ways that staying in one place doesn&apos;t.
                Travel to me is research with better food.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {travelDestinations.map((dest) => (
                  <span
                    key={dest}
                    className="text-[10px] px-2 py-0.5 border border-[var(--border)] text-[var(--text3)] uppercase tracking-wide"
                  >
                    {dest}
                  </span>
                ))}
                <span className="text-[10px] px-2 py-0.5 text-[var(--text3)] italic">
                  + more
                </span>
              </div>
            </div>

            {/* Photo strip: SF, NYC, Great Wall */}
            <div className="flex gap-2 flex-shrink-0">
              {[
                { src: "/photos/SF.jpeg", alt: "San Francisco" },
                { src: "/photos/NYC.jpeg", alt: "New York" },
                { src: "/photos/Greatwall.jpeg", alt: "Great Wall of China" },
              ].map((photo) => (
                <div
                  key={photo.alt}
                  className="relative w-[120px] h-[160px] border border-[var(--border)] overflow-hidden bg-[var(--surface2)] flex-shrink-0"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover object-center"
                    sizes="120px"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
