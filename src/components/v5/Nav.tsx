"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { EASE } from "./shared";

export const SECTIONS = [
  { id: "home", num: "001", label: "Signal" },
  { id: "about", num: "002", label: "Operator" },
  { id: "ventures", num: "003", label: "Holdings" },
  { id: "projects", num: "004", label: "Workbench" },
  { id: "writing", num: "005", label: "Essays" },
  { id: "now", num: "006", label: "Now" },
  { id: "connect", num: "007", label: "Contact" },
];

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

function useScrollSpy() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const sections = SECTIONS.map((c) => document.getElementById(c.id)).filter(
      Boolean
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });
  const active = useScrollSpy();
  const [open, setOpen] = useState(false);
  const ist = useClock("Asia/Kolkata");
  const est = useClock("America/New_York");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(id: string) {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Progress hairline */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[160] origin-left"
        style={{
          scaleX: progress,
          background:
            "linear-gradient(90deg, var(--violet) 0%, var(--cyan) 100%)",
        }}
      />

      {/* Floating chrome */}
      <header className="fixed top-0 inset-x-0 z-[150] flex items-center justify-between px-5 md:px-8 py-5 pointer-events-none mix-blend-difference">
        <button
          onClick={() => go("home")}
          className="pointer-events-auto font-display font-bold text-[15px] tracking-[-0.01em] text-ivory"
          data-cursor
        >
          Apurv Patil
          <span className="text-violet-bright">.</span>
        </button>
        <div className="flex items-center gap-6 pointer-events-auto">
          <span className="hidden md:block font-mono text-[9px] tracking-[0.3em] uppercase text-ivory/70">
            PNQ {ist} — NYC {est}
          </span>
          <button
            onClick={() => setOpen(true)}
            className="group flex items-center gap-2.5 font-mono text-[10px] tracking-[0.35em] uppercase text-ivory"
            aria-label="Open menu"
            data-cursor
          >
            Menu
            <span className="flex flex-col gap-[5px]">
              <span className="block w-6 h-px bg-ivory transition-transform duration-300 group-hover:scale-x-75 origin-right" />
              <span className="block w-6 h-px bg-ivory" />
            </span>
          </button>
        </div>
      </header>

      {/* Vertical section rail (xl+) */}
      <nav
        aria-label="Sections"
        className="fixed right-7 top-1/2 -translate-y-1/2 z-[140] hidden xl:flex flex-col gap-4"
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            className="group flex items-center justify-end gap-3"
            aria-label={s.label}
            data-cursor
          >
            <span
              className={`font-mono text-[8px] tracking-[0.25em] uppercase transition-all duration-300 ${
                active === s.id
                  ? "text-violet-bright opacity-100"
                  : "opacity-0 group-hover:opacity-60 text-mist"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`rounded-full transition-all duration-400 ${
                active === s.id
                  ? "w-[22px] h-[5px] bg-violet"
                  : "w-[5px] h-[5px] bg-dim group-hover:bg-mist"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] bg-void/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
          >
            <div className="absolute inset-0 flex flex-col px-6 md:px-16">
              <div className="flex items-center justify-between py-6">
                <span className="font-display font-bold text-[15px] text-ivory">
                  Apurv Patil<span className="text-violet-bright">.</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="font-mono text-[10px] tracking-[0.35em] uppercase text-mist hover:text-ivory transition-colors"
                  aria-label="Close menu"
                  data-cursor
                >
                  Close ✕
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center max-w-[900px]">
                {SECTIONS.map((s, i) => (
                  <motion.button
                    key={s.id}
                    onClick={() => go(s.id)}
                    className="group flex items-baseline gap-5 md:gap-8 py-2 md:py-2.5 text-left"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease: EASE }}
                    data-cursor
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-dim group-hover:text-violet-bright transition-colors duration-300 w-8">
                      {s.num}
                    </span>
                    <span
                      className={`font-display font-extrabold tracking-[-0.03em] leading-[1.05] transition-all duration-400 ${
                        active === s.id
                          ? "text-aurora"
                          : "text-ivory/85 group-hover:text-ivory group-hover:translate-x-3"
                      }`}
                      style={{ fontSize: "clamp(2.2rem, 6.5vh, 4.2rem)" }}
                    >
                      {s.label}
                    </span>
                  </motion.button>
                ))}
              </nav>

              <div className="flex items-center justify-between py-7 border-t border-line">
                <a
                  href="mailto:apurvsptl@gmail.com"
                  className="font-mono text-[10px] tracking-[0.25em] uppercase text-mist hover:text-ivory transition-colors link-draw"
                >
                  apurvsptl@gmail.com
                </a>
                <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase text-cyan">
                  <span className="relative inline-block w-[6px] h-[6px] rounded-full bg-cyan status-ping" />
                  Available
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
