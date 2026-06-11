"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE, Reveal } from "./shared";

function useClock(timeZone: string) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 10_000);
    return () => clearInterval(t);
  }, [timeZone]);
  return time;
}

export default function Contact() {
  const ist = useClock("Asia/Kolkata");
  const est = useClock("America/New_York");

  return (
    <section
      id="connect"
      className="relative px-5 md:px-10 pt-24 md:pt-32 pb-8 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* File tab */}
        <Reveal y={12}>
          <div className="flex items-stretch border-t-2 border-ink mb-10">
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] px-3 py-2 bg-ink text-paper">
              FILE 07
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase px-4 py-2 self-center text-ink2">
              Correspondence
            </span>
            <span className="ml-auto hidden sm:block font-mono text-[10px] tracking-[0.2em] px-1 py-2 self-center text-ink3">
              FINAL ENTRY
            </span>
          </div>
        </Reveal>

        {/* Giant headline — whileInView on the unclipped wrapper */}
        <motion.div
          className="overflow-hidden mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="font-display uppercase text-ink leading-[0.86] tracking-[0.005em]"
            style={{ fontSize: "clamp(4rem, 13vw, 11.5rem)" }}
            variants={{
              hidden: { y: "108%" },
              visible: { y: 0, transition: { duration: 1, ease: EASE } },
            }}
          >
            Let&apos;s <span className="text-red">talk.</span>
          </motion.h2>
        </motion.div>

        <Reveal delay={0.15}>
          <p className="text-[16px] md:text-[18px] font-medium text-ink2 max-w-[580px] leading-[1.7] mb-10">
            I&apos;m open to conversations about M&amp;A, industrial investing,
            US market entry for manufacturing businesses, content
            collaboration, and interesting problems in general. If you&apos;re
            serious, email is best.
          </p>
        </Reveal>

        {/* Giant email link */}
        <Reveal delay={0.2}>
          <a
            href="mailto:apurvsptl@gmail.com"
            className="mega-link inline-block font-display uppercase text-ink leading-none mb-12 break-all"
            style={{ fontSize: "clamp(1.5rem, 4.6vw, 3.8rem)" }}
          >
            apurvsptl@gmail.com
          </a>
        </Reveal>

        {/* Buttons */}
        <Reveal delay={0.25}>
          <div className="flex flex-wrap gap-3 mb-20">
            <a
              href="mailto:apurvsptl@gmail.com"
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-red text-paper border-2 border-ink shadow-hard-sm font-mono text-[11px] font-bold uppercase tracking-[0.22em] hover:-translate-y-0.5 hover:shadow-hard transition-all duration-300"
            >
              Email me
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/apurv-patil/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-ink text-ink font-mono text-[11px] font-bold uppercase tracking-[0.22em] hover:bg-ink hover:text-paper transition-colors duration-300"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://www.youtube.com/@TheMechanicsofReality"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-ink text-ink font-mono text-[11px] font-bold uppercase tracking-[0.22em] hover:bg-ink hover:text-paper transition-colors duration-300"
            >
              YouTube ↗
            </a>
          </div>
        </Reveal>

        {/* Footer */}
        <footer className="border-t-2 border-ink pt-8 pb-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-ink3 mb-2.5">
                Colophon
              </p>
              <p className="text-[13px] text-ink2 leading-relaxed">
                Built with Next.js + Framer Motion. Set in Anton, Archivo
                &amp; Space Mono.
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-ink3 mb-2.5">
                Coordinates
              </p>
              <p className="font-mono text-[12px] text-ink2 leading-relaxed">
                PUNE, IN — {ist}
                <br />
                NEW YORK, US — {est}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-ink3 mb-2.5">
                Elsewhere
              </p>
              <p className="text-[13px] text-ink2 leading-relaxed">
                <a
                  href="https://www.linkedin.com/in/apurv-patil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw font-semibold"
                >
                  LinkedIn
                </a>
                <br />
                <a
                  href="https://www.youtube.com/@TheMechanicsofReality"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw font-semibold"
                >
                  YouTube
                </a>
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-ink3 mb-2.5">
                Status
              </p>
              <p className="text-[13px] text-ink2 leading-relaxed flex items-center gap-2">
                <span className="relative inline-block w-[7px] h-[7px] rounded-full bg-blue status-ping" />
                Available for conversations
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 border-t border-line-soft pt-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink3">
              © 2026 Apurv Patil — All rights reserved
            </span>
            <button
              onClick={() =>
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-ink hover:text-red transition-colors duration-300"
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
