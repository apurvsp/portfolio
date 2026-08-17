"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE, Reveal } from "./shared";
import ToptalBadge from "./ToptalBadge";

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

export default function Connect() {
  const ist = useClock("Asia/Kolkata");
  const est = useClock("America/New_York");

  return (
    <section
      id="connect"
      className="relative px-6 md:px-14 lg:px-24 xl:px-32 pt-28 md:pt-40 pb-10 bg-surface border-t border-border overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Label */}
        <Reveal y={10}>
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[11px] text-gold tracking-[0.2em]">07</span>
            <div className="w-14 h-px bg-border2" />
            <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-text3">
              Correspondence
            </span>
          </div>
        </Reveal>

        {/* Big headline */}
        <motion.div
          className="overflow-hidden mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="font-serif text-text leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3.4rem, 10vw, 8.5rem)" }}
            variants={{
              hidden: { y: "110%" },
              visible: { y: 0, transition: { duration: 1.1, ease: EASE } },
            }}
          >
            Let&apos;s <em className="italic text-gold">talk.</em>
          </motion.h2>
        </motion.div>

        <Reveal delay={0.15}>
          <p className="font-serif text-[17px] md:text-[19px] text-text2 max-w-[560px] leading-[1.8] mb-12">
            I&apos;m open to conversations about M&amp;A, industrial investing, US
            market entry for manufacturing businesses, content collaboration,
            and interesting problems in general. If you&apos;re serious, email
            is best.
          </p>
        </Reveal>

        {/* Buttons */}
        <Reveal delay={0.22}>
          <div className="flex flex-wrap gap-3 mb-20">
            <a
              href="mailto:apurvsptl@gmail.com"
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-gold text-bg font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-[var(--gold-bright)] transition-colors duration-300"
            >
              Email Me
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/apurv-patil/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-border2 text-text2 font-mono text-[11px] uppercase tracking-[0.25em] hover:border-gold hover:text-gold transition-colors duration-300"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://www.youtube.com/@TheMechanicsofReality"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-border2 text-text2 font-mono text-[11px] uppercase tracking-[0.25em] hover:border-gold hover:text-gold transition-colors duration-300"
            >
              YouTube ↗
            </a>
          </div>
        </Reveal>

        {/* Footer */}
        <footer className="border-t border-border pt-8 pb-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-text3 mb-2">
                Colophon
              </p>
              <p className="font-serif text-[13px] text-text2 leading-relaxed">
                Built with Next.js + Framer Motion. Set in EB Garamond &amp;
                Geist Mono.
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-text3 mb-2">
                Coordinates
              </p>
              <p className="font-serif text-[13px] text-text2 leading-relaxed">
                Pune, IN — {ist}
                <br />
                New York, US — {est}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-text3 mb-2">
                Elsewhere
              </p>
              <p className="font-serif text-[13px] text-text2 leading-relaxed">
                <a
                  href="https://www.linkedin.com/in/apurv-patil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw"
                >
                  LinkedIn
                </a>
                <br />
                <a
                  href="https://www.youtube.com/@TheMechanicsofReality"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw"
                >
                  YouTube
                </a>
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-text3 mb-2">
                Status
              </p>
              <p className="font-serif text-[13px] text-text2 leading-relaxed flex items-center gap-2">
                <span className="relative inline-block w-[6px] h-[6px] rounded-full bg-green status-ping" />
                Available for conversations
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 border-t border-border pt-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text3">
              © 2026 Apurv Patil — All rights reserved
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-mono text-[9px] uppercase tracking-[0.25em] text-text3 hover:text-gold transition-colors duration-300"
              >
                Back to top ↑
              </button>
              <ToptalBadge />
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
