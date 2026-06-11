"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, Reveal, SectionHead } from "./shared";

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

export default function About() {
  return (
    <section id="about" className="relative px-6 md:px-14 lg:px-24 xl:px-32 py-24 md:py-36">
      <div className="max-w-[1100px] mx-auto">
        <SectionHead
          num="02"
          label="The Operator"
          title={
            <>
              Systems, assets,{" "}
              <em className="text-gold not-italic font-serif italic">patience.</em>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-14 lg:gap-20">
          {/* Editorial paragraphs */}
          <Reveal>
            <div className="space-y-7">
              <p className="dropcap font-serif text-[17px] md:text-[18.5px] text-text2 leading-[1.85]">
                {paragraphs[0]}
              </p>
              <p className="font-serif text-[17px] md:text-[18.5px] text-text2 leading-[1.85]">
                {paragraphs[1]}
              </p>
              <p className="font-serif text-[17px] md:text-[18.5px] text-text2 leading-[1.85]">
                {paragraphs[2]}
              </p>
            </div>
          </Reveal>

          {/* Fact ledger */}
          <Reveal delay={0.12}>
            <div>
              <div>
                {facts.map((fact, i) => (
                  <motion.div
                    key={fact.label}
                    className="border-t border-border py-4 grid grid-cols-[110px_1fr] gap-4 items-baseline"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE }}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text3">
                      {fact.label}
                    </span>
                    <span className="font-serif text-[15px] text-text leading-snug">
                      {fact.value}
                    </span>
                  </motion.div>
                ))}
                <div className="border-t border-border" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Beyond the desk ── */}
        <Reveal className="mt-24 md:mt-32">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-text3 whitespace-nowrap">
              Beyond the desk
            </span>
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-text3">
              FIELD NOTES
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
            <div>
              <p className="font-serif text-[19px] md:text-[22px] text-text leading-[1.6] mb-7">
                When not at a desk, I&apos;m usually somewhere unfamiliar. I find
                that moving through different systems — economic, cultural,
                logistical — sharpens thinking in ways that staying in one place
                doesn&apos;t.{" "}
                <em className="text-gold">Travel to me is research with better food.</em>
              </p>
              <div className="flex flex-wrap gap-2">
                {travelDestinations.map((dest) => (
                  <span
                    key={dest}
                    className="font-mono text-[9px] px-2.5 py-1 border border-border text-text3 uppercase tracking-[0.12em] hover:border-gold2 hover:text-text2 transition-colors duration-300"
                  >
                    {dest}
                  </span>
                ))}
                <span className="font-mono text-[9px] px-2 py-1 text-gold italic tracking-[0.12em]">
                  + more
                </span>
              </div>
            </div>

            {/* Expanding gallery */}
            <div className="flex gap-2 h-[300px] md:h-[340px]">
              {travelPhotos.map((photo) => (
                <div
                  key={photo.alt}
                  className="group relative flex-1 hover:flex-[2.1] transition-[flex] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden border border-border photo-tone"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(10,9,8,0.9)] to-transparent px-4 pb-3 pt-12 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text whitespace-nowrap">
                      {photo.alt}
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.15em] text-text3 whitespace-nowrap">
                      {photo.coord}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
