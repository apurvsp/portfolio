"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, FileHead, Reveal } from "./shared";

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
    <section id="about" className="relative px-5 md:px-10 py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto">
        <FileHead
          file="02"
          label="The Operator"
          title={
            <>
              Systems, assets, <span className="text-red">patience.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Bio paragraphs */}
          <Reveal>
            <div className="space-y-6 border-l-2 border-ink pl-6 md:pl-8">
              <p className="text-[18px] md:text-[20px] font-semibold text-ink leading-[1.65]">
                {paragraphs[0]}
              </p>
              <p className="text-[15.5px] md:text-[16.5px] text-ink2 leading-[1.75]">
                {paragraphs[1]}
              </p>
              <p className="text-[15.5px] md:text-[16.5px] text-ink2 leading-[1.75]">
                {paragraphs[2]}
              </p>
            </div>
          </Reveal>

          {/* Spec sheet: portrait + facts */}
          <Reveal delay={0.12}>
            <div className="border-2 border-ink bg-paper2 shadow-hard">
              <div className="flex items-center justify-between border-b-2 border-ink px-4 py-2.5">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em]">
                  Spec sheet
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-ink3">
                  REF. AP—01
                </span>
              </div>
              <div className="photo-duo relative w-full h-[300px] overflow-hidden border-b-2 border-ink">
                <Image
                  src="/photos/profile.jpg"
                  alt="Apurv Patil portrait"
                  fill
                  className="object-cover object-[50%_25%]"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
              <div>
                {facts.map((fact, i) => (
                  <motion.div
                    key={fact.label}
                    className="grid grid-cols-[110px_1fr] gap-4 items-baseline px-4 py-3.5 border-b border-line-soft last:border-b-0"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: EASE }}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink3">
                      {fact.label}
                    </span>
                    <span className="text-[14px] font-semibold text-ink leading-snug">
                      {fact.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Field notes / travel ── */}
        <Reveal className="mt-20 md:mt-28">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] whitespace-nowrap">
              Beyond the desk
            </span>
            <div className="flex-1 h-[2px] bg-ink" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-ink3">
              FIELD NOTES
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
            <div>
              <p className="text-[19px] md:text-[23px] font-bold text-ink leading-[1.45] mb-7">
                When not at a desk, I&apos;m usually somewhere unfamiliar.
                Moving through different systems — economic, cultural,
                logistical — sharpens thinking in ways that staying in one
                place doesn&apos;t.{" "}
                <span className="text-red italic">
                  Travel to me is research with better food.
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {travelDestinations.map((dest) => (
                  <span
                    key={dest}
                    className="font-mono text-[9px] px-2.5 py-1 border border-ink/40 text-ink2 uppercase tracking-[0.12em] hover:bg-ink hover:text-paper transition-colors duration-300"
                  >
                    {dest}
                  </span>
                ))}
                <span className="font-mono text-[9px] px-2 py-1 text-red tracking-[0.12em]">
                  + MORE
                </span>
              </div>
            </div>

            {/* Expanding duotone gallery */}
            <div className="flex gap-2 h-[280px] md:h-[330px]">
              {travelPhotos.map((photo) => (
                <div
                  key={photo.alt}
                  className="photo-duo group relative flex-1 hover:flex-[2.2] transition-[flex] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden border-2 border-ink"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-[2] bg-ink text-paper px-3 py-2 flex items-center justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] whitespace-nowrap">
                      {photo.alt}
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.12em] text-paper/60 whitespace-nowrap">
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
