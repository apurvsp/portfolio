"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./shared";

/* Opening sequence: counter ticks to 100, then twin panels lift. */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = 1500;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[250] pointer-events-none"
          exit={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          {/* Twin curtain panels */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-void2"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: EASE }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-void2"
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: EASE }}
          />

          {/* Center seam */}
          <motion.div
            className="absolute left-0 right-0 top-1/2 h-px bg-violet/60"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            exit={{ opacity: 0 }}
            style={{ originX: 0 }}
          />

          {/* Counter */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-baseline gap-4">
              <span className="font-display font-extrabold text-[15vw] md:text-[9vw] leading-none text-ivory tabular-nums tracking-[-0.04em]">
                {String(count).padStart(3, "0")}
              </span>
              <span className="font-mono text-[11px] tracking-[0.4em] text-violet-bright uppercase">
                %
              </span>
            </div>
          </motion.div>

          {/* Corners */}
          <motion.span
            className="absolute bottom-6 left-6 font-mono text-[9px] tracking-[0.35em] uppercase text-dim"
            exit={{ opacity: 0 }}
          >
            Apurv Patil — Index
          </motion.span>
          <motion.span
            className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.35em] uppercase text-dim"
            exit={{ opacity: 0 }}
          >
            PNQ / NYC
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
