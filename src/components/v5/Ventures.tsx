"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic, Reveal, SectionLabel } from "./shared";

interface Venture {
  index: string;
  badge: string;
  accent: string; // css color
  ghost: string; // giant background word
  name: string;
  sub: string;
  description: string;
  url: string;
  urlLabel: string;
}

const ventures: Venture[] = [
  {
    index: "01",
    badge: "US MARKET",
    accent: "var(--violet-bright)",
    ghost: "DOORS",
    name: "Patson Doors",
    sub: "Premium Fiberglass Entry Doors",
    description:
      "A US-facing door brand manufacturing premium fiberglass entry doors, exported to the American residential and builder market. Exhibited at IBS 2026 in Orlando. Currently in the middle of a capacity expansion funding round. I work closely with the business on strategy, financial modelling, and market entry.",
    url: "https://www.patsondoors.com",
    urlLabel: "patsondoors.com",
  },
  {
    index: "02",
    badge: "INDIA",
    accent: "var(--cyan)",
    ghost: "PRECISION",
    name: "Polychem Group",
    sub: "Precision Manufacturing",
    description:
      "A ~100-person precision tooling and components manufacturer serving automotive and industrial clients. CNC/VMC machining with a multi-decade operating history. I am involved in business development, technology integration, and long-term structuring work.",
    url: "https://www.polychemgroup.in",
    urlLabel: "polychemgroup.in",
  },
  {
    index: "03",
    badge: "EXPERIMENT",
    accent: "var(--magenta)",
    ghost: "MEDIA",
    name: "The Mechanics of Reality",
    sub: "YouTube · Fully AI-Driven Channel",
    description:
      "An ongoing experiment in AI-native content production. I use automation tools — NotebookLM, AI video generation, scripting pipelines — to produce Wendover Productions-style explainer videos on the hidden systems behind business, economics, and design. The goal is as much to learn the toolchain as it is to build an audience. Five videos published; topics have ranged from quiet luxury supply chains to the psychology of retail environments.",
    url: "https://www.youtube.com/@TheMechanicsofReality",
    urlLabel: "YouTube Channel",
  },
];

function VentureCard({ v, panel = false }: { v: Venture; panel?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden ${
        panel
          ? "w-screen h-full flex-shrink-0 flex items-center px-6 md:px-14 lg:px-24"
          : "glass rounded-3xl p-8 md:p-10"
      }`}
    >
      {/* Ghost word */}
      <span
        aria-hidden="true"
        className="absolute font-display font-extrabold text-outline select-none pointer-events-none leading-none tracking-[-0.02em]"
        style={{
          fontSize: panel ? "clamp(8rem, 22vw, 22rem)" : "clamp(5rem, 14vw, 9rem)",
          right: panel ? "-1%" : "-4%",
          bottom: panel ? "4%" : "-6%",
          opacity: 0.6,
        }}
      >
        {v.ghost}
      </span>

      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="absolute -z-0 rounded-full pointer-events-none"
        style={{
          width: panel ? "44vw" : "60%",
          height: panel ? "44vw" : "60%",
          left: panel ? "8%" : "-10%",
          top: panel ? "8%" : "-15%",
          background: `radial-gradient(circle, color-mix(in srgb, ${v.accent} 22%, transparent) 0%, transparent 65%)`,
          filter: "blur(50px)",
        }}
      />

      <div className={`relative ${panel ? "max-w-[760px]" : ""}`}>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-display font-extrabold text-[15px] tracking-[0.06em]" style={{ color: v.accent }}>
            {v.index}
          </span>
          <span
            className="font-mono text-[9px] px-3 py-1.5 rounded-full uppercase tracking-[0.22em] border"
            style={{ color: v.accent, borderColor: `color-mix(in srgb, ${v.accent} 50%, transparent)` }}
          >
            {v.badge}
          </span>
        </div>

        <h3
          className="font-display font-extrabold text-ivory leading-[0.95] tracking-[-0.03em] mb-3"
          style={{ fontSize: panel ? "clamp(2.6rem, 6.5vw, 5.6rem)" : "clamp(2rem, 5vw, 2.9rem)" }}
        >
          {v.name}
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim mb-7">
          {v.sub}
        </p>
        <p className={`text-mist leading-[1.8] ${panel ? "text-[15.5px] md:text-[16.5px]" : "text-[15px]"}`}>
          {v.description}
        </p>

        <Magnetic className="inline-block mt-9">
          <a
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-line2 font-mono text-[10px] uppercase tracking-[0.25em] text-ivory hover:border-transparent transition-all duration-400"
            style={{ boxShadow: "none" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px color-mix(in srgb, ${v.accent} 35%, transparent)`;
              (e.currentTarget as HTMLElement).style.background = `color-mix(in srgb, ${v.accent} 18%, transparent)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
            data-cursor-label="VISIT"
          >
            {v.urlLabel}
            <span aria-hidden="true">↗</span>
          </a>
        </Magnetic>
      </div>
    </div>
  );
}

export default function Ventures() {
  const trackRef = useRef<HTMLElement>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0.06, 0.94], ["0vw", "-200vw"]);
  const railProgress = useTransform(scrollYProgress, [0.06, 0.94], [0, 1]);

  return (
    <section id="ventures" ref={trackRef} className="relative">
      {/* Desktop: pinned horizontal cinema */}
      {desktop ? (
        <div className="relative h-[340vh]">
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
            <div className="px-6 md:px-14 lg:px-24 pt-24 pb-2 flex items-end justify-between">
              <div>
                <SectionLabel num="003" text="Associated Businesses" className="mb-5" />
                <h2 className="font-display font-extrabold text-ivory tracking-[-0.03em] leading-none text-[clamp(2.4rem,4.5vw,4rem)]">
                  The holdings<span className="text-aurora">.</span>
                </h2>
              </div>
              <span className="hidden md:block font-mono text-[9px] uppercase tracking-[0.3em] text-dim pb-2">
                Scroll — the room moves sideways
              </span>
            </div>

            <motion.div className="flex-1 flex w-[300vw]" style={{ x }}>
              {ventures.map((v) => (
                <VentureCard key={v.name} v={v} panel />
              ))}
            </motion.div>

            {/* Progress rail */}
            <div className="px-6 md:px-14 lg:px-24 pb-8">
              <div className="h-px bg-line relative overflow-visible">
                <motion.div
                  className="absolute inset-y-0 left-0 h-px bg-gradient-to-r from-violet to-cyan"
                  style={{ scaleX: railProgress, originX: 0, width: "100%" }}
                />
              </div>
              <div className="flex justify-between mt-3">
                {ventures.map((v) => (
                  <span key={v.index} className="font-mono text-[9px] tracking-[0.25em] text-dim">
                    {v.index} — {v.name.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile: stacked glass cards */
        <div className="px-6 py-24">
          <SectionLabel num="003" text="Associated Businesses" className="mb-5" />
          <h2 className="font-display font-extrabold text-ivory tracking-[-0.03em] leading-none text-[clamp(2.4rem,9vw,4rem)] mb-12">
            The holdings<span className="text-aurora">.</span>
          </h2>
          <div className="space-y-6">
            {ventures.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.05}>
                <VentureCard v={v} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
