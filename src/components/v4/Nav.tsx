"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { EASE } from "./shared";

export const FILES = [
  { id: "home", num: "01", label: "Identity" },
  { id: "about", num: "02", label: "Operator" },
  { id: "ventures", num: "03", label: "Holdings" },
  { id: "projects", num: "04", label: "Workbench" },
  { id: "writing", num: "05", label: "Essays" },
  { id: "now", num: "06", label: "Now" },
  { id: "connect", num: "07", label: "Contact" },
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
    const sections = FILES.map((c) => document.getElementById(c.id)).filter(
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
  const [menuOpen, setMenuOpen] = useState(false);
  const ist = useClock("Asia/Kolkata");
  const est = useClock("America/New_York");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function go(id: string) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-red origin-left z-[110]"
        style={{ scaleX: progress }}
      />

      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-[100] bg-paper border-b-2 border-ink">
        <div className="flex items-stretch h-[52px]">
          {/* Identity stamp */}
          <button
            onClick={() => go("home")}
            className="flex items-center gap-3 px-4 md:px-6 border-r-2 border-ink bg-ink text-paper hover:bg-red transition-colors duration-300"
            aria-label="Back to top"
          >
            <span className="font-display text-[20px] leading-none tracking-wide">
              AP
            </span>
            <span className="hidden sm:block font-mono text-[9px] tracking-[0.25em] uppercase">
              Index/2026
            </span>
          </button>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-stretch flex-1">
            {FILES.map((f) => (
              <button
                key={f.id}
                onClick={() => go(f.id)}
                className={`group flex items-center gap-2 px-4 xl:px-5 border-r border-line-soft font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                  active === f.id
                    ? "text-red"
                    : "text-ink2 hover:text-ink hover:bg-paper2"
                }`}
              >
                <span
                  className={`text-[9px] ${
                    active === f.id ? "text-red" : "text-ink3"
                  }`}
                >
                  {f.num}
                </span>
                {f.label}
              </button>
            ))}
          </nav>

          {/* Clocks + status */}
          <div className="hidden md:flex items-center gap-5 px-5 ml-auto border-l border-line-soft">
            <span className="font-mono text-[9px] tracking-[0.18em] text-ink2 uppercase">
              PNQ {ist}
            </span>
            <span className="font-mono text-[9px] tracking-[0.18em] text-ink2 uppercase">
              NYC {est}
            </span>
            <span className="flex items-center gap-2">
              <span className="relative inline-block w-[7px] h-[7px] rounded-full bg-blue status-ping" />
              <span className="font-mono text-[9px] tracking-[0.18em] text-blue uppercase">
                Open
              </span>
            </span>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center gap-2 px-5 ml-auto border-l-2 border-ink font-mono text-[10px] tracking-[0.25em] uppercase hover:bg-ink hover:text-paper transition-colors duration-300"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? "Close ✕" : "Menu ≡"}
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[95] bg-ink text-paper flex flex-col pt-[52px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex-1 flex flex-col justify-center px-8">
              {FILES.map((f, i) => (
                <motion.button
                  key={f.id}
                  onClick={() => go(f.id)}
                  className="group flex items-baseline gap-4 py-3 border-b border-paper/15 text-left"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.06 + i * 0.05, ease: EASE }}
                >
                  <span className="font-mono text-[11px] text-red">{f.num}</span>
                  <span
                    className={`font-display uppercase text-[42px] leading-none tracking-wide transition-colors duration-300 ${
                      active === f.id ? "text-red" : "text-paper group-hover:text-red"
                    }`}
                  >
                    {f.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <div className="px-8 pb-10 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-paper/50">
                PNQ {ist} / NYC {est}
              </span>
              <span className="flex items-center gap-2">
                <span className="relative inline-block w-[7px] h-[7px] rounded-full bg-paper status-ping status-ping--paper" />
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-paper/70">
                  Available
                </span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
