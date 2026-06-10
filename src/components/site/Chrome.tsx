"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { EASE } from "./shared";

export const CHAPTERS = [
  { id: "home", num: "01", label: "Home" },
  { id: "about", num: "02", label: "About" },
  { id: "ventures", num: "03", label: "Ventures" },
  { id: "projects", num: "04", label: "Projects" },
  { id: "writing", num: "05", label: "Writing" },
  { id: "now", num: "06", label: "Now" },
  { id: "connect", num: "07", label: "Connect" },
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
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
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

export default function Chrome() {
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
      {/* Scroll progress hairline */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold origin-left z-[90]"
        style={{ scaleX: progress }}
      />

      {/* ── Fixed header ── */}
      <header className="fixed top-0 left-0 right-0 z-[80] border-b border-border bg-[rgba(10,9,8,0.78)] backdrop-blur-md">
        <div className="flex items-center justify-between px-6 md:px-10 h-[58px]">
          <button
            onClick={() => go("home")}
            className="flex items-baseline gap-3 group"
          >
            <span className="font-serif text-[19px] text-text leading-none group-hover:text-gold transition-colors duration-300">
              Apurv&thinsp;/&thinsp;Patil
            </span>
            <span className="hidden sm:block font-mono text-[9px] uppercase tracking-[0.3em] text-text3">
              Product · Finance · Manufacturing
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {CHAPTERS.slice(1).map((c) => (
              <button
                key={c.id}
                onClick={() => go(c.id)}
                className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-colors duration-200 ${
                  active === c.id
                    ? "text-gold"
                    : "text-text3 hover:text-text"
                }`}
              >
                {c.label}
              </button>
            ))}
            <span className="hidden lg:flex items-center gap-2 pl-5 border-l border-border font-mono text-[9px] tracking-[0.2em] text-text3">
              <span>PNQ {ist}</span>
              <span className="text-border2">/</span>
              <span>NYC {est}</span>
            </span>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 items-end"
            aria-label="Menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7, width: 24 } : { rotate: 0, y: 0, width: 24 }}
              className="block h-px bg-text"
              style={{ width: 24 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px bg-text w-4"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -5, width: 24 } : { rotate: 0, y: 0, width: 16 }}
              className="block h-px bg-text"
              style={{ width: 16 }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[75] bg-bg flex flex-col justify-center px-10 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-1">
              {CHAPTERS.map((c, i) => (
                <motion.button
                  key={c.id}
                  onClick={() => go(c.id)}
                  className="flex items-baseline gap-4 py-2.5 text-left group"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: EASE }}
                >
                  <span className="font-mono text-[10px] text-gold tracking-[0.2em]">
                    {c.num}
                  </span>
                  <span
                    className={`font-serif text-[34px] leading-none ${
                      active === c.id ? "text-gold italic" : "text-text"
                    }`}
                  >
                    {c.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <motion.div
              className="mt-12 pt-6 border-t border-border flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <a
                href="https://www.linkedin.com/in/apurv-patil/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-text3"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://www.youtube.com/@TheMechanicsofReality"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-text3"
              >
                YouTube ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Left chapter rail (desktop) ── */}
      <div className="hidden xl:flex fixed left-0 top-0 bottom-0 w-[68px] z-[70] flex-col items-center justify-center gap-5 border-r border-border bg-[rgba(10,9,8,0.5)]">
        {CHAPTERS.map((c) => (
          <button
            key={c.id}
            onClick={() => go(c.id)}
            className="group relative flex items-center justify-center"
            aria-label={c.label}
          >
            <span
              className={`font-mono text-[10px] tracking-[0.15em] transition-all duration-300 ${
                active === c.id
                  ? "text-gold"
                  : "text-text3 group-hover:text-text2"
              }`}
            >
              {c.num}
            </span>
            {active === c.id && (
              <motion.span
                layoutId="rail-dot"
                className="absolute -right-[13px] w-[3px] h-[18px] bg-gold"
                transition={{ duration: 0.4, ease: EASE }}
              />
            )}
          </button>
        ))}
      </div>
    </>
  );
}
