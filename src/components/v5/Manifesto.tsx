"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, Illuminate, Reveal, SectionLabel } from "./shared";

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

const domains = [
  "AI Product Management",
  "M&A · Private Equity",
  "Manufacturing",
  "Financial Modelling",
  "Software Tools",
  "NSE Equities",
  "Family Business",
  "US Market Entry",
];

const travelDestinations = [
  "San Francisco",
  "New York",
  "London",
  "Beijing",
  "Hong Kong",
  "Singapore",
  "Vietnam",
  "Malaysia",
  "Pune",
];

const travelPhotos = [
  { src: "/photos/SF.jpeg", alt: "San Francisco", coord: "37.77° N" },
  { src: "/photos/NYC.jpeg", alt: "New York", coord: "40.71° N" },
  { src: "/photos/Greatwall.jpeg", alt: "Great Wall of China", coord: "40.43° N" },
];

function ParallaxPhoto({
  photo,
  speed,
  className,
}: {
  photo: (typeof travelPhotos)[0];
  speed: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      <div
        className="photo-noir group relative w-full h-full overflow-hidden rounded-2xl border border-line shadow-card"
        data-cursor
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 90vw, 30vw"
        />
        <div className="absolute inset-x-0 bottom-0 px-4 py-3 flex items-center justify-between bg-gradient-to-t from-[rgba(7,6,11,0.85)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-ivory">
            {photo.alt}
          </span>
          <span className="font-mono text-[8px] tracking-[0.12em] text-mist">
            {photo.coord}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Manifesto() {
  return (
    <section id="about" className="relative px-6 md:px-14 lg:px-24 py-28 md:py-40">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel num="002" text="The Operator" className="mb-12 md:mb-16" />

        {/* Scroll-illuminated manifesto */}
        <Illuminate
          text={paragraphs[0]}
          className="font-display font-semibold leading-[1.32] tracking-[-0.015em] max-w-[1050px] text-[clamp(1.45rem,3.1vw,2.55rem)]"
        />

        {/* Supporting columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 mt-20 md:mt-28 items-start">
          <Reveal>
            <div className="space-y-6">
              <p className="text-[16px] md:text-[17px] text-mist leading-[1.85]">
                {paragraphs[1]}
              </p>
              <p className="text-[16px] md:text-[17px] text-mist leading-[1.85]">
                {paragraphs[2]}
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {domains.map((d) => (
                  <span
                    key={d}
                    className="font-mono text-[9px] px-3 py-1.5 rounded-full border border-line text-mist uppercase tracking-[0.14em] hover:border-violet hover:text-ivory transition-colors duration-400"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Fact ledger — glass card */}
          <Reveal delay={0.12}>
            <div className="glass glass-hover rounded-2xl p-7">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-dim">
                  Vitals
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-violet-bright">
                  REF. AP—01
                </span>
              </div>
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  className="border-t border-line py-4 grid grid-cols-[100px_1fr] gap-4 items-baseline"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE }}
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-dim">
                    {fact.label}
                  </span>
                  <span className="text-[14.5px] font-semibold text-ivory leading-snug">
                    {fact.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Field notes ── */}
        <div className="mt-28 md:mt-40">
          <SectionLabel num="002.5" text="Field Notes" className="mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 items-center">
            <Reveal>
              <p className="font-display font-semibold text-[22px] md:text-[27px] text-ivory leading-[1.4] tracking-[-0.01em] mb-7">
                When not at a desk, I&apos;m usually somewhere unfamiliar.
                Moving through different systems — economic, cultural,
                logistical — sharpens thinking in ways staying still
                doesn&apos;t.{" "}
                <span className="text-aurora">
                  Travel to me is research with better food.
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {travelDestinations.map((dest) => (
                  <span
                    key={dest}
                    className="font-mono text-[9px] px-3 py-1 rounded-full border border-line text-dim uppercase tracking-[0.14em] hover:text-mist hover:border-line2 transition-colors duration-300"
                  >
                    {dest}
                  </span>
                ))}
                <span className="font-mono text-[9px] px-2 py-1 text-violet-bright tracking-[0.14em]">
                  + MORE
                </span>
              </div>
            </Reveal>

            {/* Parallax photo cluster */}
            <div className="grid grid-cols-3 gap-4 h-[320px] md:h-[400px] items-center">
              <ParallaxPhoto photo={travelPhotos[0]} speed={34} className="h-[78%]" />
              <ParallaxPhoto photo={travelPhotos[1]} speed={-26} className="h-[100%]" />
              <ParallaxPhoto photo={travelPhotos[2]} speed={42} className="h-[68%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
