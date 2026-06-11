"use client";

import { useEffect, useState } from "react";
import { Aurora, Magnetic, Reveal, SectionLabel } from "./shared";
import VelocityMarquee from "./VelocityMarquee";

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
    <section id="connect" className="relative pt-20 md:pt-28 pb-8 overflow-hidden">
      <Aurora dim />

      {/* Velocity marquee */}
      <VelocityMarquee
        items={["Let's talk", "Let's build", "Let's talk", "Let's build"]}
        outline
      />

      <div className="relative px-6 md:px-14 lg:px-24 max-w-[1200px] mx-auto">
        <SectionLabel num="007" text="Correspondence" className="mt-12 mb-10" />

        <Reveal>
          <p className="text-[16px] md:text-[18px] text-mist max-w-[560px] leading-[1.8] mb-14">
            I&apos;m open to conversations about M&amp;A, industrial investing,
            US market entry for manufacturing businesses, content
            collaboration, and interesting problems in general. If you&apos;re
            serious, email is best.
          </p>
        </Reveal>

        {/* Magnetic mega email */}
        <Reveal delay={0.1}>
          <Magnetic strength={0.18} className="inline-block">
            <a
              href="mailto:apurvsptl@gmail.com"
              className="group inline-block"
              data-cursor-label="WRITE"
            >
              <span className="block font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-ivory group-hover:text-aurora transition-all duration-500 break-all text-[clamp(1.7rem,5.6vw,4.8rem)]">
                apurvsptl@gmail.com
              </span>
              <span className="block mt-4 h-px w-full bg-line2 relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-violet to-cyan -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
              </span>
            </a>
          </Magnetic>
        </Reveal>

        {/* Social pills */}
        <Reveal delay={0.18}>
          <div className="flex flex-wrap gap-3 mt-12 mb-24">
            <Magnetic>
              <a
                href="https://www.linkedin.com/in/apurv-patil/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-line2 text-ivory font-mono text-[10px] uppercase tracking-[0.25em] hover:border-violet hover:shadow-glow-soft transition-all duration-400"
                data-cursor
              >
                LinkedIn ↗
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://www.youtube.com/@TheMechanicsofReality"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-line2 text-ivory font-mono text-[10px] uppercase tracking-[0.25em] hover:border-violet hover:shadow-glow-soft transition-all duration-400"
                data-cursor
              >
                YouTube ↗
              </a>
            </Magnetic>
          </div>
        </Reveal>

        {/* Footer */}
        <footer className="border-t border-line pt-9 pb-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-dim mb-2.5">
                Colophon
              </p>
              <p className="text-[13px] text-mist leading-relaxed">
                Built with Next.js + Framer Motion. Set in Bricolage
                Grotesque, Manrope &amp; IBM Plex Mono.
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-dim mb-2.5">
                Coordinates
              </p>
              <p className="font-mono text-[12px] text-mist leading-relaxed">
                PUNE, IN — {ist}
                <br />
                NEW YORK, US — {est}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-dim mb-2.5">
                Elsewhere
              </p>
              <p className="text-[13px] text-mist leading-relaxed">
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
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-dim mb-2.5">
                Status
              </p>
              <p className="text-[13px] text-mist leading-relaxed flex items-center gap-2">
                <span className="relative inline-block w-[6px] h-[6px] rounded-full bg-cyan status-ping" />
                Available for conversations
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 border-t border-line pt-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-dim">
              © 2026 Apurv Patil — All rights reserved
            </span>
            <button
              onClick={() =>
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-mono text-[9px] uppercase tracking-[0.22em] text-mist hover:text-ivory transition-colors duration-300"
              data-cursor
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
